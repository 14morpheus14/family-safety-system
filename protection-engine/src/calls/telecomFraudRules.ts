export interface TelecomFraudSignal {
  category: string;
  reason: string;
  score: number;
  confidence:
    | "low-confidence"
    | "medium-confidence"
    | "high-confidence"
    | "critical-confidence";
}

export interface CallMetadata {
  phoneNumber: string;
  timestamp: number;
  durationSeconds: number;
  wasRejected: boolean;
  wasAnswered: boolean;
  userTaggedCategories?: string[];
}

export class TelecomFraudRules {
  private readonly shortCallThreshold = 5;

  private readonly burstWindowMs =
    3 * 60 * 1000;

  private readonly lateNightStartHour = 0;

  private readonly lateNightEndHour = 5;

  private readonly suspiciousRetryThreshold = 5;

  private readonly highBurstThreshold = 10;

  private readonly spoofRotationPrefixLength = 6;

  public evaluateCallPattern(
    currentCall: CallMetadata,
    historicalCalls: CallMetadata[]
  ): TelecomFraudSignal[] {
    const signals:
      TelecomFraudSignal[] = [];

    const relatedCalls =
      historicalCalls.filter(
        (call) =>
          call.phoneNumber ===
          currentCall.phoneNumber
      );

    const recentBurstCalls =
      relatedCalls.filter(
        (call) =>
          currentCall.timestamp -
            call.timestamp <=
          this.burstWindowMs
      );

    if (
      currentCall.durationSeconds > 0 &&
      currentCall.durationSeconds <=
        this.shortCallThreshold
    ) {
      signals.push({
        category: "robocall-pattern",
        reason:
          "Repeated short-duration call behavior detected",
        score: 25,
        confidence:
          "medium-confidence"
      });
    }

    if (
      recentBurstCalls.length >=
      this.highBurstThreshold
    ) {
      signals.push({
        category: "burst-calling",
        reason:
          "High-frequency burst calling behavior detected",
        score: 60,
        confidence:
          "critical-confidence"
      });
    }

    const rejectedRetryCalls =
      recentBurstCalls.filter(
        (call) =>
          call.wasRejected
      );

    if (
      rejectedRetryCalls.length >=
      this.suspiciousRetryThreshold
    ) {
      signals.push({
        category:
          "coercive-retry-pattern",
        reason:
          "Persistent retry behavior after rejection detected",
        score: 50,
        confidence:
          "high-confidence"
      });
    }

    const callHour =
      new Date(
        currentCall.timestamp
      ).getHours();

    if (
      callHour >=
        this.lateNightStartHour &&
      callHour <=
        this.lateNightEndHour &&
      recentBurstCalls.length >= 3
    ) {
      signals.push({
        category:
          "late-night-persistence",
        reason:
          "Repeated late-night calling behavior detected",
        score: 45,
        confidence:
          "high-confidence"
      });
    }

    const rotatingPrefixCalls =
      historicalCalls.filter(
        (call) =>
          call.phoneNumber.slice(
            0,
            this
              .spoofRotationPrefixLength
          ) ===
            currentCall.phoneNumber.slice(
              0,
              this
                .spoofRotationPrefixLength
            ) &&
          call.phoneNumber !==
            currentCall.phoneNumber
      );

    if (
      rotatingPrefixCalls.length >= 4
    ) {
      signals.push({
        category:
          "spoof-like-rotation",
        reason:
          "Rotating number-prefix behavior detected",
        score: 55,
        confidence:
          "high-confidence"
      });
    }

    if (
      currentCall.userTaggedCategories
    ) {
      for (
        const tag of
        currentCall
          .userTaggedCategories
      ) {
        if (
          tag ===
          "remote-access-scam"
        ) {
          signals.push({
            category:
              "remote-access-scam",
            reason:
              "User-local remote access scam label detected",
            score: 80,
            confidence:
              "critical-confidence"
          });
        }

        if (
          tag ===
          "otp-coercion"
        ) {
          signals.push({
            category:
              "otp-coercion",
            reason:
              "User-local OTP coercion label detected",
            score: 85,
            confidence:
              "critical-confidence"
          });
        }

        if (
          tag ===
          "government-impersonation"
        ) {
          signals.push({
            category:
              "government-impersonation",
            reason:
              "User-local authority impersonation label detected",
            score: 90,
            confidence:
              "critical-confidence"
          });
        }

        if (
          tag ===
          "robocall"
        ) {
          signals.push({
            category:
              "robocall",
            reason:
              "User-local robocall label detected",
            score: 65,
            confidence:
              "high-confidence"
          });
        }
      }
    }

    return signals;
  }
}

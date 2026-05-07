import {
  CallMetadata,
  TelecomFraudSignal
} from "./telecomFraudRules";

export class RobocallDetector {
  private readonly shortCallThreshold = 5;

  private readonly robocallBurstThreshold = 8;

  private readonly burstWindowMs =
    3 * 60 * 1000;

  private readonly repeatedRetryThreshold = 5;

  private readonly unansweredThreshold = 6;

  public analyze(
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

    const recentCalls =
      relatedCalls.filter(
        (call) =>
          currentCall.timestamp -
            call.timestamp <=
          this.burstWindowMs
      );

    const shortDurationCalls =
      recentCalls.filter(
        (call) =>
          call.durationSeconds <=
          this.shortCallThreshold
      );

    if (
      shortDurationCalls.length >=
      this.robocallBurstThreshold
    ) {
      signals.push({
        category:
          "robocall-burst-pattern",
        reason:
          "High-frequency short-duration robocall pattern detected",
        score: 70,
        confidence:
          "critical-confidence"
      });
    }

    const unansweredCalls =
      recentCalls.filter(
        (call) =>
          !call.wasAnswered
      );

    if (
      unansweredCalls.length >=
      this.unansweredThreshold
    ) {
      signals.push({
        category:
          "persistent-unanswered-calling",
        reason:
          "Repeated unanswered call persistence detected",
        score: 45,
        confidence:
          "high-confidence"
      });
    }

    const rejectedCalls =
      recentCalls.filter(
        (call) =>
          call.wasRejected
      );

    if (
      rejectedCalls.length >=
      this.repeatedRetryThreshold
    ) {
      signals.push({
        category:
          "repeated-retry-cadence",
        reason:
          "Repeated retry cadence after rejection detected",
        score: 55,
        confidence:
          "high-confidence"
      });
    }

    const averageDuration =
      this.calculateAverageDuration(
        recentCalls
      );

    if (
      recentCalls.length >= 6 &&
      averageDuration <= 4
    ) {
      signals.push({
        category:
          "automated-dial-pattern",
        reason:
          "Automated dialer duration profile detected",
        score: 60,
        confidence:
          "high-confidence"
      });
    }

    const evenlySpaced =
      this.hasEvenlySpacedCadence(
        recentCalls
      );

    if (evenlySpaced) {
      signals.push({
        category:
          "automated-cadence-pattern",
        reason:
          "Deterministic evenly-spaced robocall cadence detected",
        score: 65,
        confidence:
          "critical-confidence"
      });
    }

    return signals;
  }

  private calculateAverageDuration(
    calls: CallMetadata[]
  ): number {
    if (calls.length === 0) {
      return 0;
    }

    const total =
      calls.reduce(
        (sum, call) =>
          sum +
          call.durationSeconds,
        0
      );

    return total / calls.length;
  }

  private hasEvenlySpacedCadence(
    calls: CallMetadata[]
  ): boolean {
    if (calls.length < 5) {
      return false;
    }

    const sortedCalls =
      [...calls].sort(
        (a, b) =>
          a.timestamp -
          b.timestamp
      );

    const intervals: number[] =
      [];

    for (
      let i = 1;
      i < sortedCalls.length;
      i++
    ) {
      intervals.push(
        sortedCalls[i]
          .timestamp -
          sortedCalls[i - 1]
            .timestamp
      );
    }

    const baseline =
      intervals[0];

    let matchingIntervals = 0;

    for (
      const interval of intervals
    ) {
      const difference =
        Math.abs(
          interval - baseline
        );

      if (
        difference <= 5000
      ) {
        matchingIntervals++;
      }
    }

    return (
      matchingIntervals >=
      intervals.length - 1
    );
  }
}

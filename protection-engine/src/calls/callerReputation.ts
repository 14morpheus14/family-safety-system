import {
  TelecomFraudSignal
} from "./telecomFraudRules";

export interface CallerReputationEntry {
  phoneNumber: string;
  reputationScore: number;
  labels: string[];
  suspiciousCallCount: number;
  benignCallCount: number;
  lastUpdated: number;
}

export class CallerReputation {
  private readonly entries:
    CallerReputationEntry[] = [];

  private readonly minimumScore = 0;

  private readonly maximumScore = 1000;

  public updateReputation(
    phoneNumber: string,
    signals: TelecomFraudSignal[],
    userLabels?: string[]
  ): CallerReputationEntry {
    let entry =
      this.entries.find(
        (existing) =>
          existing.phoneNumber ===
          phoneNumber
      );

    if (!entry) {
      entry = {
        phoneNumber,
        reputationScore: 0,
        labels: [],
        suspiciousCallCount: 0,
        benignCallCount: 0,
        lastUpdated:
          Date.now()
      };

      this.entries.push(entry);
    }

    let adjustment = 0;

    for (const signal of signals) {
      adjustment += signal.score;
    }

    if (signals.length > 0) {
      entry.suspiciousCallCount += 1;
    } else {
      entry.benignCallCount += 1;

      adjustment -= 15;
    }

    if (userLabels) {
      for (const label of userLabels) {
        if (
          !entry.labels.includes(
            label
          )
        ) {
          entry.labels.push(label);
        }

        if (
          label === "trusted"
        ) {
          adjustment -= 80;
        }

        if (
          label === "family"
        ) {
          adjustment -= 100;
        }

        if (
          label === "delivery"
        ) {
          adjustment -= 40;
        }

        if (
          label === "spam"
        ) {
          adjustment += 80;
        }

        if (
          label ===
          "robocall"
        ) {
          adjustment += 90;
        }

        if (
          label ===
          "otp-scam"
        ) {
          adjustment += 120;
        }

        if (
          label ===
          "government-impersonation"
        ) {
          adjustment += 140;
        }
      }
    }

    entry.reputationScore +=
      adjustment;

    if (
      entry.reputationScore <
      this.minimumScore
    ) {
      entry.reputationScore =
        this.minimumScore;
    }

    if (
      entry.reputationScore >
      this.maximumScore
    ) {
      entry.reputationScore =
        this.maximumScore;
    }

    entry.lastUpdated =
      Date.now();

    return {
      ...entry
    };
  }

  public getReputation(
    phoneNumber: string
  ): CallerReputationEntry | null {
    const entry =
      this.entries.find(
        (existing) =>
          existing.phoneNumber ===
          phoneNumber
      );

    if (!entry) {
      return null;
    }

    return {
      ...entry
    };
  }

  public isKnownThreat(
    phoneNumber: string
  ): boolean {
    const entry =
      this.getReputation(
        phoneNumber
      );

    if (!entry) {
      return false;
    }

    return (
      entry.reputationScore >=
      300
    );
  }

  public isKnownBenign(
    phoneNumber: string
  ): boolean {
    const entry =
      this.getReputation(
        phoneNumber
      );

    if (!entry) {
      return false;
    }

    return (
      entry.reputationScore <=
        20 &&
      entry.benignCallCount >= 3
    );
  }

  public clear(): void {
    this.entries.length = 0;
  }
}

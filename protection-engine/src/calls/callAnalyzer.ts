import {
  BehavioralCallMemory
} from "./behavioralCallMemory";

import {
  CallerReputation
} from "./callerReputation";

import {
  CoercionDetector
} from "./coercionDetector";

import {
  RobocallDetector
} from "./robocallDetector";

import {
  CallMetadata,
  TelecomFraudRules,
  TelecomFraudSignal
} from "./telecomFraudRules";

export interface CallAnalysisExplanation {
  source: string;
  reason: string;
  score: number;
}

export interface CallForensicEvidence {
  type: string;
  value: string;
  confidence: string;
  score: number;
}

export interface CallForensicCorrelation {
  source: string;
  reason: string;
  score: number;
}

export interface CallForensicVerdict {
  severity: string;
  summary: string;
}

export interface CallAnalysisResult {
  isSuspicious: boolean;
  riskScore: number;
  severity: string;
  categories: string[];
  explanations:
    CallAnalysisExplanation[];
  forensic: {
    evidence:
      CallForensicEvidence[];
    correlations:
      CallForensicCorrelation[];
    verdict:
      CallForensicVerdict;
  };
}

export class CallAnalyzer {
  private readonly memory:
    BehavioralCallMemory;

  private readonly reputation:
    CallerReputation;

  private readonly telecomFraudRules:
    TelecomFraudRules;

  private readonly robocallDetector:
    RobocallDetector;

  private readonly coercionDetector:
    CoercionDetector;

  constructor() {
    this.memory =
      new BehavioralCallMemory();

    this.reputation =
      new CallerReputation();

    this.telecomFraudRules =
      new TelecomFraudRules();

    this.robocallDetector =
      new RobocallDetector();

    this.coercionDetector =
      new CoercionDetector();
  }

  public analyzeCall(
    call: CallMetadata
  ): CallAnalysisResult {
    const historicalCalls =
      this.memory.getAllCalls();

    const signals:
      TelecomFraudSignal[] = [];

    signals.push(
      ...this
        .telecomFraudRules
        .evaluateCallPattern(
          call,
          historicalCalls
        )
    );

    signals.push(
      ...this
        .robocallDetector
        .analyze(
          call,
          historicalCalls
        )
    );

    signals.push(
      ...this
        .coercionDetector
        .analyze(
          call,
          historicalCalls
        )
    );

    const reputationEntry =
      this.reputation
        .updateReputation(
          call.phoneNumber,
          signals,
          call
            .userTaggedCategories
        );

    this.memory.recordCall(
      call
    );

    const categories =
      [...new Set(
        signals.map(
          (signal) =>
            signal.category
        )
      )];

    const explanations:
      CallAnalysisExplanation[] =
      [];

    const evidence:
      CallForensicEvidence[] =
      [];

    const correlations:
      CallForensicCorrelation[] =
      [];

    let riskScore = 0;

    for (const signal of signals) {
      riskScore +=
        signal.score;

      explanations.push({
        source:
          signal.category,
        reason:
          signal.reason,
        score:
          signal.score
      });

      evidence.push({
        type:
          signal.category,
        value:
          signal.reason,
        confidence:
          signal.confidence,
        score:
          signal.score
      });
    }

    if (
      reputationEntry
        .reputationScore >= 300
    ) {
      riskScore += 60;

      correlations.push({
        source:
          "local-reputation-engine",
        reason:
          "Locally established malicious behavioral reputation detected",
        score: 60
      });
    }

    if (
      reputationEntry.labels.includes(
        "trusted"
      ) ||
      reputationEntry.labels.includes(
        "family"
      )
    ) {
      riskScore -= 80;

      correlations.push({
        source:
          "local-legitimacy-engine",
        reason:
          "Trusted local caller suppression activated",
        score: -80
      });
    }

    if (riskScore < 0) {
      riskScore = 0;
    }

    const severity =
      this.calculateSeverity(
        riskScore
      );

    const summary =
      this.generateSummary(
        severity,
        categories
      );

    return {
      isSuspicious:
        severity !== "safe",
      riskScore,
      severity,
      categories,
      explanations,
      forensic: {
        evidence,
        correlations,
        verdict: {
          severity,
          summary
        }
      }
    };
  }

  private calculateSeverity(
    score: number
  ): string {
    if (score >= 250) {
      return "critical";
    }

    if (score >= 160) {
      return "high-risk";
    }

    if (score >= 90) {
      return "suspicious";
    }

    if (score >= 40) {
      return "caution";
    }

    return "safe";
  }

  private generateSummary(
    severity: string,
    categories: string[]
  ): string {
    if (
      categories.includes(
        "government-impersonation"
      )
    ) {
      return (
        severity +
        " government impersonation pattern detected"
      );
    }

    if (
      categories.includes(
        "remote-access-scam"
      )
    ) {
      return (
        severity +
        " remote access fraud pattern detected"
      );
    }

    if (
      categories.includes(
        "robocall-burst-pattern"
      )
    ) {
      return (
        severity +
        " robocall activity detected"
      );
    }

    return (
      severity +
      " suspicious call behavior detected"
    );
  }
}

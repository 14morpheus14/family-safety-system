import { ThreatSeverity } from "./threatSeverity";
export interface ForensicEvidence {
    type: string;
    value: string;
    confidence: string;
    score: number;
}
export interface ForensicSignal {
    category: string;
    reason: string;
    confidence: string;
}
export interface ForensicCorrelation {
    source: string;
    reason: string;
    score: number;
}
export interface ForensicSuppression {
    source: string;
    reason: string;
    scoreAdjustment: number;
}
export interface ForensicVerdict {
    severity: ThreatSeverity;
    summary: string;
}
export interface ForensicAnalysis {
    rawEvidence: ForensicEvidence[];
    interpretedSignals: ForensicSignal[];
    correlations: ForensicCorrelation[];
    suppressions: ForensicSuppression[];
    verdict: ForensicVerdict;
}

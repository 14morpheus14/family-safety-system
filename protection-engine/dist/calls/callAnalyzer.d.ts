import { CallMetadata } from "./telecomFraudRules";
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
    explanations: CallAnalysisExplanation[];
    forensic: {
        evidence: CallForensicEvidence[];
        correlations: CallForensicCorrelation[];
        verdict: CallForensicVerdict;
    };
}
export declare class CallAnalyzer {
    private readonly memory;
    private readonly reputation;
    private readonly telecomFraudRules;
    private readonly robocallDetector;
    private readonly coercionDetector;
    constructor();
    analyzeCall(call: CallMetadata): CallAnalysisResult;
    private calculateSeverity;
    private generateSummary;
}

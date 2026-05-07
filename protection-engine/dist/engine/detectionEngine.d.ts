import { EventBus } from "../events/eventBus";
export interface DetectionExplanation {
    engine?: string;
    source: string;
    reason: string;
    score: number;
}
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
    severity: string;
    summary: string;
}
export interface ForensicAnalysis {
    rawEvidence: ForensicEvidence[];
    interpretedSignals: ForensicSignal[];
    correlations: ForensicCorrelation[];
    suppressions: ForensicSuppression[];
    verdict: ForensicVerdict;
}
export interface DetectionResult {
    isSuspicious: boolean;
    matchedPatterns: string[];
    riskScore: number;
    categories: string[];
    severity: string;
    explanations: DetectionExplanation[];
    forensic: ForensicAnalysis;
}
interface AnalyzeOptions {
    sender?: string;
}
export declare class DetectionEngine {
    private readonly rules;
    private readonly scanner;
    private readonly eventBus;
    private readonly logger;
    private readonly suspiciousThreshold;
    private readonly behavioralWindowMs;
    private readonly conversationWindowMs;
    private readonly behavioralEvents;
    private readonly conversationStates;
    private readonly trustedSenders;
    private readonly confidenceWeights;
    private readonly maliciousImperatives;
    private readonly compoundThreatRules;
    private readonly protectiveAdvisories;
    private readonly correlationRules;
    private readonly escalationPatterns;
    constructor();
    analyze(content: string, options?: AnalyzeOptions): DetectionResult;
    private calculateBenignContextAdjustment;
    private calculateSemanticPolarityAdjustment;
    private calculateSequencingScore;
    private generateVerdictSummary;
    private calculateSenderTrustAdjustment;
    private calculateBehavioralScore;
    private recordBehavioralEvent;
    private calculateSeverity;
    private normalizeContent;
    getEventBus(): EventBus;
}
export {};

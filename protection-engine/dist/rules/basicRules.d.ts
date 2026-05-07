export type EvidenceConfidence = "low-confidence" | "medium-confidence" | "high-confidence" | "critical-confidence";
export interface RuleMatch {
    ruleId: string;
    category: string;
    severity: string;
    score: number;
    confidence: EvidenceConfidence;
    matchedText: string;
}
export declare class BasicRules {
    private readonly rules;
    private readonly allowlistRules;
    evaluate(content: string): RuleMatch[];
    private isAllowlisted;
    calculateRiskScore(matches: RuleMatch[]): number;
    containsBlockedKeyword(content: string): boolean;
}

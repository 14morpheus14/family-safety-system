export interface TelecomFraudSignal {
    category: string;
    reason: string;
    score: number;
    confidence: "low-confidence" | "medium-confidence" | "high-confidence" | "critical-confidence";
}
export interface CallMetadata {
    phoneNumber: string;
    timestamp: number;
    durationSeconds: number;
    wasRejected: boolean;
    wasAnswered: boolean;
    userTaggedCategories?: string[];
}
export declare class TelecomFraudRules {
    private readonly shortCallThreshold;
    private readonly burstWindowMs;
    private readonly lateNightStartHour;
    private readonly lateNightEndHour;
    private readonly suspiciousRetryThreshold;
    private readonly highBurstThreshold;
    private readonly spoofRotationPrefixLength;
    evaluateCallPattern(currentCall: CallMetadata, historicalCalls: CallMetadata[]): TelecomFraudSignal[];
}

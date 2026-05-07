import { CallMetadata, TelecomFraudSignal } from "./telecomFraudRules";
export declare class CoercionDetector {
    private readonly coerciveBurstWindowMs;
    private readonly aggressiveRetryThreshold;
    private readonly lateNightThreshold;
    analyze(currentCall: CallMetadata, historicalCalls: CallMetadata[]): TelecomFraudSignal[];
}

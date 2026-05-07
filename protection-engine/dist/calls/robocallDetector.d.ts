import { CallMetadata, TelecomFraudSignal } from "./telecomFraudRules";
export declare class RobocallDetector {
    private readonly shortCallThreshold;
    private readonly robocallBurstThreshold;
    private readonly burstWindowMs;
    private readonly repeatedRetryThreshold;
    private readonly unansweredThreshold;
    analyze(currentCall: CallMetadata, historicalCalls: CallMetadata[]): TelecomFraudSignal[];
    private calculateAverageDuration;
    private hasEvenlySpacedCadence;
}

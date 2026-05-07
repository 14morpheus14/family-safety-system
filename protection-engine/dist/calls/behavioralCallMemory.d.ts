import { CallMetadata } from "./telecomFraudRules";
export declare class BehavioralCallMemory {
    private readonly calls;
    private readonly retentionWindowMs;
    recordCall(call: CallMetadata): void;
    getCallsForNumber(phoneNumber: string): CallMetadata[];
    getRecentCalls(windowMs: number): CallMetadata[];
    getAllCalls(): CallMetadata[];
    getCallsByPrefix(prefix: string): CallMetadata[];
    getRejectedCallsForNumber(phoneNumber: string): CallMetadata[];
    getShortDurationCalls(maxDurationSeconds: number): CallMetadata[];
    getBurstCalls(phoneNumber: string, burstWindowMs: number): CallMetadata[];
    clear(): void;
    private pruneExpiredCalls;
}

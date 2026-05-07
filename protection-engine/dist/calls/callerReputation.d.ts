import { TelecomFraudSignal } from "./telecomFraudRules";
export interface CallerReputationEntry {
    phoneNumber: string;
    reputationScore: number;
    labels: string[];
    suspiciousCallCount: number;
    benignCallCount: number;
    lastUpdated: number;
}
export declare class CallerReputation {
    private readonly entries;
    private readonly minimumScore;
    private readonly maximumScore;
    updateReputation(phoneNumber: string, signals: TelecomFraudSignal[], userLabels?: string[]): CallerReputationEntry;
    getReputation(phoneNumber: string): CallerReputationEntry | null;
    isKnownThreat(phoneNumber: string): boolean;
    isKnownBenign(phoneNumber: string): boolean;
    clear(): void;
}

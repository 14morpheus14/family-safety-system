import { ThreatCategory } from "./threatCategory";
import { ThreatSeverity } from "./threatSeverity";
import { ForensicAnalysis } from "./forensic";
export interface ThreatExplanation {
    engine?: string;
    source: string;
    reason: string;
    score: number;
}
export interface ThreatVerdict {
    isSuspicious: boolean;
    riskScore: number;
    severity: ThreatSeverity;
    categories: ThreatCategory[];
    matchedPatterns: string[];
    explanations: ThreatExplanation[];
    forensic: ForensicAnalysis;
}

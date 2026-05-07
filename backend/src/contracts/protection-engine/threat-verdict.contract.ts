export type ThreatSeverity =
  | "low"
  | "medium"
  | "high";

export interface ThreatVerdict {
  threat: boolean;

  severity:
    ThreatSeverity;

  category: string;

  summary: string;

  timestamp: string;
}

export interface SanitizedAlert {
  familyId: string;

  deviceId: string;

  severity:
    ThreatSeverity;

  category: string;

  summary: string;

  timestamp: string;
}

export interface LocalScanResult {
  source: string;

  verdict:
    ThreatVerdict;
}

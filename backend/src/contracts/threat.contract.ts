export type ThreatSeverity =
  | "low"
  | "medium"
  | "high";

export interface ThreatVerdict {
  threat: boolean;

  severity: ThreatSeverity;

  reasons: string[];

  timestamp: string;
}

export interface SanitizedAlert {
  familyId: string;

  deviceId: string;

  severity: ThreatSeverity;

  summary: string;

  timestamp: string;
}

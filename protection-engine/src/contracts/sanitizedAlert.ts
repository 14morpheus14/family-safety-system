import {
  ThreatSeverity
} from "./threatSeverity";

import {
  ThreatCategory
} from "./threatCategory";

export interface SanitizedAlert {
  severity:
    ThreatSeverity;

  categories:
    ThreatCategory[];

  riskScore: number;

  timestamp: number;

  sourceType:
    | "message"
    | "link"
    | "call"
    | "file";

  sanitizedPreview: string;

  correlationId: string;
}
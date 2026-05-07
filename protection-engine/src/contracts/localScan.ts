import {
  ThreatVerdict
} from "./threatVerdict";

import type {
  CallMetadata
} from "../calls/telecomFraudRules";

export interface LocalScanRequest {
  content?: string;

  sender?: string;

  sourceType?:
    | "message"
    | "link"
    | "call"
    | "file";

  callMetadata?:
    CallMetadata;
}

export interface LocalScanResult {
  request:
    LocalScanRequest;

  verdict:
    ThreatVerdict;

  scannedAt: number;
}
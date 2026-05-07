import {
  SanitizedAlert
} from "./sanitizedAlert";

export interface FamilySyncPayload {
  deviceId: string;

  generatedAt: number;

  alerts:
    SanitizedAlert[];
}
import { z } from "zod";

export const threatSeveritySchema =
  z.enum([
    "low",
    "medium",
    "high"
  ]);

export const threatVerdictSchema =
  z.object({
    threat:
      z.boolean(),

    severity:
      threatSeveritySchema,

    category:
      z.string().min(1),

    summary:
      z.string().min(1),

    timestamp:
      z.string().min(1)
  });

export const sanitizedAlertSchema =
  z.object({
    familyId:
      z.string().min(1),

    deviceId:
      z.string().min(1),

    severity:
      threatSeveritySchema,

    category:
      z.string().min(1),

    summary:
      z.string().min(1),

    timestamp:
      z.string().min(1)
  });

export const localScanResultSchema =
  z.object({
    source:
      z.string().min(1),

    verdict:
      threatVerdictSchema
  });

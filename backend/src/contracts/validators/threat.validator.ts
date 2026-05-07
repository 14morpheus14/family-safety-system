import { z } from "zod";

export const threatSeveritySchema =
  z.enum([
    "low",
    "medium",
    "high"
  ]);

export const threatVerdictSchema =
  z.object({
    threat: z.boolean(),

    severity:
      threatSeveritySchema,

    reasons: z.array(
      z.string()
    ),

    timestamp: z.string()
  });

export const sanitizedAlertSchema =
  z.object({
    familyId: z.string(),

    deviceId: z.string(),

    severity:
      threatSeveritySchema,

    summary: z.string(),

    timestamp: z.string()
  });

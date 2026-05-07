import { z } from "zod";

export const deviceStateSchema =
  z.object({
    deviceId: z.string(),

    deviceName: z.string(),

    protectionEnabled:
      z.boolean(),

    lastSeen: z.string()
  });

export const familyMemberSchema =
  z.object({
    memberId: z.string(),

    memberName: z.string(),

    role: z.enum([
      "parent",
      "child"
    ]),

    devices: z.array(
      deviceStateSchema
    )
  });

export const familySyncSchema =
  z.object({
    familyId: z.string(),

    members: z.array(
      familyMemberSchema
    ),

    updatedAt: z.string()
  });

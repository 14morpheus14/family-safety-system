import {
  Request,
  Response
} from "express";

import {
  localScanResultSchema
} from "../../contracts/protection-engine/threat-verdict.validator";

export const ingestProtectionVerdict =
  async (
    req: Request,
    res: Response
  ) => {
    const validationResult =
      localScanResultSchema.safeParse(
        req.body
      );

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid protection verdict payload",

        errors:
          validationResult.error.flatten()
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Protection verdict ingested",

      data:
        validationResult.data
    });
  };

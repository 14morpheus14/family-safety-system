import {
  Request,
  Response
} from "express";

import {
  familySyncSchema
} from "../../contracts/validators/family.validator";

export const syncFamilyState = (
  req: Request,
  res: Response
) => {
  const validationResult =
    familySyncSchema.safeParse(
      req.body
    );

  if (!validationResult.success) {
    return res.status(400).json({
      message:
        "Invalid family sync payload",

      errors:
        validationResult.error.flatten()
    });
  }

  return res.status(200).json({
    success: true,

    message:
      "Family state synchronized",

    data:
      validationResult.data
  });
};

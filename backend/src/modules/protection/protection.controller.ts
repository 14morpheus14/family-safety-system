import {
  Request,
  Response
} from "express";

import {
  scanText
} from "../../services/protection.service";

export const scanContent = (
  req: Request,
  res: Response
) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      message: "Text is required"
    });
  }

  const result = scanText(text);

  return res.status(200).json(result);
};

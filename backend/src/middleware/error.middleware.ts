import {
  Request,
  Response,
  NextFunction
} from "express";

export const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  return res.status(error.status || 500).json({
    message:
      error.message || "Internal Server Error"
  });
};

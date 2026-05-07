import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import env from "./config/env";
import protectionRoutes from "./modules/protection/protection.routes";
import paymentRoutes from "./modules/payment/payment.routes";

import { authMiddleware } from "./middleware/auth.middleware";
import { validate } from "./middleware/validate.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { apiLimiter } from "./middleware/rateLimit.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";

import {
  register,
  login
} from "./modules/auth/auth.controller";

import {
  createFamily,
  getFamily
} from "./modules/family/family.controller";

import {
  createAlert,
  getAlerts
} from "./modules/alerts/alerts.controller";

import {
  createOrder,
  verifyPayment
} from "./modules/payments/payments.controller";

import {
  registerSchema,
  loginSchema
} from "./validators/auth.validator";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(apiLimiter);
app.use(loggerMiddleware);
app.use(express.json({
  limit: "10kb"
}));

app.use(
  "/protection",
  protectionRoutes
);

app.use(
  "/payments",
  paymentRoutes
);

app.get("/", (_req, res) => {
  res.json({
    message: "Family Safety System API Running"
  });
});

app.post(
  "/auth/register",
  validate(registerSchema),
  register
);

app.post(
  "/auth/login",
  validate(loginSchema),
  login
);

app.get("/profile", authMiddleware, (_req, res) => {
  res.json({
    message: "Protected profile route accessed"
  });
});

app.post(
  "/family/create",
  authMiddleware,
  createFamily
);

app.get(
  "/family",
  authMiddleware,
  getFamily
);

app.post(
  "/alerts/create",
  authMiddleware,
  createAlert
);

app.get(
  "/alerts",
  authMiddleware,
  getAlerts
);

app.post(
  "/payments/create-order",
  authMiddleware,
  createOrder
);

app.post(
  "/payments/verify",
  authMiddleware,
  verifyPayment
);

const PORT = env.PORT;

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

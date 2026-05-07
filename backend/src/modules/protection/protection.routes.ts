import { Router } from "express";

import {
  ingestProtectionVerdict
} from "./protection.controller";

const router = Router();

router.post(
  "/verdict",
  ingestProtectionVerdict
);

export default router;

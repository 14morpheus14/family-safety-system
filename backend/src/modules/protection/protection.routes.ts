import { Router } from "express";

import {
  scanContent
} from "./protection.controller";

const router = Router();

router.post(
  "/scan",
  scanContent
);

export default router;

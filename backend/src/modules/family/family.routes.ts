import { Router } from "express";

import {
  syncFamilyState
} from "./family.controller";

const router = Router();

router.post(
  "/sync",
  syncFamilyState
);

export default router;

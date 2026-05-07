import { Router } from "express";

import {
  syncFamilyState
} from "./family.controller";

import {
  getFamilySyncState
} from "./family.retrieve.controller";

import {
  authMiddleware
} from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/sync",
  authMiddleware,
  syncFamilyState
);

router.get(
  "/sync",
  authMiddleware,
  getFamilySyncState
);

export default router;

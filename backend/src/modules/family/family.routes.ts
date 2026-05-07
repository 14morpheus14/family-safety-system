import { Router } from "express";

import {
  authMiddleware
} from "../../middleware/auth.middleware";

import {
  syncFamilyState
} from "./family.controller";

import {
  getFamilySyncState,
  getSingleFamilySyncState
} from "./family.retrieve.controller";

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

router.get(
  "/:familyId/sync",
  authMiddleware,
  getSingleFamilySyncState
);

export default router;

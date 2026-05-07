import { Router } from "express";

import {
  syncFamilyState
} from "./family.controller";

import {
  getFamilySyncState
} from "./family.retrieve.controller";

const router = Router();

router.post(
  "/sync",
  syncFamilyState
);

router.get(
  "/sync",
  getFamilySyncState
);

export default router;

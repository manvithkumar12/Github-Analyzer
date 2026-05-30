export const ProfileRoute = {};
import { Router } from "express";
import { analyzeProfile } from "../controllers/profileController";

const router = Router();

router.get("/:username", analyzeProfile);

export default router;

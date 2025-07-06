import express from "express";
import { getTeamNames } from "../controllers/ai.controller.js";

const router = express.Router();
router.post("/generate", getTeamNames);
export default router;

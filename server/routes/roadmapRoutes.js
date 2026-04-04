import express from "express";
import { getRoadmap } from "../controllers/roadmapController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { trackActivity } from "../middleware/activityMiddleware.js";

const router = express.Router();

router.post("/", authenticate, trackActivity('roadmap_generate', 'Generated career roadmap'), getRoadmap);

export default router;

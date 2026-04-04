import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { trackActivity } from "../middleware/activityMiddleware.js";

const router = express.Router();

import {
  analyzeResume,
  matchJob,
  calculateATSScore,
  getRoadmap,
  saveRoadmapProgress,
  getRoadmapProgress,
  generateResume,
  generateResumeText,
  generateResumeHTML,
  generateResumePDF
} from "../controllers/analysisController.js";

// Resume analysis endpoint
router.post("/analyze", authenticate, trackActivity('resume_analyze', 'Analyzed resume'), analyzeResume);

// Job matching endpoint
router.post("/match", authenticate, trackActivity('job_match', 'Performed job matching'), matchJob);

// ATS score calculation endpoint
router.post("/ats-score", calculateATSScore);

// Career roadmap endpoint
router.get("/roadmap", getRoadmap);

// Save roadmap progress for authenticated user
router.post("/roadmap-progress", authenticate, saveRoadmapProgress);
router.get("/roadmap-progress", authenticate, getRoadmapProgress);

// Resume generation endpoints
router.post("/generate-resume", generateResume);
router.post("/generate-resume-text", generateResumeText);
router.post("/generate-resume-html", generateResumeHTML);
router.post("/generate-resume-pdf", generateResumePDF);

export default router;
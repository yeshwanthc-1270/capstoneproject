import express from "express";

const router = express.Router();

import {
  analyzeResume,
  matchJob,
  calculateATSScore,
  getRoadmap,
  generateResume,
  generateResumeText,
  generateResumeHTML,
  generateResumePDF
} from "../controllers/analysisController.js";

// Resume analysis endpoint
router.post("/analyze", analyzeResume);

// Job matching endpoint
router.post("/match", matchJob);

// ATS score calculation endpoint
router.post("/ats-score", calculateATSScore);

// Career roadmap endpoint
router.get("/roadmap", getRoadmap);

// Resume generation endpoints
router.post("/generate-resume", generateResume);

router.post("/generate-resume-text", generateResumeText);

router.post("/generate-resume-html", generateResumeHTML);

router.post("/generate-resume-pdf", generateResumePDF);

export default router;
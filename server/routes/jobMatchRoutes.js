import express from "express";
import multer from "multer";
import { matchJobController } from "../controllers/jobMatchController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer for file upload
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  }
});

// Job matching route with file upload
router.post("/match", authenticate, upload.single("resume"), matchJobController);

export default router;
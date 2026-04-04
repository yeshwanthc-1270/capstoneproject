import express from "express";
import {
  getUserActivities,
  getUserProfile,
  updateUserProfile,
  addJobApplication,
  addSkill,
  addLearningItem,
  addObjective,
  addReminder,
  addContact,
  getDashboardStats,
  saveRoadmap,
  updateRoadmap,
  deleteRoadmap
} from "../controllers/userController.js";
import { trackActivity } from "../middleware/activityMiddleware.js";

const router = express.Router();

// Get user activities
router.get("/activities", getUserActivities);

// Get user profile
router.get("/profile", getUserProfile);

// Update user profile
router.put("/profile", trackActivity('profile_update', 'Updated user profile'), updateUserProfile);

// Dashboard statistics
router.get("/dashboard-stats", getDashboardStats);

// Add job application
router.post("/job-application", trackActivity('job_application_add', 'Added job application'), addJobApplication);

// Add skill
router.post("/skill", trackActivity('skill_add', 'Added new skill'), addSkill);

// Add learning item
router.post("/learning", trackActivity('learning_add', 'Added learning item'), addLearningItem);

// Add objective
router.post("/objective", trackActivity('objective_add', 'Added new objective'), addObjective);

// Add reminder
router.post("/reminder", trackActivity('reminder_add', 'Added reminder'), addReminder);

// Add contact
router.post("/contact", trackActivity('contact_add', 'Added network contact'), addContact);

// Roadmap management
router.post("/roadmap", trackActivity('roadmap_save', 'Saved career roadmap'), saveRoadmap);
router.put("/roadmap", trackActivity('roadmap_edit', 'Updated career roadmap'), updateRoadmap);
router.delete("/roadmap", trackActivity('roadmap_delete', 'Deleted career roadmap'), deleteRoadmap);

export default router;
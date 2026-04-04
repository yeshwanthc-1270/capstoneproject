import express from "express";
import RoadmapProgress from "../models/RoadmapProgress.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { trackActivity } from "../middleware/activityMiddleware.js";

const router = express.Router();

// Save roadmap
router.post("/save-roadmap", authenticate, trackActivity('roadmap_save', 'Saved a new career roadmap'), async (req, res) => {
  try {
    const { roadmap } = req.body;

    if (!roadmap || !roadmap.role) {
      return res.status(400).json({
        error: "Roadmap data with role is required"
      });
    }

    const newRoadmap = await RoadmapProgress.create({
      userId: req.user.id,
      jobTitle: roadmap.role,

      skills: (roadmap.phases || []).flatMap(phase =>
        (phase.skills || []).map(skill => ({ name: skill, completed: false }))
      ),
      courses: (roadmap.phases || []).flatMap(phase =>
        (phase.resources?.freeCourses || []).map(course => ({
          name: course.title,
          completed: false
        }))
      ),
      projects: (roadmap.phases || []).flatMap(phase =>
        (phase.tasks || []).filter(task => task.toLowerCase().includes('project') || task.toLowerCase().includes('build'))
          .map(task => ({ name: task, completed: false }))
      )
    });

    res.json({
      success: true,
      roadmap: newRoadmap
    });
  } catch (error) {
    console.error("Save roadmap error:", error);
    res.status(500).json({
      error: "Failed to save roadmap"
    });
  }
});

// Get user roadmaps
router.get("/user-roadmaps", authenticate, async (req, res) => {
  try {
    const data = await RoadmapProgress.find({
      userId: req.user.id
    });

    res.json({
      success: true,
      roadmaps: data
    });
  } catch (error) {
    console.error("Get roadmaps error:", error);
    res.status(500).json({
      error: "Failed to load roadmaps"
    });
  }
});

// Update entire roadmap (for editing)
router.put("/update-roadmap/:id", authenticate, trackActivity('roadmap_edit', 'Edited a career roadmap'), async (req, res) => {
  try {
    const { jobTitle, skills, courses, projects } = req.body;

    const updated = await RoadmapProgress.findByIdAndUpdate(
      req.params.id,
      {
        jobTitle,
        skills,
        courses,
        projects,
        status: checkCompletion({ skills, courses, projects }) ? "completed" : "in-progress"
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Roadmap not found"
      });
    }

    res.json({
      success: true,
      roadmap: updated
    });
  } catch (error) {
    console.error("Update roadmap error:", error);
    res.status(500).json({
      error: "Failed to update roadmap"
    });
  }
});

// Delete roadmap
router.delete("/delete-roadmap/:id", authenticate, trackActivity('roadmap_delete', 'Deleted a career roadmap'), async (req, res) => {
  try {
    const deleted = await RoadmapProgress.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Roadmap not found"
      });
    }

    res.json({
      success: true,
      message: "Roadmap deleted successfully"
    });
  } catch (error) {
    console.error("Delete roadmap error:", error);
    res.status(500).json({
      error: "Failed to delete roadmap"
    });
  }
});

const checkCompletion = (roadmap) => {
  const allDone = (roadmap.skills || []).every(s => s.completed) &&
                  (roadmap.courses || []).every(c => c.completed) &&
                  (roadmap.projects || []).every(p => p.completed);

  return allDone;
};

export default router;
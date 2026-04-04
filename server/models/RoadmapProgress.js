import mongoose from "mongoose";

const roadmapProgressSchema = new mongoose.Schema({
  userId: String,
  jobTitle: String,

  skills: [
    {
      name: String,
      completed: { type: Boolean, default: false }
    }
  ],

  courses: [
    {
      name: String,
      completed: { type: Boolean, default: false }
    }
  ],

  projects: [
    {
      name: String,
      completed: { type: Boolean, default: false }
    }
  ],

  status: {
    type: String,
    default: "in-progress" // or "completed"
  }
});

export default mongoose.model("RoadmapProgress", roadmapProgressSchema);
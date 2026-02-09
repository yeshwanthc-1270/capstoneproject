import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: String,
  skills: [String],
  education: String,
  experience: String
});

export default mongoose.model("Resume", resumeSchema);

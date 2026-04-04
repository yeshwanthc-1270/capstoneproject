import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import jdRoutes from "./routes/jdRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import roadmapProgressRoutes from "./routes/roadmapProgressRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobMatchRoutes from "./routes/jobMatchRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analyze", jdRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/roadmap-progress", roadmapProgressRoutes);
app.use("/api/user", userRoutes);
app.use("/api/job-match", jobMatchRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("⚠️  Continue without database - data won't persist");
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

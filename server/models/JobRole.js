import mongoose from 'mongoose';

const jobRoleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: [String],
    requiredExperience: {
      type: Number,
      default: 0,
    },
    matchPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    missingSkills: [String],
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roadmap',
      default: null,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const JobRole = mongoose.model('JobRole', jobRoleSchema);
export default JobRole;

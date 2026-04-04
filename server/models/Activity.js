import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login',
      'logout',
      'resume_upload',
      'resume_analyze',
      'job_match',
      'roadmap_generate',
      'roadmap_save',
      'roadmap_edit',
      'roadmap_delete',
      'profile_update'
    ]
  },
  description: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
activitySchema.index({ userId: 1, timestamp: -1 });

export default mongoose.model("Activity", activitySchema);
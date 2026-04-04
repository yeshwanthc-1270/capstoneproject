import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  // Enhanced Profile Information
  profile: {
    bio: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    website: { type: String, default: "" },
    avatar: { type: String, default: "" },

    // Professional Details
    currentRole: { type: String, default: "" },
    company: { type: String, default: "" },
    experience: { type: String, default: "" },
    industry: { type: String, default: "" },

    // Preferences
    workType: {
      type: String,
      enum: ['remote', 'hybrid', 'onsite', 'flexible'],
      default: 'flexible'
    },
    salaryRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' }
    },
    jobTypes: [{ type: String }], // e.g., ['full-time', 'contract', 'freelance']
    locations: [{ type: String }], // preferred work locations
  },

  // Career Goals & Objectives
  careerGoals: {
    shortTerm: [{ type: String }],
    longTerm: [{ type: String }],
    targetRole: { type: String, default: "" },
    targetCompany: { type: String, default: "" },
    timeline: { type: String, default: "" }
  },

  // Skills & Expertise
  skills: [{
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner'
    },
    yearsOfExperience: { type: Number, default: 0 },
    lastUsed: { type: Date, default: Date.now },
    certifications: [{ type: String }]
  }],

  // Learning & Development
  learning: {
    enrolledCourses: [{
      title: { type: String, required: true },
      platform: { type: String, required: true },
      url: { type: String },
      progress: { type: Number, default: 0 },
      deadline: { type: Date },
      enrolledDate: { type: Date, default: Date.now }
    }],
    completedCourses: [{
      title: { type: String, required: true },
      platform: { type: String, required: true },
      completionDate: { type: Date, default: Date.now },
      certificate: { type: String }
    }],
    readingList: [{
      title: { type: String, required: true },
      author: { type: String },
      type: { type: String, enum: ['book', 'article', 'blog', 'documentation'] },
      url: { type: String },
      status: {
        type: String,
        enum: ['want-to-read', 'reading', 'completed'],
        default: 'want-to-read'
      },
      addedDate: { type: Date, default: Date.now }
    }],
    conferences: [{
      name: { type: String, required: true },
      date: { type: Date },
      location: { type: String },
      status: {
        type: String,
        enum: ['attended', 'registered', 'interested'],
        default: 'interested'
      }
    }]
  },

  // Job Applications & Career Tracking
  jobTracking: {
    applications: [{
      company: { type: String, required: true },
      position: { type: String, required: true },
      status: {
        type: String,
        enum: ['applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn'],
        default: 'applied'
      },
      appliedDate: { type: Date, default: Date.now },
      lastUpdate: { type: Date, default: Date.now },
      notes: { type: String },
      contact: {
        name: { type: String },
        email: { type: String },
        phone: { type: String }
      },
      salary: {
        offered: { type: Number },
        currency: { type: String, default: 'USD' }
      }
    }],
    interviews: [{
      company: { type: String, required: true },
      position: { type: String, required: true },
      date: { type: Date, required: true },
      type: {
        type: String,
        enum: ['phone', 'video', 'onsite', 'technical', 'behavioral', 'final'],
        default: 'phone'
      },
      status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
        default: 'scheduled'
      },
      notes: { type: String },
      feedback: { type: String }
    }],
    offers: [{
      company: { type: String, required: true },
      position: { type: String, required: true },
      salary: {
        base: { type: Number },
        bonus: { type: Number },
        equity: { type: String },
        currency: { type: String, default: 'USD' }
      },
      benefits: [{ type: String }],
      status: {
        type: String,
        enum: ['received', 'accepted', 'declined', 'negotiating'],
        default: 'received'
      },
      receivedDate: { type: Date, default: Date.now },
      decisionDate: { type: Date }
    }]
  },

  // Network & Connections
  network: {
    contacts: [{
      name: { type: String, required: true },
      company: { type: String },
      position: { type: String },
      email: { type: String },
      phone: { type: String },
      linkedin: { type: String },
      relationship: {
        type: String,
        enum: ['mentor', 'mentee', 'colleague', 'recruiter', 'friend', 'acquaintance'],
        default: 'acquaintance'
      },
      lastContact: { type: Date },
      notes: { type: String },
      tags: [{ type: String }]
    }],
    networkingEvents: [{
      name: { type: String, required: true },
      date: { type: Date },
      location: { type: String },
      type: { type: String, enum: ['conference', 'meetup', 'webinar', 'workshop'] },
      status: {
        type: String,
        enum: ['attended', 'registered', 'interested'],
        default: 'interested'
      },
      contactsMade: [{ type: String }],
      notes: { type: String }
    }]
  },

  // Documents & Portfolio
  documents: {
    resumes: [{
      version: { type: String, required: true },
      fileUrl: { type: String },
      createdDate: { type: Date, default: Date.now },
      isActive: { type: Boolean, default: false }
    }],
    coverLetters: [{
      title: { type: String, required: true },
      content: { type: String },
      template: { type: String },
      createdDate: { type: Date, default: Date.now },
      tags: [{ type: String }]
    }],
    portfolio: [{
      title: { type: String, required: true },
      description: { type: String },
      url: { type: String },
      type: {
        type: String,
        enum: ['project', 'article', 'video', 'presentation', 'code'],
        default: 'project'
      },
      technologies: [{ type: String }],
      date: { type: Date, default: Date.now }
    }]
  },

  // Goals & Objectives
  objectives: {
    monthly: [{
      title: { type: String, required: true },
      description: { type: String },
      targetDate: { type: Date },
      status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed', 'cancelled'],
        default: 'not-started'
      },
      progress: { type: Number, default: 0 },
      createdDate: { type: Date, default: Date.now }
    }],
    quarterly: [{
      title: { type: String, required: true },
      description: { type: String },
      quarter: { type: String }, // e.g., "Q1-2024"
      status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed', 'cancelled'],
        default: 'not-started'
      },
      progress: { type: Number, default: 0 },
      createdDate: { type: Date, default: Date.now }
    }],
    yearly: [{
      title: { type: String, required: true },
      description: { type: String },
      year: { type: Number },
      status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed', 'cancelled'],
        default: 'not-started'
      },
      progress: { type: Number, default: 0 },
      createdDate: { type: Date, default: Date.now }
    }]
  },

  // Reminders & Notifications
  reminders: [{
    title: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ['follow-up', 'deadline', 'interview', 'application', 'goal-check', 'networking'],
      default: 'follow-up'
    },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active'
    },
    relatedTo: {
      type: { type: String }, // e.g., 'application', 'interview', 'goal'
      id: { type: String }
    },
    createdDate: { type: Date, default: Date.now }
  }],

  // Analytics & Insights
  analytics: {
    totalApplications: { type: Number, default: 0 },
    totalInterviews: { type: Number, default: 0 },
    totalOffers: { type: Number, default: 0 },
    averageResponseTime: { type: Number, default: 0 }, // in days
    successRate: { type: Number, default: 0 }, // percentage
    topSkills: [{ type: String }],
    preferredIndustries: [{ type: String }],
    lastActivity: { type: Date, default: Date.now },
    streakDays: { type: Number, default: 0 }
  },

  roadmapProgress: {
    role: { type: String, default: "" },
    phases: [
      {
        phase: String,
        duration: String,
        description: String,
        skills: [String],
        progress: { type: Number, default: 0 },
        tasks: [
          {
            task: String,
            completed: { type: Boolean, default: false }
          }
        ],
        resources: {
          freeCourses: [
            {
              title: String,
              url: String
            }
          ],
          youtube: [
            {
              title: String,
              url: String
            }
          ]
        }
      }
    ],
    updatedAt: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Indexes for better performance
userSchema.index({ 'profile.location': 1 });
userSchema.index({ 'skills.name': 1 });
userSchema.index({ 'jobTracking.applications.status': 1 });
userSchema.index({ 'reminders.dueDate': 1 });
userSchema.index({ 'objectives.monthly.status': 1 });

export default mongoose.model("User", userSchema);

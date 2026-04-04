import Activity from "../models/Activity.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getUserActivities = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const activities = await Activity.find({ userId })
      .sort({ timestamp: -1 })
      .limit(50)
      .select('action description timestamp metadata');

    res.json({ activities });
  } catch (error) {
    console.error('Get user activities error:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      profile: {
        _id: user._id,
        name: user.name,
        email: user.email,
        joinDate: user.createdAt,
        lastActivity: user.analytics?.lastActivity || user.updatedAt,
        ...user.profile,
        careerGoals: user.careerGoals,
        skills: user.skills,
        learning: user.learning,
        jobTracking: user.jobTracking,
        network: user.network,
        documents: user.documents,
        objectives: user.objectives,
        reminders: user.reminders,
        analytics: user.analytics,
        roadmapProgress: user.roadmapProgress
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const updateData = req.body;

    // Update analytics last activity
    updateData.analytics = {
      ...updateData.analytics,
      lastActivity: new Date()
    };

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      profile: {
        _id: user._id,
        name: user.name,
        email: user.email,
        joinDate: user.createdAt,
        lastActivity: user.analytics?.lastActivity || user.updatedAt,
        ...user.profile,
        careerGoals: user.careerGoals,
        skills: user.skills,
        learning: user.learning,
        jobTracking: user.jobTracking,
        network: user.network,
        documents: user.documents,
        objectives: user.objectives,
        reminders: user.reminders,
        analytics: user.analytics,
        roadmapProgress: user.roadmapProgress
      }
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Add specific endpoints for different sections
export const addJobApplication = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const application = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { 'jobTracking.applications': application },
        $inc: { 'analytics.totalApplications': 1 },
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, application: user.jobTracking.applications.slice(-1)[0] });
  } catch (error) {
    console.error('Add job application error:', error);
    res.status(500).json({ error: 'Failed to add job application' });
  }
};

export const addSkill = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const skill = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { skills: skill },
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, skill: user.skills.slice(-1)[0] });
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ error: 'Failed to add skill' });
  }
};

export const addLearningItem = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { type, item } = req.body;

    let updateField;
    if (type === 'course') updateField = 'learning.enrolledCourses';
    else if (type === 'book') updateField = 'learning.readingList';
    else if (type === 'conference') updateField = 'learning.conferences';
    else return res.status(400).json({ error: 'Invalid type' });

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { [updateField]: item },
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, item: user.learning[updateField.split('.')[1]].slice(-1)[0] });
  } catch (error) {
    console.error('Add learning item error:', error);
    res.status(500).json({ error: 'Failed to add learning item' });
  }
};

export const addObjective = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { type, objective } = req.body;

    let updateField;
    if (type === 'monthly') updateField = 'objectives.monthly';
    else if (type === 'quarterly') updateField = 'objectives.quarterly';
    else if (type === 'yearly') updateField = 'objectives.yearly';
    else return res.status(400).json({ error: 'Invalid type' });

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { [updateField]: objective },
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, objective: user.objectives[updateField.split('.')[1]].slice(-1)[0] });
  } catch (error) {
    console.error('Add objective error:', error);
    res.status(500).json({ error: 'Failed to add objective' });
  }
};

export const addReminder = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const reminder = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { reminders: reminder },
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, reminder: user.reminders.slice(-1)[0] });
  } catch (error) {
    console.error('Add reminder error:', error);
    res.status(500).json({ error: 'Failed to add reminder' });
  }
};

export const addContact = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const contact = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { 'network.contacts': contact },
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, contact: user.network.contacts.slice(-1)[0] });
  } catch (error) {
    console.error('Add contact error:', error);
    res.status(500).json({ error: 'Failed to add contact' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);

    // Calculate dashboard statistics
    const stats = {
      totalApplications: user.jobTracking?.applications?.length || 0,
      activeApplications: user.jobTracking?.applications?.filter(app =>
        ['applied', 'screening', 'interview'].includes(app.status)
      ).length || 0,
      upcomingInterviews: user.jobTracking?.interviews?.filter(interview =>
        interview.status === 'scheduled' && new Date(interview.date) > new Date()
      ).length || 0,
      pendingOffers: user.jobTracking?.offers?.filter(offer =>
        offer.status === 'received' || offer.status === 'negotiating'
      ).length || 0,
      activeObjectives: (user.objectives?.monthly?.filter(obj => obj.status === 'in-progress').length || 0) +
                       (user.objectives?.quarterly?.filter(obj => obj.status === 'in-progress').length || 0) +
                       (user.objectives?.yearly?.filter(obj => obj.status === 'in-progress').length || 0),
      upcomingReminders: user.reminders?.filter(reminder =>
        reminder.status === 'active' && new Date(reminder.dueDate) > new Date()
      ).length || 0,
      enrolledCourses: user.learning?.enrolledCourses?.length || 0,
      networkContacts: user.network?.contacts?.length || 0,
      skillsCount: user.skills?.length || 0,
      completedObjectives: (user.objectives?.monthly?.filter(obj => obj.status === 'completed').length || 0) +
                          (user.objectives?.quarterly?.filter(obj => obj.status === 'completed').length || 0) +
                          (user.objectives?.yearly?.filter(obj => obj.status === 'completed').length || 0)
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

// Roadmap management functions
export const saveRoadmap = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { role, phases } = req.body;

    if (!role || !phases) {
      return res.status(400).json({ error: 'Role and phases are required' });
    }

    const roadmapData = {
      role,
      phases,
      updatedAt: new Date()
    };

    const user = await User.findByIdAndUpdate(
      userId,
      {
        roadmapProgress: roadmapData,
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, roadmap: user.roadmapProgress });
  } catch (error) {
    console.error('Save roadmap error:', error);
    res.status(500).json({ error: 'Failed to save roadmap' });
  }
};

export const updateRoadmap = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { role, phases } = req.body;

    if (!role || !phases) {
      return res.status(400).json({ error: 'Role and phases are required' });
    }

    const roadmapData = {
      role,
      phases,
      updatedAt: new Date()
    };

    const user = await User.findByIdAndUpdate(
      userId,
      {
        roadmapProgress: roadmapData,
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, roadmap: user.roadmapProgress });
  } catch (error) {
    console.error('Update roadmap error:', error);
    res.status(500).json({ error: 'Failed to update roadmap' });
  }
};

export const deleteRoadmap = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $unset: { roadmapProgress: 1 },
        'analytics.lastActivity': new Date()
      },
      { new: true }
    );

    res.json({ success: true, message: 'Roadmap deleted successfully' });
  } catch (error) {
    console.error('Delete roadmap error:', error);
    res.status(500).json({ error: 'Failed to delete roadmap' });
  }
};
import JobRole from '../models/JobRole.js';

export const generateRoadmap = async (req, res) => {
  try {
    const { jobId } = req.body;

    const jobMatch = await JobRole.findById(jobId);

    if (!jobMatch) {
      return res.status(404).json({ message: 'Job match not found' });
    }

    // Generate roadmap based on missing skills
    const roadmap = {
      jobId: jobMatch._id,
      jobTitle: jobMatch.jobTitle,
      targetSkills: jobMatch.missingSkills,
      milestones: generateMilestones(jobMatch.missingSkills),
      estimatedDuration: calculateDuration(jobMatch.missingSkills),
      currentProgress: 0,
    };

    res.status(200).json({
      success: true,
      message: 'Roadmap generated successfully',
      roadmap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const generateMilestones = (skills) => {
  const milestones = [];
  const skillsPerPhase = Math.ceil(skills.length / 3);

  for (let i = 0; i < skills.length; i += skillsPerPhase) {
    const phase = Math.floor(i / skillsPerPhase) + 1;
    const phaseName = ['Foundation', 'Intermediate', 'Advanced'][phase - 1];
    
    milestones.push({
      phase,
      name: `${phaseName} Phase`,
      skills: skills.slice(i, i + skillsPerPhase),
      duration: `${2 + phase} weeks`,
      resources: [
        `Online courses for ${skills.slice(i, i + skillsPerPhase).join(', ')}`,
        'Practice projects',
        'Hands-on assignments',
      ],
    });
  }

  return milestones;
};

const calculateDuration = (skills) => {
  const weeksPerSkill = 2;
  const totalWeeks = skills.length * weeksPerSkill;
  return `${totalWeeks} weeks`;
};

export const getRoadmap = async (req, res) => {
  try {
    const { jobId } = req.params;

    const jobMatch = await JobRole.findById(jobId);

    if (!jobMatch) {
      return res.status(404).json({ message: 'Job match not found' });
    }

    const roadmap = {
      jobId: jobMatch._id,
      jobTitle: jobMatch.jobTitle,
      targetSkills: jobMatch.missingSkills,
      milestones: generateMilestones(jobMatch.missingSkills),
      estimatedDuration: calculateDuration(jobMatch.missingSkills),
    };

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRoadmapProgress = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { progress } = req.body;

    const jobMatch = await JobRole.findByIdAndUpdate(
      jobId,
      { roadmapProgress: progress },
      { new: true }
    );

    if (!jobMatch) {
      return res.status(404).json({ message: 'Job match not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Roadmap progress updated successfully',
      jobMatch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

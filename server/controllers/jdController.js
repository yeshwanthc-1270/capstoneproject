import JobRole from '../models/JobRole.js';
import Resume from '../models/Resume.js';

function calculateMatchPercentage(userSkills, requiredSkills) {
  if (requiredSkills.length === 0) return 100;

  const matchedSkills = userSkills.filter(skill =>
    requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()))
  );

  return Math.round((matchedSkills.length / requiredSkills.length) * 100);
}

export const createJobMatch = async (req, res) => {
  try {
    const { jobTitle, company, description, requiredSkills, requiredExperience } = req.body;

    // Get user's resume to calculate match
    const resume = await Resume.findOne({ userId: req.user.id });
    
    let matchPercentage = 0;
    let missingSkills = requiredSkills;

    if (resume && resume.extractedData?.skills) {
      matchPercentage = calculateMatchPercentage(
        resume.extractedData.skills,
        requiredSkills
      );
      
      missingSkills = requiredSkills.filter(
        skill => !resume.extractedData.skills.some(
          userSkill => userSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }

    const jobRole = await JobRole.create({
      userId: req.user.id,
      jobTitle,
      company,
      description,
      requiredSkills,
      requiredExperience,
      matchPercentage,
      missingSkills,
    });

    res.status(201).json({
      success: true,
      message: 'Job match created successfully',
      jobRole,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserJobMatches = async (req, res) => {
  try {
    const jobMatches = await JobRole.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      count: jobMatches.length,
      jobMatches,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobMatch = async (req, res) => {
  try {
    const jobMatch = await JobRole.findById(req.params.id);

    if (!jobMatch) {
      return res.status(404).json({ message: 'Job match not found' });
    }

    res.status(200).json({
      success: true,
      jobMatch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateJobMatch = async (req, res) => {
  try {
    const jobMatch = await JobRole.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!jobMatch) {
      return res.status(404).json({ message: 'Job match not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Job match updated successfully',
      jobMatch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteJobMatch = async (req, res) => {
  try {
    const jobMatch = await JobRole.findByIdAndDelete(req.params.id);

    if (!jobMatch) {
      return res.status(404).json({ message: 'Job match not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Job match deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

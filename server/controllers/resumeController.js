import Resume from '../models/Resume.js';
import User from '../models/User.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      filename: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
    });

    // Update user with resume reference
    await User.findByIdAndUpdate(req.user.id, { resume: resume._id });

    res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully',
      resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResumeData = async (req, res) => {
  try {
    const { extractedData } = req.body;

    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { extractedData },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Resume data updated successfully',
      resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Remove resume reference from user
    await User.findByIdAndUpdate(req.user.id, { resume: null });

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

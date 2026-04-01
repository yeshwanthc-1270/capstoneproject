import extractSkills from "../utils/skillExtractor.js";
import matchSkills from "../utils/skillMatcher.js";
import calculateATS from "../utils/atsCalculator.js";
import generateRoadmap from "../utils/roadmapGenerator.js";
import { generateResume, generateResumeText, generateResumeHTML } from "../utils/resumeGenerator.js";
import { generateResumePDF } from "../utils/pdfGenerator.js";

// Resume Analyzer
const analyzeResume = (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        error: "Resume text is required"
      });
    }

    const skills = extractSkills(resumeText);
    const atsScore = calculateATS(skills);

    res.json({
      success: true,
      skills,
      atsScore,
      analysis: {
        totalSkills: skills.length,
        skillCategories: categorizeSkills(skills),
        recommendations: generateRecommendations(skills, atsScore)
      }
    });
  } catch (error) {
    console.error("Resume analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze resume"
    });
  }
};

// Job Matching
const matchJob = (req, res) => {
  try {
    const { resumeText, jdText } = req.body;

    if (!resumeText || !jdText) {
      return res.status(400).json({
        error: "Both resume text and job description are required"
      });
    }

    const resumeSkills = extractSkills(resumeText);
    const jdSkills = extractSkills(jdText);

    const result = matchSkills(resumeSkills, jdSkills);

    res.json({
      success: true,
      ...result,
      analysis: {
        resumeSkillsCount: resumeSkills.length,
        jdSkillsCount: jdSkills.length,
        compatibility: getCompatibilityLevel(result.matchScore)
      }
    });
  } catch (error) {
    console.error("Job matching error:", error);
    res.status(500).json({
      error: "Failed to match job"
    });
  }
};

// ATS Score Calculator
const calculateATSScore = (req, res) => {
  try {
    const { resumeText, sections = 5 } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        error: "Resume text is required"
      });
    }

    const skills = extractSkills(resumeText);
    const atsScore = calculateATS(skills, sections);

    res.json({
      success: true,
      atsScore,
      breakdown: {
        skillScore: Math.min(skills.length * 5, 50),
        sectionScore: Math.min(sections * 10, 50),
        keywordBonus: skills.length > 5 ? 10 : 5,
        formatScore: 10
      }
    });
  } catch (error) {
    console.error("ATS calculation error:", error);
    res.status(500).json({
      error: "Failed to calculate ATS score"
    });
  }
};

// Roadmap Generator
const getRoadmap = (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({
        error: "Role is required"
      });
    }

    const roadmap = generateRoadmap(role);

    res.json({
      success: true,
      role: role.toLowerCase(),
      roadmap
    });
  } catch (error) {
    console.error("Roadmap generation error:", error);
    res.status(500).json({
      error: "Failed to generate roadmap"
    });
  }
};

// Resume Generator
const generateResumeEndpoint = (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData || Object.keys(resumeData).length === 0) {
      return res.status(400).json({
        error: "Resume data is required"
      });
    }

    const resume = generateResume(resumeData);

    res.json({
      success: true,
      resume,
      message: "Resume generated successfully"
    });
  } catch (error) {
    console.error("Resume generation error:", error);
    res.status(500).json({
      error: "Failed to generate resume"
    });
  }
};

// Generate Resume as Text
const generateResumeTextEndpoint = (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData) {
      return res.status(400).json({
        error: "Resume data is required"
      });
    }

    const resumeText = generateResumeText(resumeData);

    res.json({
      success: true,
      resumeText,
      contentType: "text/plain"
    });
  } catch (error) {
    console.error("Resume text generation error:", error);
    res.status(500).json({
      error: "Failed to generate resume text"
    });
  }
};

// Generate Resume as HTML
const generateResumeHTMLEndpoint = (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData) {
      return res.status(400).json({
        error: "Resume data is required"
      });
    }

    const resumeHTML = generateResumeHTML(resumeData);

    res.json({
      success: true,
      resumeHTML,
      contentType: "text/html"
    });
  } catch (error) {
    console.error("Resume HTML generation error:", error);
    res.status(500).json({
      error: "Failed to generate resume HTML"
    });
  }
};

// Generate Resume as PDF
const generateResumePDFEndpoint = async (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData) {
      return res.status(400).json({
        error: "Resume data is required"
      });
    }

    const pdfBuffer = await generateResumePDF(resumeData);

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resumeData.name || 'resume'}.pdf"`);

    // Send PDF buffer
    res.send(pdfBuffer);

  } catch (error) {
    console.error("Resume PDF generation error:", error);
    res.status(500).json({
      error: "Failed to generate resume PDF"
    });
  }
};

// Helper functions
function categorizeSkills(skills) {
  const categories = {
    frontend: ["react", "vue", "angular", "html", "css", "javascript", "typescript"],
    backend: ["node", "express", "python", "java", "php", "django", "flask", "spring"],
    database: ["mongodb", "mysql", "postgresql", "firebase"],
    devops: ["docker", "aws", "kubernetes", "jenkins", "terraform"],
    tools: ["git", "linux", "ubuntu", "windows"]
  };

  const result = {};
  for (const [category, categorySkills] of Object.entries(categories)) {
    const matched = skills.filter(skill =>
      categorySkills.includes(skill.toLowerCase())
    );
    if (matched.length > 0) {
      result[category] = matched;
    }
  }

  return result;
}

function generateRecommendations(skills, atsScore) {
  const recommendations = [];

  if (skills.length < 5) {
    recommendations.push("Add more technical skills to improve ATS compatibility");
  }

  if (atsScore < 70) {
    recommendations.push("Consider adding industry-standard keywords");
    recommendations.push("Ensure resume has clear sections (contact, summary, experience, education, skills)");
  }

  if (!skills.some(skill => skill.toLowerCase().includes('javascript') || skill.toLowerCase().includes('python'))) {
    recommendations.push("Consider learning a programming language like JavaScript or Python");
  }

  return recommendations;
}

function getCompatibilityLevel(matchScore) {
  if (matchScore >= 80) return "Excellent Match";
  if (matchScore >= 60) return "Good Match";
  if (matchScore >= 40) return "Fair Match";
  return "Poor Match";
}

export {
  analyzeResume,
  matchJob,
  calculateATSScore,
  getRoadmap,
  generateResumeEndpoint as generateResume,
  generateResumeTextEndpoint as generateResumeText,
  generateResumeHTMLEndpoint as generateResumeHTML,
  generateResumePDFEndpoint as generateResumePDF
};

import extractResumeText from "../utils/resumeParser.js";
import extractKeywords from "../utils/keywordExtractor.js";
import generateKeywordsFromTitle from "../utils/jobTitleKeywords.js";
import matchJob from "../utils/jobMatcher.js";
import shortlist from "../utils/shortlist.js";
import improveResume from "../utils/resumeImprover.js";

const matchJobController = async (req, res) => {
  try {
    const { jobDescription, jobTitle } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    if (!jobDescription && !jobTitle) {
      return res.status(400).json({ error: "Either job description or job title is required" });
    }

    // Extract text from resume
    const resumeText = await extractResumeText(resumeFile);
    const resumeKeywords = extractKeywords(resumeText);

    // Get job keywords
    let jobKeywords;
    if (jobDescription) {
      jobKeywords = extractKeywords(jobDescription);
    } else {
      jobKeywords = generateKeywordsFromTitle(jobTitle);
    }

    // Match job
    const matchResult = matchJob(resumeKeywords, jobKeywords);

    // Get shortlisting probability
    const shortlistProbability = shortlist(matchResult.score);

    // Get improvement suggestions
    const improvements = improveResume(matchResult.missing);

    // Log activity
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      // You can add activity logging here if needed
    }

    res.json({
      success: true,
      match: {
        score: matchResult.score,
        shortlistProbability,
        matchedSkills: matchResult.matched,
        missingSkills: matchResult.missing,
        improvements
      }
    });

  } catch (error) {
    console.error("Job matching error:", error);
    res.status(500).json({ error: "Failed to analyze job match" });
  }
};

export { matchJobController };
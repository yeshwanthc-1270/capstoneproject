function calculateATS(resumeSkills, totalSections = 5) {
  if (!resumeSkills || resumeSkills.length === 0) {
    return 0;
  }

  // Skill score: each skill gives 5 points, max 50
  const skillScore = Math.min(resumeSkills.length * 5, 50);

  // Section score: assume 5 main sections (contact, summary, experience, education, skills)
  // Each section present gives 10 points, max 50
  const sectionScore = Math.min(totalSections * 10, 50);

  // Additional factors
  const keywordOptimization = resumeSkills.length > 5 ? 10 : 5; // Bonus for diverse skills
  const formatScore = 10; // Assume good formatting

  const totalScore = skillScore + sectionScore + keywordOptimization + formatScore;

  return Math.min(Math.round(totalScore), 100);
}

export default calculateATS;
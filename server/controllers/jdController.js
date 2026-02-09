export const analyzeJD = (req, res) => {
  const { resumeSkills, jdSkills } = req.body;

  const matchedSkills = resumeSkills.filter(skill =>
    jdSkills.includes(skill)
  );

  const score = Math.round(
    (matchedSkills.length / jdSkills.length) * 100
  );

  const missingSkills = jdSkills.filter(
    skill => !resumeSkills.includes(skill)
  );

  res.json({
    score,
    matchedSkills,
    missingSkills
  });
};

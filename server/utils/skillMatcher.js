function matchSkills(resumeSkills, jdSkills) {
  if (!resumeSkills || !jdSkills || jdSkills.length === 0) {
    return {
      matchScore: 0,
      matchedSkills: [],
      missingSkills: jdSkills || []
    };
  }

  const matched = resumeSkills.filter(skill =>
    jdSkills.some(jdSkill =>
      jdSkill.toLowerCase() === skill.toLowerCase()
    )
  );

  const score = (matched.length / jdSkills.length) * 100;

  const missingSkills = jdSkills.filter(jdSkill =>
    !resumeSkills.some(resumeSkill =>
      resumeSkill.toLowerCase() === jdSkill.toLowerCase()
    )
  );

  return {
    matchScore: Math.round(score),
    matchedSkills: matched,
    missingSkills: missingSkills
  };
}

export default matchSkills;
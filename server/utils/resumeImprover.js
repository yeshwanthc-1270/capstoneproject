function improveResume(missingKeywords) {
  return missingKeywords.map(skill => {
    return `Add "${skill}" in your resume (skills/projects/experience section)`;
  });
}

export default improveResume;
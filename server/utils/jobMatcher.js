function matchJob(resumeWords, jdWords) {
  const matched = jdWords.filter(word =>
    resumeWords.includes(word)
  );

  const missing = jdWords.filter(word =>
    !resumeWords.includes(word)
  );

  const score = (matched.length / jdWords.length) * 100;

  return {
    score: Math.round(score),
    matched,
    missing
  };
}

export default matchJob;
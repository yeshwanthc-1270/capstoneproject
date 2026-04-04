function shortlist(score) {
  if (score >= 80) return "Very High";
  if (score >= 65) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}

export default shortlist;
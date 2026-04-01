const skillsDB = [
  "react", "node", "mongodb", "express",
  "javascript", "html", "css", "typescript",
  "python", "java", "docker", "aws", "kubernetes",
  "mysql", "postgresql", "firebase", "git",
  "redux", "vue", "angular", "sass", "bootstrap",
  "tailwind", "jquery", "php", "laravel", "django",
  "flask", "spring", "hibernate", "c++", "c#",
  "dotnet", "asp.net", "rest api", "graphql",
  "linux", "ubuntu", "windows", "macos",
  "machine learning", "data science", "pandas",
  "numpy", "tensorflow", "pytorch", "scikit-learn",
  "cybersecurity", "penetration testing", "ethical hacking",
  "blockchain", "solidity", "web3", "cryptography",
  "devops", "jenkins", "ci/cd", "terraform", "ansible"
];

function extractSkills(text) {
  if (!text) return [];

  const lowerText = text.toLowerCase();

  return skillsDB.filter(skill =>
    lowerText.includes(skill.toLowerCase())
  );
}

export default extractSkills;
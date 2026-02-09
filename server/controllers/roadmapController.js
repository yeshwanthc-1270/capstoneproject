export const getRoadmap = (req, res) => {
  const { role } = req.body;

  const roadmap = {
    "Frontend Developer": [
      "HTML, CSS, JavaScript",
      "React, APIs",
      "Performance Optimization, Testing"
    ],
    "Backend Developer": [
      "Node.js, Express",
      "MongoDB, Authentication",
      "Scalability, Security"
    ]
  };

  res.json({ roadmap: roadmap[role] || [] });
};

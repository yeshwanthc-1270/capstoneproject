const roadmaps = {
  frontend: [
    {
      phase: "Foundation",
      duration: "1-2 months",
      skills: ["HTML", "CSS", "JavaScript"],
      description: "Learn the basics of web development"
    },
    {
      phase: "Frontend Frameworks",
      duration: "2-3 months",
      skills: ["React.js", "Redux", "TypeScript"],
      description: "Master modern frontend frameworks"
    },
    {
      phase: "Advanced Topics",
      duration: "2-3 months",
      skills: ["Next.js", "Testing", "Performance"],
      description: "Advanced frontend concepts and optimization"
    },
    {
      phase: "Projects & Portfolio",
      duration: "1-2 months",
      skills: ["Portfolio Projects", "GitHub", "Deployment"],
      description: "Build projects and create portfolio"
    }
  ],
  backend: [
    {
      phase: "Programming Fundamentals",
      duration: "1-2 months",
      skills: ["Python/JavaScript", "Data Structures", "Algorithms"],
      description: "Strong programming foundation"
    },
    {
      phase: "Backend Development",
      duration: "2-3 months",
      skills: ["Node.js", "Express", "REST APIs"],
      description: "Server-side development basics"
    },
    {
      phase: "Database & Deployment",
      duration: "2-3 months",
      skills: ["MongoDB", "PostgreSQL", "Docker", "AWS"],
      description: "Database management and cloud deployment"
    },
    {
      phase: "Advanced Backend",
      duration: "2-3 months",
      skills: ["Microservices", "GraphQL", "Security"],
      description: "Enterprise-level backend development"
    }
  ],
  fullstack: [
    {
      phase: "Foundation",
      duration: "2-3 months",
      skills: ["HTML", "CSS", "JavaScript", "Python"],
      description: "Web development basics"
    },
    {
      phase: "Frontend Mastery",
      duration: "2-3 months",
      skills: ["React", "Redux", "TypeScript"],
      description: "Modern frontend development"
    },
    {
      phase: "Backend Development",
      duration: "3-4 months",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
      description: "Server-side development"
    },
    {
      phase: "Full Stack Integration",
      duration: "2-3 months",
      skills: ["Deployment", "DevOps", "Testing"],
      description: "Complete full-stack applications"
    }
  ],
  data: [
    {
      phase: "Programming & Math",
      duration: "2-3 months",
      skills: ["Python", "Statistics", "Linear Algebra"],
      description: "Foundation for data science"
    },
    {
      phase: "Data Analysis",
      duration: "2-3 months",
      skills: ["Pandas", "NumPy", "Matplotlib"],
      description: "Data manipulation and visualization"
    },
    {
      phase: "Machine Learning",
      duration: "3-4 months",
      skills: ["Scikit-learn", "TensorFlow", "ML Algorithms"],
      description: "ML model development"
    },
    {
      phase: "Advanced Topics",
      duration: "2-3 months",
      skills: ["Deep Learning", "Big Data", "MLOps"],
      description: "Advanced data science concepts"
    }
  ]
};

function generateRoadmap(role) {
  const normalizedRole = role.toLowerCase();

  // Find matching roadmap
  for (const [key, roadmap] of Object.entries(roadmaps)) {
    if (normalizedRole.includes(key)) {
      return roadmap;
    }
  }

  // Default to fullstack if no match
  return roadmaps.fullstack;
}

export default generateRoadmap;
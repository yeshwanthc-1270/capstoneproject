const roadmaps = {
  frontend: [
    {
      phase: "Foundation",
      duration: "1-2 months",
      skills: ["HTML", "CSS", "JavaScript"],
      description: "Learn the essentials of modern web interfaces.",
      tasks: [
        { task: "Complete HTML layout fundamentals" },
        { task: "Practice responsive CSS layouts" },
        { task: "Build three styled landing pages" }
      ],
      resources: {
        freeCourses: [
          { title: "FreeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
          { title: "MDN HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" }
        ],
        youtube: [
          { title: "Responsive Web Design Crash Course", url: "https://www.youtube.com/watch?v=srvUrASNj0s" },
          { title: "JavaScript DOM Tutorial", url: "https://www.youtube.com/watch?v=0ik6X4DJKCc" }
        ]
      }
    },
    {
      phase: "Frontend Frameworks",
      duration: "2-3 months",
      skills: ["React.js", "Redux", "TypeScript"],
      description: "Master modern frontend frameworks and component-driven UI.",
      tasks: [
        { task: "Finish a React tutorial" },
        { task: "Build a CRUD app with state management" },
        { task: "Add TypeScript typing to a component" }
      ],
      resources: {
        freeCourses: [
          { title: "Scrimba Learn React", url: "https://scrimba.com/learn/learnreact" },
          { title: "Codecademy Learn React", url: "https://www.codecademy.com/learn/react-101" }
        ],
        youtube: [
          { title: "React JS Crash Course 2024", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" },
          { title: "React Hooks Tutorial", url: "https://www.youtube.com/watch?v=6ThXsUwLWvc" }
        ]
      }
    },
    {
      phase: "Advanced Topics",
      duration: "2-3 months",
      skills: ["Next.js", "Testing", "Performance"],
      description: "Learn production-ready frontend optimization techniques.",
      tasks: [
        { task: "Implement SSR or static generation" },
        { task: "Write component tests with Jest" },
        { task: "Measure and improve page performance" }
      ],
      resources: {
        freeCourses: [
          { title: "Vercel Next.js Learn", url: "https://nextjs.org/learn" },
          { title: "Testing React Apps", url: "https://www.pluralsight.com/courses/testing-react-apps" }
        ],
        youtube: [
          { title: "Next.js Full Course", url: "https://www.youtube.com/watch?v=MFuwkrseXVE" },
          { title: "React Performance Optimization", url: "https://www.youtube.com/watch?v=v3Xv0voz3pE" }
        ]
      }
    },
    {
      phase: "Projects & Portfolio",
      duration: "1-2 months",
      skills: ["Portfolio Projects", "GitHub", "Deployment"],
      description: "Build real projects and publish your personal portfolio.",
      tasks: [
        { task: "Create a live portfolio site" },
        { task: "Deploy a fullstack project" },
        { task: "Publish code to GitHub" }
      ],
      resources: {
        freeCourses: [
          { title: "GitHub Pages Guide", url: "https://pages.github.com/" },
          { title: "Netlify Deployment Tutorial", url: "https://www.netlify.com/blog/2020/03/10/a-step-by-step-guide-deploying-your-site/" }
        ],
        youtube: [
          { title: "Deploy React App Tutorial", url: "https://www.youtube.com/watch?v=71wSzpLyW9k" },
          { title: "Portfolio Website Tutorial", url: "https://www.youtube.com/watch?v=G0R4zCs8Q9k" }
        ]
      }
    }
  ],
  backend: [
    {
      phase: "Programming Fundamentals",
      duration: "1-2 months",
      skills: ["JavaScript", "Data Structures", "Algorithms"],
      description: "Build a strong backend foundation with coding fundamentals.",
      tasks: [
        { task: "Learn Node.js basics" },
        { task: "Practice data structure problems" },
        { task: "Build a command-line utility" }
      ],
      resources: {
        freeCourses: [
          { title: "Node.js Tutorial for Beginners", url: "https://www.youtube.com/watch?v=RLtyhwFtXQA" },
          { title: "FreeCodeCamp Algorithms", url: "https://www.freecodecamp.org/learn/coding-interview-prep/" }
        ],
        youtube: [
          { title: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" },
          { title: "Server-side JavaScript Tutorial", url: "https://www.youtube.com/watch?v=TlB_eWDSMt4" }
        ]
      }
    },
    {
      phase: "Backend Development",
      duration: "2-3 months",
      skills: ["Express", "REST APIs", "Authentication"],
      description: "Build secure, scalable backend services and APIs.",
      tasks: [
        { task: "Create REST endpoints with Express" },
        { task: "Add authentication to an API" },
        { task: "Store data in MongoDB" }
      ],
      resources: {
        freeCourses: [
          { title: "MongoDB University Basics", url: "https://university.mongodb.com/" },
          { title: "Express.js Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" }
        ],
        youtube: [
          { title: "REST API Tutorial", url: "https://www.youtube.com/watch?v=fgTGADljAeg" },
          { title: "Express.js Crash Course", url: "https://www.youtube.com/watch?v=L72fhGm1tfE" }
        ]
      }
    },
    {
      phase: "Database & Deployment",
      duration: "2-3 months",
      skills: ["MongoDB", "PostgreSQL", "Docker", "AWS"],
      description: "Learn databases, containers, and deployment workflows.",
      tasks: [
        { task: "Model schemas and relationships" },
        { task: "Containerize an app with Docker" },
        { task: "Deploy to a cloud platform" }
      ],
      resources: {
        freeCourses: [
          { title: "Docker Tutorial for Beginners", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo" },
          { title: "AWS Free Tier Start", url: "https://aws.amazon.com/free/" }
        ],
        youtube: [
          { title: "Deploy Node App to AWS", url: "https://www.youtube.com/watch?v=3a0I8ICR1Vg" },
          { title: "Data Modeling for MongoDB", url: "https://www.youtube.com/watch?v=ExizLxjF8dI" }
        ]
      }
    },
    {
      phase: "Advanced Backend",
      duration: "2-3 months",
      skills: ["Microservices", "GraphQL", "Security"],
      description: "Master enterprise-level backend engineering concepts.",
      tasks: [
        { task: "Design a service-oriented API" },
        { task: "Implement GraphQL endpoints" },
        { task: "Secure your API with best practices" }
      ],
      resources: {
        freeCourses: [
          { title: "GraphQL Full Course", url: "https://www.youtube.com/watch?v=ed8SzALpx1Q" },
          { title: "API Security Guide", url: "https://owasp.org/www-project-api-security/" }
        ],
        youtube: [
          { title: "Microservices Explained", url: "https://www.youtube.com/watch?v=wgdBVIX9ifA" },
          { title: "Node.js Security Tips", url: "https://www.youtube.com/watch?v=ZrRHh8aQfGM" }
        ]
      }
    }
  ],
  fullstack: [
    {
      phase: "Foundation",
      duration: "2-3 months",
      skills: ["HTML", "CSS", "JavaScript", "Python"],
      description: "Start with a strong foundation in both frontend and backend development.",
      tasks: [
        { task: "Learn HTML/CSS fundamentals" },
        { task: "Build a JavaScript web page" },
        { task: "Complete a backend intro tutorial" }
      ],
      resources: {
        freeCourses: [
          { title: "Codecademy Fullstack", url: "https://www.codecademy.com/learn/paths/full-stack-engineer-career-path" },
          { title: "Coursera Full Stack Foundations", url: "https://www.coursera.org/specializations/full-stack-mobile-app-development" }
        ],
        youtube: [
          { title: "Full Stack Developer Roadmap", url: "https://www.youtube.com/watch?v=5vB7--T4KpA" },
          { title: "Build Your First Full Stack App", url: "https://www.youtube.com/watch?v=1wZw7Rv_k7E" }
        ]
      }
    },
    {
      phase: "Frontend Mastery",
      duration: "2-3 months",
      skills: ["React", "Redux", "TypeScript"],
      description: "Become confident building rich user interfaces.",
      tasks: [
        { task: "Build a React dashboard" },
        { task: "Add client-side state management" },
        { task: "Deploy a frontend app" }
      ],
      resources: {
        freeCourses: [
          { title: "React Official Tutorial", url: "https://react.dev/learn" },
          { title: "TypeScript for React", url: "https://www.typescriptlang.org/docs/handbook/react.html" }
        ],
        youtube: [
          { title: "React + TypeScript Tutorial", url: "https://www.youtube.com/watch?v=Z5iWr6Srsj8" },
          { title: "Advanced React Patterns", url: "https://www.youtube.com/watch?v=0riHps91AzE" }
        ]
      }
    },
    {
      phase: "Backend Development",
      duration: "3-4 months",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
      description: "Build the backend services that power web applications.",
      tasks: [
        { task: "Create RESTful APIs" },
        { task: "Connect a database to your application" },
        { task: "Implement authentication and authorization" }
      ],
      resources: {
        freeCourses: [
          { title: "Node.js and Express Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" },
          { title: "MongoDB Basics", url: "https://www.mongodb.com/docs/manual/" }
        ],
        youtube: [
          { title: "Full Stack MERN Tutorial", url: "https://www.youtube.com/watch?v=7CqJlxBYj-M" },
          { title: "Authentication with JWT", url: "https://www.youtube.com/watch?v=7nafaH9SddU" }
        ]
      }
    },
    {
      phase: "Full Stack Integration",
      duration: "2-3 months",
      skills: ["Deployment", "DevOps", "Testing"],
      description: "Launch production-ready applications and strengthen your portfolio.",
      tasks: [
        { task: "Deploy a full stack app" },
        { task: "Add automated testing" },
        { task: "Optimize app performance" }
      ],
      resources: {
        freeCourses: [
          { title: "AWS Free Tier Tutorials", url: "https://aws.amazon.com/getting-started/" },
          { title: "Testing Web Applications", url: "https://www.guru99.com/web-application-testing.html" }
        ],
        youtube: [
          { title: "Deploy React App to Netlify", url: "https://www.youtube.com/watch?v=5WQe4bONB3Y" },
          { title: "CI/CD for Full Stack Apps", url: "https://www.youtube.com/watch?v=7KpR0Rdgd5Y" }
        ]
      }
    }
  ],
  data: [
    {
      phase: "Programming & Math",
      duration: "2-3 months",
      skills: ["Python", "Statistics", "Linear Algebra"],
      description: "Lay the groundwork for data analysis and modeling.",
      tasks: [
        { task: "Learn Python for data science" },
        { task: "Study probability and statistics" },
        { task: "Practice math fundamentals" }
      ],
      resources: {
        freeCourses: [
          { title: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
          { title: "Google Data Analytics Professional Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics" }
        ],
        youtube: [
          { title: "Data Science Full Course", url: "https://www.youtube.com/watch?v=ua-CiDNNj30" },
          { title: "Python for Data Science", url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI" }
        ]
      }
    },
    {
      phase: "Data Analysis",
      duration: "2-3 months",
      skills: ["Pandas", "NumPy", "Matplotlib"],
      description: "Become proficient at cleaning and exploring datasets.",
      tasks: [
        { task: "Complete Pandas tutorials" },
        { task: "Analyze datasets in Python" },
        { task: "Create dashboards and visuals" }
      ],
      resources: {
        freeCourses: [
          { title: "Pandas Tutorial", url: "https://www.datacamp.com/courses/data-manipulation-with-pandas" },
          { title: "Matplotlib Guide", url: "https://matplotlib.org/stable/tutorials/index.html" }
        ],
        youtube: [
          { title: "Data Analysis with Python", url: "https://www.youtube.com/watch?v=vyqeDUL2O6I" },
          { title: "Pandas Crash Course", url: "https://www.youtube.com/watch?v=vmEHCJofslg" }
        ]
      }
    },
    {
      phase: "Machine Learning",
      duration: "3-4 months",
      skills: ["Scikit-learn", "TensorFlow", "ML Algorithms"],
      description: "Build models and understand machine learning workflows.",
      tasks: [
        { task: "Learn supervised and unsupervised learning" },
        { task: "Train models with Scikit-learn" },
        { task: "Deploy a machine learning model" }
      ],
      resources: {
        freeCourses: [
          { title: "Coursera Machine Learning", url: "https://www.coursera.org/learn/machine-learning" },
          { title: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" }
        ],
        youtube: [
          { title: "Machine Learning Full Course", url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI" },
          { title: "TensorFlow for Beginners", url: "https://www.youtube.com/watch?v=tPYj3fFJGjk" }
        ]
      }
    },
    {
      phase: "Advanced Topics",
      duration: "2-3 months",
      skills: ["Deep Learning", "Big Data", "MLOps"],
      description: "Level up with production-oriented data science skills.",
      tasks: [
        { task: "Study neural networks" },
        { task: "Work with large datasets" },
        { task: "Learn deployment and monitoring" }
      ],
      resources: {
        freeCourses: [
          { title: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning" },
          { title: "MLOps Fundamentals", url: "https://www.coursera.org/learn/mlops-fundamentals" }
        ],
        youtube: [
          { title: "Deep Learning Crash Course", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
          { title: "MLOps for Beginners", url: "https://www.youtube.com/watch?v=Q7NfTqmy1kA" }
        ]
      }
    }
  ],
  devops: [
    {
      phase: "Foundations",
      duration: "1-2 months",
      skills: ["Linux", "Git", "Networking"],
      description: "Master the foundation of modern DevOps and infrastructure.",
      tasks: [
        { task: "Learn Linux command line" },
        { task: "Practice Git workflows" },
        { task: "Understand basic networking" }
      ],
      resources: {
        freeCourses: [
          { title: "Linux Command Line Basics", url: "https://linuxjourney.com/" },
          { title: "Git Handbook", url: "https://www.atlassian.com/git/tutorials" }
        ],
        youtube: [
          { title: "DevOps Full Course", url: "https://www.youtube.com/watch?v=0yW7w8F2TVA" },
          { title: "Linux for Beginners", url: "https://www.youtube.com/watch?v=wBp0Rb-ZJak" }
        ]
      }
    },
    {
      phase: "Containers & Automation",
      duration: "2-3 months",
      skills: ["Docker", "Kubernetes", "CI/CD"],
      description: "Automate deployments and run containerized workloads.",
      tasks: [
        { task: "Containerize an application with Docker" },
        { task: "Deploy to Kubernetes" },
        { task: "Set up CI/CD pipelines" }
      ],
      resources: {
        freeCourses: [
          { title: "Docker for Beginners", url: "https://www.docker.com/101-tutorial" },
          { title: "Kubernetes Basics", url: "https://www.kubernetes.io/docs/tutorials/kubernetes-basics/" }
        ],
        youtube: [
          { title: "Docker Crash Course", url: "https://www.youtube.com/watch?v=pg19Z6bCHps" },
          { title: "Kubernetes Full Course", url: "https://www.youtube.com/watch?v=X48VuDVv0do" }
        ]
      }
    },
    {
      phase: "Cloud Platforms",
      duration: "2-3 months",
      skills: ["AWS", "Azure", "Terraform"],
      description: "Learn how to deploy and manage cloud infrastructure.",
      tasks: [
        { task: "Launch services in AWS or Azure" },
        { task: "Write infrastructure as code" },
        { task: "Monitor application health" }
      ],
      resources: {
        freeCourses: [
          { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/training/" },
          { title: "Terraform Getting Started", url: "https://learn.hashicorp.com/collections/terraform" }
        ],
        youtube: [
          { title: "AWS Full Course", url: "https://www.youtube.com/watch?v=Ia-UEYYR44s" },
          { title: "Terraform Tutorial", url: "https://www.youtube.com/watch?v=SLauY6PpjW4" }
        ]
      }
    },
    {
      phase: "Reliability & Monitoring",
      duration: "2-3 months",
      skills: ["Observability", "SRE", "Security"],
      description: "Build stable systems with monitoring and reliability practices.",
      tasks: [
        { task: "Implement logging and metrics" },
        { task: "Set up alerting" },
        { task: "Practice incident response" }
      ],
      resources: {
        freeCourses: [
          { title: "SRE Fundamentals", url: "https://www.youtube.com/watch?v=2sh8sTzLjyI" },
          { title: "Monitoring with Prometheus", url: "https://prometheus.io/docs/introduction/overview/" }
        ],
        youtube: [
          { title: "SRE Explained", url: "https://www.youtube.com/watch?v=iV9W5SUdLoI" },
          { title: "Monitoring & Alerting", url: "https://www.youtube.com/watch?v=ZeD1nH2u5-U" }
        ]
      }
    }
  ],
  mobile: [
    {
      phase: "Mobile Basics",
      duration: "1-2 months",
      skills: ["Swift", "Kotlin", "React Native"],
      description: "Learn the fundamentals of mobile app development.",
      tasks: [
        { task: "Build a simple app UI" },
        { task: "Understand platform guidelines" },
        { task: "Use device APIs" }
      ],
      resources: {
        freeCourses: [
          { title: "React Native Tutorial", url: "https://reactnative.dev/docs/getting-started" },
          { title: "Android Basics", url: "https://developer.android.com/courses/pathways/android-basics" }
        ],
        youtube: [
          { title: "React Native Crash Course", url: "https://www.youtube.com/watch?v=Hf4MJH0jDb4" },
          { title: "Swift UI Tutorial", url: "https://www.youtube.com/watch?v=F2ojC6TNwws" }
        ]
      }
    },
    {
      phase: "App Development",
      duration: "2-3 months",
      skills: ["UI Design", "State Management", "API Integration"],
      description: "Build user-friendly mobile apps and connect them to the backend.",
      tasks: [
        { task: "Create navigation flows" },
        { task: "Integrate REST APIs" },
        { task: "Add offline support" }
      ],
      resources: {
        freeCourses: [
          { title: "Build Native Mobile Apps", url: "https://developer.apple.com/tutorials/swiftui" },
          { title: "Flutter Getting Started", url: "https://flutter.dev/docs/get-started" }
        ],
        youtube: [
          { title: "Mobile App Development Tutorial", url: "https://www.youtube.com/watch?v=F2ojC6TNwws" },
          { title: "API Integration in React Native", url: "https://www.youtube.com/watch?v=PT-gxxSWd9I" }
        ]
      }
    },
    {
      phase: "Launch & Optimization",
      duration: "2-3 months",
      skills: ["App Store", "Performance", "Testing"],
      description: "Prepare your mobile app for production and optimization.",
      tasks: [
        { task: "Test on real devices" },
        { task: "Optimize app performance" },
        { task: "Publish to app stores" }
      ],
      resources: {
        freeCourses: [
          { title: "Play Store Publishing Guide", url: "https://developer.android.com/distribute/console" },
          { title: "App Store Connect Tutorial", url: "https://developer.apple.com/app-store/" }
        ],
        youtube: [
          { title: "Publish Android App", url: "https://www.youtube.com/watch?v=3bCwz92A6vM" },
          { title: "Publish iOS App", url: "https://www.youtube.com/watch?v=QDL4YWlighc" }
        ]
      }
    }
  ],
  game: [
    {
      phase: "Game Development Basics",
      duration: "1-2 months",
      skills: ["Unity", "Unreal", "C#"],
      description: "Start building interactive games with popular engines.",
      tasks: [
        { task: "Learn a game engine" },
        { task: "Create a playable prototype" },
        { task: "Practice game mechanics" }
      ],
      resources: {
        freeCourses: [
          { title: "Unity Learn", url: "https://learn.unity.com/" },
          { title: "Unreal Engine Learning", url: "https://www.unrealengine.com/en-US/onlinelearning-courses" }
        ],
        youtube: [
          { title: "Unity Game Development", url: "https://www.youtube.com/watch?v=IlKaB1etrik" },
          { title: "Unreal Engine Beginner Tutorial", url: "https://www.youtube.com/watch?v=HfZ2m_yG2tM" }
        ]
      }
    },
    {
      phase: "Mechanics and Design",
      duration: "2-3 months",
      skills: ["Game Logic", "Level Design", "Physics"],
      description: "Build polished gameplay and immersive levels.",
      tasks: [
        { task: "Design core game mechanics" },
        { task: "Build level progression" },
        { task: "Test and iterate gameplay" }
      ],
      resources: {
        freeCourses: [
          { title: "Game Design Fundamentals", url: "https://www.coursera.org/learn/game-design" },
          { title: "Physics for Game Developers", url: "https://www.udemy.com/course/physics-for-game-developers/" }
        ],
        youtube: [
          { title: "Game Development Tutorial", url: "https://www.youtube.com/watch?v=9rP1KRyv9z0" },
          { title: "Level Design Tips", url: "https://www.youtube.com/watch?v=XE6B1GPoIjw" }
        ]
      }
    },
    {
      phase: "Release and Portfolio",
      duration: "2-3 months",
      skills: ["Publishing", "Monetization", "Optimization"],
      description: "Launch your game and showcase work in a portfolio.",
      tasks: [
        { task: "Polish a demo build" },
        { task: "Create a game portfolio page" },
        { task: "Gather user feedback" }
      ],
      resources: {
        freeCourses: [
          { title: "Game Marketing Basics", url: "https://www.udemy.com/course/game-marketing/" },
          { title: "Publish Your Game", url: "https://unity.com/solutions/publish-your-game" }
        ],
        youtube: [
          { title: "Publish Your Game on Steam", url: "https://www.youtube.com/watch?v=2ZprX6cx4Uk" },
          { title: "Game Portfolio Tips", url: "https://www.youtube.com/watch?v=2p0Cx5vJ4Bg" }
        ]
      }
    }
  ],
  blockchain: [
    {
      phase: "Blockchain Basics",
      duration: "1-2 months",
      skills: ["Solidity", "Smart Contracts", "Ethereum"],
      description: "Understand the fundamentals of blockchain and crypto networks.",
      tasks: [
        { task: "Learn how smart contracts work" },
        { task: "Build a simple Solidity contract" },
        { task: "Explore Ethereum tooling" }
      ],
      resources: {
        freeCourses: [
          { title: "CryptoZombies Solidity Course", url: "https://cryptozombies.io/" },
          { title: "Ethereum Developer Docs", url: "https://ethereum.org/en/developers/docs/" }
        ],
        youtube: [
          { title: "Blockchain Developer Tutorial", url: "https://www.youtube.com/watch?v=SSo_EIwHSd4" },
          { title: "Solidity Basics", url: "https://www.youtube.com/watch?v=ipwxYa-F1uY" }
        ]
      }
    },
    {
      phase: "dApp Development",
      duration: "2-3 months",
      skills: ["Web3", "Truffle", "Hardhat"],
      description: "Build decentralized applications and deploy them on testnets.",
      tasks: [
        { task: "Create a Web3-enabled frontend" },
        { task: "Deploy contracts to a testnet" },
        { task: "Implement token interactions" }
      ],
      resources: {
        freeCourses: [
          { title: "Buildspace Web3 Projects", url: "https://buildspace.so/" },
          { title: "Hardhat Tutorials", url: "https://hardhat.org/getting-started/" }
        ],
        youtube: [
          { title: "Web3 Development Tutorial", url: "https://www.youtube.com/watch?v=gyMwXuJrbJQ" },
          { title: "Smart Contract Development", url: "https://www.youtube.com/watch?v=gyMwXuJrbJQ" }
        ]
      }
    },
    {
      phase: "Security & Scaling",
      duration: "2-3 months",
      skills: ["Audits", "Layer 2", "Tokenomics"],
      description: "Secure your contracts and explore blockchain scaling strategies.",
      tasks: [
        { task: "Review contract security best practices" },
        { task: "Experiment with Layer 2 solutions" },
        { task: "Document token flow" }
      ],
      resources: {
        freeCourses: [
          { title: "Blockchain Security Guide", url: "https://consensys.github.io/smart-contract-best-practices/" },
          { title: "Layer 2 Overview", url: "https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/" }
        ],
        youtube: [
          { title: "Smart Contract Audits", url: "https://www.youtube.com/watch?v=duQgyX4ORgM" },
          { title: "Ethereum Scaling Explained", url: "https://www.youtube.com/watch?v=H9i4cKf4nzc" }
        ]
      }
    }
  ]
};

const rolePatterns = [
  { key: "frontend", terms: ["frontend", "ui", "ux", "react", "angular", "vue", "javascript", "css", "html"] },
  { key: "backend", terms: ["backend", "server", "node", "express", "api", "database", "sql", "nosql"] },
  { key: "fullstack", terms: ["fullstack", "full stack", "software engineer", "developer", "web developer"] },
  { key: "data", terms: ["data", "data scientist", "data analyst", "machine learning", "ml", "analytics"] },
  { key: "devops", terms: ["devops", "sre", "site reliability", "cloud", "infrastructure", "ci/cd"] },
  { key: "mobile", terms: ["mobile", "android", "ios", "react native", "flutter", "swift", "kotlin"] },
  { key: "game", terms: ["game", "gaming", "unity", "unreal", "game developer"] },
  { key: "blockchain", terms: ["blockchain", "crypto", "web3", "smart contract", "ethereum", "solidity"] }
];

function generateRoadmap(role) {
  const normalizedRole = role.toLowerCase();

  for (const mapping of rolePatterns) {
    if (mapping.terms.some((term) => normalizedRole.includes(term))) {
      return roadmaps[mapping.key];
    }
  }

  return roadmaps.fullstack;
}

export default generateRoadmap;
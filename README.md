# SkillMorph - Career Intelligence Platform

A modern full-stack web application for career development and resume optimization.

## Features

- User authentication and registration
- Resume upload and analysis
- Job description analysis
- Career roadmap generation
- Dark mode support
- Responsive design

## Tech Stack

### Frontend
- React 19 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Lucide icons for UI
- Axios for API communication

### Backend
- Node.js with Express 5
- MongoDB for data persistence
- JWT for authentication
- Multer for file handling
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js 16+ installed
- MongoDB running locally (or connection string)

### Installation

1. **Backend Setup:**
```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=mongodb://localhost:27017/skillmorph
# JWT_SECRET=your_jwt_secret
npm start
```

2. **Frontend Setup:**
```bash
cd client
npm install
npm run dev
```

3. **Access the application:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
capstoneproject/
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pagees/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── vite.config.js
├── testLogin.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Resume Management
- `POST /api/resume/upload` - Upload resume file
- `POST /api/analyze/jd` - Analyze job description
- `GET /api/roadmap` - Get career roadmaps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes.

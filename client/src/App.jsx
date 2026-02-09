import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pagees/login";
import Register from "./pagees/register";
import Dashboard from "./pagees/dashboard";
import ResumeUpload from "./pagees/resumeupload";
import JobMatch from "./pagees/jobmatch";
import Roadmap from "./pagees/roadmap";
import Landing from "./pagees/landing";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/match" 
          element={
            <ProtectedRoute>
              <JobMatch />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/roadmap" 
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

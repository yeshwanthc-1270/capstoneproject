import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pagees/login";
import Register from "./pagees/register";
import Dashboard from "./pagees/dashboard";
import ResumeUpload from "./pagees/resumeupload";
import ResumeAnalyzer from "./pagees/resumeanalyzer";
import JobMatch from "./pagees/jobmatch";
import Roadmap from "./pagees/roadmap";
import Landing from "./pagees/landing";
import { ThemeProvider } from "./context/ThemeContext";

// Protected Route Component with Sidebar
const ProtectedLayout = ({ children }) => {
  const Sidebar = require("./components/Sidebar").default;
  
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 dark:bg-slate-900 min-h-screen">
        {children}
      </main>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? (
    <ProtectedLayout>{children}</ProtectedLayout>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <ThemeProvider>
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
            path="/analyze" 
            element={
              <ProtectedRoute>
                <ResumeAnalyzer />
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
    </ThemeProvider>
  );
}

export default App;

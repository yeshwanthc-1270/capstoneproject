import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pagees/login";
import Register from "./pagees/register";
import Dashboard from "./pagees/dashboard";
import ResumeUpload from "./pagees/resumeupload";
import JobMatch from "./pagees/jobmatch";
import Roadmap from "./pagees/roadmap";
import Landing from "./pagees/landing";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/match" element={<JobMatch />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

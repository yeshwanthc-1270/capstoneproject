import React, { useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleAnalyzeResume = async () => {
    if (!resumeFile) {
      alert("Please select a resume file");
      return;
    }
    setLoading(true);
    try {
      // TODO: Implement resume analysis API call
      console.log("Analyzing:", resumeFile);
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setLoading(false);
    }
  };

  const handleMatchJob = async () => {
    if (!jobDescription) {
      alert("Please paste a job description");
      return;
    }
    setLoading(true);
    try {
      // TODO: Implement job matching API call
      console.log("Matching job description");
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error("Error matching job:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
            Career Dashboard
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Track your progress, analyze your resume, and discover matching job opportunities
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <StatCard 
                title="Resume Score" 
                value="78%" 
                icon="📄"
                trend={{ positive: true, value: 12 }}
              />
              <StatCard 
                title="ATS Rank" 
                value="A+" 
                icon="💎"
                trend={{ positive: true, value: 8 }}
              />
              <StatCard 
                title="Matched Roles" 
                value="14" 
                icon="🎯"
                trend={{ positive: true, value: 25 }}
              />
              <StatCard 
                title="Skills Gap" 
                value="3" 
                icon="⚠️"
                trend={{ positive: false, value: 10 }}
              />
            </div>

            {/* Resume Upload Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📤</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Resume Intelligence
                </h2>
                <span className="ml-auto bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-mono">
                  v2.1
                </span>
              </div>

              <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <p className="text-slate-900 font-semibold text-lg mb-2">
                    {resumeFile?.name || "Upload Your Resume"}
                  </p>
                  <p className="text-slate-600 text-sm">
                    Drop PDF or DOCX file here or click to browse
                  </p>
                </div>
              </div>

              <button
                onClick={handleAnalyzeResume}
                disabled={loading}
                className="w-full mt-6 py-3 sm:py-4 bg-primary hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                {loading ? "Analyzing..." : "Run Analysis"}
              </button>
            </div>

            {/* Job Matching Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎯</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Target Matcher
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job requirements here..."
                    rows="6"
                    className="form-textarea"
                  />
                </div>

                <button
                  onClick={handleMatchJob}
                  disabled={loading}
                  className="w-full py-3 sm:py-4 border-2 border-primary bg-primary/5 hover:bg-primary hover:text-white disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed text-primary font-semibold rounded-lg transition-all duration-200"
                >
                  {loading ? "Comparing..." : "Compare Compatibility"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 sm:space-y-8">
            {/* Mastery Roadmap */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🗺️</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Mastery Roadmap
                </h3>
              </div>

              <div className="space-y-6">
                {[
                  { task: "Data Structures", sub: "LeetCode 100", progress: 70 },
                  { task: "MERN Stack", sub: "2 Portfolio Projects", progress: 40 },
                  { task: "System Design", sub: "Scaling Basics", progress: 15 },
                ].map((item, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute -left-2 top-2 w-3 h-3 bg-primary rounded-full shadow-md" />
                    <p className="font-semibold text-slate-900 text-sm sm:text-base">{item.task}</p>
                    <p className="text-xs sm:text-sm text-slate-600 mb-2">{item.sub}</p>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{item.progress}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary hover:text-white text-primary font-semibold transition-all duration-200">
                  <span>Detailed Report</span>
                  <span>📊</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-secondary/5 border border-secondary/20 rounded-lg hover:bg-secondary hover:text-white text-secondary font-semibold transition-all duration-200">
                  <span>Mock Interviews</span>
                  <span>🎙️</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg hover:bg-success hover:text-white text-success font-semibold transition-all duration-200">
                  <span>Download Report</span>
                  <span>📥</span>
                </button>
              </div>
            </div>

            {/* Stats Info Card */}
            <div className="bg-gradient-to-br from-primary/5 to-blue-50 border border-primary/20 rounded-2xl p-6 sm:p-8">
              <h4 className="font-bold text-slate-900 mb-3">💡 Pro Tip</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                Update your resume weekly and compare against job descriptions to stay ahead in your career journey.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { 
  FileText, 
  Zap, 
  Target, 
  Map, 
  CheckCircle2, 
  BarChart3, 
  Mic, 
  Download,
  Upload,
  ArrowRight
} from "lucide-react";

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
      console.log("Matching job description");
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error("Error matching job:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Dashboard
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Track your progress and optimize your career path in real-time
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Left Column - Main Content (3 cols) */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Stats Grid - 4 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard 
                title="Resume Score" 
                value="78%" 
                IconComponent={FileText}
                trend={{ positive: true, value: 12 }}
              />
              <StatCard 
                title="ATS Rank" 
                value="A+" 
                IconComponent={Zap}
                trend={{ positive: true, value: 8 }}
              />
              <StatCard 
                title="Matched Roles" 
                value="14" 
                IconComponent={Target}
                trend={{ positive: true, value: 25 }}
              />
              <StatCard 
                title="Skills Gap" 
                value="3" 
                IconComponent={BarChart3}
                trend={{ positive: false, value: 10 }}
              />
            </div>

            {/* Resume Upload Section */}
            <div className="border rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FileText className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Resume Intelligence
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>AI-powered analysis and optimization</p>
                </div>
              </div>

              <div className="relative border-2 border-dashed rounded-lg p-8 sm:p-12 text-center group" style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
              }}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Upload className="text-indigo-600" size={24} />
                  </div>
                  <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                    {resumeFile?.name || "Upload Your Resume"}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    PDF, DOC, or DOCX • Max 5 MB
                  </p>
                </div>
              </div>

              <button
                onClick={handleAnalyzeResume}
                disabled={loading}
                className="w-full mt-6 px-6 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
              >
                {loading ? "Analyzing..." : "Run Analysis"}
              </button>
            </div>

            {/* Job Matching Section */}
            <div className="border rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Target className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Target Matcher
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Compare your profile against job descriptions</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job requirements here..."
                  rows="6"
                  className="w-full p-4 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none" style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    borderWidth: '1px'
                  }}
                />

                <button
                  onClick={handleMatchJob}
                  disabled={loading}
                  className="w-full py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  {loading ? "Comparing..." : "Analyze Compatibility"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar (1 col) */}
          <aside className="space-y-6 sm:space-y-8">
            {/* Mastery Roadmap */}
            <div className="border rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Map className="text-indigo-600" size={20} />
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  Roadmap
                </h3>
              </div>

              <div className="space-y-5">
                {[
                  { task: "Data Structures", sub: "LeetCode 100", progress: 70 },
                  { task: "MERN Stack", sub: "2 Projects", progress: 40 },
                  { task: "System Design", sub: "Scaling", progress: 15 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-indigo-50 rounded-full mt-1 flex-shrink-0">
                        <CheckCircle2 size={14} className="text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.task}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.sub}</p>
                      </div>
                    </div>
                    <div className="mt-2 w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <div
                        className="bg-indigo-600 h-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-right" style={{ color: 'var(--text-secondary)' }}>{item.progress}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg font-medium transition-all duration-200 group" style={{
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <span className="flex items-center gap-2">
                    <BarChart3 size={18} className="text-indigo-600" />
                    <span>Report</span>
                  </span>
                  <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg font-medium transition-all duration-200 group" style={{
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <span className="flex items-center gap-2">
                    <Mic size={18} className="text-indigo-600" />
                    <span>Interviews</span>
                  </span>
                  <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg font-medium transition-all duration-200 group" style={{
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <span className="flex items-center gap-2">
                    <Download size={18} className="text-indigo-600" />
                    <span>Export</span>
                  </span>
                  <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="border rounded-xl p-6 sm:p-8" style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--color-primary)',
              borderWidth: '1px'
            }}>
              <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                <span className="block font-bold mb-2">💡 Pro Tip</span>
                Update your resume weekly and compare against job descriptions to stay ahead in your career.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
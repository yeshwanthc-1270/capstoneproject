import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Target, TrendingUp, AlertCircle, Zap, FileText, Loader2, Upload, CheckCircle, XCircle } from "lucide-react";

export default function JobMatch() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setError(null);
    } else {
      setError("Please select a valid PDF file");
      setResumeFile(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError("Please upload your resume PDF");
      return;
    }

    if (!jobDescription.trim() && !jobTitle.trim()) {
      setError("Please enter either a job description or job title");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      if (jobDescription.trim()) {
        formData.append("jobDescription", jobDescription.trim());
      }
      if (jobTitle.trim()) {
        formData.append("jobTitle", jobTitle.trim());
      }

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/job-match/match", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to analyze job match");
      }

      const data = await response.json();
      setResult(data.match);

    } catch (err) {
      console.error("Error:", err);
      setError("Failed to analyze job match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
              Job Matching Analysis
            </h1>
            <p className="text-lg text-slate-600">
              Upload your resume and get detailed job matching analysis with improvement suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Resume Upload */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Upload className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Upload Resume
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">Upload your resume as a PDF file</p>
                  </div>
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {resumeFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{resumeFile.name}</p>
                        <p className="text-xs text-slate-600">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => setResumeFile(null)}
                        className="p-1 hover:bg-slate-100 rounded"
                      >
                        <XCircle className="text-slate-400" size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto text-slate-400 mb-4" size={48} />
                      <p className="text-slate-600 mb-2">
                        Drag and drop your resume PDF here, or{" "}
                        <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-semibold">
                          browse files
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-slate-500">Maximum file size: 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Input */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Target className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Job Details
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">Enter job description or job title</p>
                  </div>
                </div>

                {/* Job Title Input */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Job Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Software Engineer, Data Analyst"
                    className="w-full p-3 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
                  />
                </div>

                {/* Job Description Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Job Description {!jobTitle.trim() && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description here..."
                    className="w-full h-48 p-4 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {!jobTitle.trim() && "Required if no job title is provided"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={!resumeFile || (!jobDescription.trim() && !jobTitle.trim()) || loading}
                    className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        Analyze Match
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setResumeFile(null);
                      setJobDescription("");
                      setJobTitle("");
                      setResult(null);
                      setError(null);
                    }}
                    className="px-6 py-4 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-all duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-red-600" size={24} />
                    <p className="text-red-800 font-semibold">{error}</p>
                  </div>
                </div>
              )}

              {/* Results */}
              {result && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">
                    Job Matching Results
                  </h3>

                  {/* Match Score */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-slate-900">
                        Match Score
                      </span>
                      <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r h-4 rounded-full transition-all duration-500 ${getScoreBg(result.score)}`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      {result.score >= 80 ? "Excellent match!" :
                       result.score >= 60 ? "Good match with room for improvement" :
                       "Consider developing additional skills"}
                    </p>
                  </div>

                  {/* Shortlisting Probability */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">
                      Shortlisting Probability
                    </h4>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                      <span className={`font-bold text-lg ${
                        result.shortlistProbability === "Very High" ? "text-green-600" :
                        result.shortlistProbability === "High" ? "text-blue-600" :
                        result.shortlistProbability === "Medium" ? "text-yellow-600" :
                        "text-red-600"
                      }`}>
                        {result.shortlistProbability}
                      </span>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600">{(result.matchedSkills || []).length}</div>
                      <div className="text-sm text-slate-600">Matched Skills</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600">{(result.missingSkills || []).length}</div>
                      <div className="text-sm text-slate-600">Missing Skills</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{(result.improvements || []).length}</div>
                      <div className="text-sm text-slate-600">Improvement Tips</div>
                    </div>
                  </div>

                  {/* Matched Skills */}
                  {(result.matchedSkills || []).length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-600" />
                        Matched Skills ({(result.matchedSkills || []).length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(result.matchedSkills || []).map((skill, idx) => (
                          <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm font-semibold text-green-900">{skill}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Skills */}
                  {(result.missingSkills || []).length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-amber-600" />
                        Missing Skills ({(result.missingSkills || []).length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(result.missingSkills || []).map((skill, idx) => (
                          <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <p className="text-sm font-semibold text-amber-900">{skill}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Improvement Suggestions */}
                  {(result.improvements || []).length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-blue-600" />
                        Resume Improvement Suggestions ({(result.improvements || []).length})
                      </h4>
                      <div className="space-y-3">
                        {(result.improvements || []).map((suggestion, idx) => (
                          <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 sm:space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">How It Works</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">1.</span>
                    Upload your resume as a PDF
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">2.</span>
                    Enter job title or paste full job description
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">3.</span>
                    Get detailed match analysis with score and probability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">4.</span>
                    See matched skills and missing skills
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">5.</span>
                    Get specific resume improvement suggestions
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Tips for Better Results</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">•</span>
                    Use a complete, up-to-date resume
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">•</span>
                    Include the full job description with requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">•</span>
                    Job titles work for quick analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">•</span>
                    Review improvement suggestions to strengthen your resume
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

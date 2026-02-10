import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Target, TrendingUp, AlertCircle, Zap } from "lucide-react";

export default function JobMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/jobmatch/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        alert("Error analyzing job description. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error analyzing job description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
              Job Role Matching
            </h1>
            <p className="text-lg text-slate-600">
              Paste a job description and find roles that match your skills
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Target className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Paste Job Description
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">Complete job description analysis</p>
                  </div>
                </div>

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  className="w-full h-64 sm:h-80 p-4 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none"
                />

                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={!jobDescription.trim() || loading}
                    className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                  >
                    {loading ? "Analyzing..." : "Analyze Job Match"}
                  </button>
                  <button
                    onClick={() => setJobDescription("")}
                    className="px-6 py-4 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-all duration-200"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Results */}
              {result && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">
                    Matching Analysis
                  </h3>

                  {/* Compatibility Score */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-slate-900">
                        Overall Match Score
                      </span>
                      <span className="text-3xl font-bold text-indigo-600">
                        {result.matchScore || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${result.matchScore || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Matched Skills */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-green-600" />
                      Matched Skills
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(result.matchedSkills || []).map((skill, idx) => (
                        <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm font-semibold text-green-900">{skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  {(result.missingSkills || []).length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-amber-600" />
                        Skills to Develop
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {result.missingSkills.map((skill, idx) => (
                          <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <p className="text-sm font-semibold text-amber-900">{skill}</p>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">Tips</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">→</span>
                    Paste the full job description
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">→</span>
                    Include responsibilities section
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">→</span>
                    Include required qualifications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold mt-0.5">→</span>
                    Add preferred skills if available
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">How We Match</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">1.</span>
                    Parse job requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">2.</span>
                    Compare with your skills
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">3.</span>
                    Calculate match percentage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">4.</span>
                    Suggest improvements
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <Zap className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Pro Tip</h4>
                    <p className="text-sm text-slate-700">
                      High match score? Check the roadmap to develop missing skills quickly.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

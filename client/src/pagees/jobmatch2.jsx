import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Target, Briefcase, CheckCircle2, AlertCircle } from "lucide-react";

export default function JobMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setAnalyzed(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
              Job Description Matching
            </h1>
            <p className="text-lg text-slate-600">
              Paste a job description to check your resume compatibility
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Target className="text-indigo-600" size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Paste Job Description
              </h2>
            </div>

            <textarea
              rows="8"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              className="w-full border border-slate-200 rounded-lg p-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none"
            />

            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || loading}
              className="mt-6 w-full px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
            >
              {loading ? "Matching..." : "Match Job"}
            </button>
          </div>

          {/* Match Result */}
          {analyzed && (
            <div className="space-y-8">
              {/* Match Score */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="text-indigo-600" size={28} />
                  <h3 className="text-2xl font-bold text-slate-900">
                    Matching Result
                  </h3>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-slate-900">
                      Resume Compatibility
                    </span>
                    <span className="text-4xl font-bold text-indigo-600">74%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: "74%" }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Your resume matches <span className="font-bold text-indigo-600">74%</span> with the job requirements
                  </p>
                </div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Matched Skills */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-green-600" size={24} />
                    Matched Skills
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "React",
                      "Node.js",
                      "MongoDB",
                      "REST APIs",
                    ].map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle2 className="text-green-600 flex-shrink-0" size={18} />
                        <span className="text-slate-900 font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Skills */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <AlertCircle className="text-red-600" size={24} />
                    Missing Skills
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Docker",
                      "AWS",
                      "CI/CD",
                    ].map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <AlertCircle className="text-red-600 flex-shrink-0" size={18} />
                        <span className="text-red-900 font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200 rounded-xl p-6 sm:p-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Recommendations</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-slate-900">Learn the missing skills</p>
                      <p className="text-sm text-slate-600">Focus on Docker, AWS, and CI/CD tools</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-slate-900">Update your resume</p>
                      <p className="text-sm text-slate-600">Highlight your matched skills with specific examples</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-slate-900">Check the roadmap</p>
                      <p className="text-sm text-slate-600">Use our career roadmap to plan your skill development</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

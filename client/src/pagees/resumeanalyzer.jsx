import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { UploadCloud, CheckCircle2, AlertCircle, TrendingUp, FileText } from "lucide-react";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0]);
  };

  const handleAnalyze = () => {
    if (!file) {
      alert("Please select a resume file");
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
              Resume Analyzer
            </h1>
            <p className="text-lg text-slate-600">
              Upload your resume and check ATS compatibility score
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 mb-8">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 sm:p-16 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer group">
              <div className="p-4 bg-indigo-50 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="text-indigo-600" size={40} />
              </div>
              <p className="text-slate-900 font-semibold text-lg mb-2">
                Upload Resume (PDF only)
              </p>
              <p className="text-slate-600 text-sm mb-6">
                Drag and drop or click to browse
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="resume-input"
                accept=".pdf"
              />
              <label
                htmlFor="resume-input"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md inline-block"
              >
                Choose File
              </label>
            </div>

            {file && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-3">
                <FileText className="text-indigo-600" size={24} />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{file.name}</p>
                  <p className="text-sm text-slate-600">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full mt-6 px-6 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          {/* Results */}
          {analyzed && (
            <div className="space-y-8">
              {/* Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">
                    ATS Score
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">82%</h2>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">
                    Matched Skills
                  </p>
                  <div className="flex items-end gap-2">
                    <h2 className="text-4xl sm:text-5xl font-bold text-green-600">18</h2>
                    <TrendingUp className="text-green-600 mb-2" size={24} />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">
                    Missing Skills
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-bold text-red-500">4</h2>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="text-green-600" size={28} />
                  Suggested Improvements
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-slate-900">Add Docker & Cloud Skills</p>
                      <p className="text-sm text-slate-600">Include Docker, Kubernetes, and AWS in your skills section</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-slate-900">Include More Project Descriptions</p>
                      <p className="text-sm text-slate-600">Add 2-3 more project descriptions with quantifiable results</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-slate-900">Optimize Keywords for ATS</p>
                      <p className="text-sm text-slate-600">Use industry-specific keywords throughout your resume</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <AlertCircle className="text-red-600" size={24} />
                  Skills to Develop
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Docker", "Kubernetes", "CI/CD Pipelines", "GraphQL"].map((skill, idx) => (
                    <div key={idx} className="bg-white border border-red-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-red-900">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalyzer;

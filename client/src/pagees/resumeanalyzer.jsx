import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { UploadCloud, CheckCircle2, AlertCircle, TrendingUp, FileText, Loader2 } from "lucide-react";
import pdfParse from "pdf-parse";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
    setAnalyzed(false);
    setResults(null);
    setError(null);
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const data = await pdfParse(new Uint8Array(arrayBuffer));
    return data.text;
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a resume file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Extract text from PDF
      const resumeText = await extractTextFromPDF(file);

      // Send to analysis API
      const response = await fetch("http://localhost:5000/api/analysis/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resumeText })
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResults(data);
      setAnalyzed(true);

    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
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
              className="w-full mt-6 px-6 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-600" size={24} />
                <p className="text-red-800 font-semibold">{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {analyzed && results && (
            <div className="space-y-8">
              {/* Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">
                    ATS Score
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">{results.atsScore}%</h2>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${results.atsScore}%` }} />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">
                    Skills Found
                  </p>
                  <div className="flex items-end gap-2">
                    <h2 className="text-4xl sm:text-5xl font-bold text-green-600">{results.skills?.length || 0}</h2>
                    <TrendingUp className="text-green-600 mb-2" size={24} />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">
                    Skill Categories
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-bold text-blue-600">
                    {results.analysis?.skillCategories ? Object.keys(results.analysis.skillCategories).length : 0}
                  </h2>
                </div>
              </div>

              {/* Skills Breakdown */}
              {results.skills && results.skills.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Extracted Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skill Categories */}
              {results.analysis?.skillCategories && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Skill Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(results.analysis.skillCategories).map(([category, skills]) => (
                      <div key={category} className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-semibold text-slate-900 capitalize mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-1">
                          {skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white text-slate-700 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {results.analysis?.recommendations && results.analysis.recommendations.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <CheckCircle2 className="text-green-600" size={28} />
                    Recommendations
                  </h3>
                  <ul className="space-y-4">
                    {results.analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg">
                        <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="font-semibold text-slate-900">{rec}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
}

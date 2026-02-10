import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a resume file");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("http://localhost:5000/api/resume/analyze", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        alert("Error analyzing resume. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error analyzing resume");
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
              Resume Upload & Analysis
            </h1>
            <p className="text-lg text-slate-600">
              Upload your resume and get AI-powered insights to improve your profile
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <FileText className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Upload Your Resume
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">PDF, DOC, or DOCX format</p>
                  </div>
                </div>

                {/* Drag & Drop Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
                      <Upload className="text-indigo-600" size={32} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        Drag and drop your resume here
                      </p>
                      <p className="text-slate-600 text-sm mt-1">
                        or click to browse
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-input"
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file-input"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>

                {/* Selected File */}
                {file && (
                  <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-indigo-100 rounded">
                        <FileText className="text-indigo-600" size={20} />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">{file.name}</p>
                        <p className="text-sm text-slate-600">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!file || loading}
                  className="w-full mt-8 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  {loading ? "Analyzing..." : "Analyze Resume"}
                </button>
              </div>
            </div>

            {/* Info Sidebar */}
            <aside className="space-y-6 sm:space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">How It Works</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">1</span>
                    <span className="text-slate-600 text-sm">Upload your resume</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">2</span>
                    <span className="text-slate-600 text-sm">AI analyzes content</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">3</span>
                    <span className="text-slate-600 text-sm">Get optimization tips</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Benefits</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-600" />
                    ATS Compatibility Check
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-600" />
                    Keyword Optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-600" />
                    Formatting Review
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-600" />
                    Skills Gap Analysis
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-12 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Analysis Results
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg overflow-auto text-sm">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

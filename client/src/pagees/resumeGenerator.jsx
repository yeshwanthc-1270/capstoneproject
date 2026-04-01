import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FileText, Download, Eye, Loader2, CheckCircle2 } from "lucide-react";

export default function ResumeGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", institution: "", year: "", gpa: "" }],
    skills: "",
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    certifications: [{ name: "", issuer: "", year: "" }]
  });

  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [error, setError] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      // Handle array fields
      const updatedSection = [...formData[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addItem = (section) => {
    const newItem = section === 'experience'
      ? { title: "", company: "", duration: "", description: "" }
      : section === 'education'
      ? { degree: "", institution: "", year: "", gpa: "" }
      : section === 'projects'
      ? { name: "", description: "", technologies: "", link: "" }
      : { name: "", issuer: "", year: "" };

    setFormData({
      ...formData,
      [section]: [...formData[section], newItem]
    });
  };

  const removeItem = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleGenerate = async () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in at least your name and email");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/analysis/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      const data = await response.json();
      setGeneratedResume(data.resume);

    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!generatedResume) return;

    try {
      const response = await fetch("http://localhost:5000/api/analysis/generate-resume-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.name.replace(/\s+/g, '_')}_resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download PDF. Please try again.");
    }
  };

  const handleDownloadText = async () => {
    if (!generatedResume) return;

    try {
      const response = await fetch("http://localhost:5000/api/analysis/generate-resume-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to download text");
      }

      const data = await response.json();
      const blob = new Blob([data.resumeText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.name.replace(/\s+/g, '_')}_resume.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download text file. Please try again.");
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
              Resume Generator
            </h1>
            <p className="text-lg text-slate-600">
              Create a professional resume with our template generator
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location (City, State)"
                    value={formData.location}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Professional Summary */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Professional Summary</h3>
                <textarea
                  name="summary"
                  placeholder="Brief summary of your professional background and goals..."
                  value={formData.summary}
                  onChange={(e) => handleInputChange(e)}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              {/* Skills */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Skills</h3>
                <textarea
                  name="skills"
                  placeholder="List your skills (comma separated): React, Node.js, Python, etc."
                  value={formData.skills}
                  onChange={(e) => handleInputChange(e)}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              {/* Experience */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Experience</h3>
                  <button
                    onClick={() => addItem('experience')}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200"
                  >
                    + Add
                  </button>
                </div>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="mb-4 p-4 border border-slate-200 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => handleInputChange(e, 'experience', index)}
                        className="px-3 py-2 border border-slate-200 rounded focus:border-indigo-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleInputChange(e, 'experience', index)}
                        className="px-3 py-2 border border-slate-200 rounded focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      name="duration"
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      value={exp.duration}
                      onChange={(e) => handleInputChange(e, 'experience', index)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500 focus:outline-none mb-3"
                    />
                    <textarea
                      name="description"
                      placeholder="Job description and achievements..."
                      value={exp.description}
                      onChange={(e) => handleInputChange(e, 'experience', index)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500 focus:outline-none resize-none"
                    />
                    {formData.experience.length > 1 && (
                      <button
                        onClick={() => removeItem('experience', index)}
                        className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText size={20} />
                    Generate Resume
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800 font-semibold">{error}</p>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              {generatedResume && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900">Resume Preview</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPreviewMode(!previewMode)}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-sm hover:bg-slate-200 flex items-center gap-1"
                      >
                        <Eye size={16} />
                        {previewMode ? 'Hide' : 'Preview'}
                      </button>
                    </div>
                  </div>

                  {previewMode ? (
                    <div className="bg-slate-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-sm text-slate-800 whitespace-pre-wrap">
                        {generatedResume.header.name}
                        {generatedResume.header.contact.email} | {generatedResume.header.contact.phone} | {generatedResume.header.contact.location}

PROFESSIONAL SUMMARY
{generatedResume.summary}

PROFESSIONAL EXPERIENCE
{generatedResume.experience.map(exp => `${exp.title}
${exp.company} | ${exp.duration}
${exp.description}
`).join('\n')}

SKILLS
{generatedResume.skills.join(", ")}
                      </pre>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 size={20} />
                        <span className="font-medium">Resume Generated Successfully!</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={handleDownloadPDF}
                          className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                        >
                          <Download size={18} />
                          Download PDF
                        </button>
                        <button
                          onClick={handleDownloadText}
                          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                        >
                          <Download size={18} />
                          Download Text
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
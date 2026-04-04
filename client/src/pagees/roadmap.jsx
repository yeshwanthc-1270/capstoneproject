import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { CheckCircle2, Target, TrendingUp, Loader2, BookOpen, Link2, Youtube } from "lucide-react";

export default function Roadmap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [progressSaving, setProgressSaving] = useState(false);
  const [roadmapSaving, setRoadmapSaving] = useState(false);

  const jobTitles = [
    "frontend developer",
    "backend developer",
    "fullstack developer",
    "data scientist",
    "data analyst",
    "devops engineer",
    "site reliability engineer",
    "mobile app developer",
    "android developer",
    "ios developer",
    "react developer",
    "node developer",
    "machine learning engineer",
    "cloud engineer",
    "qa engineer",
    "cybersecurity analyst",
    "product manager",
    "ui ux designer",
    "game developer",
    "blockchain developer",
    "ai engineer",
    "database administrator",
    "systems engineer",
    "network engineer",
    "software engineer",
    "technical writer",
    "analytics engineer",
    "business analyst",
    "security engineer",
    "infrastructure engineer",
    "ecommerce developer",
    "performance engineer",
    "automation engineer",
    "research scientist",
    "computer vision engineer",
    "natural language processing engineer",
    "ar vr developer",
    "flutter developer",
    "react native developer",
    "sql developer",
    "cloud security engineer",
    "platform engineer",
    "release manager",
    "hardware engineer",
    "embedded systems engineer",
    "product owner",
    "technical program manager",
    "data engineer",
    "big data engineer"
  ];

  const filteredSuggestions = searchTerm.trim()
    ? jobTitles.filter((title) => title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 10)
    : jobTitles.slice(0, 10);

  const token = localStorage.getItem("token");

  const calculateProgress = (tasks = []) =>
    tasks.length > 0
      ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100)
      : 0;

  const normalizeRoadmap = (roadmapData) =>
    roadmapData.map((phase, idx) => {
      const tasks = phase.tasks
        ? phase.tasks.map((task) => ({
            task: typeof task === "string" ? task : task.task,
            completed: !!task.completed
          }))
        : [];

      const progress = calculateProgress(tasks);

      return {
        id: idx,
        ...phase,
        tasks,
        progress,
        status: progress === 100 ? "completed" : tasks.length > 0 ? "in-progress" : "planned"
      };
    });

  const handleSelectSuggestion = (title) => {
    setSearchTerm(title);
    setSelectedRole(title);
  };

  const handleGenerateRoadmap = async () => {
    const role = selectedRole || searchTerm.trim();

    if (!role) {
      alert("Please enter or select a role");
      return;
    }

    setLoading(true);
    setError(null);
    setSaveMessage("");

    try {
      const response = await fetch(`http://localhost:5000/api/analysis/roadmap?role=${encodeURIComponent(role)}`);

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const data = await response.json();
      setSelectedRole(role);
      setRoadmap(normalizeRoadmap(data.roadmap));
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (phaseIndex, taskIndex) => {
    setRoadmap((currentRoadmap) =>
      currentRoadmap.map((phase, idx) => {
        if (idx !== phaseIndex) return phase;

        const updatedTasks = phase.tasks.map((task, tIndex) =>
          tIndex === taskIndex ? { ...task, completed: !task.completed } : task
        );

        const progress = calculateProgress(updatedTasks);

        return {
          ...phase,
          tasks: updatedTasks,
          progress,
          status: progress === 100 ? "completed" : updatedTasks.length > 0 ? "in-progress" : "planned"
        };
      })
    );
  };

  const handleSaveProgress = async () => {
    if (!roadmap) return;
    if (!token) {
      setSaveMessage("Please sign in to save your progress.");
      return;
    }

    setProgressSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/analysis/roadmap-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: selectedRole || searchTerm.trim(), roadmap })
      });

      if (!response.ok) {
        throw new Error("Unable to save roadmap progress");
      }

      const data = await response.json();
      setSaveMessage("Progress saved successfully. Check Dashboard to track your roadmap.");
      setRoadmap(normalizeRoadmap(data.roadmapProgress?.phases || roadmap));
    } catch (err) {
      console.error("Save error:", err);
      setSaveMessage("Unable to save progress. Please try again.");
    } finally {
      setProgressSaving(false);
    }
  };

  const handleSaveRoadmap = async () => {
    if (!roadmap) return;
    if (!token) {
      setSaveMessage("Please sign in to save your roadmap.");
      return;
    }

    setRoadmapSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/roadmap-progress/save-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ roadmap: { role: selectedRole || searchTerm.trim(), phases: roadmap } })
      });

      if (!response.ok) {
        throw new Error("Unable to save roadmap");
      }

      const data = await response.json();
      setSaveMessage("Roadmap saved successfully! You can now track progress in your Dashboard.");
    } catch (err) {
      console.error("Save roadmap error:", err);
      setSaveMessage("Unable to save roadmap. Please try again.");
    } finally {
      setRoadmapSaving(false);
    }
  };

  const totalCompletedTasks = roadmap
    ? roadmap.reduce((acc, phase) => acc + (phase.tasks ? phase.tasks.filter((task) => task.completed).length : 0), 0)
    : 0;

  const currentProgress = roadmap
    ? Math.round(roadmap.reduce((acc, phase) => acc + (phase.progress || 0), 0) / roadmap.length)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">Career Roadmap</h1>
            <p className="text-lg text-slate-600">
              Search a job title and generate a career learning path with free resources, tasks, and progress tracking.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <BookOpen className="text-indigo-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Search Your Career Path</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Type a job title or choose a suggestion to generate a personalized roadmap.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Job title</label>
                <input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedRole("");
                  }}
                  placeholder="Try frontend developer, data scientist, cloud engineer..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500/10"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {filteredSuggestions.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => handleSelectSuggestion(title)}
                    className={`text-sm rounded-full px-3 py-2 transition-all ${
                      selectedRole === title || searchTerm.toLowerCase() === title.toLowerCase()
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerateRoadmap}
                disabled={loading}
                className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Generating Roadmap...
                  </>
                ) : (
                  "Generate Roadmap"
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <p className="text-red-800 font-semibold">{error}</p>
            </div>
          )}

          {roadmap && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 capitalize">{selectedRole} Development Roadmap</h3>
                    <p className="text-sm text-slate-500 mt-1">Free learning links and YouTube resources are included in each phase.</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveRoadmap}
                      disabled={roadmapSaving}
                      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700 disabled:bg-slate-300"
                    >
                      {roadmapSaving ? "Saving..." : "Save Roadmap"}
                    </button>
                    <button
                      onClick={handleSaveProgress}
                      disabled={progressSaving}
                      className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700 disabled:bg-slate-300"
                    >
                      {progressSaving ? "Saving..." : "Save Progress"}
                    </button>
                  </div>
                </div>

                {saveMessage && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-6 text-sm text-slate-700">
                    {saveMessage}
                  </div>
                )}

                <div className="space-y-6">
                  {roadmap.map((phase, index) => (
                    <div key={phase.id || index} className="border border-slate-200 rounded-xl p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-slate-900">{phase.phase}</h4>
                            <p className="text-indigo-600 font-medium">Duration: {phase.duration}</p>
                          </div>
                        </div>
                        <div className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                          {phase.progress}% complete
                        </div>
                      </div>

                      <p className="text-slate-600 mt-4">{phase.description}</p>

                      <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-3">Key Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {phase.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-3">Tasks</h5>
                          <div className="space-y-2">
                            {phase.tasks.map((task, taskIndex) => (
                              <label key={taskIndex} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                                <input
                                  type="checkbox"
                                  checked={task.completed}
                                  onChange={() => toggleTask(index, taskIndex)}
                                  className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                                />
                                <span className={task.completed ? "text-slate-500 line-through" : "text-slate-800"}>
                                  {task.task}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 border-t border-slate-200 pt-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h5 className="font-semibold text-slate-900 mb-3">Free Courses</h5>
                            <div className="space-y-2">
                              {phase.resources?.freeCourses?.map((item, idx) => (
                                <a
                                  key={idx}
                                  href={item.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-700"
                                >
                                  <Link2 size={16} />
                                  <span>{item.title}</span>
                                </a>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="font-semibold text-slate-900 mb-3">YouTube Videos</h5>
                            <div className="space-y-2">
                              {phase.resources?.youtube?.map((video, idx) => (
                                <a
                                  key={idx}
                                  href={video.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-700"
                                >
                                  <Youtube size={16} />
                                  <span>{video.title}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-600 text-white rounded-xl p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-6">Progress Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp size={20} />
                      <p className="text-4xl sm:text-5xl font-bold">{currentProgress}%</p>
                    </div>
                    <p className="text-indigo-100">Overall Progress</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Target size={20} />
                      <p className="text-4xl sm:text-5xl font-bold">{roadmap.filter((phase) => phase.status === "in-progress").length}</p>
                    </div>
                    <p className="text-indigo-100">Active Goals</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CheckCircle2 size={20} />
                      <p className="text-4xl sm:text-5xl font-bold">{totalCompletedTasks}</p>
                    </div>
                    <p className="text-indigo-100">Tasks Completed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

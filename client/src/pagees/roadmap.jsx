import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { CheckCircle2, Circle, Target, TrendingUp, Loader2, BookOpen } from "lucide-react";

export default function Roadmap() {
  const [selectedRole, setSelectedRole] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roles = [
    "frontend",
    "backend",
    "fullstack",
    "data",
    "devops",
    "mobile",
    "game",
    "blockchain"
  ];

  const handleGenerateRoadmap = async () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/analysis/roadmap?role=${selectedRole}`);

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const data = await response.json();
      setRoadmap(data.roadmap);

    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (roadmapId, taskIndex) => {
    setRoadmap(
      roadmap.map((item) =>
        item.id === roadmapId
          ? {
              ...item,
              tasks: item.tasks.map((task, idx) =>
                idx === taskIndex ? { ...task, completed: !task.completed } : task
              ),
              progress: Math.round(
                (item.tasks.filter((t, idx) =>
                  idx === taskIndex ? !t.completed : t.completed
                ).length /
                  item.tasks.length) *
                  100
              ),
            }
          : item
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={20} className="text-green-600" />;
      case "in-progress":
        return <Circle size={20} className="text-indigo-600" />;
      default:
        return <Circle size={20} className="text-slate-400" />;
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
              Career Roadmap
            </h1>
            <p className="text-lg text-slate-600">
              Get a personalized learning path for your chosen career role
            </p>
          </div>

          {/* Role Selector */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <BookOpen className="text-indigo-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Select Your Career Path
                </h2>
                <p className="text-sm text-slate-600 mt-1">Choose a role to generate your learning roadmap</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-3 rounded-lg font-medium text-sm capitalize transition-all ${
                    selectedRole === role
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerateRoadmap}
              disabled={!selectedRole || loading}
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <p className="text-red-800 font-semibold">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Roadmap Display */}
          {roadmap && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 capitalize">
                  {selectedRole} Development Roadmap
                </h3>

                <div className="space-y-6">
                  {roadmap.map((phase, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-slate-900 mb-2">
                            {phase.phase}
                          </h4>
                          <p className="text-indigo-600 font-medium mb-3">
                            Duration: {phase.duration}
                          </p>
                          <p className="text-slate-600 mb-4">
                            {phase.description}
                          </p>

                          <div className="mb-4">
                            <h5 className="font-semibold text-slate-900 mb-2">Key Skills:</h5>
                            <div className="flex flex-wrap gap-2">
                              {phase.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
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
                  <TrendingUp size={20} />
                  <p className="text-4xl sm:text-5xl font-bold">
                    {Math.round(
                      roadmap.reduce((acc, r) => acc + r.progress, 0) /
                        roadmap.length
                    )}%
                  </p>
                </div>
                <p className="text-indigo-100">Overall Progress</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target size={20} />
                  <p className="text-4xl sm:text-5xl font-bold">
                    {roadmap.filter((r) => r.status === "in-progress").length}
                  </p>
                </div>
                <p className="text-indigo-100">Active Goals</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 size={20} />
                  <p className="text-4xl sm:text-5xl font-bold">
                    {roadmap.reduce(
                      (acc, r) => acc + r.tasks.filter((t) => t.completed).length,
                      0
                    )}
                  </p>
                </div>
                <p className="text-indigo-100">Tasks Completed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState([
    {
      id: 1,
      title: "JavaScript & React Fundamentals",
      description: "Master core JavaScript concepts and React hooks",
      progress: 75,
      duration: "4 weeks",
      status: "in-progress",
      tasks: [
        { name: "ES6 Basics", completed: true },
        { name: "React Hooks", completed: true },
        { name: "State Management", completed: false },
        { name: "Advanced Patterns", completed: false },
      ],
    },
    {
      id: 2,
      title: "Full-Stack Development",
      description: "Build complete MERN applications",
      progress: 45,
      duration: "6 weeks",
      status: "in-progress",
      tasks: [
        { name: "Backend Setup", completed: true },
        { name: "REST APIs", completed: true },
        { name: "Database Design", completed: false },
        { name: "Authentication", completed: false },
        { name: "Deployment", completed: false },
      ],
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      description: "Prepare for technical interviews",
      progress: 30,
      duration: "8 weeks",
      status: "not-started",
      tasks: [
        { name: "Arrays & Strings", completed: false },
        { name: "Trees & Graphs", completed: false },
        { name: "Dynamic Programming", completed: false },
        { name: "Mock Interviews", completed: false },
      ],
    },
  ]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12 animate-slideInUp">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
              Career Roadmap
            </h1>
            <p className="text-lg text-slate-600">
              Your personalized learning journey to reach your career goals
            </p>
          </div>

          {/* Roadmap Cards */}
          <div className="space-y-6 sm:space-y-8">
            {roadmap.map((milestone, idx) => (
              <div
                key={milestone.id}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">
                        {milestone.status === "completed"
                          ? "✅"
                          : milestone.status === "in-progress"
                          ? "🚀"
                          : "📍"}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-500">
                      {milestone.duration}
                    </p>
                    <p className="text-xs text-slate-400 capitalize">
                      {milestone.status.replace("-", " ")}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {milestone.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                    Learning Goals
                  </h4>
                  <div className="space-y-2">
                    {milestone.tasks.map((task, taskIdx) => (
                      <label
                        key={taskIdx}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(milestone.id, taskIdx)}
                          className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-blue-300 cursor-pointer"
                        />
                        <span
                          className={`text-sm sm:text-base transition-all ${
                            task.completed
                              ? "line-through text-slate-400"
                              : "text-slate-700 font-medium"
                          }`}
                        >
                          {task.name}
                        </span>
                        {task.completed && (
                          <span className="ml-auto text-green-600 font-bold">
                            ✓
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t border-slate-200 flex gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg text-sm sm:text-base">
                    View Resources
                  </button>
                  <button className="flex-1 px-4 py-2.5 border-2 border-primary text-primary hover:bg-blue-50 font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base">
                    Get Help
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="mt-12 bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 sm:p-8 shadow-lg text-white animate-slideInUp">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-5xl font-bold mb-2">
                  {Math.round(
                    roadmap.reduce((acc, r) => acc + r.progress, 0) /
                      roadmap.length
                  )}%
                </p>
                <p className="text-blue-100">Overall Progress</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">
                  {roadmap.filter((r) => r.status === "in-progress").length}
                </p>
                <p className="text-blue-100">Active Goals</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">
                  {roadmap.reduce(
                    (acc, r) => acc + r.tasks.filter((t) => t.completed).length,
                    0
                  )}
                </p>
                <p className="text-blue-100">Tasks Completed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

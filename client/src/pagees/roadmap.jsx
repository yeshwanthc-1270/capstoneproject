import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { CheckCircle2, Circle, Target } from "lucide-react";

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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
              Career Roadmap
            </h1>
            <p className="text-lg text-slate-600">
              Your personalized learning journey to reach your career goals
            </p>
          </div>

          {/* Roadmap Cards */}
          <div className="space-y-6 sm:space-y-8 mb-12">
            {roadmap.map((milestone, idx) => (
              <div
                key={milestone.id}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      {getStatusIcon(milestone.status)}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                          {milestone.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base mt-1">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-500">
                      {milestone.duration}
                    </p>
                    <p className="text-xs text-slate-400 capitalize mt-1">
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
                    <span className="text-sm font-bold text-indigo-600">
                      {milestone.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
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
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-300 cursor-pointer"
                        />
                        <span
                          className={`text-sm sm:text-base transition-all flex-1 ${
                            task.completed
                              ? "line-through text-slate-400"
                              : "text-slate-700 font-medium"
                          }`}
                        >
                          {task.name}
                        </span>
                        {task.completed && (
                          <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-200 flex gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md text-sm sm:text-base">
                    View Resources
                  </button>
                  <button className="flex-1 px-4 py-2.5 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base">
                    Get Help
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 sm:p-8 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
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

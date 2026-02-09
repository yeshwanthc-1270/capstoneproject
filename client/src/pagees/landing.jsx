import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              SkillMorph
            </h1>
            <div className="flex gap-3 sm:gap-4">
              <Link 
                to="/login" 
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-primary font-semibold hover:bg-primary/5 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center animate-slideInUp">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Your Career, <span className="text-primary">Optimized</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
            Intelligent Resume & Career Alignment System that helps you match your skills with industry job roles and build a personalized career roadmap.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Resume Analysis</h3>
              <p className="text-slate-600">AI-powered analysis to optimize your resume for ATS systems</p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Job Matching</h3>
              <p className="text-slate-600">Find roles that align perfectly with your skills and experience</p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Career Roadmap</h3>
              <p className="text-slate-600">Personalized learning path to reach your career goals</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link 
              to="/register" 
              className="px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-1 text-center"
            >
              Get Started Free
            </Link>
            <Link 
              to="/login" 
              className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all duration-200 text-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 sm:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center text-slate-600">
            <p>© 2026 SkillMorph. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Target, Map } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
              SkillMorph
            </h1>
            <div className="flex gap-3 sm:gap-4">
              <Link 
                to="/login" 
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-slate-700 hover:bg-slate-100 font-semibold rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white via-indigo-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Your Career, <span className="text-indigo-600">Optimized</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
              Intelligent Resume & Career Alignment System that helps you match your skills with industry job roles and build a personalized career roadmap.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                <div className="inline-flex p-3 bg-indigo-50 rounded-lg mb-4">
                  <FileText className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Resume Analysis</h3>
                <p className="text-slate-600 text-sm">AI-powered analysis to optimize your resume for ATS systems</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                <div className="inline-flex p-3 bg-indigo-50 rounded-lg mb-4">
                  <Target className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Job Matching</h3>
                <p className="text-slate-600 text-sm">Find roles that align perfectly with your skills and experience</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                <div className="inline-flex p-3 bg-indigo-50 rounded-lg mb-4">
                  <Map className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Career Roadmap</h3>
                <p className="text-slate-600 text-sm">Personalized learning path to reach your career goals</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 lg:py-32 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose SkillMorph?
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Trusted by job seekers and professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-indigo-100 rounded-lg mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h4>
              <p className="text-slate-600">Get instant AI-powered analysis and recommendations</p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-indigo-100 rounded-lg mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h4>
              <p className="text-slate-600">Your data is secure and never shared with third parties</p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-indigo-100 rounded-lg mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Proven Results</h4>
              <p className="text-slate-600">78% of users land interviews within 30 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center text-slate-600">
            <p>© 2026 SkillMorph. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

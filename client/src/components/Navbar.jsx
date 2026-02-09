import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-primary whitespace-nowrap">
              SkillMorph
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-sm sm:text-base text-slate-700 font-medium hidden sm:inline">
              Welcome, User
            </span>
            <button
              onClick={handleLogout}
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-error hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

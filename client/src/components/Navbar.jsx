import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

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
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600 whitespace-nowrap">
              SkillMorph
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-slate-700">
              <User size={18} />
              <span className="text-sm font-medium">Welcome, User</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 font-semibold text-sm sm:text-base"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

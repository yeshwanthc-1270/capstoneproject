import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full" style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottomColor: 'var(--border-color)',
      borderBottomWidth: '1px'
    }}>
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
            {/* global theme toggle */}
            <DarkModeToggle />
            <div className="hidden sm:flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
              <User size={18} />
              <span className="text-sm font-medium">Welcome, User</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-200 font-semibold text-sm sm:text-base"
              style={{
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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

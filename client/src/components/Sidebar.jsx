import { Link, useLocation } from "react-router-dom";
import { FileText, Briefcase, Map, Home, LogOut, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dark, setDark } = useTheme();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/analyze", label: "Resume Analyzer", icon: FileText },
    { path: "/match", label: "Job Matching", icon: Briefcase },
    { path: "/roadmap", label: "Career Roadmap", icon: Map },
  ];

  return (
    <aside className="w-64 sticky top-0 h-screen flex flex-col transition-colors duration-300" style={{
      backgroundColor: dark ? 'var(--bg-secondary)' : 'var(--bg-primary)',
      borderRight: `1px solid var(--border-color)`,
      color: dark ? 'var(--text-primary)' : 'var(--text-primary)'
    }}>
      {/* Header */}
      <div className="p-6 transition-colors duration-300" style={{
        borderBottom: `1px solid var(--border-color)`
      }}>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>SkillMorph</h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Career Intelligence</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? "font-semibold"
                  : ""
              }`}
              style={{
                backgroundColor: active ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                color: active ? 'var(--color-primary)' : 'var(--text-secondary)',
                borderLeft: active ? '4px solid var(--color-primary)' : '4px solid transparent'
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 space-y-3 transition-colors duration-300" style={{
        borderTop: `1px solid var(--border-color)`
      }}>
        <button
          onClick={() => setDark(!dark)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          style={{
            backgroundColor: 'rgba(79, 70, 229, 0.05)',
            color: 'var(--color-primary)',
          }}
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
          <span>{dark ? 'Light' : 'Dark'}</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            color: 'var(--color-error)',
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

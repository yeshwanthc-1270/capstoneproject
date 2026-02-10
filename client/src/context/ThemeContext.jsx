import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Update localStorage and HTML element when dark mode changes
    localStorage.setItem("theme", JSON.stringify(dark));
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  const toggleDark = () => setDark(!dark);

  return (
    <ThemeContext.Provider value={{ dark, setDark: toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

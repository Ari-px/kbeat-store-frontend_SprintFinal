import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("kbeat_theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("kbeat_theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div
        className={
          dark
            ? "min-h-screen bg-slate-950 text-white"
            : "min-h-screen bg-pink-50 text-slate-950"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
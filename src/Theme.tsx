import { useEffect, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize theme from localStorage or default to light
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as "light" | "dark") || "light";
  });

  useEffect(() => {
    // Update document class and localStorage when theme changes
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

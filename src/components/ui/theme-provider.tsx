import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, getTheme, themes } from "@/lib/themes";

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(getTheme(savedTheme));
      document.body.className = getTheme(savedTheme).gradient;
    }
  }, []);

  const setTheme = (themeId: string) => {
    const theme = getTheme(themeId);
    setCurrentTheme(theme);
    localStorage.setItem("theme", themeId);
    document.body.className = theme.gradient;
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
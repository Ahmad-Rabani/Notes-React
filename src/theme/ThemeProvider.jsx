import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from "styled-components";
import { THEME_STORAGE_KEY, darkTheme, lightTheme } from "./themes";

const ThemeContext = createContext(null);

const GlobalStyle = createGlobalStyle`
  html {
    color-scheme: ${({ theme }) => theme.mode};
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => (theme.mode === "dark" ? "#1a1a2e" : "#EEF1DA")};
    color: ${({ theme }) => theme.colors.text};
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }
`;

const getInitialTheme = () => {
  if (typeof window === "undefined") return lightTheme;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" ? darkTheme : lightTheme;
};

export const AppThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.mode);
    localStorage.setItem(THEME_STORAGE_KEY, theme.mode);
  }, [theme.mode]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev.mode === "light" ? darkTheme : lightTheme));
  }, []);

  const setTheme = useCallback((mode) => {
    setThemeState(mode === "dark" ? darkTheme : lightTheme);
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme, isDark: theme.mode === "dark" }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within AppThemeProvider");
  }
  return context;
};

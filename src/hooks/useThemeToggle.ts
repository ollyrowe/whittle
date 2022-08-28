import { useState } from "react";
import { lightTheme, darkTheme, ThemeMode } from "../misc/theme";

/**
 * Hook which stores the current theme which can be toggled.
 *
 * @returns the currently selected theme.
 */
export const useThemeToggle = () => {
  const [theme, setTheme] = useState(prefersDarkTheme ? darkTheme : lightTheme);

  const toggle = () => {
    setTheme(theme.mode === ThemeMode.Light ? darkTheme : lightTheme);
  };

  return { ...theme, toggle };
};

const prefersDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

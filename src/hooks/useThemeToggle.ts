import { useState } from "react";
import { useMediaQuery, Theme as MuiTheme } from "@mui/material";
import { lightTheme, darkTheme } from "../misc/theme";

/**
 * Hook which stores the current theme which can be toggled.
 *
 * @returns the currently selected theme.
 */
export const useThemeToggle = (): ToggleableTheme => {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");

  const [theme, setTheme] = useState(prefersDarkTheme ? darkTheme : lightTheme);

  const toggle = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return { ...theme, toggle };
};

export default useThemeToggle;

export interface ToggleableTheme extends MuiTheme {
  toggle: () => void;
}

import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider as ScThemeProvider } from "styled-components";
import { ToggleableTheme } from "../../hooks/useThemeToggle";

interface Props {
  theme: ToggleableTheme;
  children?: React.ReactNode;
}

/**
 * ThemeProvider Component.
 *
 * This component provides an abstraction around both the Material UI
 * and styled components ThemeProviders allowing for the global theme
 * to be accessed within both contexts.
 */
const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>{children}</ScThemeProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

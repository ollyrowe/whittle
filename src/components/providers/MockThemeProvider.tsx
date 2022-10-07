import React from "react";
import { createLightTheme } from "../../misc/theme";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: React.ReactNode;
}

/**
 * Wrapper around the ThemeProvider component which passes
 * a default set of props to support testing.
 */
const MockThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={createLightTheme(false)}>{children}</ThemeProvider>
  );
};

export default MockThemeProvider;

import React from "react";
import useThemeToggle from "../../hooks/useThemeToggle";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: React.ReactNode;
}

/**
 * Wrapper around the ThemeProvider component which passes
 * a default set of props to support testing.
 */
const MockThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = useThemeToggle();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MockThemeProvider;

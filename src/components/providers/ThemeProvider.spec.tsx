import React from "react";
import { render } from "@testing-library/react";
import ThemeProvider from "./ThemeProvider";
import { lightTheme } from "../../misc/theme";

it("renders", () => {
  const theme = { ...lightTheme, toggle: () => {} };

  render(<ThemeProvider theme={theme} />);
});

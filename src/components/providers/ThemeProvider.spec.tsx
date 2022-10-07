import React from "react";
import { render } from "@testing-library/react";
import ThemeProvider from "./ThemeProvider";
import { createLightTheme } from "../../misc/theme";

it("renders", () => {
  render(<ThemeProvider theme={createLightTheme(false)} />);
});

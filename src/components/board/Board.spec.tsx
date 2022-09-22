import React from "react";
import { render } from "@testing-library/react";
import Board from "./Board";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../misc/theme";

it("renders", () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <Board />
    </ThemeProvider>
  );
});

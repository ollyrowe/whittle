import React from "react";
import { render } from "@testing-library/react";
import Board from "./Board";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <Board />
    </MockThemeProvider>
  );
});

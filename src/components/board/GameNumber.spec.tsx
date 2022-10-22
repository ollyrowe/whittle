import React from "react";
import { render } from "@testing-library/react";
import GameNumber from "./GameNumber";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <GameNumber />
    </MockThemeProvider>
  );
});

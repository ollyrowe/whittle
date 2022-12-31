import React from "react";
import { render } from "@testing-library/react";
import GameTitle from "./GameTitle";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <GameTitle number={1} answer={{ letters: "", theme: "", words: [] }} />
    </MockThemeProvider>
  );
});

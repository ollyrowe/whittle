import React from "react";
import { render, screen } from "@testing-library/react";
import AppBar from "./AppBar";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders the title", () => {
  render(
    <MockThemeProvider>
      <AppBar />
    </MockThemeProvider>
  );

  const title = screen.getByText("Whittle");

  expect(title).toBeInTheDocument();
});

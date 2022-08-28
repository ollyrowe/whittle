import React from "react";
import { render, screen } from "@testing-library/react";
import AppBar from "./AppBar";

it("renders the title", () => {
  render(<AppBar />);

  const title = screen.getByText("Whittle");

  expect(title).toBeInTheDocument();
});

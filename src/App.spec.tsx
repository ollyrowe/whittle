import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the title", () => {
  render(<App />);

  const title = screen.getByText("Whittle");

  expect(title).toBeInTheDocument();
});

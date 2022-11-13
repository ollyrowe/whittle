import React from "react";
import { render, screen } from "@testing-library/react";
import SlideTransition from "./SlideTransition";

it("renders", () => {
  const text = "text";

  render(
    <SlideTransition>
      <div>{text}</div>
    </SlideTransition>
  );

  expect(screen.getByText(text)).toBeInTheDocument();
});

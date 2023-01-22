import React from "react";
import { render } from "@testing-library/react";
import ScreenshotButton from "./ScreenshotButton";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ScreenshotButton />
    </MockThemeProvider>
  );
});

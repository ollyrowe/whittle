import React from "react";
import { render } from "@testing-library/react";
import Rack from "./Rack";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <Rack />
    </MockThemeProvider>
  );
});

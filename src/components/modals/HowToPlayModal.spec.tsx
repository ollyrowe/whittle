import React from "react";
import { render } from "@testing-library/react";
import HowToPlayModal from "./HowToPlayModal";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <HowToPlayModal open={true} onClose={() => {}} />{" "}
    </MockThemeProvider>
  );
});

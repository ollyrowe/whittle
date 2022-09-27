import React from "react";
import { render } from "@testing-library/react";
import StatisticsModal from "./StatisticsModal";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <StatisticsModal open={true} onClose={() => {}} />
    </MockThemeProvider>
  );
});
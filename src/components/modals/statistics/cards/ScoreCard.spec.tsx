import React from "react";
import { render } from "@testing-library/react";
import ScoreCard from "./ScoreCard";
import MockThemeProvider from "../../../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ScoreCard />
    </MockThemeProvider>
  );
});

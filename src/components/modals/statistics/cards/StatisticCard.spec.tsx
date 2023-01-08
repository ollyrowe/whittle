import React from "react";
import { render } from "@testing-library/react";
import StatisticCard from "./StatisticCard";
import MockThemeProvider from "../../../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <StatisticCard title="title" />
    </MockThemeProvider>
  );
});

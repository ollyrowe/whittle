import React from "react";
import { render } from "@testing-library/react";
import TimeCard from "./TimeCard";
import MockThemeProvider from "../../../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <TimeCard />
    </MockThemeProvider>
  );
});

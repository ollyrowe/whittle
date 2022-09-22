import React from "react";
import { render } from "@testing-library/react";
import StatisticsModal from "./StatisticsModal";

it("renders", () => {
  render(<StatisticsModal open={true} onClose={() => {}} />);
});

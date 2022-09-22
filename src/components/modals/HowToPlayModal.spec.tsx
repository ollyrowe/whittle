import React from "react";
import { render } from "@testing-library/react";
import HowToPlayModal from "./HowToPlayModal";

it("renders", () => {
  render(<HowToPlayModal open={true} onClose={() => {}} />);
});

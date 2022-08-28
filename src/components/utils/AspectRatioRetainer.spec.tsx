import React from "react";
import { render } from "@testing-library/react";
import AspectRatioRetainer from "./AspectRatioRetainer";

it("renders", () => {
  render(
    <AspectRatioRetainer ratio={[1, 2]}>
      <div></div>
    </AspectRatioRetainer>
  );
});

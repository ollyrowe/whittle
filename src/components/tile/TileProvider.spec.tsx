import React from "react";
import { render } from "@testing-library/react";
import TileProvider from "./TileProvider";

it("renders", () => {
  render(<TileProvider letters={[]} />);
});

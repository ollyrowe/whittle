import React from "react";
import { render } from "@testing-library/react";
import Tile from "./Tile";
import { TileState } from "../../model/enums/TileState";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <Tile id={1} state={TileState.DEFAULT} />
    </MockThemeProvider>
  );
});

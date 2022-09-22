import React from "react";
import { render } from "@testing-library/react";
import Tile from "./Tile";
import { TileState } from "../../model/enums/TileState";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../misc/theme";

it("renders", () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <Tile id={1} state={TileState.DEFAULT} />
    </ThemeProvider>
  );
});

import React from "react";
import { render } from "@testing-library/react";
import ShareBoardButton from "./ShareBoardButton";
import MockThemeProvider from "../providers/MockThemeProvider";

it("renders", () => {
  render(
    <MockThemeProvider>
      <ShareBoardButton />
    </MockThemeProvider>
  );
});

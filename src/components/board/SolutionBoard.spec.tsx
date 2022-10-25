import { render } from "@testing-library/react";
import { Board } from "../../model/Board";
import MockThemeProvider from "../providers/MockThemeProvider";
import SolutionBoard from "./SolutionBoard";

describe("SolutionBoard", () => {
  it("renders", () => {
    const solution = { number: 1, theme: "theme", board: new Board() };

    render(
      <MockThemeProvider>
        <SolutionBoard solution={solution} />
      </MockThemeProvider>
    );
  });
});

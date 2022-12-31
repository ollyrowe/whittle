import { render } from "@testing-library/react";
import { Board } from "../../model/Board";
import { GameSolution } from "../../model/game/GameLoader";
import MockThemeProvider from "../providers/MockThemeProvider";
import SolutionBoard from "./SolutionBoard";

describe("SolutionBoard", () => {
  it("renders", () => {
    const solution: GameSolution = {
      number: 1,
      theme: "theme",
      board: new Board(),
      answer: { letters: "", theme: "", words: [] },
    };

    render(
      <MockThemeProvider>
        <SolutionBoard solution={solution} />
      </MockThemeProvider>
    );
  });
});

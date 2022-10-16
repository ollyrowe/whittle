import { BOARD_HEIGHT, BOARD_WIDTH } from "../model/Board";
import { AnswerParser } from "./AnswerParser";
import { valid as validAnswer } from "./testAnswers";

describe("AnswerParser", () => {
  it("creates a set of rack tiles", () => {
    const tiles = AnswerParser.createRackTiles(validAnswer);

    expect(tiles).toHaveLength(validAnswer.letters.length);

    tiles.forEach((tile) => {
      const location = tile.getLocation();

      expect(location.name).toBe("rack");
    });
  });

  it("creates a set of solution board tiles", () => {
    const tiles = AnswerParser.createSolutionBoardTiles(validAnswer);

    expect(tiles).toHaveLength(validAnswer.letters.length);

    tiles.forEach((tile) => {
      const location = tile.getLocation();

      expect(location.name).toBe("board");
    });
  });

  it("creates a solution board", () => {
    const board = AnswerParser.createSolutionBoard(validAnswer);

    const tiles = board.getTiles();

    expect(tiles).toHaveLength(BOARD_WIDTH * BOARD_HEIGHT);

    tiles.forEach((tile) => {
      const location = tile.getLocation();

      expect(location.name).toBe("board");
    });
  });
});

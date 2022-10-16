import { Board, BOARD_HEIGHT, BOARD_WIDTH } from "../model/Board";
import { Letter } from "../model/enums/Letter";
import { Tile } from "../model/Tile";
import { Answer } from "./AnswerValidator";

/**
 * Answer Parser.
 *
 * Utility which can parse an answer object into a set of
 * preconfigured tiles.
 */
export class AnswerParser {
  /**
   * Given an answer solution, this method creates a set of tiles
   * with a default location set to the rack.
   *
   * @param answer - the answer to parse.
   */
  public static createRackTiles(answer: Answer) {
    const letters = answer.letters.split("") as Letter[];

    return letters.map((letter) => new Tile({ name: "rack" }, letter));
  }

  /**
   * Given an answer solution, this method creates a board containing
   * the letter tiles placed in the solution location.
   *
   * @param answer - the answer to parse.
   */
  public static createSolutionBoard(answer: Answer) {
    const solutionTiles = AnswerParser.createSolutionBoardTiles(answer);

    const tiles: Tile[] = [];

    for (let row = 1; row <= BOARD_HEIGHT; row++) {
      for (let column = 1; column <= BOARD_WIDTH; column++) {
        const solutionTile = solutionTiles.find((tile) => {
          const location = tile.getLocation();

          return (
            location.name === "board" &&
            location.row === row &&
            location.column === column
          );
        });

        if (solutionTile) {
          tiles.push(solutionTile);
        } else {
          tiles.push(new Tile({ name: "board", row, column }));
        }
      }
    }

    return new Board(tiles);
  }

  /**
   * Given an answer solution, this method creates a set of board tiles
   * which form the solution. Note that this method will not detect any
   * conflicting tiled which incorrectly have the same location on the
   * board.
   *
   * @param answer - the answer to parse.
   */
  public static createSolutionBoardTiles(answer: Answer) {
    const tiles: Tile[] = [];

    // Loop through the words within the answer
    answer.words.forEach((word) => {
      const { direction, start } = word;

      const letters = word.letters.split("") as Letter[];

      letters.forEach((letter, index) => {
        const column =
          direction === "horizontal" ? start.column + index : start.column;
        const row = direction === "vertical" ? start.row + index : start.row;

        const tileAtSameLocation = tiles.find((tile) => {
          const location = tile.getLocation();

          return (
            location.name === "board" &&
            location.row === row &&
            location.column === column
          );
        });

        if (!tileAtSameLocation || tileAtSameLocation.getLetter() !== letter) {
          tiles.push(new Tile({ name: "board", row, column }, letter));
        }
      });
    });

    return tiles;
  }
}

import { Board } from "../Board";
import { Letter } from "../enums/Letter";
import { Tile } from "../Tile";

export class ScoreUtils {
  /**
   * Calculates the total number of points achieved by the letters
   * placed on a given board.
   *
   * @param board - the board to return the score for.
   * @returns number of points scored.
   */
  public static getScore(board: Board) {
    return board
      .getTiles()
      .map((tile) => {
        const letter = tile.getLetter();

        if (letter) {
          const pointsForLetter = points[letter];

          const multiplier = ScoreUtils.getTileMultiplier(board, tile);

          return pointsForLetter * multiplier;
        }

        return 0;
      })
      .reduce((a, b) => a + b, 0);
  }

  /**
   * Determines the multiplier which should be assigned to a specified
   * tile given its contents and location on the board. Used to support
   * the calculation of the score.
   *
   * @param board - the board containing the tile in question.
   * @param tile - the tile to get the multiplier for.
   * @returns the numeric multiplier assigned to the tile.
   */
  public static getTileMultiplier(board: Board, tile: Tile) {
    const words = board.getWordsAt(tile.getLocation());

    // If this letter forms two words 3 or more letters long
    if (words.horizontal.getLength() >= 3 && words.vertical.getLength() >= 3) {
      return 2;
    }

    // If this letter forms one word 3 or more letters long
    if (words.horizontal.getLength() >= 3 || words.vertical.getLength() >= 3) {
      return 1;
    }

    return 0;
  }
}

/**
 * The base points to be applied to each letter based on the official
 * Scrabble numbers.
 */
export const points: Record<Letter, number> = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

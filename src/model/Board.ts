import { Container } from "./Container";
import { GraphUtils } from "./utils/GraphUtils";
import { Letter } from "./enums/Letter";
import { Location } from "./enums/Location";
import { TileState } from "./enums/TileState";
import { Tile } from "./Tile";
import { Word } from "./Word";
import { Answer } from "./answers/AnswerValidator";

/**
 * Represents the main board area for tiles to be placed upon.
 */
export class Board extends Container {
  /** Whether the contained tiles should be disabled */
  disabled: boolean;

  /** The width of the board */
  static WIDTH = 5;
  /** The height of the board */
  static HEIGHT = 6;

  constructor(tiles?: Tile[]) {
    super(tiles || Board.createTiles());

    this.disabled = false;
  }

  /**
   * Determines whether the board is current disabled.
   *
   * @returns boolean indicating whether the board is disabled.
   */
  isDisabled() {
    return this.disabled;
  }

  /**
   * Disables the board.
   */
  disable() {
    this.disabled = true;
  }

  updateTileStatuses(themeWords?: string[]) {
    // Calculate the new state of each tile on the board
    this.tiles.forEach((tile) =>
      tile.setState(this.getTileState(tile, themeWords))
    );
    // Update the updated state
    this.updated = true;
  }

  /**
   * Determines the state of a given tile.
   *
   * @param tile - the tile to determine the state of.
   * @returns the state of the tile.
   */
  private getTileState(tile: Tile, themeWords?: string[]) {
    // If the tile is actually on the board
    if (tile.getLocation().name === "board") {
      // Get the words that this tile forms part of
      const words = this.getWordsAt(tile.getLocation());

      // If this tile has been placed on its own
      if (words.horizontal?.hasLength(1) && words.vertical?.hasLength(1)) {
        return TileState.DEFAULT;
      }

      const isHorizontalWordValid = words.horizontal?.isValid();

      const isVerticalWordValid = words.vertical?.isValid();

      // If both words are either valid or have a length of 1
      if (
        (isHorizontalWordValid || words.horizontal?.hasLength(1)) &&
        (isVerticalWordValid || words.vertical?.hasLength(1))
      ) {
        if (
          themeWords?.find(
            (word) =>
              word === words.horizontal?.toString() ||
              word === words.vertical?.toString()
          )
        ) {
          return TileState.CORRECT_THEME_WORD;
        } else {
          return TileState.CORRECT;
        }
      } else if (isHorizontalWordValid || isVerticalWordValid) {
        return TileState.PARTIALLY_CORRECT;
      }
    }

    return TileState.DEFAULT;
  }

  /**
   * Determines whether all letters placed on the board are connected.
   *
   * This method employees a depth-first search, starting at the first
   * tile containing a letter, and traverses all other letter tiles by
   * moving to adjacent tiles only. If all letters placed on the board
   * are detected by the search, then all letters are deemed connected.
   *
   * @returns boolean indicating whether all letters are connected.
   */
  areLettersConnected() {
    // All tiles on the board that have a letter
    const allLetterTiles = this.tiles.filter((tile) => tile.hasLetter());

    // The first tile that has a letter
    const firstLetterTile = this.tiles.find((tile) => tile.hasLetter());

    if (firstLetterTile) {
      // Discover all connected letter tiles
      const connectedLetterTiles = GraphUtils.depthFirstSearch(
        firstLetterTile,
        (tile) => this.getAdjacentLetterTiles(tile)
      );

      // If all letter tiles have been discoverd
      return allLetterTiles.length === connectedLetterTiles.length;
    }

    return false;
  }

  /**
   * Gets all letter tiles which are adjacent to a given tile.
   *
   * A letter tile is considered adjacent if it is either directly
   * above, below, to the left or right of the specified tile.
   *
   * @param tile - the tile to identify the adjacent tiles for.
   * @returns array containing all adjacent letter tiles.
   */
  private getAdjacentLetterTiles(tile: Tile): Tile[] {
    const adjacentTiles = [];

    const location = tile.getLocation();

    // If the tile is actually on the board
    if (location.name === "board") {
      const aboveTile = this.getTileAt(location.column, location.row - 1);

      if (aboveTile && aboveTile.hasLetter()) {
        adjacentTiles.push(aboveTile);
      }

      const belowTile = this.getTileAt(location.column, location.row + 1);

      if (belowTile && belowTile.hasLetter()) {
        adjacentTiles.push(belowTile);
      }

      const leftTile = this.getTileAt(location.column - 1, location.row);

      if (leftTile && leftTile.hasLetter()) {
        adjacentTiles.push(leftTile);
      }

      const rightTile = this.getTileAt(location.column + 1, location.row);

      if (rightTile && rightTile.hasLetter()) {
        adjacentTiles.push(rightTile);
      }
    }

    return adjacentTiles;
  }

  /**
   * Given a location of a tile on the board, this method will return any words
   * that the tile's letter forms in both the vertical and horizontal axes.
   *
   * @param location - the location on the board.
   * @returns any words that the tile's letter forms.
   */
  public getWordsAt(location: Location) {
    // If the location is actually a location on the board
    if (location.name === "board") {
      // Get the tile at the specified location
      const tile = this.getTileAt(location.column, location.row);

      if (tile) {
        const letter = tile.getLetter();

        if (letter) {
          let startColumn = location.column;

          // Starting at the location's column, loop back until an empty tile is found
          while (startColumn > 0) {
            const tile = this.getTileAt(startColumn - 1, location.row);

            // If the tile exists and has a letter
            if (tile && tile.hasLetter()) {
              startColumn--;
            } else {
              break;
            }
          }

          const horizontalLetters: Letter[] = [];

          let currentColumn = startColumn;

          let tile = this.getTileAt(currentColumn, location.row);

          // Starting at left-most letter tile, go right through all neighbouring letters
          while (tile && tile.hasLetter()) {
            // Push the letter to the array
            horizontalLetters.push(tile.getLetter()!);

            // Increment the current column
            currentColumn++;

            // Update the tile to be the next one along
            tile = this.getTileAt(currentColumn, location.row);
          }

          let startRow = location.row;

          // Starting at the location's row, loop back until an empty tile is found
          while (startRow > 0) {
            const tile = this.getTileAt(location.column, startRow - 1);

            // If the tile exists and has a letter
            if (tile && tile.hasLetter()) {
              startRow--;
            } else {
              break;
            }
          }

          const verticalLetters: Letter[] = [];

          let currentRow = startRow;

          tile = this.getTileAt(location.column, currentRow);

          // Starting at top-most letter tile, go down through all neighbouring letters
          while (tile && tile.hasLetter()) {
            // Push the letter to the array
            verticalLetters.push(tile.getLetter()!);

            // Increment the current row
            currentRow++;

            // Update the tile to be the next one down
            tile = this.getTileAt(location.column, currentRow);
          }

          return {
            horizontal: new Word(horizontalLetters),
            vertical: new Word(verticalLetters),
          };
        }
      }
    }

    return {
      horizontal: new Word([]),
      vertical: new Word([]),
    };
  }

  /**
   * Gets a tile at a specified location.
   *
   * @param column - the column of the tile to be fetched.
   * @param row - the row of the tile to be fetched.
   * @returns the tile, if present.
   */
  public getTileAt(column: number, row: number) {
    return this.tiles.find((tile) => {
      const location = tile.getLocation();

      return (
        location.name === "board" &&
        location.row === row &&
        location.column === column
      );
    });
  }

  /**
   * Enables the tiles associated with a given set of solution words
   * and disables all other tiles.
   *
   * @param answer - the answer containing the solution words.
   */
  public enableSolutionTilesOnly(answer: Answer) {
    // Disable all tiles
    this.tiles.forEach((tile) => tile.disable());

    // Loop through each word within the solution
    answer.words.forEach((word) => {
      const { start, direction } = word;

      // Loop through each letter within the word and enable the tile
      for (let i = 0; i < word.letters.length; i++) {
        const tile = this.getTileAt(
          direction === "horizontal" ? start.column + i : start.column,
          direction === "vertical" ? start.row + i : start.row
        );

        tile?.enable();
      }
    });
  }

  /**
   * Initialises a set of empty tiles to fill the height and width
   * of a new board.
   *
   * @returns array of new tiles.
   */
  private static createTiles() {
    const tiles = [];

    for (let row = 1; row <= Board.HEIGHT; row++) {
      for (let column = 1; column <= Board.WIDTH; column++) {
        tiles.push(new Tile({ name: "board", row, column }));
      }
    }

    return tiles;
  }
}

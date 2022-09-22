import { useEffect, useState } from "react";
import { Board } from "../model/Board";
import { Letter } from "../model/enums/Letter";
import { Rack } from "../model/Rack";
import { Tile } from "../model/Tile";

export interface Game {
  board: Board;
  rack: Rack;
  onSwapTiles: (firstTile: Tile, secondTile: Tile) => void;
  displayStats: boolean;
  openStats: () => void;
  closeStats: () => void;
}

/**
 * Hook which handles the core game logic and state.
 *
 * @returns various game state and control methods.
 */
export const useGame = (): Game => {
  // The main game board component
  const [board, setBoard] = useState(new Board());

  // The rack containing the initial letter set
  const [rack, setRack] = useState(new Rack([]));

  // Whether the statistics modal should be displayed
  const [displayStats, setDisplayStats] = useState(false);

  /**
   * Initialises a new game.
   */
  const initialiseGame = () => {
    setBoard(new Board());
    setRack(new Rack(createTiles()));
  };

  /**
   * Upon initial render, initialise a new game.
   */
  useEffect(() => {
    initialiseGame();
  }, []);

  /**
   * Callback which should be invoked on swapping two game tiles.
   *
   * This function handles the core game logic, mutating the underlying
   * game state.
   *
   * @param firstTile - the first tile being swapped.
   * @param secondTile - the second tile being swapped.
   */
  const onSwapTiles = (firstTile: Tile, secondTile: Tile) => {
    if (firstTile !== secondTile) {
      const updatedBoard = new Board(board.getTiles());
      const updatedRack = new Rack(rack.getTiles());

      // Swap the two tiles within the containers
      updatedRack.swapTiles(firstTile, secondTile);
      updatedBoard.swapTiles(secondTile, firstTile);

      const firstTileLocation = firstTile.getLocation();

      // Update the location of the two tiles
      firstTile.setLocation(secondTile.getLocation());
      secondTile.setLocation(firstTileLocation);

      // Reset the state of each tile in the board
      updatedBoard.getTiles().forEach((tile) => tile.reset());
      // Reset the state of each tile in the rack
      updatedRack.getTiles().forEach((tile) => tile.reset());

      // Calculate the new state of each tile on the board
      updatedBoard.getTiles().forEach((tile) => {
        tile.setState(updatedBoard.getTileState(tile));
      });

      // All tiles with letters currently in the rack
      const rackTilesWithLetters = updatedRack
        .getTiles()
        .filter((tile) => tile.hasLetter());

      // If all letters have been placed on the board
      if (rackTilesWithLetters.length === 0) {
        // All tiles with letters currently on the board
        const boardTilesWithLetters = updatedBoard
          .getTiles()
          .filter((tile) => tile.hasLetter());

        // If all tiles with letters on the board are correct
        if (boardTilesWithLetters.every((tile) => tile.isCorrect())) {
          // If all letter tiles are connected
          if (updatedBoard.areLettersConnected()) {
            // User has won the game, disabled the board
            updatedBoard.disable();
            // Display the game statistics
            setDisplayStats(true);
          }
        }
      }

      setBoard(updatedBoard);
      setRack(updatedRack);
    }
  };

  /**
   * Opens the statistics modal.
   */
  const openStats = () => {
    setDisplayStats(true);
  };

  /**
   * Closes the statistics modal.
   */
  const closeStats = () => {
    setDisplayStats(false);
  };

  return { board, rack, onSwapTiles, displayStats, openStats, closeStats };
};

const letters = [
  Letter.A,
  Letter.B,
  Letter.C,
  Letter.D,
  Letter.E,
  Letter.F,
  Letter.G,
  Letter.H,
  Letter.I,
  Letter.J,
  Letter.K,
  Letter.L,
  Letter.M,
  Letter.N,
  Letter.O,
];

const createTiles = () => {
  return letters.map((letter) => new Tile({ name: "rack" }, letter));
};
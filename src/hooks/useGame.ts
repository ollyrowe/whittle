import { createRef, useCallback, useEffect, useState } from "react";
import { Board } from "../model/Board";
import { Rack } from "../model/Rack";
import { Tile } from "../model/Tile";
import { gameWinSound, tilePlaceSound } from "../misc/sounds";
import useSettings, { SettingsOptions } from "./useSettings";
import { useConfetti, ConfettiControls } from "./useConfetti";
import { CompletedGame, GameLoader } from "../model/game/GameLoader";
import { DateUtils } from "../model/utils/DateUtils";

export interface Game {
  number: number;
  date: Date;
  board: Board;
  rack: Rack;
  settings: SettingsOptions;
  completedGames: CompletedGame[];
  onSwapTiles: (firstTile: Tile, secondTile: Tile) => void;
  displayStats: boolean;
  openStats: () => void;
  closeStats: () => void;
  displayHowToPlay: boolean;
  openHowToPlay: () => void;
  closeHowToPlay: () => void;
  reset: () => void;
  boardRef: React.RefObject<HTMLDivElement>;
  confetti: ConfettiControls;
}

/**
 * Hook which handles the core game logic and state.
 *
 * @returns various game state and control methods.
 */
export const useGame = (): Game => {
  // Today's game number
  const [number, setNumber] = useState(loadedGame.number);

  // Today's game date
  const [date, setDate] = useState(loadedGame.date);

  // The main game board component
  const [board, setBoard] = useState(loadedGame.board);

  // The rack containing the initial letter set
  const [rack, setRack] = useState(loadedGame.rack);

  // The games that the user has already completed
  const [completedGames, setCompletedGames] = useState(
    GameLoader.getCompletedGames()
  );

  // The game settings storing the user's preferences
  const settings = useSettings();

  // Whether the statistics modal should be displayed
  const [displayStats, setDisplayStats] = useState(false);

  // Whether the how to play modal should be displayed
  const [displayHowToPlay, setDisplayHowToPlay] = useState(false);

  // Confetti firing controls
  const confetti = useConfetti();

  // Ref to be bound to the board component
  const boardRef = createRef<HTMLDivElement>();

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
    // Play the tile place sound effect
    playSound(tilePlaceSound);

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

      setBoard(updatedBoard);
      setRack(updatedRack);
    }
  };

  /**
   * Plays a sound if the user wants to hear it.
   *
   * @param sound - the sound to be played.
   */
  const playSound = useCallback(
    (sound: HTMLAudioElement) => {
      if (settings.enableSoundFx) {
        sound.play();
      }
    },
    [settings]
  );

  /**
   * Resets the game.
   */
  const reset = () => {
    const game = GameLoader.getTodaysGame();

    setNumber(game.number);
    setDate(game.date);
    setBoard(game.board);
    setRack(game.rack);
  };

  const saveCompletedGame = useCallback((completedGame: CompletedGame) => {
    // Update the local completed games
    setCompletedGames((completedGames) => [...completedGames, completedGame]);
    // Save the completed game to local storage
    GameLoader.addCompletedGame(completedGame);
  }, []);

  /**
   * Handles the game win.
   *
   * @param board - the board to be updated.
   */
  const handleWin = useCallback(
    (board: Board) => {
      // If there isn't already a completed game for the same day
      if (
        !completedGames.find((game) => DateUtils.isSameDay(game.date, date))
      ) {
        // Save the completed game
        saveCompletedGame(new CompletedGame(number, date, board));
      }

      // Play the game win sound effect
      playSound(gameWinSound);
      // Disable the board
      board.disable();
      // Display the game statistics
      setDisplayStats(true);
      // Fire confetti after a short delay
      setTimeout(confetti.fire, 150);
    },
    [completedGames, date, number, saveCompletedGame, playSound, confetti.fire]
  );

  /**
   * Effect which handles the core game logic.
   *
   * Watches for changes to the board and rack.
   */
  useEffect(() => {
    // If the board or rack's tiles haven't yet been updated
    if (!board.isUpdated() || !rack.isUpdated()) {
      const updatedBoard = new Board(board.getTiles());
      const updatedRack = new Rack(rack.getTiles());

      // Update the statuses of the tiles
      updatedBoard.updateTileStatuses();
      updatedRack.updateTileStatuses();

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
            // Handle the game win
            handleWin(updatedBoard);
          }
        }
      }

      setBoard(updatedBoard);
      setRack(updatedRack);
    }
  }, [board, rack, handleWin]);

  /**
   * Upon any changes to the board and rack, save the game.
   */
  useEffect(() => {
    GameLoader.saveGame(number, date, board, rack);
  }, [number, date, board, rack]);

  /**
   * Effect which handles the last visited local storage state.
   *
   * If this is the user's first visit to the site, the how to play modal is displayed.
   */
  useEffect(() => {
    const lastVisited = localStorage.getItem(LAST_VISITED_LS_KEY);

    if (!lastVisited) {
      openHowToPlay();
    }

    localStorage.setItem(LAST_VISITED_LS_KEY, JSON.stringify(new Date()));
  }, []);

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

  /**
   * Opens the how to play modal.
   */
  const openHowToPlay = () => {
    setDisplayHowToPlay(true);
  };

  /**
   * Closes the how to play modal.
   */
  const closeHowToPlay = () => {
    setDisplayHowToPlay(false);
  };

  return {
    number,
    date,
    board,
    rack,
    settings,
    completedGames,
    onSwapTiles,
    displayStats,
    openStats,
    closeStats,
    displayHowToPlay,
    openHowToPlay,
    closeHowToPlay,
    reset,
    boardRef,
    confetti,
  };
};

// Load the current game
const loadedGame = GameLoader.loadGame();

// Local storage key used to store the last time the user visited the site
const LAST_VISITED_LS_KEY = "last-visited";

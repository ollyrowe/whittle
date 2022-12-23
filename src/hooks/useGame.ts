import { createRef, useCallback, useEffect, useState } from "react";
import { Board } from "../model/Board";
import { Rack } from "../model/Rack";
import { Tile } from "../model/Tile";
import { gameWinSound, tilePlaceSound } from "../misc/sounds";
import { SettingsOptions } from "./useSettings";
import { useConfetti, ConfettiControls } from "./useConfetti";
import { useFirstRender } from "./useFirstRender";
import { CompletedGame, GameLoader } from "../model/game/GameLoader";
import { DateUtils } from "../model/utils/DateUtils";
import { useNotificationContext } from "../components/providers/NotificationProvider";

export interface Game {
  number: number;
  date: Date;
  board: Board;
  rack: Rack;
  settings: SettingsOptions;
  completedGames: CompletedGame[];
  outlineRack: boolean;
  setOutlineRack: React.Dispatch<React.SetStateAction<boolean>>;
  onSwapTiles: (firstTile: Tile, secondTile: Tile) => void;
  onReturnTileToRack: (tile: Tile) => void;
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
export const useGame = (settings: SettingsOptions): Game => {
  // Load the current game
  const [loadedGame, setLoadedGame] = useState(
    GameLoader.loadGame(settings.enableHardMode)
  );

  // Today's game number
  const [number, setNumber] = useState(loadedGame.number);

  // Today's game date
  const [date, setDate] = useState(loadedGame.date);

  // Today's game answer
  const [answer, setAnswer] = useState(loadedGame.answer);

  // The main game board component
  const [board, setBoard] = useState(loadedGame.board);

  // The rack containing the initial letter set
  const [rack, setRack] = useState(loadedGame.rack);

  // The games that the user has already completed
  const [completedGames, setCompletedGames] = useState(
    GameLoader.getCompletedGames()
  );

  // Whether the statistics modal should be displayed
  const [displayStats, setDisplayStats] = useState(false);

  // Whether the how to play modal should be displayed
  const [displayHowToPlay, setDisplayHowToPlay] = useState(false);

  // Confetti firing controls
  const confetti = useConfetti();

  // Ref to be bound to the board component
  const boardRef = createRef<HTMLDivElement>();

  // Whether this is the first render
  const isFirstRender = useFirstRender();

  // Whether the rack should appear as outlined
  const [outlineRack, setOutlineRack] = useState(false);

  // Extract notification utilities
  const { currentNotification, dispatchNotification } =
    useNotificationContext();

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

    if (firstTile !== secondTile && !secondTile.isDisabled()) {
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

  const onReturnTileToRack = (tile: Tile) => {
    if (tile.hasLetter()) {
      const emptyRackTile = rack.getTiles().find((tile) => !tile.hasLetter());

      if (emptyRackTile) {
        onSwapTiles(emptyRackTile, tile);
      }
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
  const reset = useCallback(() => {
    const game = GameLoader.getTodaysGame(settings.enableHardMode);

    setLoadedGame(game);
    setNumber(game.number);
    setDate(game.date);
    setAnswer(game.answer);
    setBoard(game.board);
    setRack(game.rack);
  }, [settings.enableHardMode]);

  const enableBoardTiles = useCallback(() => {
    setBoard((board) => {
      const updatedBoard = new Board(board.getTiles());

      updatedBoard.getTiles().forEach((tile) => tile.enable());

      return updatedBoard;
    });
  }, []);

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
        // Infer the game mode from the settings
        const mode = settings.enableHardMode ? "hard" : "normal";
        // Save the completed game
        saveCompletedGame(new CompletedGame(number, date, board, mode));
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
    [
      completedGames,
      settings.enableHardMode,
      number,
      date,
      saveCompletedGame,
      playSound,
      confetti.fire,
    ]
  );

  /**
   * Handles the dispatching of hint notifications.
   */
  const displayHint = useCallback(
    (hint: string) => {
      // If hints are enabled
      if (settings.enableHints) {
        // Don't dispatch the notification if the same one is already being displayed
        if (currentNotification !== hint) {
          dispatchNotification(hint);
        }
      }
    },
    [settings.enableHints, currentNotification, dispatchNotification]
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

      const themeWords = answer.words.map(({ letters }) => letters);

      // Update the statuses of the tiles
      updatedBoard.updateTileStatuses(themeWords);
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
          } else {
            // Display a hint informing user that letters need to be connected
            displayHint("All words must be connected to win!");
          }
        } else {
          // Display a hint informing user that letters need to spell words
          displayHint("All words must be valid to win!");
        }
      }

      setBoard(updatedBoard);
      setRack(updatedRack);
    }
  }, [board, rack, answer, handleWin, displayHint]);

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
   * Effect which which handles changes to the hard mode setting.
   */
  useEffect(() => {
    // Avoid resetting the board on initial render
    if (!isFirstRender) {
      // If hard mode has been enabled
      if (settings.enableHardMode) {
        reset();
      } else {
        enableBoardTiles();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.enableHardMode]);

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
    outlineRack,
    setOutlineRack,
    onSwapTiles,
    onReturnTileToRack,
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

// Local storage key used to store the last time the user visited the site
const LAST_VISITED_LS_KEY = "last-visited";

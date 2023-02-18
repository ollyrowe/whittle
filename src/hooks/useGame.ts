import { useCallback, useEffect, useMemo, useState } from "react";
import { Board } from "../model/Board";
import { Rack } from "../model/Rack";
import { Tile } from "../model/Tile";
import { gameWinSound, tilePlaceSound } from "../misc/sounds";
import { SettingsOptions } from "./useSettings";
import { useConfetti, ConfettiControls } from "./useConfetti";
import { useFirstRender } from "./useFirstRender";
import { useTimer, Timer } from "./useTimer";
import { CompletedGame, GameLoader } from "../model/game/GameLoader";
import { DateUtils } from "../model/utils/DateUtils";
import { ScoreUtils } from "../model/utils/ScoreUtils";
import { Answer } from "../model/answers/AnswerValidator";
import { useNotificationContext } from "../components/providers/NotificationProvider";
import { useModalContext } from "../components/providers/ModalProvider";
import { useScreenshotContext } from "../components/providers/ScreenshotProvider";

export interface Game {
  number: number;
  date: Date;
  timer: Timer;
  score: number;
  board: Board;
  rack: Rack;
  answer: Answer;
  settings: SettingsOptions;
  completedGames: CompletedGame[];
  outlineRack: boolean;
  setOutlineRack: React.Dispatch<React.SetStateAction<boolean>>;
  onSwapTiles: (firstTile: Tile, secondTile: Tile) => void;
  onReturnTileToRack: (tile: Tile) => void;
  reset: () => void;
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
    GameLoader.loadGame(settings.enableRestrictedMode)
  );

  // Today's game number
  const [number, setNumber] = useState(loadedGame.number);

  // Today's game date
  const [date, setDate] = useState(loadedGame.date);

  // Timer used to track the time taken to complete the game
  const timer = useTimer(loadedGame.timeLapsed, loadedGame.board.isDisabled());

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

  // Calculate the score based on the current configuration of the board
  const score = useMemo(() => ScoreUtils.getScore(board), [board]);

  // Confetti firing controls
  const confetti = useConfetti();

  // Whether this is the first render
  const isFirstRender = useFirstRender();

  // Whether the rack should appear as outlined
  const [outlineRack, setOutlineRack] = useState(false);

  // Extract share controls
  const share = useScreenshotContext();

  // Extract modal state and controls
  const modals = useModalContext();

  // Extract notification utilities
  const { dispatchNotification } = useNotificationContext();

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
    const game = GameLoader.getTodaysGame(settings.enableRestrictedMode);

    setLoadedGame(game);
    setNumber(game.number);
    setDate(game.date);
    setAnswer(game.answer);
    setBoard(game.board);
    setRack(game.rack);

    // If the game has been completed, reset the timer
    if (board.isDisabled()) {
      timer.reset();
    }
  }, [settings.enableRestrictedMode, board, timer]);

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
        const mode = settings.enableRestrictedMode ? "restricted" : "normal";
        // Save the completed game
        saveCompletedGame(
          new CompletedGame(number, date, board, mode, timer.timeLapsed)
        );
      }

      // Play the game win sound effect
      playSound(gameWinSound);
      // Stop the timer
      timer.stop();
      // Disable the board
      board.disable();
      // Display the game statistics
      modals.openStats();
      // Create a share preview
      share.createPreview();
      // Fire confetti after a short delay
      setTimeout(confetti.fire, 150);
    },
    [
      completedGames,
      settings.enableRestrictedMode,
      number,
      date,
      saveCompletedGame,
      playSound,
      confetti.fire,
      modals,
      timer,
      share,
    ]
  );

  /**
   * Handles the dispatching of hint notifications.
   */
  const displayHint = useCallback(
    (hint: string) => {
      // If hints are enabled
      if (settings.enableHints) {
        dispatchNotification(hint);
      }
    },
    [settings.enableHints, dispatchNotification]
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

      // If the board no longer has any letters placed
      if (!updatedBoard.hasLetterTile()) {
        // Pause the timer
        timer.pause();
      } else {
        // Otherwise, ensure the timer has been started
        timer.start();
      }

      setBoard(updatedBoard);
      setRack(updatedRack);
    }
  }, [board, timer, rack, answer, handleWin, displayHint]);

  /**
   * Upon any changes to the board and rack, save the game.
   */
  useEffect(() => {
    GameLoader.saveGame(number, date, timer.timeLapsed, board, rack);
  }, [number, date, timer, board, rack]);

  /**
   * Effect which handles the last visited local storage state.
   *
   * If this is the user's first visit to the site, the how to play modal is displayed.
   */
  useEffect(() => {
    const lastVisited = localStorage.getItem(LAST_VISITED_LS_KEY);

    if (!lastVisited) {
      modals.openHowToPlay();
    }

    localStorage.setItem(LAST_VISITED_LS_KEY, JSON.stringify(new Date()));
  }, [modals]);

  /**
   * Effect which handles the first game date local storage state.
   *
   * If the user doesn't have a correct date within their storage, then their
   * game data will be cleared, including all past completed games.
   *
   * The purpose of this hook is to ensure that any game data is removed when
   * the first game date is changed.
   */
  useEffect(() => {
    // Fetch the first game date from the user's local storage
    const firstGameDateItem = localStorage.getItem(FIRST_GAME_DATE_LS_KEY);

    // Convert the local storage item to a date if it exists
    const firstGameDate = firstGameDateItem
      ? new Date(JSON.parse(firstGameDateItem))
      : null;

    // If the first game date doesn't exist or is incorrect
    if (
      !firstGameDate ||
      !DateUtils.isSameDay(firstGameDate, GameLoader.FIRST_GAME_DATE)
    ) {
      // Reset the user's game data
      GameLoader.clearAllGameData();

      // Update the first game date within the user's local storage
      localStorage.setItem(
        FIRST_GAME_DATE_LS_KEY,
        JSON.stringify(GameLoader.FIRST_GAME_DATE)
      );

      // Reset the game
      reset();
    }
  }, [reset]);

  /**
   * Effect which which handles changes to the restricted mode setting.
   */
  useEffect(() => {
    // Avoid resetting the board on initial render
    if (!isFirstRender) {
      // If restricted mode has been enabled
      if (settings.enableRestrictedMode) {
        reset();
      } else {
        enableBoardTiles();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.enableRestrictedMode]);

  return {
    number,
    date,
    board,
    rack,
    answer,
    settings,
    completedGames,
    outlineRack,
    setOutlineRack,
    onSwapTiles,
    onReturnTileToRack,
    reset,
    timer,
    score,
    confetti,
  };
};

// Local storage key used to store the last time the user visited the site
const LAST_VISITED_LS_KEY = "last-visited";

// Local storage key used to store the date of the first game
const FIRST_GAME_DATE_LS_KEY = "first-game-date";

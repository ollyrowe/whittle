import { instanceToPlain, plainToInstance } from "class-transformer";
import { Board } from "../Board";
import { Rack } from "../Rack";
import { DateUtils } from "../utils/DateUtils";
import { AnswerParser } from "../answers/AnswerParser";
import answers from "../../answers/answers.json";
import eventAnswers from "../../answers/event-answers.json";

/**
 * Game Loader.
 *
 * This module is responsible for loading the current game as well as
 * persisting the state of the user's current game between sessions.
 */
export class GameLoader {
  private static FIRST_GAME_DATE = new Date(2022, 9, 20);

  /**
   * Loads today's game.
   *
   * If the user has a local save, then that will be loaded.
   *
   * @returns the loaded game state.
   */
  public static loadGame() {
    const savedGame = GameLoader.getSavedGame();

    const todaysGame = GameLoader.getTodaysGame();

    // If there is a saved game and is for today's game, return it
    if (savedGame && savedGame.number === todaysGame.number) {
      return savedGame;
    }

    return todaysGame;
  }

  /**
   * Save the current progress of a game within the user's local storage.
   *
   * @param board - the board to be saved.
   * @param rack - the rack to be saved.
   */
  public static saveGame(number: number, board: Board, rack: Rack) {
    // Save the game state to local storage
    localStorage.setItem(GAME_NUMBER_LS_KEY, JSON.stringify(number));
    localStorage.setItem(BOARD_LS_KEY, JSON.stringify(instanceToPlain(board)));
    localStorage.setItem(RACK_LS_KEY, JSON.stringify(instanceToPlain(rack)));
  }

  /**
   * Gets today's game.
   *
   * @returns today's game state.
   */
  public static getTodaysGame() {
    const today = new Date();

    const todaysGameNumber = GameLoader.getGameNumber(today);

    const todaysAnswer = GameLoader.getAnswer(today);

    const rackTiles = AnswerParser.createRackTiles(todaysAnswer);

    return {
      number: todaysGameNumber,
      board: new Board(),
      rack: new Rack(rackTiles),
    };
  }

  /**
   * Gets the solution to yesterday's game.
   *
   * @returns yesterday's solution.
   */
  public static getYesterdaysSolution(): GameSolution {
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdaysGameNumber = GameLoader.getGameNumber(yesterday);

    const yesterdaysAnswer = GameLoader.getAnswer(yesterday);

    const board = AnswerParser.createSolutionBoard(yesterdaysAnswer);

    return {
      number: yesterdaysGameNumber,
      theme: yesterdaysAnswer.theme,
      board,
    };
  }

  /**
   * Gets the answer from the available answers for a given day.
   *
   * @param date - the date to get the answer for.
   * @returns the day's answer.
   */
  private static getAnswer(date: Date) {
    const event = DateUtils.getEvent(date);

    // If the date is an event day
    if (event) {
      // Locate an event answer for the day if one exists
      const eventAnswer = eventAnswers.find((answer) => answer.date === event);

      if (eventAnswer) {
        return eventAnswer;
      }
    }

    // Get the game number
    const gameNumber = GameLoader.getGameNumber(date);

    // Get the answer based on the game number and the total number of answers
    const answer = answers[(gameNumber - 1) % answers.length];

    return answer;
  }

  /**
   * Gets the number of the game for a given day.
   *
   * @returns the game number.
   */
  private static getGameNumber(date: Date) {
    return DateUtils.getDaysBetween(GameLoader.FIRST_GAME_DATE, date) + 1;
  }

  /**
   * Gets the current game save data from the user's local storage.
   *
   * @returns the saved game, if one exists.
   */
  private static getSavedGame() {
    const gameNumberItem = localStorage.getItem(GAME_NUMBER_LS_KEY);
    const boardItem = localStorage.getItem(BOARD_LS_KEY);
    const rackItem = localStorage.getItem(RACK_LS_KEY);

    if (gameNumberItem && boardItem && rackItem) {
      const gameNumber: number = JSON.parse(gameNumberItem);
      const board: unknown = JSON.parse(boardItem);
      const rack: unknown = JSON.parse(rackItem);

      return {
        number: gameNumber,
        board: plainToInstance(Board, board),
        rack: plainToInstance(Rack, rack),
      };
    }
  }
}

export interface GameSolution {
  number: number;
  theme: string;
  board: Board;
}

// Local storage keys to support saving of game state between sessions
const GAME_NUMBER_LS_KEY = "game-number";
const BOARD_LS_KEY = "board";
const RACK_LS_KEY = "rack";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { instanceToPlain, plainToInstance, Type } from "class-transformer";
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
  public static saveGame(number: number, date: Date, board: Board, rack: Rack) {
    // Save the game state to local storage
    localStorage.setItem(GAME_NUMBER_LS_KEY, JSON.stringify(number));
    localStorage.setItem(GAME_DATE_LS_KEY, JSON.stringify(date));
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
      date: today,
      number: todaysGameNumber,
      board: new Board(),
      rack: new Rack(rackTiles),
      answer: todaysAnswer,
    };
  }

  /**
   * Gets the solution for a game given its date.
   *
   * @param number - the date of the game to fetch the solution for.
   * @returns the game's solution.
   */
  public static getSolution(date: Date): GameSolution | undefined {
    const number = GameLoader.getGameNumber(date);

    if (number > 0) {
      const answer = GameLoader.getAnswer(date);

      const board = AnswerParser.createSolutionBoard(answer);

      return {
        number,
        theme: answer.theme,
        board,
      };
    }
  }

  /**
   * Gets all of the historic games that the user has completed from the local storage.
   *
   * @returns the previously completed games.
   */
  public static getCompletedGames(): CompletedGame[] {
    const completedGamesItem = localStorage.getItem(COMPLETED_GAMES_LS_KEY);

    if (completedGamesItem) {
      return plainToInstance(CompletedGame, JSON.parse(completedGamesItem));
    }

    return [];
  }

  /**
   * Adds a completed game to the user's local storage.
   *
   * @param completedGame - the completed game to save.
   */
  public static addCompletedGame(completedGame: CompletedGame) {
    const completedGames = GameLoader.getCompletedGames();

    completedGames.push(completedGame);

    // Save the updated completed games within the user's local storage
    localStorage.setItem(
      COMPLETED_GAMES_LS_KEY,
      JSON.stringify(completedGames)
    );
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
    const gameDateItem = localStorage.getItem(GAME_DATE_LS_KEY);
    const boardItem = localStorage.getItem(BOARD_LS_KEY);
    const rackItem = localStorage.getItem(RACK_LS_KEY);

    if (gameNumberItem && gameDateItem && boardItem && rackItem) {
      const gameNumber: number = JSON.parse(gameNumberItem);
      const gameDate: string = JSON.parse(gameDateItem);
      const board: unknown = JSON.parse(boardItem);
      const rack: unknown = JSON.parse(rackItem);
      const date = new Date(gameDate);

      return {
        date,
        number: gameNumber,
        board: plainToInstance(Board, board),
        rack: plainToInstance(Rack, rack),
        answer: GameLoader.getAnswer(date),
      };
    }
  }
}

export interface GameSolution {
  number: number;
  theme: string;
  board: Board;
}

export class CompletedGame {
  public number: number;

  @Type(() => Date)
  public date: Date;

  @Type(() => Board)
  public board: Board;

  public mode: GameMode;

  constructor(number: number, date: Date, board: Board, mode: GameMode) {
    this.number = number;
    this.date = date;
    this.board = board;
    this.mode = mode;
  }
}

type GameMode = "normal" | "hard";

// Local storage keys to support saving of game state between sessions
const GAME_NUMBER_LS_KEY = "game-number";
const GAME_DATE_LS_KEY = "game-date";
const BOARD_LS_KEY = "board";
const RACK_LS_KEY = "rack";
const COMPLETED_GAMES_LS_KEY = "completed-games";

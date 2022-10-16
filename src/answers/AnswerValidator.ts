import { Board, BOARD_HEIGHT, BOARD_WIDTH } from "../model/Board";
import { AnswerParser } from "./AnswerParser";
import { Event } from "./Event";

/**
 * Answer Validator.
 *
 * Utility which ensures the correctness of a set of answers. The aim of
 * this class is to prevent invalid answers finding their way into the game
 * which could lead to games which have no solutions.
 */
export class AnswerValidator {
  private answers: Answer[];

  constructor(answers: Answer[]) {
    this.answers = answers;
  }

  validateAll() {
    return this.answers.every((answer) => this.validate(answer));
  }

  private validate(answer: Answer) {
    const sameLettersAnswer = this.findAnswerWithSameLetters(answer);

    // Make sure there isn't another answer which has the same combination of letters
    if (sameLettersAnswer) {
      throw new Error(
        `Multiple answers with the letters "${sameLettersAnswer.letters}" detected!`
      );
    }

    const sameThemeAnswer = this.findAnswerWithSameTheme(answer);

    // Make sure there isn't already an answer with the same theme
    if (sameThemeAnswer) {
      throw new Error(
        `Multiple answers with the theme "${sameThemeAnswer.theme}" detected!`
      );
    }

    const sameDateAnswer = this.findAnswerWithSameDate(answer);

    // Make sure there isn't already an answer with the same date
    if (sameDateAnswer) {
      throw new Error(
        `Multiple answers with the date "${sameDateAnswer.date}" detected!`
      );
    }

    // If a date has been specified, check that it's a valid event day
    if (answer.date) {
      if (!AnswerValidator.isValidEventDate(answer.date)) {
        throw new Error(`Invalid date "${answer.date}" detected!`);
      }
    }

    // Make sure that there are exactly the required number of letters
    if (answer.letters.length !== NUMBER_OF_LETTERS) {
      throw new Error(
        `Answer with letters "${answer.letters}" does not have ${NUMBER_OF_LETTERS} letters!`
      );
    }

    // Make sure that all letters are valid characters
    if (AnswerValidator.hasInvalidCharacters(answer.letters)) {
      throw new Error(
        `Letters within "${answer.letters}" contains an invalid character!`
      );
    }

    const wordWithInvalidCharacters =
      AnswerValidator.findWordWithInvalidCharacters(answer);

    // Make sure there are no words which have invalid characters
    if (wordWithInvalidCharacters) {
      throw new Error(
        `Word "${wordWithInvalidCharacters.letters}" contains an invalid character!`
      );
    }

    const invalidDirection = AnswerValidator.findInvalidDirection(answer);

    // Make sure there aren't any words with an invalid direction property
    if (invalidDirection) {
      throw new Error(`Invalid word direction "${invalidDirection}" detected!`);
    }

    // Makes sure that the theme property isn't either too short or too long
    if (
      answer.theme.length < MIN_THEME_LENGTH ||
      answer.theme.length > MAX_THEME_LENGTH
    ) {
      throw new Error(
        `Invalid theme property "${answer.theme}" detected! Theme must be between ${MIN_THEME_LENGTH} and ${MAX_THEME_LENGTH} characters long!`
      );
    }

    const wordWithInvalidLocation =
      AnswerValidator.findWordWithInvalidLocation(answer);

    // Make sure that there aren't any words which fall outside the bounds of the board
    if (wordWithInvalidLocation) {
      const word = wordWithInvalidLocation.toString();

      throw new Error(
        `Answer with letters "${answer.letters}" contains word "${word}" which falls outside of the bounds of the board!`
      );
    }

    const duplicateLetterLocation =
      AnswerValidator.findConflictingLetterLocation(answer);

    // Make sure there aren't two letters whose locations conflict
    if (duplicateLetterLocation && duplicateLetterLocation.name === "board") {
      const { row, column } = duplicateLetterLocation;

      throw new Error(
        `Answer with letters "${answer.letters}" has two words whose letters conflict at row ${row} and column ${column}!`
      );
    }

    const hasMatchingLetters =
      AnswerValidator.hasWordsWithMatchingLetters(answer);

    // Make sure that the letters within the answer's words match the specified letters
    if (!hasMatchingLetters) {
      throw new Error(
        `The words for the answer with letters "${answer.letters}" do not match the specified letters!`
      );
    }

    const areWordsConnected = AnswerValidator.areWordsConnected(answer);

    // Make sure that each word within the solution are interconnected
    if (!areWordsConnected) {
      throw new Error(
        `Answer with letters "${answer.letters}" contains words which are not connected!`
      );
    }

    const invalidWord = AnswerValidator.findInvalidWord(answer);

    // Make sure that there aren't any incorrectly spelt words within the solution
    if (invalidWord) {
      throw new Error(
        `Answer with letters "${answer.letters}" contains an invalid word "${invalidWord}"!`
      );
    }

    const duplicateWord = AnswerValidator.findDuplicateWords(answer);

    // Make sure that the answer doesn't contain two or more identical words
    if (duplicateWord) {
      throw new Error(
        `Answer with letters "${answer.letters}" contains duplicate word "${duplicateWord}"!`
      );
    }

    const wordWithinLetters = AnswerValidator.findWordWithinLetters(answer);

    // Make sure that the answer's letters do not contain a solution word in plain text
    if (wordWithinLetters) {
      throw new Error(
        `Answer with letters "${answer.letters}" contains a solution word ("${wordWithinLetters.letters}") within its letters!`
      );
    }

    return true;
  }

  private findAnswerWithSameLetters(answer: Answer) {
    const answerSortedLetters = AnswerValidator.sortLetters(answer.letters);

    return this.answers.find((otherAnswer) => {
      const otherAnswerSortedLetters = AnswerValidator.sortLetters(
        otherAnswer.letters
      );

      return (
        answer !== otherAnswer &&
        answerSortedLetters === otherAnswerSortedLetters
      );
    });
  }

  private findAnswerWithSameTheme(answer: Answer) {
    return this.answers.find((otherAnswer) => {
      return answer !== otherAnswer && answer.theme === otherAnswer.theme;
    });
  }

  private findAnswerWithSameDate(answer: Answer) {
    if (answer.date) {
      return this.answers.find((otherAnswer) => {
        return (
          answer !== otherAnswer &&
          otherAnswer.date &&
          answer.date === otherAnswer.date
        );
      });
    }
  }

  private static isValidEventDate(date: string) {
    return Object.values<string>(Event).includes(date);
  }

  private static findWordWithinLetters(answer: Answer) {
    return answer.words.find((word) => answer.letters.includes(word.letters));
  }

  private static findWordWithInvalidCharacters(answer: Answer) {
    return answer.words.find((word) =>
      AnswerValidator.hasInvalidCharacters(word.letters)
    );
  }

  private static sortLetters(letters: string) {
    return letters.split("").sort().join("");
  }

  private static findInvalidDirection(answer: Answer) {
    const wordWithInvalidDirection = answer.words.find(
      (word) => !(word.direction === HORIZONTAL || word.direction === VERTICAL)
    );

    return wordWithInvalidDirection?.direction;
  }

  private static hasInvalidCharacters(string: string) {
    // Whether the string contains any characters other than a capital letter
    return /[^A-Z]/.test(string);
  }

  private static findWordWithInvalidLocation(answer: Answer) {
    const tiles = AnswerParser.createSolutionBoardTiles(answer);

    const board = new Board(tiles);

    const tileWithInvalidLocation = board.getTiles().find((tile) => {
      const location = tile.getLocation();

      if (location.name === "board") {
        const { row, column } = location;

        return (
          row < 1 || row > BOARD_HEIGHT || column < 1 || column > BOARD_WIDTH
        );
      }

      return false;
    });

    if (tileWithInvalidLocation) {
      const word = board.getWordsAt(tileWithInvalidLocation.getLocation());

      return word.horizontal?.getLength() === 1 ? word.vertical : word.vertical;
    }
  }

  private static findConflictingLetterLocation(answer: Answer) {
    const tiles = AnswerParser.createSolutionBoardTiles(answer);

    const duplicateLocationTile = tiles.find((tile) => {
      const tileLocation = tile.getLocation();

      // Find another tile at the same location
      return tiles.find((otherTile) => {
        const otherTileLocation = otherTile.getLocation();

        return (
          tile !== otherTile &&
          tileLocation.name === "board" &&
          otherTileLocation.name === "board" &&
          tileLocation.row === otherTileLocation.row &&
          tileLocation.column === otherTileLocation.column
        );
      });
    });

    return duplicateLocationTile?.getLocation();
  }

  /**
   * Checks that the answer's words form a solution which matches
   * the answer's letters.
   */
  private static hasWordsWithMatchingLetters(answer: Answer) {
    const tiles = AnswerParser.createSolutionBoardTiles(answer);

    const letters = tiles.map((tile) => tile.getLetter()!);

    return (
      AnswerValidator.sortLetters(answer.letters) ===
      AnswerValidator.sortLetters(letters.join(""))
    );
  }

  private static areWordsConnected(answer: Answer) {
    const board = AnswerParser.createSolutionBoard(answer);

    return board.areLettersConnected();
  }

  private static findInvalidWord(answer: Answer) {
    const tiles = AnswerParser.createSolutionBoardTiles(answer);

    const board = new Board(tiles);

    board.updateTileStatuses();

    // Find a letter tile which isn't correct
    const incorrectTile = board.getTiles().find((tile) => !tile.isCorrect());

    if (incorrectTile) {
      const words = board.getWordsAt(incorrectTile.getLocation());

      return words.horizontal?.getLength() !== 1 && !words.horizontal?.isValid()
        ? words.horizontal
        : words.vertical;
    }
  }

  public static findDuplicateWords(answer: Answer) {
    const words = answer.words.map((word) => word.letters);

    return words.find(
      (word) => words.filter((otherWord) => otherWord === word).length > 1
    );
  }
}

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

const NUMBER_OF_LETTERS = 15;

const MIN_THEME_LENGTH = 1;
const MAX_THEME_LENGTH = 50;

export interface Answer {
  date?: string;
  theme: string;
  letters: string;
  words: Word[];
}

interface Word {
  direction: string;
  start: Location;
  letters: string;
}

interface Location {
  row: number;
  column: number;
}

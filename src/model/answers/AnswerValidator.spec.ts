import { AnswerValidator } from "./AnswerValidator";
import * as answer from "./testAnswers";

describe("AnswerValidator", () => {
  it("Allows a valid answer", () => {
    const validator = new AnswerValidator([answer.valid]);

    expect(() => validator.validateAll()).not.toThrow();
    expect(validator.validateAll()).toBe(true);
  });

  it("Allows a valid event answer", () => {
    const validator = new AnswerValidator([answer.validEvent]);

    expect(() => validator.validateAll()).not.toThrow();
    expect(validator.validateAll()).toBe(true);
  });

  it("Ensures that the word directions are either vertical or horizontal", () => {
    const validator = new AnswerValidator([answer.withIncorrectDirection]);

    expect(() => validator.validateAll()).toThrow(
      `Invalid word direction "diagonal" detected!`
    );
  });

  it("Ensures that the theme is a string that is at least 1 character long", () => {
    const validator = new AnswerValidator([answer.withShortTheme]);

    expect(() => validator.validateAll()).toThrow(
      `Invalid theme property "${answer.withShortTheme.theme}" detected! Theme must be between 1 and 50 characters long!`
    );
  });

  it("Ensures that the theme is a string that is no more than 50 characters long", () => {
    const validator = new AnswerValidator([answer.withLongTheme]);

    expect(() => validator.validateAll()).toThrow(
      `Invalid theme property "${answer.withLongTheme.theme}" detected! Theme must be between 1 and 50 characters long!`
    );
  });

  it("Ensures all letters are uppercase", () => {
    const validator = new AnswerValidator([answer.withLowerCaseLetters]);

    expect(() => validator.validateAll()).toThrow(
      `Letters within "${answer.withLowerCaseLetters.letters}" contains an invalid character!`
    );
  });

  it("Ensures all letters are valid characters", () => {
    const validator = new AnswerValidator([answer.withSpecialLetters]);

    expect(() => validator.validateAll()).toThrow(
      `Letters within "${answer.withSpecialLetters.letters}" contains an invalid character!`
    );
  });

  it("Ensures all word letters are uppercase", () => {
    const validator = new AnswerValidator([answer.withLowerCaseWordLetters]);

    const firstWord = answer.withLowerCaseWordLetters.words[0];

    expect(() => validator.validateAll()).toThrow(
      `Word "${firstWord.letters}" contains an invalid character!`
    );
  });

  it("Ensures all word letters are valid characters", () => {
    const validator = new AnswerValidator([answer.withSpecialWordLetters]);

    const firstWord = answer.withSpecialWordLetters.words[0];

    expect(() => validator.validateAll()).toThrow(
      `Word "${firstWord.letters}" contains an invalid character!`
    );
  });

  it("Ensures answers contains no less than 15 letters", () => {
    const validator = new AnswerValidator([answer.withNotEnoughLetters]);

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${answer.withNotEnoughLetters.letters}" does not have 15 letters!`
    );
  });

  it("Ensures answers contain no more than 15 letters", () => {
    const validator = new AnswerValidator([answer.withTooManyLetters]);

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${answer.withTooManyLetters.letters}" does not have 15 letters!`
    );
  });

  it("Ensures that all letters have been included within the solution", () => {
    const validator = new AnswerValidator([answer.withMissingWordLetters]);

    expect(() => validator.validateAll()).toThrow(
      `The words for the answer with letters "${answer.withMissingWordLetters.letters}" do not match the specified letters!`
    );
  });

  it("Ensures that only the letters specified are included within the solution", () => {
    const validator = new AnswerValidator([answer.withAdditionalLetter]);

    expect(() => validator.validateAll()).toThrow(
      `The words for the answer with letters "${answer.withAdditionalLetter.letters}" do not match the specified letters!`
    );
  });

  it("Ensures that the letters within two words do not conflict", () => {
    const validator = new AnswerValidator([answer.withConflictingWords]);

    const { letters, words } = answer.withConflictingWords;

    // The row and column where the conflict resides
    const { row, column } = words[1].start;

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${letters}" has two words whose letters conflict at row ${row} and column ${column}!`
    );
  });

  it("Ensures that all solution words are valid", () => {
    const validator = new AnswerValidator([answer.withIncorrectWord]);

    const { letters, words } = answer.withIncorrectWord;

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${letters}" contains an invalid word "${words[0].letters}"!`
    );
  });

  it("Ensures that all words within the solution are connected", () => {
    const validator = new AnswerValidator([answer.withUnconnectedWord]);

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${answer.withUnconnectedWord.letters}" contains words which are not connected!`
    );
  });

  it("Ensures that all words are placed at valid locations on the board", () => {
    const validator = new AnswerValidator([
      answer.withWordAtInvalidStartLocation,
    ]);

    const { words, letters } = answer.withWordAtInvalidStartLocation;

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${letters}" contains word "${words[0].letters}" which falls outside of the bounds of the board!`
    );
  });

  it("Ensures that all words stay within the bounds of the board", () => {
    const validator = new AnswerValidator([answer.withWordAtInvalidLocation]);

    const { words, letters } = answer.withWordAtInvalidLocation;

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${letters}" contains word "${words[0].letters}" which falls outside of the bounds of the board!`
    );
  });

  it("Ensures that there are no duplicate letter combinations", () => {
    const reversedLetters = answer.valid.letters.split("").reverse().join("");

    const validator = new AnswerValidator([
      // Specify two answer with different themes to avoid error
      { ...answer.valid, theme: "1" },
      // Reverse the letters in the second answer to ensure that order doesn't impact outcome
      {
        ...answer.valid,
        theme: "2",
        letters: reversedLetters,
      },
    ]);

    expect(() => validator.validateAll()).toThrow(
      `Multiple answers with the letters "${reversedLetters}" detected!`
    );
  });

  it("Ensures that there are no duplicate themes", () => {
    const theme = "Example Theme";

    const validator = new AnswerValidator([
      // Two different answers but with the same theme
      { ...answer.valid, theme },
      { ...answer.validEvent, theme },
    ]);

    expect(() => validator.validateAll()).toThrow(
      `Multiple answers with the theme "${theme}" detected!`
    );
  });

  it("Ensures that there aren't multiple answers with the same date", () => {
    const date = "Halloween";

    const validator = new AnswerValidator([
      // Two different answers but with the same date
      { ...answer.valid, date },
      { ...answer.validEvent, date },
    ]);

    expect(() => validator.validateAll()).toThrow(
      `Multiple answers with the date "${date}" detected!`
    );
  });

  it("Ensures that answers do not contain duplicate words", () => {
    const validator = new AnswerValidator([answer.withDuplicateWords]);

    const { words, letters } = answer.withDuplicateWords;

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${letters}" contains duplicate word "${words[0].letters}"!`
    );
  });

  it("Ensures that the answer's letters do not spell out one of the words", () => {
    const validator = new AnswerValidator([answer.withWordInLetters]);

    const { words, letters } = answer.withWordInLetters;

    expect(() => validator.validateAll()).toThrow(
      `Answer with letters "${letters}" contains a solution word ("${words[0].letters}") within its letters!`
    );
  });

  it("Ensures that event answers have a valid event date", () => {
    const date = "Invalid Date";

    const validator = new AnswerValidator([{ ...answer.valid, date }]);

    expect(() => validator.validateAll()).toThrow(
      `Invalid date "${date}" detected!`
    );
  });
});

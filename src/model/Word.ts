import valid2LetterWords from "../words/valid-2-letter-words.json";
import valid3LetterWords from "../words/valid-3-letter-words.json";
import valid4LetterWords from "../words/valid-4-letter-words.json";
import valid5LetterWords from "../words/valid-5-letter-words.json";
import valid6LetterWords from "../words/valid-6-letter-words.json";
import { Letter } from "./enums/Letter";

export class Word {
  /** The letters which make up the word */
  private letters: Letter[];

  constructor(letters: Letter[]) {
    this.letters = letters;
  }

  /**
   * Gets the length of the word.
   *
   * @returns the length of the word.
   */
  getLength() {
    return this.letters.length;
  }

  /**
   * Determines whether the word has a specified length.
   *
   * @param length - the length to be checked.
   * @returns boolean indicating whether the word is of a given length.
   */
  hasLength(length: number) {
    return this.getLength() === length;
  }

  /**
   * Determines whether the word is valid by checking whether it appears
   * within the game's word lists.
   *
   * @returns boolean indicating whether the word is valid.
   */
  isValid() {
    const word = this.toString().toLowerCase();

    switch (word.length) {
      case 2:
        return valid2LetterWords.includes(word);
      case 3:
        return valid3LetterWords.includes(word);
      case 4:
        return valid4LetterWords.includes(word);
      case 5:
        return valid5LetterWords.includes(word);
      case 6:
        return valid6LetterWords.includes(word);
      default:
        return false;
    }
  }

  /**
   * Returns a string representation of the word.
   *
   * @returns a string value containing the word's letters.
   */
  toString() {
    return this.letters.join("");
  }
}

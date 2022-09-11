import { Character } from "./enums/Character";

export class Letter {
  /** The character associated with the letter */
  private value: Character;
  /** Whether the letter is correct */
  private correct: boolean;

  constructor(value: Character) {
    this.value = value;
    this.correct = false;
  }

  public isCorrect = () => {
    return this.correct;
  };

  public setCorrect = (correct: boolean) => {
    this.correct = correct;
  };

  public getValue = () => {
    return this.value;
  };

  public is = (letter: Letter) => {
    return this.value.toLowerCase() === letter.value.toLowerCase();
  };
}

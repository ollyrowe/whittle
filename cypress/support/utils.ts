import todaysAnswer from "../fixtures/todays-answer.json";
import yesterdaysAnswer from "../fixtures/yesterdays-answer.json";
import { Location, Word } from "./types";

export const getTodaysSolutionLetters = () => {
  return getSolutionLetters(todaysAnswer.words);
};

export const getYesterdaySolutionLetters = () => {
  return getSolutionLetters(yesterdaysAnswer.words);
};

export const getSolutionLetters = (words: Word[]) => {
  const letters: { letter: string; location: Location }[] = [];

  words.forEach((word) => {
    const wordLetters = getWordSolutionLetters(word);

    wordLetters.forEach((wordLetter) => {
      if (
        !letters.find(
          (letter) =>
            letter.location.row === wordLetter.location.row &&
            letter.location.column === wordLetter.location.column
        )
      ) {
        letters.push(wordLetter);
      }
    });
  });

  return letters;
};

export const getWordSolutionLetters = (word: {
  letters: string;
  start: Location;
  direction: string;
}) => {
  const letters: { letter: string; location: Location }[] = [];

  const { start, direction } = word;

  word.letters.split("").forEach((letter, i) => {
    const location = {
      row: direction === "vertical" ? start.row + i : start.row,
      column: direction === "horizontal" ? start.column + i : start.column,
    };

    letters.push({ letter, location });
  });

  return letters;
};

const hexToRgbValues = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null;
};

export const hexToRgb = (hex: string) => {
  const values = hexToRgbValues(hex);

  return values ? `rgb(${values.red}, ${values.green}, ${values.blue})` : null;
};

export const hexToRgba = (hex: string, alpha: number) => {
  const values = hexToRgbValues(hex);

  return values
    ? `rgba(${values.red}, ${values.green}, ${values.blue}, ${alpha})`
    : null;
};

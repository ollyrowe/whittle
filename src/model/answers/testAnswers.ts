import { Answer } from "./AnswerValidator";

export const valid: Answer = {
  date: "New Year's Day",
  theme: "Happy New Year's Day!",
  letters: "RBWHECUNLEAYBEB",
  words: [
    {
      direction: "vertical",
      start: { row: 1, column: 1 },
      letters: "BUBBLY",
    },
    {
      direction: "horizontal",
      start: { row: 6, column: 1 },
      letters: "YEAR",
    },
    {
      direction: "vertical",
      start: { row: 2, column: 4 },
      letters: "CHEER",
    },
    {
      direction: "horizontal",
      start: { row: 4, column: 3 },
      letters: "NEW",
    },
  ],
};

export const validEvent: Answer = {
  date: "Halloween",
  theme: "Happy Halloween!",
  letters: "OTPGSAKSYHSCROO",
  words: [
    {
      direction: "vertical",
      start: { row: 1, column: 1 },
      letters: "GHOSTS",
    },
    {
      direction: "horizontal",
      start: { row: 6, column: 1 },
      letters: "SCARY",
    },
    {
      direction: "vertical",
      start: { row: 1, column: 5 },
      letters: "SPOOKY",
    },
  ],
};

export const withIncorrectDirection: Answer = {
  ...valid,
  words: [...valid.words.map((word) => ({ ...word, direction: "diagonal" }))],
};

export const withShortTheme: Answer = {
  ...valid,
  theme: "",
};

export const withLongTheme: Answer = {
  ...valid,
  theme: "blah blah blah blah blah blah blah blah blah blah blah",
};

export const withLowerCaseLetters: Answer = {
  ...valid,
  letters: valid.letters.toLowerCase(),
};

export const withSpecialLetters: Answer = {
  ...valid,
  letters: "RBWHECUNLEAYBE*",
};

export const withLowerCaseWordLetters: Answer = {
  ...valid,
  words: [
    ...valid.words.map((word) => ({
      ...word,
      letters: word.letters.toLowerCase(),
    })),
  ],
};

export const withSpecialWordLetters: Answer = {
  ...valid,
  words: [
    ...valid.words.map((word) => ({
      ...word,
      letters: "BUBBL*",
    })),
  ],
};

export const withTooManyLetters: Answer = {
  ...valid,
  letters: valid.letters + "a",
};

export const withNotEnoughLetters: Answer = {
  ...valid,
  letters: valid.letters.substring(0, valid.letters.length - 2),
};

// Missing an 'S'
export const withMissingWordLetters: Answer = {
  theme: "Transport",
  letters: "ARABLNRTPOAISCE",
  words: [
    {
      direction: "vertical",
      start: { row: 1, column: 4 },
      letters: "TRAIN",
    },
    {
      direction: "horizontal",
      start: { row: 1, column: 1 },
      letters: "BOAT",
    },
    {
      direction: "horizontal",
      start: { row: 3, column: 3 },
      letters: "CAR",
    },
    {
      direction: "horizontal",
      start: { row: 5, column: 1 },
      letters: "PLANE",
    },
  ],
};

// Contains a word with an additional 'S'
export const withAdditionalLetter: Answer = {
  date: "New Year's Day",
  theme: "Happy New Year's Day!",
  letters: "RBWHECUNLEAYBEB",
  words: [
    {
      direction: "vertical",
      start: { row: 1, column: 1 },
      letters: "BUBBLY",
    },
    {
      direction: "horizontal",
      start: { row: 6, column: 1 },
      letters: "YEARS",
    },
    {
      direction: "vertical",
      start: { row: 2, column: 4 },
      letters: "CHEER",
    },
    {
      direction: "horizontal",
      start: { row: 4, column: 3 },
      letters: "NEW",
    },
  ],
};

export const withIncorrectWord = {
  date: "New Year's Day",
  theme: "Happy New Year's Day!",
  letters: "RBWHECUNLEAYBEB",
  words: [
    {
      // Incorrectly spelt word
      direction: "vertical",
      start: { row: 1, column: 1 },
      letters: "UBBBLY",
    },
    {
      direction: "horizontal",
      start: { row: 6, column: 1 },
      letters: "YEAR",
    },
    {
      direction: "vertical",
      start: { row: 2, column: 4 },
      letters: "CHEER",
    },
    {
      direction: "horizontal",
      start: { row: 4, column: 3 },
      letters: "NEW",
    },
  ],
};

export const withUnconnectedWord = {
  theme: "Happy Easter!",
  letters: "RNGSEUOIYPGBNHG",
  words: [
    {
      direction: "vertical",
      start: { row: 1, column: 3 },
      letters: "SPRING",
    },
    {
      direction: "horizontal",
      start: { row: 2, column: 1 },
      letters: "HOP",
    },
    {
      // This word is disconnected from the rest
      direction: "vertical",
      start: { row: 1, column: 5 },
      letters: "EGG",
    },
    {
      direction: "horizontal",
      start: { row: 5, column: 1 },
      letters: "BUNNY",
    },
  ],
};

export const withWordAtInvalidStartLocation: Answer = {
  date: "New Year's Day",
  theme: "Happy New Year's Day!",
  letters: "RBWHECUNLEAYBEB",
  words: [
    {
      // This word has been placed at an invalid row
      direction: "vertical",
      start: { row: 0, column: 1 },
      letters: "BUBBLY",
    },
    {
      direction: "horizontal",
      start: { row: 5, column: 1 },
      letters: "YEAR",
    },
    {
      direction: "vertical",
      start: { row: 1, column: 4 },
      letters: "CHEER",
    },
    {
      direction: "horizontal",
      start: { row: 3, column: 3 },
      letters: "NEW",
    },
  ],
};

export const withWordAtInvalidLocation: Answer = {
  theme: "Happy Hanukkah!",
  letters: "BINRCHEBSALGTLD",
  words: [
    {
      // This word falls outside of the bounds of the board
      direction: "vertical",
      start: { row: 2, column: 5 },
      letters: "LIGHTS",
    },
    {
      direction: "horizontal",
      start: { row: 3, column: 1 },
      letters: "RABBI",
    },
    {
      // This word also falls outside of the bounds of the board
      direction: "vertical",
      start: { row: 2, column: 2 },
      letters: "CANDLE",
    },
  ],
};

export const withConflictingWords: Answer = {
  date: "New Year's Day",
  theme: "Happy New Year's Day!",
  letters: "RBWHECUNLEAYBEB",
  words: [
    {
      direction: "vertical",
      start: { row: 1, column: 1 },
      letters: "BUBBLY",
    },
    {
      // The first letter of this word conflicts with the previous word
      direction: "horizontal",
      start: { row: 6, column: 1 },
      letters: "BEAR",
    },
    {
      direction: "vertical",
      start: { row: 2, column: 4 },
      letters: "CHEER",
    },
    {
      direction: "horizontal",
      start: { row: 4, column: 3 },
      letters: "NEW",
    },
  ],
};

export const withDuplicateWords: Answer = {
  theme: "Random",
  letters: "NAAAGEENLADGHPD",
  words: [
    {
      // Occurrence 1
      direction: "vertical",
      start: { row: 1, column: 1 },
      letters: "AGENDA",
    },
    {
      direction: "horizontal",
      start: { row: 6, column: 1 },
      letters: "ALPHA",
    },
    {
      // Occurrence 2
      direction: "vertical",
      start: { row: 1, column: 5 },
      letters: "AGENDA",
    },
  ],
};

export const withWordInLetters: Answer = {
  date: "New Year's Day",
  theme: "Happy New Year's Day!",
  // Contains the answer word 'BUBBLY'
  letters: "BUBBLYEARCHEENW",
  words: [
    {
      direction: "vertical",
      start: { row: 1, column: 1 },
      letters: "BUBBLY",
    },
    {
      direction: "horizontal",
      start: { row: 6, column: 1 },
      letters: "YEAR",
    },
    {
      direction: "vertical",
      start: { row: 2, column: 4 },
      letters: "CHEER",
    },
    {
      direction: "horizontal",
      start: { row: 4, column: 3 },
      letters: "NEW",
    },
  ],
};

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

interface ReloadOptions {
  canShare?: boolean;
  userAgent?: string;
}

/**
 * Reloads the site, stubbing several properties and functions
 * defined on the navigator global variable including the user agent.
 *
 * This method assigns the following function aliases:
 *   - share - navigator.share
 *   - copy - navigator.clipboard.write
 *   - copyText - navigator.clipboard.writeText
 */
export const reloadAndStubNavigator = ({
  canShare = true,
  userAgent = userAgents.desktop,
}: ReloadOptions = {}) => {
  cy.visit(Cypress.config().baseUrl!, {
    onBeforeLoad: (window) => {
      window.navigator.canShare = () => canShare;
      window.navigator.share = () => Promise.resolve();
      window.navigator.clipboard.write = () => Promise.resolve();
      window.navigator.clipboard.writeText = () => Promise.resolve();

      Object.defineProperty(window.navigator, "userAgent", {
        value: userAgent,
      });

      cy.stub(window.navigator, "share").as("share").resolves();
      cy.stub(window.navigator.clipboard, "write").as("copy").resolves();
      cy.stub(window.navigator.clipboard, "writeText")
        .as("copy-text")
        .resolves();
    },
  });
};

export const userAgents = {
  mobile:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1",
  tablet:
    "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  desktop:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
};

/**
 * Reloads the site, stubbing the open function on the window global variable,
 * allowing for external links to be tested without actually opening the link.
 *
 * This method assigns the following function aliases:
 *   - open - window.open
 */
export const reloadAndStubWindow = () => {
  cy.visit(Cypress.config().baseUrl!, {
    onBeforeLoad: (window) => {
      window.open = () => null;

      cy.stub(window, "open").as("open");
    },
  });
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

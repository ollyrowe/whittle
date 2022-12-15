import answer from "../fixtures/todays-answer.json";
import { getWordSolutionLetters } from "../support/utils";

describe("Spell Word", () => {
  it("displays a correct word as green", () => {
    // The first word in the solution
    const firstWord = answer.words[0];

    const letters = getWordSolutionLetters(firstWord);

    letters.forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);
    });

    letters.forEach(({ location }) => {
      // Each letter should be green
      cy.getTileFromBoard(location).shouldHaveGreenBackground();
    });
  });

  it("displays an incorrect word as grey", () => {
    cy.getTileFromRack("D").placeOnBoard({ row: 1, column: 1 });
    cy.getTileFromRack("C").placeOnBoard({ row: 1, column: 2 });
    cy.getTileFromRack("R").placeOnBoard({ row: 1, column: 3 });

    cy.getTileFromBoard({ row: 1, column: 1 }).shouldHaveGreyBackground();
    cy.getTileFromBoard({ row: 1, column: 2 }).shouldHaveGreyBackground();
    cy.getTileFromBoard({ row: 1, column: 3 }).shouldHaveGreyBackground();
  });

  it("displays a partially correct word as orange", () => {
    // Form valid word "NO"
    cy.getTileFromRack("N").placeOnBoard({ row: 1, column: 1 });
    cy.getTileFromRack("O").placeOnBoard({ row: 1, column: 2 });
    // For invalid word "NR"
    cy.getTileFromRack("R").placeOnBoard({ row: 2, column: 1 });

    cy.getTileFromBoard({ row: 1, column: 1 }).shouldHaveOrangeBackground();
    cy.getTileFromBoard({ row: 1, column: 2 }).shouldHaveGreenBackground();
    cy.getTileFromBoard({ row: 2, column: 1 }).shouldHaveGreyBackground();
  });
});

export {};

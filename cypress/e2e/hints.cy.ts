import { Word } from "../support/types";
import { getSolutionLetters } from "../support/utils";

describe("Hints", () => {
  it("displays a hint once all letters are placed and there are incorrect words", () => {
    cy.getByTestID("notification").should("not.exist");

    // Place all letters on the board without spelling a correct word
    cy.placeAllLettersOnBoard();

    cy.getByTestID("notification").should("be.visible");

    cy.getByTestID("notification").should(
      "have.text",
      "All words must be valid to win!"
    );

    // Wait for the notification to disappear
    cy.tick(3000);

    cy.getByTestID("notification").should("not.be.visible");
  });

  it("displays a hint once all letters are placed correctly by aren't connected", () => {
    cy.getByTestID("notification").should("not.exist");

    placeAllLettersWithDisconnectedWords();

    cy.getByTestID("notification").should("be.visible");

    cy.getByTestID("notification").should(
      "have.text",
      "All words must be connected to win!"
    );

    // Wait for the notification to disappear
    cy.tick(3000);

    cy.getByTestID("notification").should("not.be.visible");
  });

  it("allows the user to disable hints", () => {
    cy.getByTestID("settings-button").click();

    // Disable hints
    cy.getByTestID("hints-toggle").find("input").uncheck();

    cy.getByTestID("settings-modal").find("[aria-label=close]").click();

    cy.placeAllLettersOnBoard();

    cy.getByTestID("notification").should("not.exist");

    cy.reload();

    cy.getByTestID("reset-text-button").click();

    placeAllLettersWithDisconnectedWords();

    cy.getByTestID("notification").should("not.exist");
  });
});

const placeAllLettersWithDisconnectedWords = () => {
  // Similar to the solution but the word "fog" is disconnected
  const disconnectedWords: Word[] = [
    { letters: "RAIN", start: { column: 2, row: 1 }, direction: "vertical" },
    { letters: "HAILS", start: { column: 1, row: 2 }, direction: "horizontal" },
    { letters: "CLOUD", start: { column: 4, row: 1 }, direction: "vertical" },
    { letters: "FOG", start: { column: 1, row: 6 }, direction: "horizontal" },
  ];

  const letters = getSolutionLetters(disconnectedWords);

  letters.forEach(({ letter, location }) => {
    cy.getTileFromRack(letter).placeOnBoard(location);

    cy.getTileFromBoard(location).should("have.text", letter);
  });
};

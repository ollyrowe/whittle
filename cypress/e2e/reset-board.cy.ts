import { getTodaysSolutionLetters } from "../support/utils";

describe("Reset Board", () => {
  it("resets the board using the board button", () => {
    const solution = getTodaysSolutionLetters();

    cy.getByTestID("reset-icon-button").should("be.disabled");

    const firstLetter = solution[0].letter;

    const location = { row: 1, column: 1 };

    // Place the first letter within the solution
    cy.getTileFromRack(firstLetter).placeOnBoard(location);

    // Cypress decides it doesn't want to click the button unless a reload is done
    cy.reload();

    cy.getTileFromBoard(location).should("have.text", firstLetter);

    cy.getByTestID("reset-icon-button").click();

    cy.getTileFromBoard(location).should("not.have.text", firstLetter);
  });

  it("resets the board using the rack button", () => {
    cy.getByTestID("reset-text-button").should("not.exist");

    // Place all of the letters on the board to reveal the reset button
    cy.placeAllLettersOnBoard();

    cy.getByTestID("reset-text-button").should("exist");

    // Cypress decides it doesn't want to click the button unless a reload is done
    cy.reload();

    cy.getByTestID("tile-grid").should("not.have.text", "");

    cy.getByTestID("reset-text-button").click();

    cy.getByTestID("tile-grid").should("have.text", "");
  });

  it("returns a letter to the rack when double clicked", () => {
    const letters = getTodaysSolutionLetters();

    const firstLetter = letters[0];

    const location = { row: 1, column: 1 };

    cy.getTileFromRack(firstLetter.letter).placeOnBoard(location);

    cy.getTileFromBoard(location).should("have.text", firstLetter.letter);

    cy.getTileFromBoard(location).dblclick();

    cy.getTileFromBoard(location).should("not.have.text", firstLetter.letter);
  });
});

import { getTodaysSolutionLetters } from "../support/utils";

describe("Win Game", () => {
  it("wins a game", () => {
    cy.getByTestID("statistics-modal").should("not.exist");

    cy.getByTestID("board").should("have.text", "Daily Whittle #2");

    // Place all of the solution letters in the correct locations
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal").should("contain.text", "1");
    cy.getByTestID("statistics-modal").should("contain.text", "day streak!");
  });
});

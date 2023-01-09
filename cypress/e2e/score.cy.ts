import { getTodaysSolutionLetters } from "../support/utils";

describe("Score", () => {
  it('displays a "Coming Soon!" message', () => {
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal")
      .findByTestID("score-card")
      .should("contain.text", "Score");
    cy.getByTestID("statistics-modal")
      .findByTestID("score-card")
      .should("contain.text", "Coming Soon!");
  });

  it("doesn't display the score before the user has completed the game", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal").get("score-card").should("not.exist");
  });
});

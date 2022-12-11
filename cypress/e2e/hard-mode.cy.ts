import { getTodaysSolutionLetters } from "../support/utils";

describe("Hard Mode", () => {
  beforeEach(() => {
    cy.getByTestID("settings-button").click();

    // Enable hard mode
    cy.getByTestID("hard-mode-toggle").find("input").check();

    cy.getByTestID("settings-modal").find("[aria-label=close]").click();
  });

  it("enables only the tiles which form part of the solution", () => {
    const solutionLetters = getTodaysSolutionLetters();

    // Loop through each tile on the board
    for (let row = 1; row <= 6; row++) {
      for (let column = 1; column <= 5; column++) {
        // If this tile forms part of the solution
        if (
          solutionLetters.find(
            ({ location }) => location.row === row && location.column === column
          )
        ) {
          // The tile placeholder should be enabled
          cy.getTilePlaceholderFromBoard({
            column,
            row,
          }).shouldBeEnabledPlaceholder();
        } else {
          // Otherwise the tile placeholder should be disabled
          cy.getTilePlaceholderFromBoard({
            column,
            row,
          }).shouldBeDisabledPlaceholder();
        }
      }
    }
  });

  it("prevents user from dragging letters onto disabled tiles", () => {
    const solutionLetters = getTodaysSolutionLetters();

    const firstLetter = solutionLetters[0].letter;

    // Loop through each tile on the board
    for (let row = 1; row <= 6; row++) {
      for (let column = 1; column <= 5; column++) {
        // If this tile doesn't for part of the solution
        if (
          !solutionLetters.find(
            ({ location }) => location.row === row && location.column === column
          )
        ) {
          const location = { row, column };

          cy.getTileFromRack(firstLetter).placeOnBoard(location);

          cy.getTileFromBoard(location).should("not.contain.text", firstLetter);
        }
      }
    }
  });

  it("wins a game in hard mode", () => {
    cy.getByTestID("statistics-modal").should("not.exist");

    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal").should("contain.text", "1");
    cy.getByTestID("statistics-modal").should("contain.text", "day streak!");
  });
});

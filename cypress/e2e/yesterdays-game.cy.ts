import { getYesterdaySolutionLetters } from "../support/utils";

describe("Yesterday's Game", () => {
  it("displays yesterday's solution", () => {
    cy.getByTestID("yesterdays-button").click();

    const solutionLetters = getYesterdaySolutionLetters();

    // Loop through each tile on the board
    for (let row = 1; row <= 6; row++) {
      for (let column = 1; column <= 5; column++) {
        const solutionLetter = solutionLetters.find(
          ({ location }) => location.row === row && location.column === column
        );

        // If this tile forms part of the solution
        if (solutionLetter) {
          // The tile at the location should contain the solution letter
          cy.getByTestID("yesterday-modal")
            .findTile({ row, column })
            .should("contain", solutionLetter.letter);
          // The tile should have a grey background
          cy.getByTestID("yesterday-modal")
            .findTile({ row, column })
            .shouldHaveGreyBackground();
        } else {
          // Otherwise the tile placeholder should be disabled
          cy.getByTestID("yesterday-modal")
            .findPlaceholder({ column, row })
            .shouldBeDisabledPlaceholder();
        }
      }
    }
  });
});

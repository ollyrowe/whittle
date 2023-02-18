import todaysAnswer from "../fixtures/todays-answer.json";
import { getSolutionLetters, getTodaysSolutionLetters } from "../support/utils";

describe("Score", () => {
  it("displays the user's score", () => {
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
      .should("contain.text", "28 pts");
  });

  it("doesn't display the score before the user has completed the game", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal").get("score-card").should("not.exist");
  });

  describe("Score Modal", () => {
    it("displays how the score is calculated if the user hasn't completed the game", () => {
      // Open the statistics modal
      cy.getByTestID("statistics-button").click();

      cy.getByTestID("statistics-modal").should("be.visible");

      // Open the score info modal
      cy.getByTestID("statistics-modal").findByTestID("score-button").click();

      cy.getByTestID("score-info-modal").should("be.visible");

      cy.getByTestID("statistics-modal").should("not.be.visible");
      cy.getByTestID("score-modal").should("not.exist");

      cy.getByTestID("score-info-modal").contains(
        "The score for a completed game is determined by applying a multiplier to each letter's Scrabble value."
      );
      cy.getByTestID("score-info-modal").contains(
        "A multiplier for each letter is determined as follows:"
      );
      cy.getByTestID("score-info-modal").contains(
        "1x is awarded to letters which form one word 3 or more letters long"
      );
      cy.getByTestID("score-info-modal").contains(
        "2x is awarded to letters which form two words 3 or more letters long"
      );
      cy.getByTestID("score-info-modal").contains(
        "0x is awarded to any other letters"
      );

      // Click the return to statistics modal button
      cy.getByTestID("score-info-modal").findByTestID("return-button").click();

      cy.getByTestID("score-info-modal").should("not.be.visible");
      cy.getByTestID("score-modal").should("not.exist");

      cy.getByTestID("statistics-modal").should("be.visible");
    });

    it("displays the score breakdown if the user has completed the game", () => {
      // All words except the last
      const words = todaysAnswer.words.slice(0, todaysAnswer.words.length - 1);

      // Place all of the letters except for those in the last word
      getSolutionLetters(words).forEach(({ letter, location }) => {
        cy.getTileFromRack(letter).placeOnBoard(location);

        cy.getTileFromBoard(location).should("contain.text", letter);
      });

      // Place the 'F' to form the 2-letter word 'OF'
      cy.getTileFromRack("F").placeOnBoard({ column: 5, row: 3 });
      // Place the 'G' and 'O' to form the word 'GOS'
      cy.getTileFromRack("G").placeOnBoard({ column: 2, row: 6 });
      cy.getTileFromRack("O").placeOnBoard({ column: 3, row: 6 });

      // Cypress decides it doesn't want to click any buttons unless a reload is done
      cy.reload();

      // Open the statistics modal
      cy.getByTestID("statistics-button").click();

      // Open the score modal
      cy.getByTestID("score-button").click();

      cy.getByTestID("score-modal").should("be.visible");

      cy.getByTestID("statistics-modal").should("not.be.visible");
      cy.getByTestID("score-info-modal").should("not.exist");

      cy.getByTestID("score-modal").contains("24 points");

      // H - points: 4, multiplier: x1
      cy.getByTestID("score-modal")
        .findTile({ column: 1, row: 2 })
        .should("contain", "H");
      cy.getByTestID("score-modal")
        .findTile({ column: 1, row: 2 })
        .findByTestID("points")
        .should("contain", "4");
      cy.getByTestID("score-modal")
        .findTile({ column: 1, row: 2 })
        .findByTestID("multiplier")
        .should("contain", "x1");

      // A - points: 1, multiplier: x2
      cy.getByTestID("score-modal")
        .findTile({ column: 2, row: 2 })
        .should("contain", "A");
      cy.getByTestID("score-modal")
        .findTile({ column: 2, row: 2 })
        .findByTestID("points")
        .should("contain", "1");
      cy.getByTestID("score-modal")
        .findTile({ column: 2, row: 2 })
        .findByTestID("multiplier")
        .should("contain", "x2");

      // I - points: 1, multiplier: 1x
      cy.getByTestID("score-modal")
        .findTile({ column: 3, row: 2 })
        .should("contain", "I");
      cy.getByTestID("score-modal")
        .findTile({ column: 3, row: 2 })
        .findByTestID("points")
        .should("contain", "1");
      cy.getByTestID("score-modal")
        .findTile({ column: 3, row: 2 })
        .findByTestID("multiplier")
        .should("contain", "x1");

      // L - points: 1, multiplier: 2x
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 2 })
        .should("contain", "L");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 2 })
        .findByTestID("points")
        .should("contain", "1");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 2 })
        .findByTestID("multiplier")
        .should("contain", "x2");

      // C - points: 3, multiplier: 1x
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 1 })
        .should("contain", "C");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 1 })
        .findByTestID("points")
        .should("contain", "3");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 1 })
        .findByTestID("multiplier")
        .should("contain", "x1");

      // O - points: 1, multiplier: 1x
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 3 })
        .should("contain", "O");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 3 })
        .findByTestID("points")
        .should("contain", "1");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 3 })
        .findByTestID("multiplier")
        .should("contain", "x1");

      // U - points: 1, multiplier: 1x
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 4 })
        .should("contain", "U");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 4 })
        .findByTestID("points")
        .should("contain", "1");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 4 })
        .findByTestID("multiplier")
        .should("contain", "x1");

      // D - points: 2, multiplier: 1x
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 5 })
        .should("contain", "D");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 5 })
        .findByTestID("points")
        .should("contain", "2");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 5 })
        .findByTestID("multiplier")
        .should("contain", "x1");

      // S - points: 1, multiplier: 2x
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 6 })
        .should("contain", "S");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 6 })
        .findByTestID("points")
        .should("contain", "1");
      cy.getByTestID("score-modal")
        .findTile({ column: 4, row: 6 })
        .findByTestID("multiplier")
        .should("contain", "x2");

      // G - points: 2, multiplier: 1x
      cy.getByTestID("score-modal")
        .findTile({ column: 2, row: 6 })
        .should("contain", "G");
      cy.getByTestID("score-modal")
        .findTile({ column: 2, row: 6 })
        .findByTestID("points")
        .should("contain", "2");
      cy.getByTestID("score-modal")
        .findTile({ column: 2, row: 6 })
        .findByTestID("multiplier")
        .should("contain", "x1");

      // O - points: 1, multiplier: 1x
      cy.getByTestID("score-modal")
        .findTile({ column: 3, row: 6 })
        .should("contain", "O");
      cy.getByTestID("score-modal")
        .findTile({ column: 3, row: 6 })
        .findByTestID("points")
        .should("contain", "1");
      cy.getByTestID("score-modal")
        .findTile({ column: 3, row: 6 })
        .findByTestID("multiplier")
        .should("contain", "x1");

      // F - points: 4, multiplier: 0x
      cy.getByTestID("score-modal")
        .findTile({ column: 5, row: 3 })
        .should("contain", "F");
      cy.getByTestID("score-modal")
        .findTile({ column: 5, row: 3 })
        .findByTestID("points")
        .should("contain", "4");
      cy.getByTestID("score-modal")
        .findTile({ column: 5, row: 3 })
        .findByTestID("multiplier")
        .should("contain", "x0");

      // Click the return to statistics modal button
      cy.getByTestID("score-modal").findByTestID("return-button").click();

      cy.getByTestID("score-modal").should("not.be.visible");
      cy.getByTestID("score-info-modal").should("not.exist");

      cy.getByTestID("statistics-modal").should("be.visible");

      // Open the score modal again
      cy.getByTestID("score-button").click();

      cy.getByTestID("score-modal").should("be.visible");

      cy.getByTestID("score-info-modal").should("not.exist");
      cy.getByTestID("statistics-modal").should("not.be.visible");

      // Click the link to the score info modal
      cy.getByTestID("score-modal")
        .findByTestID("score-info-link")
        .click({ force: true });

      cy.getByTestID("score-info-modal").should("be.visible");

      cy.getByTestID("score-modal").should("not.be.visible");
      cy.getByTestID("statistics-modal").should("not.be.visible");

      // Click the return to statistics modal button
      cy.getByTestID("score-info-modal").findByTestID("return-button").click();

      cy.getByTestID("statistics-modal").should("be.visible");

      cy.getByTestID("score-info-modal").should("not.be.visible");
      cy.getByTestID("score-modal").should("not.be.visible");

      // Click the score card
      cy.getByTestID("statistics-modal").findByTestID("score-card").click();

      cy.getByTestID("score-modal").should("be.visible");

      cy.getByTestID("statistics-modal").should("not.be.visible");
      cy.getByTestID("score-info-modal").should("not.be.visible");

      // Click the return to statistics modal button
      cy.getByTestID("score-modal").findByTestID("return-button").click();

      cy.getByTestID("statistics-modal").should("be.visible");

      cy.getByTestID("score-info-modal").should("not.be.visible");
      cy.getByTestID("score-modal").should("not.be.visible");

      // Close the statistics modal
      cy.getByTestID("statistics-modal").findByTestID("close-button").click();

      // Reset the game (forced as cypress thinks is being covered by invisible modal)
      cy.getByTestID("reset-icon-button").click({ force: true });

      // Open the statistics modal (forced as cypress thinks is being covered by invisible modal)
      cy.getByTestID("statistics-button").click({ force: true });

      // The score card should now open the score info modal when clicked
      cy.getByTestID("statistics-modal").findByTestID("score-card").click();

      cy.getByTestID("score-info-modal").should("be.visible");

      cy.getByTestID("statistics-modal").should("not.be.visible");
      cy.getByTestID("score-modal").should("not.be.visible");
    });
  });
});

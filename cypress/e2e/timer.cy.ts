import { getTodaysSolutionLetters } from "../support/utils";

describe("Timer", () => {
  it("times how long it takes for the user to complete the game", () => {
    // Tick a second before placing each letter (timer shouldn't start until first tile is placed)
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.tick(1000);

      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "Time");
    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "00:14");

    // Refresh the game to check that the time is still present
    cy.reload();

    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "Time");
    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "00:14");
  });

  it("stops the timer when all the letters are placed back on the rack", () => {
    const solutionLetters = getTodaysSolutionLetters();

    const firstLetter = solutionLetters[0];

    // Place the first letter
    cy.getTileFromRack(firstLetter.letter).placeOnBoard(firstLetter.location);

    cy.getTileFromBoard(firstLetter.location).should(
      "have.text",
      firstLetter.letter
    );

    // Tick a second
    cy.tick(1000);

    // Refresh the page to check that the timer is saved
    cy.reload();

    // Return the letter back to the rack
    cy.getTileFromBoard(firstLetter.location).dblclick();

    cy.getTileFromBoard(firstLetter.location).should("have.text", "");

    // Tick 30 seconds to check that the timer is paused
    cy.tick(30000);

    // Place all of the letters
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "Time");
    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "00:01");
  });

  it("resets the timer when resetting the game", () => {
    const solutionLetters = getTodaysSolutionLetters();

    const firstLetter = solutionLetters[0];

    // Place the first letter
    cy.getTileFromRack(firstLetter.letter).placeOnBoard(firstLetter.location);

    cy.getTileFromBoard(firstLetter.location).should(
      "have.text",
      firstLetter.letter
    );

    // Tick 30 seconds
    cy.tick(30000);

    // Click the reset button
    cy.getByTestID("reset-icon-button").click();

    // Place all of the letters
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "Time");
    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "00:00");
  });

  it("doesn't display the timer before the user has completed the game", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal").get("time-card").should("not.exist");
  });
});

import { getTodaysSolutionLetters } from "../support/utils";

describe("Timer", () => {
  it("times how long it takes for the user to complete the game", () => {
    // Tick a second before placing each letter (timer shouldn't start until first tile is placed)
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.tick(1000);

      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    // Tick another second to check that the timer isn't still running
    cy.tick(1000);

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

    /**
     * Simulate the user clicking away and back onto the application
     * in order to reproduce an issue to do with the auto pause and
     * start feature.
     */
    cy.window().trigger("blur");
    cy.window().trigger("focus");

    // Tick 1 second
    cy.tick(1000);

    // Check that the time still isn't ticking
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

  it("stops the timer when the user clicks away from the application", () => {
    // Tick a second between clicking away from the application and check that timer hasn't incremented
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      // Simulate the user clicking away from the application
      cy.window().trigger("blur");

      // Tick a second (this shouldn't cause a timer change)
      cy.tick(1000);

      // Simulate the user clicking back onto the application
      cy.window().trigger("focus");

      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "Time");
    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "00:00");
  });

  it("resets the timer when resetting a completed game", () => {
    // Place all of the letters, ticking two seconds each time
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);

      // Tick 2 seconds, although the last tick shouldn't do anything
      cy.tick(2000);
    });

    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "Time");
    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "00:28");

    cy.getByTestID("statistics-modal").find("[aria-label=close]").click();

    // Click the reset button
    cy.getByTestID("reset-icon-button").click({ force: true });

    // Place all of the letters, ticking 1 second each time
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);

      // Tick 1 second, although the last tick shouldn't do anything
      cy.tick(1000);
    });

    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "Time");
    cy.getByTestID("statistics-modal")
      .findByTestID("time-card")
      .should("contain.text", "00:14");
  });

  it("doesn't reset the timer when resetting the game midway through", () => {
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
      .should("contain.text", "00:30");
  });

  it("doesn't display the timer before the user has completed the game", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal").should("be.visible");

    cy.getByTestID("statistics-modal")
      .getByTestID("time-card")
      .should("not.exist");
  });

  it("doesn't display the timer once the game has been reset and there is a new game", () => {
    // Place all of the letters
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.reload();

    cy.clock().invoke("restore");

    // Update the date to the following day
    cy.clock(new Date(2023, 0, 3));

    // Reset the board which should update the game to the next day's
    cy.getByTestID("reset-icon-button").click();

    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal")
      .getByTestID("time-card")
      .should("not.exist");
  });
});

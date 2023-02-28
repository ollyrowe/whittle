import { Board } from "../../src/model/Board";
import { GameLoader } from "../../src/model/game/GameLoader";
import { getTodaysSolutionLetters } from "../support/utils";

describe("Streak", () => {
  beforeEach(() => {
    // Create a 4 day streak
    GameLoader.addCompletedGame({
      date: new Date(2023, 0, 2),
      board: new Board(),
      number: 1,
      mode: "normal",
    });
    GameLoader.addCompletedGame({
      date: new Date(2023, 0, 3),
      board: new Board(),
      number: 1,
      mode: "normal",
    });
    GameLoader.addCompletedGame({
      date: new Date(2023, 0, 4),
      board: new Board(),
      number: 1,
      mode: "normal",
    });
    GameLoader.addCompletedGame({
      date: new Date(2023, 0, 5),
      board: new Board(),
      number: 1,
      mode: "normal",
    });

    cy.clock().invoke("restore");

    cy.clock(new Date(2023, 0, 6));

    cy.reload();
  });

  it("displays the user's current streak", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal")
      .findByTestID("streak-display")
      .contains("4");
  });

  it("prompts the user to complete their first game", () => {
    // Clear the streak data
    cy.clearLocalStorage("completed-games");

    cy.reload();

    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal")
      .findByTestID("streak-display")
      .contains("Complete your first game to start a streak!");
  });

  it("prompts the user to start a streak", () => {
    // Clear the streak data
    cy.clearLocalStorage("completed-games").then(() => {
      // Add one game that doesn't form part of the streak
      GameLoader.addCompletedGame({
        date: new Date(2022, 11, 29),
        board: new Board(),
        number: 1,
        mode: "normal",
      });
    });

    cy.reload();

    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal")
      .findByTestID("streak-display")
      .contains("Complete a game to start a streak!");
  });

  it("prompts the user to complete today's game", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal")
      .findByTestID("streak-display")
      .contains("Complete today's game to continue your streak!");
  });

  it("displays a series of ticks, crosses and dots for each day", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("streak-display")
      .findByTestID("day-circle")
      .then((dayCircles) => {
        // Should be a day circle for each day of the week
        expect(dayCircles).to.have.lengthOf(7);

        const [sunday, monday, tuesday, wednesday, thursday, friday, saturday] =
          dayCircles;

        // No completed game
        cy.wrap(sunday).findByTestID("cross").should("exist");
        // Streak days
        cy.wrap(monday).findByTestID("tick").should("exist");
        cy.wrap(tuesday).findByTestID("tick").should("exist");
        cy.wrap(wednesday).findByTestID("tick").should("exist");
        cy.wrap(thursday).findByTestID("tick").should("exist");
        // Today
        cy.wrap(friday).findByTestID("dot").should("exist");
        // Tomorrow
        cy.wrap(saturday).should("be.empty");
      });
  });

  it("displays the time until the next game", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal").contains("Next Whittle In");

    // Jump forward 1 second into the future
    cy.tick(1000);

    cy.getByTestID("statistics-modal").contains("23:59:59");

    // Jump forward another second into the future
    cy.tick(1000);

    cy.getByTestID("statistics-modal").contains("23:59:58");
  });

  it("displays a badge warning the user that their streak is in danger", () => {
    // As the user hasn't completed today's game according to test data
    cy.getByTestID("statistics-button").findByTestID("warning-badge");

    cy.getByTestID("statistics-button")
      .findByTestID("streak-badge")
      .should("not.exist");
  });

  it("displays a badge indicating the user has completed today's game", () => {
    // Clear the streak data
    cy.clearLocalStorage("completed-games");

    // Restore the date back to the default date
    cy.clock().invoke("restore");

    cy.clock(new Date(2023, 0, 2));

    cy.reload();

    // Streak badge should not yet be visible
    cy.getByTestID("statistics-button")
      .findByTestID("streak-badge")
      .should("not.exist");

    // Complete the game
    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter).placeOnBoard(location);

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    // Streak badge should now exist
    cy.getByTestID("statistics-button")
      .findByTestID("streak-badge")
      .should("exist");
  });

  it("doesn't display a badge if the user hasn't played a game before", () => {
    // Clear the streak data
    cy.clearLocalStorage("completed-games");

    // Refresh the page
    cy.reload();

    cy.getByTestID("statistics-button")
      .findByTestID("streak-badge")
      .should("not.exist");

    cy.getByTestID("statistics-button")
      .findByTestID("warning-badge")
      .should("not.exist");
  });

  it("doesn't display a badge if the user has a historic steak but not a current one", () => {
    // Set the date to the following day meaning the current streak has been lost
    cy.clock().invoke("restore");

    cy.clock(new Date(2023, 0, 7));

    cy.reload();

    cy.getByTestID("statistics-button")
      .findByTestID("streak-badge")
      .should("not.exist");

    cy.getByTestID("statistics-button")
      .findByTestID("warning-badge")
      .should("not.exist");
  });
});

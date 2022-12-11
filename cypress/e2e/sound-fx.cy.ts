import { getTodaysSolutionLetters } from "../support/utils";

describe("Sound FX", () => {
  beforeEach(() => {
    // Stub the Audio global class constructor to return mock instances
    cy.visit(Cypress.config().baseUrl!, {
      onBeforeLoad: (window) => {
        cy.stub(window, "Audio").callsFake((url: string) => {
          if (url.includes("tile-place")) {
            return tilePlaceSound;
          } else if (url.includes("game-win")) {
            return gameWinSound;
          } else {
            return new Audio(url);
          }
        });
      },
    });

    cy.spy(tilePlaceSound, "play");
    cy.spy(gameWinSound, "play");
  });

  it("plays a sound when placing a tile and winning the game", () => {
    // Neither sound should have been played yet
    expect(tilePlaceSound.play).not.to.be.called;
    expect(gameWinSound.play).not.to.be.called;

    // Place each letter within the solution
    getTodaysSolutionLetters().forEach(({ letter, location }, index) => {
      cy.getTileFromRack(letter)
        .placeOnBoard(location)
        .then(() => {
          // The tile place sound should have been called
          expect(tilePlaceSound.play).to.have.callCount(index + 1);
        });

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal")
      .should("be.visible")
      .then(() => {
        // Game win sound should have been called
        expect(gameWinSound.play).to.be.calledOnce;
      });
  });

  it("doesn't play any sound when the sound FXs have been disabled", () => {
    cy.getByTestID("settings-button").click();

    // Disable the sound FXs
    cy.getByTestID("sound-fx-toggle").find("input").click();

    cy.getByTestID("settings-modal").find("[aria-label=close]").click();

    // Neither sound should have been played
    expect(tilePlaceSound.play).not.to.be.called;
    expect(gameWinSound.play).not.to.be.called;

    getTodaysSolutionLetters().forEach(({ letter, location }) => {
      cy.getTileFromRack(letter)
        .placeOnBoard(location)
        .then(() => {
          // Shouldn't have called the tile place sound
          expect(tilePlaceSound.play).not.to.be.called;
        });

      cy.getTileFromBoard(location).should("contain.text", letter);
    });

    cy.getByTestID("statistics-modal")
      .should("be.visible")
      .then(() => {
        // Shouldn't have played the game win sound
        expect(gameWinSound.play).not.to.be.called;
      });
  });
});

const tilePlaceSound = new Audio();
const gameWinSound = new Audio();

export {};

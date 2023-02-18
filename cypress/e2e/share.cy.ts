import { Board } from "../../src/model/Board";
import { GameLoader } from "../../src/model/game/GameLoader";
import {
  getTodaysSolutionLetters,
  reloadAndStubNavigator,
  userAgents,
} from "../support/utils";

describe("Share", () => {
  describe("Incomplete Game", () => {
    it("doesn't display the share button by default", () => {
      cy.getByTestID("statistics-button").click();

      cy.getByTestID("statistics-modal").should("be.visible");

      cy.getByTestID("share-button").should("not.exist");
    });
  });

  describe("Completed Game", () => {
    beforeEach(() => {
      // Create a 2 day streak
      GameLoader.addCompletedGame({
        date: new Date(2022, 11, 31),
        board: new Board(),
        number: 1,
        mode: "normal",
      });
      GameLoader.addCompletedGame({
        date: new Date(2023, 0, 1),
        board: new Board(),
        number: 1,
        mode: "normal",
      });

      // Complete the game
      getTodaysSolutionLetters().forEach(({ letter, location }) => {
        cy.getTileFromRack(letter).placeOnBoard(location);

        // Tick 1 second
        cy.tick(1000);

        cy.getTileFromBoard(location).should("contain.text", letter);
      });
    });

    it("shares a text image of the completed board and statistics when on mobile", () => {
      reloadAndStubNavigator({ userAgent: userAgents.mobile });

      checkShareHasNotBeenCalled();

      cy.getByTestID("statistics-button").click();

      cy.getByTestID("share-button").click();

      checkShareHasBeenCalled();

      checkClipboardHasNotBeenCalled();
    });

    it("shares a text image of the completed board and statistics when on tablet", () => {
      reloadAndStubNavigator({ userAgent: userAgents.tablet });

      checkShareHasNotBeenCalled();

      cy.getByTestID("statistics-button").click();

      cy.getByTestID("share-button").click();

      checkShareHasBeenCalled();

      checkClipboardHasNotBeenCalled();
    });

    it("copies a text image of the completed board and statistics when on desktop", () => {
      reloadAndStubNavigator({ userAgent: userAgents.desktop });

      checkClipboardHasNotBeenCalled();

      cy.getByTestID("statistics-button").click();

      cy.getByTestID("share-button").click();

      checkClipboardHasBeenCalled();

      checkShareHasNotBeenCalled();
    });

    it("copies a text image of the completed board and statistics when unable to share", () => {
      // Set the user agent to a mobile device as share API is not used for desktops
      reloadAndStubNavigator({ userAgent: userAgents.mobile, canShare: false });

      checkClipboardHasNotBeenCalled();

      cy.getByTestID("statistics-button").click();

      cy.getByTestID("share-button").click();

      checkClipboardHasBeenCalled();

      checkShareHasNotBeenCalled();
    });

    it("doesn't display the share button once the board has been reset", () => {
      cy.getByTestID("statistics-modal").findByTestID("close-button").click();

      // Cypress decides it doesn't want to click the button unless a reload is done
      cy.reload();

      cy.getByTestID("reset-icon-button").click();

      cy.getByTestID("statistics-button").click();

      cy.getByTestID("statistics-modal").should("be.visible");

      cy.getByTestID("share-button").should("not.exist");
    });
  });
});

const checkShareHasBeenCalled = () => {
  // Check that the share method was called with the correct parameters
  cy.get("@share").then((share: any) => {
    expect(share).to.have.been.called;

    const { args } = share.getCalls()[0];

    const firstArgument = args[0];

    expect(firstArgument.text).to.equal(shareString);
  });
};

const checkShareHasNotBeenCalled = () => {
  cy.get("@share").should("not.have.been.called");
};

const checkClipboardHasBeenCalled = () => {
  // Check that the copy method was called with the correct parameters
  cy.get("@copy-text").then((copy: any) => {
    expect(copy).to.have.been.called;

    const { args } = copy.getCalls()[0];

    const firstArgument = args[0];

    expect(firstArgument).to.equal(shareString);
  });
};

const checkClipboardHasNotBeenCalled = () => {
  cy.get("@copy-text").should("not.have.been.called");
};

const shareString =
  "#whittle2\n\n⬜🟦⬜🟦⬜\n🟦🟦🟦🟦⬜\n⬜🟦⬜🟦⬜\n⬜🟦⬜🟦⬜\n⬜⬜⬜🟦⬜\n🟦🟦🟦🟦⬜\n\n⌛time: 00:14\n📊score: 28 pts\n🔥streak: 3\nwhittlegame.com";

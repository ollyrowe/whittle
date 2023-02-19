import todaysAnswer from "../fixtures/todays-answer.json";
import { Board } from "../../src/model/Board";
import { GameLoader } from "../../src/model/game/GameLoader";
import {
  getSolutionLetters,
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

      // All words except the last
      const words = todaysAnswer.words.slice(0, todaysAnswer.words.length - 1);

      // Complete the game using a combination of theme and non-theme words
      getSolutionLetters(words).forEach(({ letter, location }) => {
        cy.getTileFromRack(letter).placeOnBoard(location);

        cy.getTileFromBoard(location).should("contain.text", letter);
      });

      // Tick 12 seconds
      cy.tick(12000);

      // Place the 'F' to form the 2-letter word 'OF'
      cy.getTileFromRack("F").placeOnBoard({ column: 5, row: 3 });
      // Place the 'G' and 'O' to form the word 'GOS'
      cy.getTileFromRack("G").placeOnBoard({ column: 2, row: 6 });
      cy.getTileFromRack("O").placeOnBoard({ column: 3, row: 6 });
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

const shareString = `#whittle2

⬜🟦⬜🟦⬜
🟦🟦🟦🟦⬜
⬜🟦⬜🟦🟩
⬜🟦⬜🟦⬜
⬜⬜⬜🟦⬜
⬜🟩🟩🟦⬜

⌛time: 00:12
📊score: 24 pts
🔥streak: 3
whittlegame.com`;

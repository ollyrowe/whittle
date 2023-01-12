import { getTodaysSolutionLetters } from "../support/utils";

describe("Share", () => {
  describe("Board Button", () => {
    it("disables the button if the user cannot share", () => {
      reloadAndStubShare({ canShare: false });

      const letters = getTodaysSolutionLetters();

      const firstLetter = letters[0];

      cy.getTileFromRack(firstLetter.letter).placeOnBoard(firstLetter.location);

      cy.getByTestID("share-board-button").should("be.disabled");
    });

    it("disables the button when there are no tiles placed on the board", () => {
      reloadAndStubShare();

      const letters = getTodaysSolutionLetters();

      const firstLetter = letters[0];

      cy.getByTestID("share-board-button").should("be.disabled");

      cy.getTileFromRack(firstLetter.letter).placeOnBoard(firstLetter.location);

      cy.getByTestID("share-board-button").should("be.enabled");

      // Return the tile to the rack
      cy.getTileFromBoard(firstLetter.location).dblclick();

      cy.getByTestID("share-board-button").should("be.disabled");
    });

    it("shares a screenshot of the current game progress", () => {
      const letters = getTodaysSolutionLetters();

      const firstLetter = letters[0];

      cy.getTileFromRack(firstLetter.letter).placeOnBoard(firstLetter.location);

      // Cypress decides it doesn't want to click the button unless a reload is done
      reloadAndStubShare();

      cy.getByTestID("share-board-button").click();

      handleShare();

      checkShareHasBeenCalled();
    });
  });

  describe("Statistics Modal Button", () => {
    it("disables the button if the user cannot share", () => {
      const letters = getTodaysSolutionLetters();

      const firstLetter = letters[0];

      cy.getTileFromRack(firstLetter.letter).placeOnBoard(firstLetter.location);

      reloadAndStubShare({ canShare: false });

      cy.getByTestID("statistics-button").click();

      cy.getByTestID("share-button").should("be.disabled");
    });

    it("shares a screenshot of the completed board", () => {
      reloadAndStubShare();

      cy.get("@share").should("not.have.been.called");

      // Complete the game
      getTodaysSolutionLetters().forEach(({ letter, location }) => {
        cy.getTileFromRack(letter).placeOnBoard(location);

        cy.getTileFromBoard(location).should("contain.text", letter);
      });

      // Cypress decides it doesn't want to click the button unless a reload is done
      reloadAndStubShare();

      cy.getByTestID("statistics-button").click();

      cy.getByTestID("share-button").should("be.enabled");

      cy.getByTestID("share-button").click();

      handleShare();

      checkShareHasBeenCalled();
    });
  });
});

const reloadAndStubShare = ({ canShare } = { canShare: true }) => {
  cy.visit(Cypress.config().baseUrl!, {
    onBeforeLoad: (window) => {
      window.navigator.canShare = () => canShare;
      window.navigator.share = () => Promise.resolve();

      cy.stub(window.navigator, "share").as("share").resolves();
    },
  });
};

const handleShare = () => {
  cy.getByTestID("share-modal").should("be.visible");

  cy.getByTestID("share-modal").contains("Show Letters");

  cy.getByTestID("show-letters-toggle").find("input").should("not.be.checked");

  cy.getByTestID("show-letters-toggle").find("input").check();

  cy.getByTestID("show-letters-toggle").find("input").should("be.checked");

  cy.getByTestID("confirm-share-button").click();
};

const checkShareHasBeenCalled = () => {
  // Check that the share method was called with the correct parameters
  cy.get("@share").then((share: any) => {
    expect(share).to.have.been.called;

    const { args } = share.getCalls()[0];

    const firstArgument = args[0];

    expect(firstArgument.files).to.have.lengthOf(1);
  });
};

export {};

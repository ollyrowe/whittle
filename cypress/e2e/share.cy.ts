import { getTodaysSolutionLetters } from "../support/utils";

describe("Share", () => {
  it("shares a screenshot of the completed board", () => {
    reloadAndStubShare();

    cy.get("@share").should("not.have.been.called");

    cy.getByTestID("statistics-button").click();

    cy.getByTestID("share-button").should("be.disabled");

    cy.getByTestID("statistics-modal").find("[aria-label=close]").click();

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

    cy.getByTestID("share-modal").should("be.visible");

    cy.getByTestID("share-modal").contains("Show Letters");

    cy.getByTestID("show-letters-toggle")
      .find("input")
      .should("not.be.checked");

    cy.getByTestID("show-letters-toggle").find("input").check();

    cy.getByTestID("show-letters-toggle").find("input").should("be.checked");

    cy.getByTestID("confirm-share-button").click();

    // Check that the share method was called with the correct parameters
    cy.get("@share").then((share: any) => {
      expect(share).to.have.been.called;

      const { args } = share.getCalls()[0];

      const firstArgument = args[0];

      expect(firstArgument.files).to.have.lengthOf(1);
    });
  });

  it("prevents sharing incomplete games", () => {
    // Place a tile on the board
    cy.getTileFromRack("A").placeOnBoard({ row: 1, column: 1 });

    // Cypress decides it doesn't want to click the button unless a reload is done
    reloadAndStubShare();

    cy.getByTestID("statistics-button").click();

    cy.getByTestID("share-button").should("be.disabled");
  });
});

const reloadAndStubShare = () => {
  cy.visit(Cypress.config().baseUrl!, {
    onBeforeLoad: (window) => {
      const canShare = () => true;
      const share = () => {};

      window.navigator.canShare = window.navigator.canShare || canShare;
      window.navigator.share = window.navigator.share || share;

      cy.stub(window.navigator, "share").as("share").resolves();
    },
  });
};

export {};

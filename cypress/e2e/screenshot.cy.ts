import {
  getTodaysSolutionLetters,
  reloadAndStubNavigator,
  userAgents,
} from "../support/utils";

describe("Screenshot", () => {
  describe("Empty Board", () => {
    it("disables the button when there are no tiles placed on the board", () => {
      const letters = getTodaysSolutionLetters();

      const firstLetter = letters[0];

      cy.getByTestID("screenshot-button").should("be.disabled");

      cy.getTileFromRack(firstLetter.letter).placeOnBoard(firstLetter.location);

      cy.getByTestID("screenshot-button").should("be.enabled");

      // Return the tile to the rack
      cy.getTileFromBoard(firstLetter.location).dblclick();

      cy.getByTestID("screenshot-button").should("be.disabled");
    });
  });

  describe("With Placed Tile", () => {
    // Place the first letter on the board
    beforeEach(() => {
      const letters = getTodaysSolutionLetters();

      const firstLetter = letters[0];

      cy.getTileFromRack(firstLetter.letter).placeOnBoard(firstLetter.location);
    });

    it("takes a screenshot of the current game progress and shares it on mobile", () => {
      reloadAndStubNavigator({ userAgent: userAgents.mobile });

      cy.getByTestID("screenshot-button").click();

      checkShareHasNotBeenCalled();

      takeScreenshot();

      checkShareHasBeenCalled();

      checkClipboardHasNotBeenCalled();
    });

    it("takes a screenshot of the current game progress and shares it on tablet", () => {
      reloadAndStubNavigator({ userAgent: userAgents.tablet });

      cy.getByTestID("screenshot-button").click();

      checkShareHasNotBeenCalled();

      takeScreenshot();

      checkShareHasBeenCalled();

      checkClipboardHasNotBeenCalled();
    });

    it("copies a screenshot of the current game progress to the clipboard when on desktop", () => {
      reloadAndStubNavigator({ userAgent: userAgents.desktop });

      cy.getByTestID("screenshot-button").click();

      checkClipboardHasNotBeenCalled();

      takeScreenshot();

      checkClipboardHasBeenCalled();

      checkShareHasNotBeenCalled();
    });

    it("copies a screenshot of the current game progress to the clipboard when unable to share", () => {
      // Set the user agent to a mobile device as share API is not used for desktops
      reloadAndStubNavigator({ userAgent: userAgents.mobile, canShare: false });

      cy.getByTestID("screenshot-button").click();

      checkClipboardHasNotBeenCalled();

      takeScreenshot();

      checkClipboardHasBeenCalled();

      checkShareHasNotBeenCalled();
    });
  });
});

const takeScreenshot = () => {
  cy.getByTestID("screenshot-modal").should("be.visible");

  cy.getByTestID("screenshot-modal").contains("SCREENSHOT");

  cy.get('img[alt="Screenshot Preview"]').should("be.visible");

  cy.getByTestID("screenshot-modal").contains("Show Letters");

  cy.getByTestID("show-letters-toggle").find("input").should("not.be.checked");

  cy.getByTestID("show-letters-toggle").find("input").check();

  cy.getByTestID("show-letters-toggle").find("input").should("be.checked");

  cy.getByTestID("share-screenshot-button").click();
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

const checkShareHasNotBeenCalled = () => {
  cy.get("@share").should("not.have.been.called");
};

const checkClipboardHasBeenCalled = () => {
  // Check that the copy method was called with the correct parameters
  cy.get("@copy").then((copy: any) => {
    expect(copy).to.have.been.called;

    const { args } = copy.getCalls()[0];

    const firstArgument = args[0];

    expect(firstArgument).to.have.lengthOf(1);
  });
};

const checkClipboardHasNotBeenCalled = () => {
  cy.get("@copy").should("not.have.been.called");
};

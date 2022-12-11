describe("How to Play", () => {
  it("displays the rules upon first visiting the site", () => {
    cy.getByTestID("how-to-play-modal").should("not.exist");

    // Clear the last-visited local storage state
    cy.clearLocalStorage("last-visited");

    cy.reload();

    cy.getByTestID("how-to-play-modal").should("be.visible");

    cy.reload();

    cy.getByTestID("how-to-play-modal").should("not.exist");
  });

  it("displays the rules upon clicking the how to play button", () => {
    cy.getByTestID("how-to-play-modal").should("not.exist");

    cy.getByTestID("how-to-play-button").click();

    cy.getByTestID("how-to-play-modal").contains("HOW TO PLAY");

    cy.getByTestID("how-to-play-modal").contains(
      "You have 15 letters, all to be placed within the 5 x 6 board"
    );
  });
});

export {};

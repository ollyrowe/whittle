describe("Settings", () => {
  it("displays correct default settings", () => {
    cy.getByTestID("settings-button").click();

    cy.getByTestID("hard-mode-toggle").find("input").should("not.be.checked");
    cy.getByTestID("dark-theme-toggle")
      .find("input")
      .should(prefersDarkTheme ? "be.checked" : "not.be.checked");
    cy.getByTestID("high-contrast-toggle")
      .find("input")
      .should("not.be.checked");
    cy.getByTestID("sound-fx-toggle").find("input").should("be.checked");
  });

  it("persists the user's settings", () => {
    cy.getByTestID("settings-button").click();

    // Toggle each setting
    cy.getByTestID("hard-mode-toggle").find("input").click();
    cy.getByTestID("dark-theme-toggle").find("input").click();
    cy.getByTestID("high-contrast-toggle").find("input").click();
    cy.getByTestID("sound-fx-toggle").find("input").click();

    // Check that the values have been updated
    cy.getByTestID("hard-mode-toggle").find("input").should("be.checked");
    cy.getByTestID("dark-theme-toggle")
      .find("input")
      .should(prefersDarkTheme ? "not.be.checked" : "be.checked");
    cy.getByTestID("high-contrast-toggle").find("input").should("be.checked");
    cy.getByTestID("sound-fx-toggle").find("input").should("not.be.checked");

    cy.reload();

    cy.getByTestID("settings-button").click();

    // Check that the values remain the same
    cy.getByTestID("hard-mode-toggle").find("input").should("be.checked");
    cy.getByTestID("dark-theme-toggle")
      .find("input")
      .should(prefersDarkTheme ? "not.be.checked" : "be.checked");
    cy.getByTestID("high-contrast-toggle").find("input").should("be.checked");
    cy.getByTestID("sound-fx-toggle").find("input").should("not.be.checked");
  });
});

const prefersDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

export {};

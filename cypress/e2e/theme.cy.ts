describe("Theme", () => {
  it("applies the system theme by default", () => {
    if (prefersDarkTheme) {
      checkDarkTheme();
    } else {
      checkLightTheme();
    }
  });

  it("toggles a dark mode", () => {
    // If the dark theme isn't already enabled
    if (!prefersDarkTheme) {
      cy.getByTestID("settings-button").click();

      cy.getByTestID("dark-theme-toggle").find("input").click();

      cy.getByTestID("dark-theme-toggle").find("input").should("be.checked");

      cy.getByTestID("settings-modal").findByTestID("close-button").click();
    }

    checkDarkTheme();
  });

  it("toggles a light mode", () => {
    // If the light theme isn't already enabled
    if (prefersDarkTheme) {
      cy.getByTestID("settings-button").click();

      cy.getByTestID("dark-theme-toggle").find("input").click();

      cy.getByTestID("dark-theme-toggle")
        .find("input")
        .should("not.be.checked");

      cy.getByTestID("settings-modal").findByTestID("close-button").click();
    }

    checkLightTheme();
  });

  it("toggles a high-contrast mode", () => {
    // Place a valid word on the board to create some correct tiles
    cy.getTileFromRack("F").placeOnBoard({ row: 1, column: 1 });
    cy.getTileFromRack("A").placeOnBoard({ row: 1, column: 2 });
    cy.getTileFromRack("N").placeOnBoard({ row: 1, column: 3 });

    // Place an invalid word next to the valid word to create a partially correct tile
    cy.getTileFromRack("D").placeOnBoard({ row: 2, column: 1 });

    // Cypress decides it doesn't want to click the button unless a reload is done
    cy.reload();

    cy.getByTestID("settings-button").click();

    cy.getByTestID("high-contrast-toggle")
      .find("input")
      .should("not.be.checked");

    cy.getByTestID("high-contrast-toggle").find("input").click();

    cy.getByTestID("high-contrast-toggle").find("input").should("be.checked");

    cy.getByTestID("settings-modal").findByTestID("close-button").click();

    // Partially correct letter should be blue
    cy.getTileFromBoard({ row: 1, column: 1 }).should("have.css", [
      "background-color",
      highContrastBlue,
    ]);

    // Correct letters should be orange
    cy.getTileFromBoard({ row: 1, column: 2 }).should("have.css", [
      "background-color",
      highContrastOrange,
    ]);
    cy.getTileFromBoard({ row: 1, column: 3 }).should("have.css", [
      "background-color",
      highContrastOrange,
    ]);

    // Incorrect letters should still be grey
    cy.getTileFromBoard({ row: 2, column: 1 }).shouldHaveGreyBackground();
  });
});

const checkDarkTheme = () => {
  // Background colour
  cy.getByTestID("background").should("have.css", [
    "background-color",
    "#121213",
  ]);

  // Title colour
  cy.contains("Whittle").should("have.css", ["color", "#ffffff"]);

  // Text colour
  cy.getByTestID("background").should("have.css", [
    "color",
    "rgba(255,255,255,0.64)",
  ]);

  // Tile colour
  cy.getByTestID("tile").should("have.css", ["color", "#ffffff"]);
  cy.getByTestID("tile").should("have.css", ["background-color", "#b7b9bc"]);
};

const checkLightTheme = () => {
  // Background colour
  cy.getByTestID("background").should("have.css", [
    "background-color",
    "#ffffff",
  ]);

  // Title colour
  cy.contains("Whittle").should("have.css", ["color", "#3a3a3c"]);

  // Text colour
  cy.getByTestID("background").should("have.css", [
    "color",
    "rgba(58,58,60,0.64)",
  ]);

  // Tile colour
  cy.getByTestID("tile").should("have.css", ["color", "#3a3a3c"]);
  cy.getByTestID("tile").should("have.css", ["background-color", "#d3d6da"]);
};

const prefersDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const highContrastBlue = "#85c0f9";

const highContrastOrange = "#f5793a";

export {};

import "reflect-metadata";
import "./commands";

beforeEach(() => {
  // Set the last-visited date so that the how to play modal doesn't display
  localStorage.setItem("last-visited", JSON.stringify(new Date()));

  // Set the date to be the same date as the 2nd Whittle
  cy.clock(new Date(2023, 0, 2));

  cy.visit(Cypress.config().baseUrl!);
});

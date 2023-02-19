import { reloadAndStubWindow } from "../support/utils";

describe("External Links", () => {
  beforeEach(() => {
    reloadAndStubWindow();
  });

  it("displays a link to the twitter page within the setting modal", () => {
    cy.getByTestID("settings-button").click();

    cy.getByTestID("settings-modal")
      .findByTestID("twitter-link")
      .should("have.attr", "href", "https://twitter.com/WhittleGame")
      .should("have.attr", "target", "_blank")
      .should("have.text", "Twitter");
  });

  it("displays a link to the twitter page within the statistics modal", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal").findByTestID("twitter-button").click();

    // Check that the open method was called with the correct parameters
    cy.get("@open").should(
      "be.calledWithExactly",
      "https://twitter.com/WhittleGame",
      "_blank"
    );
  });

  it("displays a link to the ko-fi page within the statistics modal", () => {
    cy.getByTestID("statistics-button").click();

    cy.getByTestID("statistics-modal").findByTestID("support-button").click();

    // Check that the open method was called with the correct parameters
    cy.get("@open").should(
      "be.calledWithExactly",
      "https://ko-fi.com/whittle",
      "_blank"
    );
  });
});

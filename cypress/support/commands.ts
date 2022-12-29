import { colours } from "../../src/misc/colours";
import { Location } from "./types";
import { hexToRgb, hexToRgba } from "./utils";

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestID(id: string): Chainable<JQuery<HTMLElement>>;
      findByTestID(id: string): Chainable<JQuery<HTMLElement>>;
      findTile(location: Location): Chainable<JQuery<HTMLElement>>;
      findPlaceholder(location: Location): Chainable<JQuery<HTMLElement>>;
      getTileFromRack(letter: string): Chainable<JQuery<HTMLElement>>;
      getTileFromBoard(location: Location): Chainable<JQuery<HTMLElement>>;
      getTilePlaceholderFromBoard(
        location: Location
      ): Chainable<JQuery<HTMLElement>>;
      placeOnBoard(location: Location): Chainable<JQuery<HTMLElement>>;
      shouldHaveGreenBackground(): Chainable<JQuery<HTMLElement>>;
      shouldHaveOrangeBackground(): Chainable<JQuery<HTMLElement>>;
      shouldHaveGreyBackground(): Chainable<JQuery<HTMLElement>>;
      shouldHaveBlueBackground(): Chainable<JQuery<HTMLElement>>;
      shouldBeEnabledPlaceholder(): Chainable<JQuery<HTMLElement>>;
      shouldBeDisabledPlaceholder(): Chainable<JQuery<HTMLElement>>;
      clearSavedGame(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getByTestID", (id) => {
  return cy.get(`[data-testid=${id}]`);
});

Cypress.Commands.add("findByTestID", { prevSubject: true }, (subject, id) => {
  return subject.find(`[data-testid=${id}]`);
});

Cypress.Commands.add(
  "findTile",
  { prevSubject: "element" },
  (subject, { row, column }) => {
    return cy
      .wrap(subject)
      .findByTestID("tile")
      .eq((row - 1) * 5 + (column - 1));
  }
);

Cypress.Commands.add(
  "findPlaceholder",
  { prevSubject: "element" },
  (subject, { row, column }) => {
    return cy
      .wrap(subject)
      .findByTestID("placeholder")
      .eq((row - 1) * 5 + (column - 1));
  }
);

Cypress.Commands.add("getTileFromRack", (letter) => {
  return cy.getByTestID("rack").findByTestID("tile").contains(letter);
});

Cypress.Commands.add("getTileFromBoard", (location) => {
  return cy.getByTestID("board").findTile(location);
});

Cypress.Commands.add("getTilePlaceholderFromBoard", (location) => {
  return cy.getByTestID("board").findPlaceholder(location);
});

Cypress.Commands.add(
  "placeOnBoard",
  { prevSubject: "element" },
  (subject, location) => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    return cy
      .wait(100)
      .getTileFromBoard(location)
      .then(($el) => {
        const { x, y, width, height } = $el[0].getBoundingClientRect();

        const coordinates = {
          // Target the middle of the tile
          clientX: x + width / 2,
          clientY: y + height / 2,
        };

        return cy
          .wrap(subject)
          .trigger("mousedown", { force: true })
          .trigger("mousemove", coordinates)
          .trigger("mouseup");
      })
      .wait(100);
  }
);

Cypress.Commands.add(
  "shouldHaveGreenBackground",
  { prevSubject: "element" },
  (subject) => {
    cy.wrap(subject).should(
      "have.css",
      "background-color",
      prefersDarkTheme ? hexToRgb(colours.darkGreen) : hexToRgb(colours.green)
    );
  }
);

Cypress.Commands.add(
  "shouldHaveOrangeBackground",
  { prevSubject: "element" },
  (subject) => {
    cy.wrap(subject).should(
      "have.css",
      "background-color",
      prefersDarkTheme ? hexToRgb(colours.darkAmber) : hexToRgb(colours.amber)
    );
  }
);

Cypress.Commands.add(
  "shouldHaveGreyBackground",
  { prevSubject: "element" },
  (subject) => {
    cy.wrap(subject).should(
      "have.css",
      "background-color",
      prefersDarkTheme
        ? hexToRgb(colours.lightGrey)
        : hexToRgb(colours.lighterGrey)
    );
  }
);

Cypress.Commands.add(
  "shouldHaveBlueBackground",
  { prevSubject: "element" },
  (subject) => {
    cy.wrap(subject).should(
      "have.css",
      "background-color",
      prefersDarkTheme ? hexToRgb(colours.darkBlue) : hexToRgb(colours.blue)
    );
  }
);

Cypress.Commands.add(
  "shouldBeEnabledPlaceholder",
  { prevSubject: "element" },
  (subject) => {
    cy.wrap(subject).should(
      "have.css",
      "border",
      prefersDarkTheme
        ? `2px solid ${hexToRgb(colours.grey)}`
        : `2px solid ${hexToRgb(colours.lighterGrey)}`
    );
    cy.wrap(subject).should(
      "not.have.css",
      "background-color",
      prefersDarkTheme ? hexToRgb(colours.grey) : hexToRgb(colours.lighterGrey)
    );
  }
);

Cypress.Commands.add(
  "shouldBeDisabledPlaceholder",
  { prevSubject: "element" },
  (subject) => {
    cy.wrap(subject).should(
      "have.css",
      "background-color",
      prefersDarkTheme
        ? hexToRgba(colours.grey, 0.4)
        : hexToRgba(colours.lighterGrey, 0.4)
    );
    cy.wrap(subject).should(
      "not.have.css",
      "box-shadow",
      prefersDarkTheme
        ? `${hexToRgb(colours.grey)} 0px 0px 0px 2px inset`
        : `${hexToRgb(colours.lighterGrey)} 0px 0px 0px 2px inset`
    );
  }
);

Cypress.Commands.add("clearSavedGame", () => {
  cy.clearLocalStorage("game-number");
  cy.clearLocalStorage("game-date");
  cy.clearLocalStorage("board");
  cy.clearLocalStorage("rack");
});

const prefersDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

export {};

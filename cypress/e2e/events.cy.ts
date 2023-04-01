describe("Events", () => {
  beforeEach(() => {
    cy.clock().invoke("restore");
  });

  it("New Year's Day", () => {
    cy.clock(new Date(2023, 0, 1));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy New Year's Day!");
  });

  it("Chinese New Year", () => {
    cy.clock(new Date(2023, 0, 22));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Chinese New Year!");
  });

  it("Valentine's Day", () => {
    cy.clock(new Date(2023, 1, 14));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Valentine's Day!");
  });

  it("Shrove Tuesday", () => {
    cy.clock(new Date(2023, 1, 21));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Pancake Day!");
  });

  it("St. Patrick's Day", () => {
    cy.clock(new Date(2023, 2, 17));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Saint Patrick's Day!");
  });

  it("April Fools' Day", () => {
    cy.clock(new Date(2023, 3, 1));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy April Fools' Day!");
  });

  it("Good Friday", () => {
    cy.clock(new Date(2023, 3, 7));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Good Friday!");
  });

  it("Easter Sunday", () => {
    cy.clock(new Date(2023, 3, 9));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Easter!");
  });

  it("First Day of Pride Month", () => {
    cy.clock(new Date(2022, 5, 1));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Pride Month!");
  });

  it("Halloween", () => {
    cy.clock(new Date(2022, 9, 31));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Halloween!");
  });

  it("First Day of Hanukkah", () => {
    cy.clock(new Date(2022, 11, 18));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Hanukkah!");
  });

  it("Christmas Eve", () => {
    cy.clock(new Date(2022, 11, 24));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy Christmas Eve!");
  });

  it("Christmas", () => {
    cy.clock(new Date(2022, 11, 25));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Merry Christmas!");
  });

  it("New Year's Eve", () => {
    cy.clock(new Date(2022, 11, 31));

    cy.reload();

    cy.getByTestID("board").should("have.text", "Happy New Year's Eve!");
  });
});

export {};

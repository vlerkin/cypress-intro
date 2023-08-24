describe("deleting tags with backslash and quote marks", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("input").type("test'{enter}");
    cy.get("li").should("have.length", 3);
    cy.get("i").last().click();
    cy.get("li").should("have.length", 2);
  });
});

describe("sql injection", () => {
  it("should not contain CRUD words from SQL", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("input").type(
      "SELECT Password FROM Users WHERE UserId = 105 or 1=1;'{enter}"
    );
    cy.get("li").last().should("not.contain.text", "'");
  });
});

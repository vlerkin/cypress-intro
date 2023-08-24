// expected behaviour tests

describe("expected: it adds tag when I type it and hit enter", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("li").should("have.length", 2);
    cy.get("input").type("test-tag{enter}");
    cy.get("li").should("have.length", 3);
    cy.get("li").should("contain.text", "test-tag");
  });
});

describe("expected: I can delete a tag by pressing x", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("li").should("have.length", 2);
    cy.get("input").type("tag-to-delete{enter}");
    cy.get("li").should("have.length", 3);
    cy.get("li").should("contain.text", "tag-to-delete");
    cy.get("i").last().click();
    cy.get("li").should("have.length", 2);
  });
});

describe("expected: I can delete all tags with Remove All button", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("li").should("have.length", 2);
    cy.get("button").click();
    cy.get("li").should("have.length", 0);
  });
});

describe("expected: displays the number of tags I can add", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("li").should("have.length", 2);
    cy.get("p").last().should("contain.text", "8");
  });
});

describe("expected: to update the number of tags when I add one", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("li").should("have.length", 2);
    cy.get("input").type("test-tag{enter}");
    cy.get("li").should("have.length", 3);
    cy.get("p").last().should("contain.text", "7");
  });
});

describe("expected: to update the number of tags when I delete one", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("li").should("have.length", 2);
    cy.get("input").type("test-tag{enter}");
    cy.get("li").should("have.length", 3);
    cy.get("i").last().click();
    cy.get("p").last().should("contain.text", "8");
  });
});

describe("expected: I cannot add a duplicated tag", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("li").should("have.length", 2);
    cy.get("input").type("test-tag{enter}");
    cy.get("li").should("have.length", 3);
    cy.get("input").type("test-tag{enter}");
    cy.get("li").should("have.length", 3);
  });
});

describe("expected: I cannot add a single character as a tag", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("li").should("have.length", 2);
    cy.get("input").type("a{enter}");
    cy.get("li").should("have.length", 2);
  });
});

// possible bugs tests

describe("adding html elements as input", () => {
  it("passes", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("input").type("<a>google.com</a>{enter}");
    cy.get("li").should("have.length", 3);
    cy.get("li").last().should("contain.text", "&lt;");
  });
});

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
  it("should not contain special characters", () => {
    cy.visit("https://qaplayground.dev/apps/tags-input-box/");
    cy.get("input").type(
      "SELECT Password FROM Users WHERE UserId = 105 or 1=1;'{enter}"
    );
    cy.get("li").last().should("not.contain.text", "'");
  });
});

import { doLogin } from "support/util";
import { ROUTES_PATH } from "../../../src/postsManager/config/routes/routes";

describe("Crud Page", () => {
  before(() => {
    doLogin("Sincere@april.biz", "1234"); //save cookie after login
  });

  beforeEach(() => {
    cy.restoreCookies();
    cy.visit(ROUTES_PATH.CRUD_POST_USER);
  });

  it("should create a new post", () => {
    // cy.getCookie("token").should("exist");

    cy.get('[class*="crudPostsUser__list"] > [class*="card"]').then(($posts) => {
      const initialLength = $posts.length;

      // scroll to view cardPost to add posts.
      cy.get("[data-testid=edit-title-input]").then(($input) => {
        cy.window().then((win) => {
          win.scrollTo(0, $input[0].offsetTop + 600);
        });
        cy.wrap($input).should("be.visible").first().type("New Post Title");
      });

      cy.get("[data-testid=edit-body-input]").first().type("This is the body of the new post.");

      cy.get("[data-testid=create-post-button]").click();

      cy.get('[class*="crudPostsUser__list"] > [class*="card"]').should("have.length", initialLength + 1);

      cy.contains("New Post Title").should("exist");
    });
  });

  it("should create a new post", () => {
    cy.get('[class*="crudPostsUser__list"] > [class*="card"]').then(($posts) => {
      const initialLength = $posts.length;

      // scroll to view list card posts
      cy.get("[data-testid=edit-post-button]").then(($input) => {
        cy.window().then((win) => {
          win.scrollTo(0, $input[0].offsetTop + 600);
        });
        cy.wrap($input).should("be.visible").first().click();
      });

      cy.get("[data-testid=edit-title-input]").eq(1).clear().type("Edit Title");
      cy.get("[data-testid=edit-body-input]").eq(1).clear().type("Edit Body");

      cy.get("[data-testid=save-post-button]").click();

      cy.get('[class*="crudPostsUser__list"] > [class*="card"]').should("have.length", initialLength);

      cy.contains("Edit Title").should("exist");
      cy.contains("Edit Body").should("exist");
    });
  });
});

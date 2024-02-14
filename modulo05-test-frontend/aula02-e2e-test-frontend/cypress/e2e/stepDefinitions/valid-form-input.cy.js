import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { registerForm } from "../common/registerForm.cy";


Then("The inputs should be cleared", (text) => {
  registerForm.elements.titleInput().should("have.value", "");
  registerForm.elements.imageUrlInput().should("have.value", "");
});

Then("I should see a check icon in the title field", () => {
  cy.get("#title:valid").should("have.length", 1);
});

Then("I should see a check icon in the imageUrl field", () => {
  cy.get("#imageUrl:valid").should("have.length", 1);
});

Then("I have entered {string} in the title field", (text) => {
  registerForm.typeTitle(text);
});

Then("I have entered {string} in the URL field", (url) => {
  registerForm.typeUrl(url);
});

Then(
  "the list of registered images should be updated with the new item",
  () => {
    registerForm.elements.cardList().should("have.length.gt", 3);
  }
);

Then("the new item should be stored in the localStorage", () => {
  cy.getAllLocalStorage().then((result) => {
    const aliens = result[Cypress.config("baseUrl")];
    const objects = JSON.parse(aliens['tdd-ew-db']);
    assert.equal(objects.length, 1)
  });
});

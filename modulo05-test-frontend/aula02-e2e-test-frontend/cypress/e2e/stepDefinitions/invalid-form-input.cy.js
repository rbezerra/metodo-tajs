import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { registerForm } from "../common/registerForm.cy";

Then("I should see {string} message above the title field", (text) => {
  registerForm.elements.titleFeedback().should("contain.text", text);
});

Then("I should see {string} message above the imageUrl field", (text) => {
  registerForm.elements.imageUrlFeedback().should("contain.text", text);
});

Then("I should see an exclamation icon in the title and URL fields", () => {
  cy.get('input:invalid').should('have.length', 2)
})
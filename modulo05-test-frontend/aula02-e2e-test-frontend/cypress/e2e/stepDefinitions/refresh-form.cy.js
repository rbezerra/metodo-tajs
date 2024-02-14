import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { registerForm } from "../common/registerForm.cy";

Then("I have submitted an image", () => {
  registerForm.typeTitle("Alien BR 2");
  registerForm.typeUrl(
    "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg"
  );
  registerForm.clickSubmit();
  cy.wait(2000);
});

When("I refresh the page", () => {
  cy.visit('/');
});

Then(
  "I should still see the submitted image in the list of registered images",
  () => {
    registerForm.elements.cardList().should("have.length.gt", 3);
  }
);

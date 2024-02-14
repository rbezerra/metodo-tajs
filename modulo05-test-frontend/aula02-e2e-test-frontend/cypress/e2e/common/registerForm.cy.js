class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedback: () => cy.get("#titleFeedback"),
    imageUrlInput: () => cy.get("#imageUrl"),
    imageUrlFeedback: () => cy.get("#urlFeedback"),
    submitBtn: () => cy.get("#btnSubmit"),
    cardList: () => cy.get("#card-list>article"),
  };

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }

  typeUrl(url) {
    if (!url) return;
    this.elements.imageUrlInput().type(url);
  }

  clickSubmit() {
    this.elements.submitBtn().click();
  }
}

export const registerForm = new RegisterForm();

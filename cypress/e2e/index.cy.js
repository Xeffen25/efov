describe('Home Page Input and Submission', () => {
    it('submits input and checks for validation class', () => {
      // Visit the base URL
      cy.visit('/');
  
      // Input text to be typed into the input field
      const inputText = "Hello, Cypress!";
  
      // Type the input text into the input field
      cy.get('#inputText').type(inputText);
  
      // Click the submit button
      cy.get('#inputText').click();
  
      // Check if the input field has class "efov-invalid" after submission
      cy.get('#inputText').should('have.class', 'efov-invalid');
    });
  });
  
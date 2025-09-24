describe('Test greeting form', () => {
  it('should display greeting after submitting name', () => {
    cy.visit('http://localhost:8000/page.html');

    cy.get('#name-input').type('Alice');
    cy.get('#submit-btn').click();

    cy.get('#result').should('have.text', 'Hello, Alice!');
  });
});
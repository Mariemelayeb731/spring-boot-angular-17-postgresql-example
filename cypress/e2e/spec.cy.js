describe('Mon test Angular', () => {
  it('doit afficher la liste des tutoriels', () => {
    cy.visit('http://localhost:4200/tutorials');
    cy.contains('Tutorials List').should('be.visible');
  });
});

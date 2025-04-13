describe('Test de base', () => {
  it('ouvre la page principale et vérifie les éléments', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Tutorials List');
    cy.get('input[placeholder="Search by title"]').should('exist');
    cy.get('button').contains('Remove All').should('be.visible');
  });
});

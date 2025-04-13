describe('Test de base', () => {
  it('ouvre la page principale', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Bienvenue');
  });
});

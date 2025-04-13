describe('Page d’accueil', () => {
  it('devrait afficher un texte de bienvenue', () => {
    cy.visit('/');
    cy.contains('Welcome'); // Adapte selon le contenu de ta page d’accueil
  });
});

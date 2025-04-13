const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Remplace par l'URL de ton application si différente
    specPattern: 'cypress/e2e/**/*.cy.js', // Emplacement des tests
    supportFile: false, // Si tu n'utilises pas de fichier de support global
  },
});

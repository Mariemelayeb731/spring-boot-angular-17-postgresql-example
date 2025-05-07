Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('HMR_CONFIG_NAME is not defined')) {
      return false; // Ignore cette erreur
    }
  });
  
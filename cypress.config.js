const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1600,
  viewportHeight: 1200,
  
  e2e: {
    specPattern:'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

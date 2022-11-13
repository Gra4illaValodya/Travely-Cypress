const { defineConfig } = require('cypress');

module.exports = defineConfig({
	viewportWidth: 1600,
	viewportHeight: 1600,
	
	e2e: {
		chromeWebSecurity: false,
		specPattern: 'cypress/e2e/**/*.{js,jsx, ts, tsx}',
		
	}
});

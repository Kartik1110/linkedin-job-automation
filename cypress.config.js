const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.linkedin.com',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    env: {
      LINKEDIN_USER: process.env.LINKEDIN_USER,
      LINKEDIN_PASS: process.env.LINKEDIN_PASS
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // make sure to return the config object
      return config;
    }
  },
}); 
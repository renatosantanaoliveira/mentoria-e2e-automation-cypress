const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

const ENV = process.env.CYPRESS_ENV || "qa";
const envConfig = require(`./config/${ENV}`);

module.exports = defineConfig({
  e2e: {
    baseUrl: envConfig.baseUrl,

    setupNodeEvents(on, config) {
      // Mescla as variáveis do arquivo de ambiente no config do Cypress
      config.env = { ...config.env, ...envConfig.env };

      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      return config;
    },
  },
});

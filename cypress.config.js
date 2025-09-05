const { defineConfig } = require("cypress");
const lambdatestAccessibility = require('lambdatest-cypress-cli/accessibility/plugin');

module.exports = defineConfig({
  env: {
    issuePrefix: "https://your.domain.atlassian.net/browse/",
    tmsPrefix: "https://some.testrail.instance/path/suite/caseID-",
    allure: true,
    allureResultsPath: "cypress/results/allure-results",
    baseUrl: "https://accounts.com/login",
    runs: 1,
  },

  pageLoadTimeout: 200000,

  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
"reporter": "cypress-multi-reporters",
    "reporterOptions": {
      "reporterEnabled": ["mochawesome"],
      "mochawesomeReporterOptions": {
        "reportDir": "cypress/results",
        "overwrite": false,
        "html": false,
        "json": true
      }

    }
});

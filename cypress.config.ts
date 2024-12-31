import { defineConfig } from "cypress";
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");

export default defineConfig({
  e2e: {
    screenshotsFolder: '',
    baseUrl: "https://todomvc.com/examples/react/dist/",
    setupNodeEvents(on, config) {
      //@ts-ignore
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      on("task", {
        lighthouse: lighthouse(),
      });
    },

  },
});
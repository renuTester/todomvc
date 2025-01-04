/* eslint-disable @typescript-eslint/no-require-imports */
import { defineConfig } from "cypress";
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const fs = require("fs");

export default defineConfig({
	defaultCommandTimeout: 60000,
	pageLoadTimeout: 300000,
	watchForFileChanges: true,
	video: true,
	viewportWidth: 1536,
	viewportHeight: 960,
	numTestsKeptInMemory: 0,
	screenshotsFolder: "mochawesome-report/screenshots",
	videosFolder: "mochawesome-report/videos",
	redirectionLimit: 80,
	reporter: "cypress-multi-reporters",
	reporterOptions: {
		configFile: "config.json"
	},
	e2e: {
		env: {
			firefoxOptions: {
				args: ["-private", "-disable-web-security", "--no-sandbox"]
			}
		},
		slowTestThreshold: 10000,
		specPattern: "cypress/e2e/accessibility/*.spec.cy.ts",
		testIsolation: false,
		baseUrl: "https://todomvc.com/examples/react/dist/",
		retries: {
			runMode: 2,
			openMode: 1
		},
		setupNodeEvents(on, config) {
			on("before:browser:launch", (browser = {}, launchOptions) => {
				prepareAudit(launchOptions);
			});
			on("task", {
				lighthouse: lighthouse((lighthouseOptions) => {
					const path = "mochawesome-report/lighthouse/" + Date.now() + ".html";
					fs.mkdirSync("mochawesome-report/lighthouse", { recursive: true });
					fs.writeFile(path, lighthouseOptions.report);
				})
			});
		}
	}
});

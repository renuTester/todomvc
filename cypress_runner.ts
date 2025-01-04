const cypress = require("cypress");
const yargs = require("yargs");
const { merge } = require("mochawesome-merge");
const marge = require("mochawesome-report-generator");
const npm = require("npm");
const fs = require('node:fs')
const argv = yargs
	.options({
		browser: {
			alias: "b",
			describe: "choose browser that you wanna run tests on",
			default: "chrome",
			choices: ["chrome", "electron"]
		},
		spec: {
			alias: "s",
			describe: "run test with specific spec file",
			default: ""
		},
		reporter: {
			alias: "reporter",
			describe: "A reporter with which you want to generate reports for your tests",
			default: "cypress-multi-reporters"
		},
		"reporter-options": {
			alias: "reporter-options",
			describe: "Options for your reporter",
			default: "configFile=config.json"
		},
		"config-file": {
			alias: "config-file",
			describe: "Override the default configuration file i.e. cypress.config.ts",
			default: "cypress.config.ts"
		}
	})
	.help().argv;

console.log("Browser: " + argv.browser);
console.log("Spec file(s): " + argv.spec);
console.log("Reporter: " + argv.reporter);
console.log("Reporter Options: " + argv["reporter-options"]);
cleanUp('junit_report')
cleanUp('mochawesome-report')

cypress
	.run({
		configFile: argv["config-file"],
		browser: argv.browser,
		spec: argv.spec,
		reporter: argv.reporter,
		reporterOptions: argv["reporter-options"]
	})
	.then((results) => {
		const reporterOptions = {
			reportDir: results.config.reporterOptions.reportDir
		};
		generateReport(reporterOptions);
	})
	.then((generateReport) => npm.load(() => npm.run("merge_junit_reports")))
	.catch((error) => {
		console.error("errors: ", error);
		process.exit(1);
	});

function generateReport(options) {
	return merge(options).then((report) => {
		marge.create(report, options);
	});
}

function cleanUp(folderPath){
	try {
		if (fs.existsSync(folderPath)) {
			fs.rmdirSync(folderPath, { recursive: true });
			console.log(`Folder deleted: ${folderPath}`);
		} else {
			console.log(`No clean up needed, folder does not exist: ${folderPath}`);
		}
	} catch (error) {
		console.error('Error deleting folder:', error);
	}
}

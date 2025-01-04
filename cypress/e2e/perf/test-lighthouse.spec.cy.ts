// / <reference types="cypress" />
// / <reference types="../../support" />

import { LighthouseFlagsDesktop, LighthouseThresholds, LighthouseFlagsDesktopSlow, LighthouseOptions } from "../../utils/config";

describe("ToDo App - Lighthouse Audit", () => {
	beforeEach("Visit App Initial Page", () => {
		cy.visit("/");
	});

	context("App overall audit on Desktop", () => {
		it("should exceed the seo benchmark", () => {
			cy.lighthouse(LighthouseThresholds.SEO, LighthouseFlagsDesktop, LighthouseOptions);
		});

		it("should exceed the accessibility benchmark", () => {
			cy.lighthouse(LighthouseThresholds.Accessibility, LighthouseFlagsDesktop, LighthouseOptions);
		});

		it("should exceed the best-practices benchmark", () => {
			cy.lighthouse(LighthouseThresholds.BestPractices, LighthouseFlagsDesktop, LighthouseOptions);
		});

		it("should exceed the performance benchmark", () => {
			cy.lighthouse(LighthouseThresholds.Performance, LighthouseFlagsDesktop, LighthouseOptions);
		});

		it("should exceed the pwa benchmark", () => {
			cy.lighthouse(LighthouseThresholds.PWA, LighthouseFlagsDesktop, LighthouseOptions);
		});

		it("should exceed the performance benchmark on slow network", () => {
			cy.lighthouse(LighthouseThresholds.Performance, LighthouseFlagsDesktopSlow, LighthouseOptions);
		});
	});
});

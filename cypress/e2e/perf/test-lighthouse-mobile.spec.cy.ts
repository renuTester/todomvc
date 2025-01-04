// / <reference types="cypress" />
// / <reference types="../../support" />

import { LighthouseThresholds, LighthouseFlagsMobile, LighthouseOptions } from "../../utils/config";

describe("ToDo App - Lighthouse Audit", () => {
	beforeEach("Visit App Initial Page", () => {
		cy.visit("/");
	});

	context("App overall audit on Mobile", () => {
		it("should exceed the accessibility benchmark", () => {
			cy.lighthouse(LighthouseThresholds.Accessibility, LighthouseFlagsMobile, LighthouseOptions);
		});

		it("should exceed the best-practices benchmark", () => {
			cy.lighthouse(LighthouseThresholds.BestPractices, LighthouseFlagsMobile, LighthouseOptions);
		});

		it("should exceed the performance benchmark", () => {
			cy.lighthouse(LighthouseThresholds.Performance, LighthouseFlagsMobile, LighthouseOptions);
		});

		it("should exceed the pwa benchmark", () => {
			cy.lighthouse(LighthouseThresholds.PWA, LighthouseFlagsMobile, LighthouseOptions);
		});
	});
});

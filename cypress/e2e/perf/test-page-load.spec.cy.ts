// / <reference types="cypress" />
// / <reference types="../../support" />

import { PageLoad } from "../../utils/config";

describe("Todo App - Page Load", { retries: 0 }, () => {
	context("Page load time", () => {
		it("should be with in the permissible limit", () => {
			cy.visit("https://todomvc.com/examples/react/dist/", {
				onLoad: (win) => {
					const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
					expect(loadTime).to.be.lessThan(PageLoad.Time);
				}
			});
		});
	});
});

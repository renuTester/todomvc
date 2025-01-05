// / <reference types="cypress" />
// / <reference types="../../support" />

import { Tags } from "../../utils/config";
import { Items } from "../../utils/data";

describe([Tags.Accessibility], "Todo App - Accessibility Testing", function () {
	beforeEach("visiting the app homepage", function () {
		// Visiting the main page of the app
		cy.visit("/");
	});

	context("Check accessibility", () => {
		beforeEach(() => {
			// Inject axe core lib into the app
			cy.injectAxe();
		});

		it("should have no a11y violations when app is empty", () => {
			// Checking the violations against the color, keyboard and text-alternatives category
			cy.checkA11y(null, {
				runOnly: ["cat.color", "cat.keyboard", "cat.text-alternatives"],
				includedImpacts: ["critical", "serious", "moderate", "minor"]
			});
		});

		it("should have no a11y violations when page has multiple todos", () => {
			cy.createTodos(Items.ItemOne, Items.ItemTwo, Items.ItemThree);
			cy.get("ul.todo-list li input").check();
			cy.checkA11y(null, {
				runOnly: ["cat.color", "cat.keyboard", "cat.text-alternatives"],
				includedImpacts: ["critical", "serious", "moderate", "minor"]
			});
		});
	});
});

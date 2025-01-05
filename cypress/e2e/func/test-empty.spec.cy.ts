// / <reference types="cypress" />
// / <reference types="../../support" />

import { Tags } from "../../utils/config";
import { Text } from "../../utils/data";

describe("Todo App - Empty Page", function () {
	beforeEach("visiting the app homepage", function () {
		cy.visit("/");
	});

	context("When the app is initially opened", function () {
		it([Tags.Smoke], "should focus on the todo input field", function () {
			cy.focused().should("have.class", "new-todo");
		});

		it([Tags.Smoke], 'should display "What needs to be done?" as a placeholder in todo input field', function () {
			cy.get(".new-todo").should("have.attr", "placeholder", Text.WhatNeedsToBeDone);
		});

		it([Tags.Smoke], "should display the todos header in red and center aligned", function () {
			cy.get("h1").should("have.text", "todos").should("have.css", "color", "rgb(184, 63, 69)").should("have.css", "text-align", "center");
		});

		it([Tags.Smoke], "should display the information section at bottom of the page", function () {
			cy.get("footer.info").should("be.visible").should("contain.text", Text.DoubleClickToEditToDo);
		});
	});

	context("When there are no todos", function () {
		it("should hide todo-list and filter section", function () {
			cy.get("ul.todo-list li").should("not.exist");
			cy.get("footer.footer").should("not.exist");
		});
	});
});

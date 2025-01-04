// / <reference types="cypress" />

import "cypress-plugin-tab";
import "axe-core";
import "cypress-axe";
import "@cypress-audit/lighthouse/commands";
import { Keys } from "../utils/keys";

Cypress.Commands.add("createTodos", function (item_one, item_two, item_three) {
	cy.log(`Adding default ToDo items: ${item_one} \n ${item_two} \n ${item_three}`);

	cy.get("input.new-todo").type(`${item_one}${Keys.Enter}`).type(`${item_two}${Keys.Enter}`).type(`${item_three}${Keys.Enter}`);

	return cy.get("ul.todo-list li");
});

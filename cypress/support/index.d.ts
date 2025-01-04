// / <reference types="cypress" />

declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject> {
		createTodos(item_one: string, item_two: string, item_three: string): Chainable<unknown>;
		addAxeCode(): Chainable<unknown>;
		lighthouse(threshold: object, flags: object, options: object): Chainable<unknown>;
	}
}

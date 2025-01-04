// / <reference types="cypress" />
// / <reference types="../../support" />

import { Items, TotalItems, Text } from "../../utils/data"

describe('Todo App - Clear Completed Button', function () {

	beforeEach('visiting the app homepage and add todos', function () {
		// Visiting the main page of the app and loaded the 3 todo
		cy.visit('/')
		cy.createTodos(Items.ItemOne, Items.ItemTwo, Items.ItemThree)
	})

	context('Clear completed button', function () {

		it('should display the correct text', function () {
			cy.get('button.clear-completed').should('have.text', Text.ClearCompleted)
		})

		it('should only delete the completed items when clicked', function () {
			cy.get('ul.todo-list li').should('have.length', TotalItems.Three)
			cy.get('ul.todo-list li input').first().check()
			cy.get('button.clear-completed').click()
			cy.get('ul.todo-list li').should('have.length', TotalItems.Two)
			cy.get('ul.todo-list li input').check()
			cy.get('button.clear-completed').click()
			cy.get('ul.todo-list li').should('have.length', TotalItems.Zero)
		})

		it('should be hidden post click when no items left to complete', function () {
			cy.get('input.toggle-all').check()
			cy.get('button.clear-completed').click()
			cy.get('button.clear-completed').should('not.exist')
		})
	})
})
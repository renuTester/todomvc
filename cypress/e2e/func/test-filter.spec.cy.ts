// / <reference types="cypress" />
// / <reference types="../../support" />

import { Items, Filter, TotalItems } from "../../utils/data"

describe('Todo App - Filters', function () {

	beforeEach('visiting the app homepage and adding todos', function () {
		// Adding 3 todos items and checking the first one
		cy.visit('/')
		cy.createTodos(Items.ItemOne, Items.ItemTwo, Items.ItemThree)
		cy.get('ul.todo-list li input').first().check()
	})

	context('Filter', function () {

		it('all items should be displayed in All filter', function () {
			cy.get('ul.todo-list li.completed').should('have.length', 1)
			cy.get('ul.todo-list li').should('have.length', TotalItems.Three)
		})

		it('all not completed items should be displayed in Active filter', function () {
			cy.get('ul.filters li').eq(1).click()
			cy.get('ul.todo-list li').should('have.length', TotalItems.Two)
		})

		it('all completed items should be displayed in Completed filter', function () {
			cy.get('ul.filters li').last().click()
			cy.get('ul.todo-list li.completed').should('have.length', TotalItems.One)
		})

		it('should change according to the back button', function () {
			// Navigating to the filter one by one and then pressing back button to see if it navigates back to previous filter
			cy.get('ul.filters li').eq(0).click()
			cy.get('ul.filters li').eq(1).click()
			cy.get('ul.filters li').eq(2).click()
			cy.get('ul.todo-list li').should('have.length', TotalItems.One)
			cy.go('back')
			cy.get('ul.todo-list li').should('have.length', TotalItems.Two)
			cy.go('back')
			cy.get('ul.todo-list li').should('have.length', TotalItems.Three)
		})

		it('should change the url according to the filter', function () {
			// Checking that when we click the filter it should change the url accordingly
			cy.get('ul.filters li').eq(0).click()
			cy.url().should('contain', '#')
			cy.get('ul.filters li').eq(1).click()
			cy.url().should('contain', Filter.Active.toLowerCase())
			cy.get('ul.filters li').eq(2).click()
			cy.url().should('contain', Filter.Completed.toLowerCase())
		})

		it('should be highlighted on selection', function () {
			cy.get('ul.filters li').eq(0).click()
			cy.get('ul.filters li a').eq(0).should('have.css', 'border-color', 'rgb(206, 70, 70)')
			cy.get('ul.filters li a').eq(1).should('not.have.css', 'border-color', 'rgb(206, 70, 70)')

			cy.get('ul.filters li').eq(1).click()
			cy.get('ul.filters li a').eq(1).should('have.css', 'border-color', 'rgb(206, 70, 70)')
			cy.get('ul.filters li a').eq(2).should('not.have.css', 'border-color', 'rgb(206, 70, 70)')

			cy.get('ul.filters li').eq(2).click()
			cy.get('ul.filters li a').eq(2).should('have.css', 'border-color', 'rgb(206, 70, 70)')
			cy.get('ul.filters li a').eq(0).should('not.have.css', 'border-color', 'rgb(206, 70, 70)')
		})
	})
})
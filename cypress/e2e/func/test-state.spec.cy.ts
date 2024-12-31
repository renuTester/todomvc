/// <reference types="cypress" />
/// <reference types="../../support" />

import { Items } from "../../utils/data"

describe('Todo App - Data and State', function () {

  beforeEach(function () {
    cy.visit('/')
    cy.createTodos(Items.ItemOne, Items.ItemTwo, Items.ItemThree)
  })

  context('Items data and state', function () {

    it('should not persist on reloading the app', function () {
      cy.get('ul.todo-list li input').first().check()
      cy.get('ul.todo-list li.completed').should('have.length', 1)
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
      cy.reload()
      cy.get('ul.todo-list li').should('not.exist')
    })

    it('should persist on back navigation of the app', function () {
      //Checking an item, clicking the last filter and then pressing back button to see if data exist
      cy.get('ul.todo-list li input').first().check()
      cy.get('ul.todo-list li.completed').should('have.length', 1)
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
      cy.get('ul.filters li').last().click()
      cy.go('back')
      cy.get('ul.todo-list li.completed').should('have.length', 1)
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
    })
  })

})
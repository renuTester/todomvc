/// <reference types="cypress" />
/// <reference types="../../support" />

import { Items, TotalItems } from "../../utils/data"
import Keys from "../../utils/keys"

describe('Todo App - Edit An Item', function () {


  beforeEach(function () {
    cy.visit('/')
  })

  context('If I am editing an item', function () {

    beforeEach(function () {
      cy.createTodos(Items.ItemOne, Items.ItemTwo, Items.ItemThree)
    })

    it('should hide checkbox button', function () {
      cy.get('input.toggle').should('have.length', TotalItems.Three)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('input.toggle').should('have.length', TotalItems.Two)
    })

    it('nothing should happen if Esc key is clicked', function () {
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('div[class="input-container"] input').last().type(`${Items.ItemTwo}`).type(Keys.Esc)
      cy.get('ul.todo-list li label').first().should('have.text', "Edit Todo Input")
    })

    it('should not save if Tab key is clicked', function () {
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('div[class="input-container"] input').last().type(`${Items.ItemTwo}`)
      cy.get('body').tab()
      cy.get('body').tab()
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
    })

    it('should not save if  header is clicked', function () {
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('div[class="input-container"] input').last().type(`${Items.ItemTwo}`)
      cy.get('header.header').click()
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
    })

    it('should not append to an item if an empty string is entered', function () {
      //Double click an item and try to append the empty data
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('div[class="input-container"] input').last().type(`            ${Keys.Enter}`)
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
    })
  })

})
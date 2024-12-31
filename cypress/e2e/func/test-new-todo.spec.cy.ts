/// <reference types="cypress" />
/// <reference types="../../support" />

import { Items, ItemsLeft } from "../../utils/data"
import Keys from "../../utils/keys"

describe('Todo App - New Todo Item', function () {

  beforeEach(function () {
    cy.visit('/')
  })

  context('If I want to create a new Todo', function () {

    it('should allow me to add todo items one by one', function () {
      //Adding a to-do item and checking its label
      cy.get('input.new-todo').type(`${Items.ItemOne}${Keys.Enter}`)
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)

      cy.get('input.new-todo').type(`${Items.ItemTwo}${Keys.Enter}`)
      cy.get('ul.todo-list li label').eq(1).should('contain', Items.ItemTwo)
    })

    it('should allow me to add multiple items', function () {
      // Adding multiple todo items and checking the total items
      cy.get('input.new-todo')
        .type(`${Items.ItemOne}${Keys.Enter}`)
        .type(`${Items.ItemTwo}${Keys.Enter}`)
        .type(`${Items.ItemThree}${Keys.Enter}`)
      cy.get('span.todo-count').should('have.text', `${ItemsLeft.Three}`)
    })

    it('should clear text input field after adding an item', function () {
      cy.get('input.new-todo').type(`${Items.ItemOne}${Keys.Enter}`)
      cy.get('input.new-todo').should('be.empty')
    })

    it('should place new items to the bottom', function () {
      cy.get('input.new-todo')
        .type(`${Items.ItemOne}${Keys.Enter}`)
        .type(`${Items.ItemTwo}${Keys.Enter}`)
        .type(`${Items.ItemThree}${Keys.Enter}`)

      cy.get('ul.todo-list li label').last().should('have.text', Items.ItemThree)
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
    })

    it('should delete the whitespace of an item', function () {
      cy.get('input.new-todo').type(`       ${Items.ItemOne}           ${Keys.Enter}`)
      cy.get('ul.todo-list li label').first().should('have.text', Items.ItemOne)
    })
  })




})
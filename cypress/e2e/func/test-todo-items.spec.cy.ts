/// <reference types="cypress" />
/// <reference types="../../support" />

import { Items, TotalItems, ItemsLeft } from "../../utils/data"
import {Keys} from "../../utils/keys"

describe('Todo App - Multiple ToDo Items', function () {

  beforeEach('visiting the app homepage', function () {
    cy.visit('/')
  })

  context('When app has multiple ToDo items', function () {

    beforeEach('adding default todos', function () {
      cy.createTodos(Items.ItemOne, Items.ItemTwo, Items.ItemThree)
    })

    it('should show the total not completed todos in footer', function () {
      cy.get('li[class=""]').then(els => {
        cy.get("span.todo-count").should('have.text', `${els.length} items left!`)
      })
    })

    it('should do nothing if "Clear completed" button is clicked', function () {
      cy.get('li[class=""]').should('have.length', TotalItems.Three)
      cy.get('span.todo-count').should('have.text', ItemsLeft.Three)
      cy.get('button.clear-completed').click({ force: true })
      cy.get('li[class=""]').should('have.length', TotalItems.Three)
      cy.get('span.todo-count').should('have.text', ItemsLeft.Three)
    })

    it('should allow to complete all items', function () {
      cy.get('li[class=""] input').should('have.length', TotalItems.Three)
        .each(item => {
          cy.wrap(item).check()
        })
      cy.get('ul.todo-list li').should('have.length', TotalItems.Three)
        .each(item => {
          cy.wrap(item).should('have.class', 'completed')
        })
    })

    it('should allow to undo all completed items', function () {
      cy.get('li[class=""] input').should('have.length', TotalItems.Three)
        .each(item => {
          cy.wrap(item).check()
        })
      cy.get('li[class="completed"] input').should('have.length', TotalItems.Three)
        .each(item => {
          cy.wrap(item).uncheck()
        })
      cy.get('ul.todo-list li').should('have.length', TotalItems.Three)
        .each(item => {
          cy.wrap(item).should('not.have.class', 'completed')
        })
    })

    it('should check or uncheck all items when "toggle-all" button is clicked', function () {
      cy.get('input.toggle-all').check().should('be.checked')
      cy.get('span.todo-count').should('have.text', `${ItemsLeft.Zero}`)
      cy.get('ul.todo-list li').should('have.length', TotalItems.Three)
        .each(item => {
          cy.wrap(item).should('have.class', 'completed')
        })
      cy.get('input.toggle-all').check().should('be.checked')
      cy.get('span.todo-count').should('have.text', `${ItemsLeft.Zero}`)
      cy.get('ul.todo-list li').should('have.length', TotalItems.Three)
        .each(item => {
          cy.wrap(item).should('have.class', 'completed')
        })
    })

    it('should delete all the completed items when "Clear completed" button is clicked', function () {
      cy.get('input.toggle-all').check().should('be.checked')
      cy.get('button.clear-completed').click({ force: true })
      cy.get('ul.todo-list li').should('not.exist')
      cy.get('footer.footer').should('not.exist')
    })
  })

  context('If I have an to-do item', function () {

    it('should allow to mark that item as complete', function () {
      cy.get('input.new-todo').type(`${Items.ItemOne}${Keys.Enter}`)
      cy.get('ul.todo-list li input').check()
      cy.get('ul.todo-list li').should('have.class', 'completed')
    })

    it('should allow me to uncheck that item as complete', function () {
      cy.get('input.new-todo').type(`${Items.ItemOne}${Keys.Enter}`)
      cy.get('ul.todo-list li input').check()
      cy.get('ul.todo-list li').should('have.class', 'completed')
      cy.get('ul.todo-list li input').uncheck()
      cy.get('ul.todo-list li').should('not.have.class', 'completed')
    })

    it('should allow me to edit that item', function () {
      cy.get('input.new-todo').type(`${Items.ItemOne}${Keys.Enter}`)
      cy.get('ul.todo-list li label').should('have.text', Items.ItemOne)
      cy.get('ul.todo-list li label').dblclick()
      cy.get('div[class="input-container"] input').last().type(`${Items.ItemTwo}${Keys.Enter}`)
      cy.get('ul.todo-list li label').should('have.text', `${Items.ItemOne}${Items.ItemTwo}`)
    })

    it('should allow me to edit the completed item', function () {
      cy.get('input.new-todo').type(`${Items.ItemOne}${Keys.Enter}`)
      cy.get('ul.todo-list li input').check()
      cy.get('ul.todo-list li label').should('have.text', Items.ItemOne)
      cy.get('ul.todo-list li label').dblclick()
      cy.get('div[class="input-container"] input').last().type(`${Items.ItemTwo}${Keys.Enter}`)
      cy.get('ul.todo-list li label').should('have.text', `${Items.ItemOne}${Items.ItemTwo}`)
    })
  })
})
/// <reference types="cypress" />
/// <reference types="../../support" />

import {items, filter} from "../../utils/data"
import keys from "../../utils/keys"

describe('TodoMVC - React', function () {

  const TOTAL_ITEMS_DEFAULT = 3
  const ZERO_ITEMS = 0

  beforeEach(function () {
    cy.visit('/')
  })


  afterEach(() => {
    cy.window().then((win) => {
      // @ts-ignore
      win.document.activeElement.blur()
    })
  })

  context('When app has multiple ToDo items', function () {

    beforeEach(function () {
      cy.createTodos(items.ITEM_ONE, items.ITEM_TWO, items.ITEM_THREE)
    })

    it('should show the total not completed todos in footer', function(){
      cy.get('li[class=""]').then(els => { 
          cy.get("span.todo-count").should('have.text', `${els.length} items left!`)
      })
    })

    it('should do nothing if "Clear completed" button is clicked', function(){
      cy.get('li[class=""]').should('have.length', TOTAL_ITEMS_DEFAULT)
      cy.get('span.todo-count').should('have.text', `${TOTAL_ITEMS_DEFAULT} items left!`)
      cy.get('button.clear-completed').click({force: true})
      cy.get('li[class=""]').should('have.length', TOTAL_ITEMS_DEFAULT)
      cy.get('span.todo-count').should('have.text', `${TOTAL_ITEMS_DEFAULT} items left!`)
    })

    it('should allow to complete all items', function () {
      cy.get('li[class=""] input').should('have.length', TOTAL_ITEMS_DEFAULT)
        .each(item => {
          cy.wrap(item).check()
      })
      cy.get('ul.todo-list li').should('have.length', TOTAL_ITEMS_DEFAULT)
        .each(item => {
          cy.wrap(item).should('have.class', 'completed')
      })
    })

    it('should allow to undo all completed items', function () {
      cy.get('li[class=""] input').should('have.length', TOTAL_ITEMS_DEFAULT)
        .each(item => {
          cy.wrap(item).check()
      })
      cy.get('li[class="completed"] input').should('have.length', TOTAL_ITEMS_DEFAULT)
        .each(item => {
          cy.wrap(item).uncheck()
      })
      cy.get('ul.todo-list li').should('have.length', TOTAL_ITEMS_DEFAULT)
        .each(item => {
          cy.wrap(item).should('not.have.class', 'completed')
      })
    })

    it('should check or uncheck all items when "toggle-all" button is clicked', function () {
      cy.get('input.toggle-all').check().should('be.checked')
      cy.get('span.todo-count').should('have.text', `${ZERO_ITEMS} items left!`)
      cy.get('ul.todo-list li').should('have.length', TOTAL_ITEMS_DEFAULT)
        .each(item => {
          cy.wrap(item).should('have.class', 'completed')
      })
      cy.get('input.toggle-all').check().should('be.checked')
      cy.get('span.todo-count').should('have.text', `${ZERO_ITEMS} items left!`)
      cy.get('ul.todo-list li').should('have.length', TOTAL_ITEMS_DEFAULT)
        .each(item => {
          cy.wrap(item).should('have.class', 'completed')
      })
    })

    it('should delete all the completed items when "Clear completed" button is clicked', function() {
      cy.get('input.toggle-all').check().should('be.checked')
      cy.get('button.clear-completed').click({force: true})
      cy.get('ul.todo-list li').should('not.exist')
      cy.get('footer.footer').should('not.exist')
    })
  })


  context('If I want to create a new Todo', function () {

    it('should allow me to add todo items one by one', function () {
      //Adding a to-do item and checking its label
      cy.get('input.new-todo').type(items.ITEM_ONE).type('{enter}')
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)

      cy.get('input.new-todo').type(items.ITEM_TWO).type('{enter}')
      cy.get('ul.todo-list li label').eq(1).should('contain', items.ITEM_TWO)
    })

    it('should allow me to add multiple items', function () {
      // Adding multiple todo items and checking the total items
      cy.get('input.new-todo')
        .type(`${items.ITEM_ONE}{enter}`)
        .type(`${items.ITEM_TWO}{enter}`)
        .type(`${items.ITEM_THREE}{enter}`)
      cy.get('span.todo-count').should('have.text', `${TOTAL_ITEMS_DEFAULT} items left!`)
    })

    it('should clear text input field after adding an item', function () {
      cy.get('input.new-todo').type(`${items.ITEM_ONE}{enter}`)
      cy.get('input.new-todo').should('be.empty')
    })

    it('should place new items to the bottom', function () {
      cy.get('input.new-todo')
      .type(`${items.ITEM_ONE}{enter}`)
      .type(`${items.ITEM_TWO}{enter}`)
      .type(`${items.ITEM_THREE}{enter}`)

      cy.get('ul.todo-list li label').last().should('have.text', items.ITEM_THREE)
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
    })

    it('should delete the whitespace of an item', function () {
      cy.get('input.new-todo').type(`       ${items.ITEM_ONE}           {enter}`)
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
    })
  })


  context('If I have an to-do item', function () {

    it('should allow to mark that item as complete', function () {
      cy.get('input.new-todo').type(`${items.ITEM_ONE}{enter}`)
      cy.get('ul.todo-list li input').check()
      cy.get('ul.todo-list li').should('have.class', 'completed')
    })

    it('should allow me to uncheck that item as complete', function () {
      cy.get('input.new-todo').type(`${items.ITEM_ONE}{enter}`)
      cy.get('ul.todo-list li input').check()
      cy.get('ul.todo-list li').should('have.class', 'completed')
      cy.get('ul.todo-list li input').uncheck()
      cy.get('ul.todo-list li').should('not.have.class', 'completed')
    })

    it('should allow me to edit that item', function () {
      cy.get('input.new-todo').type(`${items.ITEM_ONE}{enter}`)
      cy.get('ul.todo-list li label').should('have.text', items.ITEM_ONE)
      cy.get('ul.todo-list li label').dblclick()
      cy.get('div[class="input-container"] input').last().type(`${items.ITEM_TWO}{enter}`)
      cy.get('ul.todo-list li label').should('have.text', `${items.ITEM_ONE}${items.ITEM_TWO}`)

    })

    it('should allow me to edit a complete item', function () {
      cy.get('input.new-todo').type(`${items.ITEM_ONE}{enter}`)
      cy.get('ul.todo-list li input').check()
      cy.get('ul.todo-list li label').should('have.text', items.ITEM_ONE)
      cy.get('ul.todo-list li label').dblclick()
      cy.get('div[class="input-container"] input').last().type(`${items.ITEM_TWO}{enter}`)
      cy.get('ul.todo-list li label').should('have.text', `${items.ITEM_ONE}${items.ITEM_TWO}`)
    })
  })

  context('Clear completed button', function () {

    beforeEach(function () {
     cy.createTodos(items.ITEM_ONE, items.ITEM_TWO, items.ITEM_THREE)
    })

    it('should display the correct text', function () {
      cy.get('button.clear-completed').should('have.text', 'Clear completed')
    })

    it('should only delete the completed items when clicked', function () {
      cy.get('ul.todo-list li').should('have.length', TOTAL_ITEMS_DEFAULT)
      cy.get('ul.todo-list li input').first().check()
      cy.get('button.clear-completed').click() 
      cy.get('ul.todo-list li').should('have.length', TOTAL_ITEMS_DEFAULT-1)
      cy.get('ul.todo-list li input').check()
      cy.get('button.clear-completed').click()
      cy.get('ul.todo-list li').should('have.length', ZERO_ITEMS)
    })

    it('should be hidden post click when no items left to complete', function () {
      cy.get('input.toggle-all').check()
      cy.get('button.clear-completed').click() 
      cy.get('button.clear-completed').should('not.exist')
    })
  })


})
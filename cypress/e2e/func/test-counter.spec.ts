/// <reference types="cypress" />
/// <reference types="../../support" />

import {items} from "../../utils/data"
import keys from "../../utils/keys"

describe('TodoMVC - React', function () {

  const TOTAL_ITEMS_DEFAULT = 3

  beforeEach(function () {
    cy.visit('/')
  })

  context('Items left counter', function () {
    it('should go up as we keep on adding the item', function () {
      cy.get('input.new-todo').type(`${items.ITEM_ONE}${keys.ENTER}`)
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT-2} item left!`)
      cy.get('input.new-todo').type(`${items.ITEM_TWO}${keys.ENTER}`)
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT-1} items left!`)
      cy.get('input.new-todo').type(`${items.ITEM_THREE}${keys.ENTER}`)
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT-0} items left!`)
    })

    it('should go down as we keep on checking the item', function () {
      cy.createTodos(items.ITEM_ONE, items.ITEM_TWO, items.ITEM_THREE)
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT} items left!`)
      cy.get('ul.todo-list li input').eq(0).check()
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT-1} items left!`)
      cy.get('ul.todo-list li input').eq(1).check()
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT-2} item left!`)
      cy.get('ul.todo-list li input').eq(2).check()
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT-3} items left!`)
    })
  })

})
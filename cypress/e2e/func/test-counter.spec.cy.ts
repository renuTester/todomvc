/// <reference types="cypress" />
/// <reference types="../../support" />

import { Items, ItemsLeft } from "../../utils/data"
import Keys from "../../utils/keys"

describe('Todo App - Items Left Counter', function () {

  beforeEach(function () {
    cy.visit('/')
  })

  context('Items left counter', function () {
    it('should go up as we keep on adding items', function () {
      //Adding the todo item one by one and checking the items left
      cy.get('input.new-todo').type(`${Items.ItemOne}${Keys.Enter}`)
      cy.get('span.todo-count').contains(`${ItemsLeft.One}`)
      cy.get('input.new-todo').type(`${Items.ItemTwo}${Keys.Enter}`)
      cy.get('span.todo-count').contains(`${ItemsLeft.Two}`)
      cy.get('input.new-todo').type(`${Items.ItemThree}${Keys.Enter}`)
      cy.get('span.todo-count').contains(`${ItemsLeft.Three}`)
    })

    it('should go down as we keep on checking items', function () {
      //Adding the 3 todo items and then deleting them one by one
      cy.createTodos(Items.ItemOne, Items.ItemTwo, Items.ItemThree)
      cy.get('span.todo-count').contains(`${ItemsLeft.Three}`)
      cy.get('ul.todo-list li input').eq(0).check()
      cy.get('span.todo-count').contains(`${ItemsLeft.Two}`)
      cy.get('ul.todo-list li input').eq(1).check()
      cy.get('span.todo-count').contains(`${ItemsLeft.One}`)
      cy.get('ul.todo-list li input').eq(2).check()
      cy.get('span.todo-count').contains(`${ItemsLeft.Zero}`)
    })
  })

})
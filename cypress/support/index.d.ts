/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    createTodos(item_one: String, item_two: String, item_three: String): Chainable<any>
    createTodo(title: string): Chainable<any>
    addAxeCode(): Chainable<any>
  }
}
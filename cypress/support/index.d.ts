// / <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    createTodos(item_one: string, item_two: string, item_three: string): Chainable<any>
    createTodo(title: string): Chainable<any>
    addAxeCode(): Chainable<any>
  }
}
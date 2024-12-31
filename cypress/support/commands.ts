/// <reference types="cypress" />

import 'cypress-plugin-tab'
import 'axe-core'
import 'cypress-axe'
import '@cypress-audit/lighthouse/commands';

Cypress.Commands.add('createTodos', function (item_one, item_two, item_three) {
  cy.log(`Adding default ToDo items: ${item_one} \n ${item_two} \n ${item_three}`)

  cy.get('input.new-todo')
    .type(`${item_one}{enter}`)
    .type(`${item_two}{enter}`)
    .type(`${item_three}{enter}`)

  return cy.get('ul.todo-list li')
})
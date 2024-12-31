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


  context('When the app is initially opened', function () {

    it('should focus on the todo input field', function () {
      cy.focused().should('have.class', 'new-todo')
    })

    it('should display "What needs to be done?" as a placeholder in todo input field', function () {
      cy.get('.new-todo').should('have.attr', 'placeholder', 'What needs to be done?')
    })

    it('should display the todos header in red and center aligned', function () {
      cy.get('h1').should('have.text', 'todos')
        .should('have.css', 'color', 'rgb(184, 63, 69)')
        .should('have.css', 'text-align', 'center')
    })

    it('should display the information section at bottom of the page', function () {
      cy.get('footer.info').should('be.visible').should('contain.text', 'Double-click to edit a todo')
    })
  })


  context('When there are no todos', function () {

    it('should hide todo-list and filter section', function () {
      cy.get('ul.todo-list li').should('not.exist')
      cy.get('footer.footer').should('not.exist')
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


  context('If I am editing an item', function () {

    beforeEach(function () {
      cy.createTodos(items.ITEM_ONE, items.ITEM_TWO, items.ITEM_THREE)
    })

    it('should hide checkbox button', function () {
      cy.get('input.toggle').should('have.length', TOTAL_ITEMS_DEFAULT)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('input.toggle').should('have.length', TOTAL_ITEMS_DEFAULT-1)
    })

    it('nothing should happen if Esc key is clicked', function () {
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('div[class="input-container"] input').last().type(`${items.ITEM_TWO}`).type('{esc}')
      cy.get('ul.todo-list li label').first().should('have.text', "Edit Todo Input")
    })

    it('should not save if Tab key is clicked', function () {
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('div[class="input-container"] input').last().type(`${items.ITEM_TWO}`)
      cy.get('body').tab()
      cy.get('body').tab()
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
    })

    it('should not save if  header is clicked', function () {
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('div[class="input-container"] input').last().type(`${items.ITEM_TWO}`)
      cy.get('header.header').click()
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
    })

    it('should not append to an item if an empty string is entered', function () {
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
      cy.get('ul.todo-list li label').first().dblclick()
      cy.get('div[class="input-container"] input').last().type('            {enter}')
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
    })
  })


  context('Items left counter', function () {
    it('should go up as we keep on adding the item', function () {
      cy.get('input.new-todo').type(`${items.ITEM_ONE}{enter}`)
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT-2} item left!`)
      cy.get('input.new-todo').type(`${items.ITEM_TWO}{enter}`)
      cy.get('span.todo-count').contains(`${TOTAL_ITEMS_DEFAULT-1} items left!`)
      cy.get('input.new-todo').type(`${items.ITEM_THREE}{enter}`)
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

  context('Items data and state', function () {

    beforeEach(function () {
      cy.createTodos(items.ITEM_ONE, items.ITEM_TWO, items.ITEM_THREE)
     })

    it('should not persist on reloading the app', function () {
      cy.get('ul.todo-list li input').first().check()
      cy.get('ul.todo-list li.completed').should('have.length', 1)
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
      cy.reload()
      cy.get('ul.todo-list li').should('not.exist')
    })

    it('should persist on back navigation of the app', function () {
      cy.get('ul.todo-list li input').first().check()
      cy.get('ul.todo-list li.completed').should('have.length', 1)
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
      cy.get('ul.filters li').last().click()
      cy.go('back')
      cy.get('ul.todo-list li.completed').should('have.length', 1)
      cy.get('ul.todo-list li label').first().should('have.text', items.ITEM_ONE)
    })
  })

  context('Filter', function () {

    beforeEach(function () {
      cy.createTodos(items.ITEM_ONE, items.ITEM_TWO, items.ITEM_THREE)
      cy.get('ul.todo-list li input').first().check()
    })

    it('all items should be displayed in All filter', function () {
      cy.get('ul.todo-list li.completed').should('have.length', 1)
      cy.get('ul.todo-list li').should('have.length', TOTAL_ITEMS_DEFAULT)
    })

    it('all items should be displayed in Active filter', function () {
      cy.get('ul.filters li').eq(1).click()
      cy.get('ul.todo-list li').should('have.length', TOTAL_ITEMS_DEFAULT-1)
    })

    it('all items should be displayed in Completed filter', function () {
      cy.get('ul.filters li').last().click()
      cy.get('ul.todo-list li.completed').should('have.length', 1)
    })

    it('should change according to the back button', function () {
      cy.get('ul.filters li').eq(0).click()
      cy.get('ul.filters li').eq(1).click()
      cy.get('ul.filters li').eq(2).click()
      cy.get('ul.todo-list li').should('have.length',1)
      cy.go('back')
      cy.get('ul.todo-list li').should('have.length',2)
      cy.go('back')
      cy.get('ul.todo-list li').should('have.length',TOTAL_ITEMS_DEFAULT)
    })

    it('should change the url according to the filter', function () {
      cy.get('ul.filters li').eq(0).click()
      cy.url().should('contain', '#')
      cy.get('ul.filters li').eq(1).click()
      cy.url().should('contain', filter.ACTIVE.toLowerCase())
      cy.get('ul.filters li').eq(2).click()
      cy.url().should('contain', filter.COMPLETED.toLowerCase())
    })

    it('should highlight the currently applied filter', function () {
      cy.get('ul.filters li').eq(0).click()
      cy.get('ul.filters li a').eq(0).should('have.css', 'border-color', 'rgb(206, 70, 70)')
      cy.get('ul.filters li a').eq(1).should('not.have.css', 'border-color', 'rgb(206, 70, 70)')

      cy.get('ul.filters li').eq(1).click()
      cy.get('ul.filters li a').eq(1).should('have.css', 'border-color', 'rgb(206, 70, 70)')
      cy.get('ul.filters li a').eq(2).should('not.have.css', 'border-color', 'rgb(206, 70, 70)')

      cy.get('ul.filters li').eq(2).click()
      cy.get('ul.filters li a').eq(2).should('have.css', 'border-color', 'rgb(206, 70, 70)')
      cy.get('ul.filters li a').eq(0).should('not.have.css', 'border-color', 'rgb(206, 70, 70)')
      
    })
  })


  context.only('Check Accessibility', () => {

    beforeEach(() => {
      // inject axe core lib into the app
      cy.injectAxe();
    });

    it('should have no a11y violations when app is empty', () => {
      cy.checkA11y(null, {
        runOnly: ['cat.color', 'cat.keyboard', 'cat.text-alternatives'],
        includedImpacts: ['critical', 'serious', 'moderate', 'minor'],
      })
    })

    it('should have no a11y violations when page has multiple todos', () => {
      cy.createTodos(items.ITEM_ONE, items.ITEM_TWO, items.ITEM_THREE)
      cy.get('ul.todo-list li input').check()
      cy.checkA11y(null, {
        runOnly: ['cat.color', 'cat.keyboard', 'cat.text-alternatives'],
        includedImpacts: ['critical', 'serious', 'moderate', 'minor'],
      });
    })
  })

})
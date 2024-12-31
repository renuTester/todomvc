# todomvc
UI Automation of ToDo MVC App

THere can be lot of untested use cases. - example mouse hover an element and click the delete button
soft and hard assert
why we use object.freeze
only and skip >> multiple it with only and multiple it with skip
beforeEach at describe level and context level, which will execute
eachmethod
why we use . to get() commands
why we use css selector like element.class instead of .class
TAB plugin
I took the help from online
Add the comments
Any bug, it might be a bug that duplicate to-do items can be added, app loading gain delete the items
adding a high number of to-do items
When I go back it should not delete the to do items
Add tags
Add extensions
npm install should call pre-build and install extensions
type(`${}{enter}`,{delay:400})
I usually design the Page object model, but since this app doesn't have any pages so going with stand-alone test script
hard coded stings can be deleted
cy.get().contains() vs cy.get().should('have.text', '') //it match the full sting not a substring
Meaning and use of each file
Basic of Accessibility - a11y - https://www.browserstack.com/accessibility-testing/what-is-accessibility-testing
check / uncheck all matching 
      cy.get('ul.todo-list li input').check()

      patten to match in should have.text in todo spec file
Tags tries




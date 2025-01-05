ToDo MVC App
=========

This project is a Cypress-based automation framework designed to provide an efficient solution for end-to-end testing of ToDo MVC App using NodeJs and Typescript. It includes automated tests that are easy to maintain, extend, and execute. It demonstrates the Cypress features, testing patterns and framework architecture to achieve the UI, Accessibility and Performance testing. > This application is purely for demonstration and educational purposes. 

Table of contents
=================

<!--ts-->
   * [Pre-requisites](#pre-requisites)
   * [Additional Tools](#additionalTools)
   * [Set Up](#setup)
   * [Usage](#usage)
      * [STDIN](#stdin)
   * [Dependency](#dependency)
   * [Execute Tests](#docker)
     * [Test Runner](#local)
     * [Headless Mode](#public)
   * [Good Practices](#docker)
   * [About Me](#about)
<!--te-->

# Pre-requisites
As this project is built on NodeJS, we need to ensure that those installed on the system.
### NodeJS
<details>
   <summary> Project uses Node >= 18.0.0</summary>
   Check if you have node version > 18.0.0 using below command in terminal or command prompt
   node -v
   If the version is less than 18.0.0 or version is not displayed, enter the second command
   https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/
   nvm install 18.18.0
   nvm use 18.18.0
   Before you can run the tests, you need to have the following software installed:

Node.js (Version: v16.x or later)
npm (Version: 8.x or later)
Cypress (This will be installed automatically with the project dependencies)
You can verify the installed versions with the following commands:

bash
Copy code
node -v
npm -v
If Node.js or npm are not installed, you can download and install them from nodejs.org.
</details>

# Additional Tools
Visual Studio Code or any other IDE that supports JavaScript/TypeScript.
Git for version control (if not already installed).

# Set-Up

1. Checkout or clone this github repository: https://github.com/anshyadav/ryanair.
   ```bash
   Copy code
   git clone https://your-repo-url.git
   cd todomvc
2. Install Eclipse (In the Eclipse Installer choose - Eclipse for Java Developers).

3. Open Eclipse and check for Maven plugin (Eclipse > Help > Marketplace > Installed). If Maven is not there then install the Maven plugin and restart the Eclipse.
4. Import the cloned reposiorty as 'Existing Maven Project'.
5.  Install Node.js Dependencies
bash
Copy code
npm install
This will install all necessary dependencies listed in the package.json file, including Cypress and other libraries required for running the tests.




Usage
Running the Cypress Tests
Once you’ve set up your environment, you can run the tests in headless or interactive mode:

### Headless Mode (for CI/CD pipelines):
bash
npx run "test-cy-chrome"
npx run "test-cy-fox"
This will run all tests in headless mode (no UI) and output the results in the console.

### Interactive Mode:
bash
Copy code
npx run test-cy
This will launch the Cypress Test Runner, where you can view the tests and their results in a user-friendly interface.

### Running Specific Tests
You can run specific tests using the --spec flag:

bash
Copy code
npx run "test-cy-chrome" --spec "cypress/e2e/func/example_spec.js"
This will only run the example_spec.js test file.

# Implemented Features
**End-to-End Testing:**  Automated test cases that validate the overall user experience and behavior of the application.
**Cross-Browser Testing: Support for multiple browsers, including Chrome, Firefox, and Electron.
**Cypress Dashboard Integration: Integration with the Cypress Dashboard for test reporting and parallelization (optional).
**Screenshots and Video Recording: Captures screenshots on failure and records videos of the entire test suite for debugging purposes.
**Custom Commands: Reusable Cypress custom commands for complex actions, making the tests more maintainable.


# Good Practices Followed
**Modular Test Structure: Tests are organized into logical folders and files for easy navigation.
**Reusable Test Functions: Common test steps are abstracted into reusable commands to avoid duplication.
**Page Object Model: Implemented the Page Object Model (POM) design pattern to improve maintainability.
**CI/CD Integration: Cypress is configured to work seamlessly with popular CI/CD tools like Jenkins, GitHub Actions, and CircleCI.
**Error Handling: Tests include proper error handling and retry mechanisms for flaky elements.
**Test Reporting: Integrated with test reporters (e.g., Mochawesome) for detailed and user-friendly test reports.

Additional Information
Test Reports: Test reports can be found in the cypress/results folder if you’re using a test reporter like Mochawesome.
Cypress Documentation: For more detailed information on Cypress commands and configurations, refer to the official Cypress documentation: https://docs.cypress.io.
Custom Configurations: You can customize the cypress.json and tsconfig.json files for specific needs (e.g., base URL, test retries, etc.).
Contributing
If you would like to contribute to the project, please fork the repository and create a pull request with your changes. Ensure that all tests are passing and follow the coding standards used in the project.





### Prerequisites

This project requires [Node.js](https://nodejs.org/en/) to be installed on your machine. Refer to the [.node-version](./.node-version) file for the exact version.





### Start Cypress

```shell
yarn cypress:open
```

> 🚩 **Note**
>
> If you have changed the default ports, then you need to update Cypress configuration file (`cypress.config.ts`) locally.

## Tests

| Type      | Location                                 |
| --------- | ---------------------------------------- |
| api       | [cypress/tests/api](./cypress/tests/api) |
| ui        | [cypress/tests/ui](./cypress/tests/ui)   |
| component | [src/(next to component)](./src)         |


## Additional NPM Scripts

| Script         | Description                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev            | Starts backend in watch mode and frontend                                                                                                                                         |
| dev:coverage   | Starts backend in watch mode and frontend with instrumented code coverage enabled                                                                                                 |
| dev:auth0      | Starts backend in watch mode and frontend; [Uses Auth0 for Authentication](#auth0) > [Read Guide](http://on.cypress.io/auth0)                                                     |
| dev:okta       | Starts backend in watch mode and frontend; [Uses Okta for Authentication](#okta) > [Read Guide](http://on.cypress.io/okta)                                                        |
| dev:cognito    | Starts backend in watch mode and frontend; [Uses Cognito for Authentication](#amazon-cognito) > [Read Guide](http://on.cypress.io/amazon-cognito)                                 |
| dev:google     | Starts backend in watch mode and frontend; [Uses Google for Authentication](#google) > [Read Guide](https://docs.cypress.io/guides/testing-strategies/google-authentication.html) |
| start          | Starts backend and frontend                                                                                                                                                       |
| types          | Validates types                                                                                                                                                                   |
| db:seed        | Generates fresh database seeds for json files in /data                                                                                                                            |
| start:empty    | Starts backend, frontend and Cypress with empty database seed                                                                                                                     |
| tsnode         | Customized ts-node command to get around react-scripts restrictions                                                                                                               |
| list:dev:users | Provides id and username for users in the dev database                                                                                                                            |

For a complete list of scripts see [package.json](./package.json)






# In Future
1. Test Cases: THere can be lot of untested use cases.  example mouse hover on a todo item and click the delete button and in perfomance testing adding a high number of to-do items and then checking them all
2. Adding Tags

# Bugs:
On load data is gone, todo items should be saved in cache
Duplicate todo items should not be allowed to add

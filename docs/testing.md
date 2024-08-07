# Testing JEST and react testing library

Testing your application is a vital part of serious development. There are a few things you should test. We are using Jest and React Testing Library to implement them.

## Usage

1.  Create `*.test.tsx` or `*.test.ts` files directly next to the parts of your application you
    want to test. Fox example, component Filter.tsx with Filter.test.tsx.

2.  Write your unit and component tests in those files

3.  Run `npm run test` in your terminal and see all the tests pass (hopefully)!

## Testing with cypress

1.  Create `*.cy.ts` or `*.cy.js` files in "cypress\e2e\app"

2.  Run `npx cypress run --spec "cypress/e2e/app/**/*"` in your terminal and see all the tests pass (hopefully)!


## know more
See the file configuration in the root path:  `jest.config.js` and view the past for test [**Commands**](docs/commands.md): Commands for podcasts web application

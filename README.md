
# How to run the project
- Install [node.js](https://nodejs.org/en/download/current) (>=20)
- Run 
  ```bash
  git clone git@github.com:saeeron/impact_sauce_demo.git
  cd impact_sauce_demo
  npm install
  npx playwright install # to install browsers
  npm run build:all # to build all nested packages
  ```
- To run UI-only testing in headed and record mode
  ```bash
  npm run test:ui:dev
  ```
- Export/expose the environment variables for api and db tesing:
```text
API_BASE_URL
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
...
```

## AI NOTES:

1. Coding Agent was never used directly (i.e., code was not exposed to an agent).  
2. AI was used only to resaerch on documentation of TypeScript and Playwright
   - how to use `data-test` as locator
   - how lazy element finding works
   - immediate check vs retrying check; `expect(await ....)` vs `await expect.poll( ...`
   - how to include fixtures in automation lib and how import it in main project
   - how to use `mysql2` lib in TypeScript
   - how to make npm build all nested packages via workspaces 


## Areas to improve
   - create all data types in api-client and db-client. e.g., user, order, product etc
   - create repositories which encapsulates most of SQL queries. e.g., user-repo to run queries on user table. Moreover, table `join` can be performed in repositories.
   - add many more checks on UI components. e.g., footer of the pages.
   - add many more test scripts.
   - use CI/CD, e.g., GH Actions, to build and publish packages to an npm artifactory
   - use docker to containerize the test for reproducible testing environment

## KEEP IN MIND, API and Database libs and tests are just minimal examples for demonstration

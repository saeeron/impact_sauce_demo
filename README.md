##AI NOTES:

1. Coding Agent was never used directly.  
2. AI was used only to resaerch on documentation of Playwright TypeScript
   - how to use `data-test` as locator
   - how lazy element finding works
   - immediate check vs retrying check; `expect(await ....)` vs `await expect.poll( ...`
   - how to include fixtures in automation lib and how import it in main project
   - how to use `mysql2` lib in TypeScript
   - how to make npm build all nested packages via workspaces 


##Areas to improve
   - create data types in db-client. e.g., user, order, product etc.
   - create repositories which encapsulates most of SQL queries. e.g., user-repo to run queries on user table. Moreover, table `join` can be performed in repositories. 
   -

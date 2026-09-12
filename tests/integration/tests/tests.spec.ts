import { User , CreateUserRequest } from '@saeeron/api-client-lib';
import { UserRow } from '@saeeron/db-client-lib';
import { test, expect } from '../fixtures/integ-fixture';


test.describe('Data integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Verify creating user on api, login using creds, and check user on db',
    async ({ users, loginPage, products, db }) => {

      const username: string = 'new_sauce_lab_user';
      const password: string = 'password123';
      const email: string = 'newuser@saucedemo.com';
      const firstName: string = 'sauce';
      const lastName: string = 'lastName';

      const createUser: CreateUserRequest = {
        username, password, email, firstName, lastName
      }

      const createdUser: User = await users.createUser(createUser);

      expect(await loginPage.isPageComplete()).toBe(true);
      await loginPage.login(username, password);
      expect(await products.isPageComplete()).toBe(true);

      const rows: UserRow[] = await db.query<UserRow[]>(
        `
          SELECT id, username, email, status
          FROM users
          WHERE id = ?
          `,
        [createdUser.id]
      );

      expect(rows).toHaveLength(1);
      expect(rows[0].username).toBe(createdUser.username);
    });
});

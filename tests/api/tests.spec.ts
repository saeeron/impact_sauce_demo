
import { test, expect, User, CreateUserRequest } from '@saeeron/api-client-lib';

test('Verify create and retrieve user', async ({ users }) => {

  const createdUser : User = await users.createUser({
    username: 'standard_user',
    password: 'password123',
    email: 'standard@saucedemo.com',
    firstName: 'standard_sauce',
    lastName: 'last_sauce'
  });

  expect(createdUser.id).toBeDefined();

  const user = await users.getUser(createdUser.id);

  expect(user.id).toBe(createdUser.id);
  expect(user.email).toBe('standard@example.com');
  expect(user.firstName).toBe(createdUser.firstName);
  expect(user.lastName).toBe(createdUser.lastName);

  await users.deleteUser(createdUser.id);
});

import { test, expect } from '@saeeron/db-client-lib';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

test('Verify user exists in database', async ({ db }) => {

  const userId = 312312;

  const users = await db.query<UserRow[]>(
    `
    SELECT id, email, first_name, last_name
    FROM users
    WHERE id = ?
    `,
    [userId]
  );

  expect(users).toHaveLength(1);

  const user = users[0];

  expect(user.first_name).toBe('standard_user');
  expect(user.last_name).toBe('standard_user_last_name');
});

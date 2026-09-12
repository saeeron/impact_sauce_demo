import { test as base } from '@playwright/test';
import { DbClient } from '../db-client';
import { getDbConfigFromEnv } from '../db-config';

export const test = base.extend<{ db: DbClient }>({
  db: async ({}, use) => {
    const db = new DbClient(getDbConfigFromEnv());
    await use(db);
    await db.close();
  },
});

export { expect } from '@playwright/test';

import { test as base } from '@playwright/test';
import { ApiClient } from '../clients/ApiClient';
import { UsersClient } from '../clients/UserClient';

type Fixtures = {
  users: UsersClient;
};

export const test = base.extend<Fixtures>({
  users: async ({ request }, use) => {
    const api = new ApiClient(
      request,
      process.env.API_BASE_URL!
    );

    const users = new UsersClient(api);

    await use(users);
  },
});

export { expect } from '@playwright/test';

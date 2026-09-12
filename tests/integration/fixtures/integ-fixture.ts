import { test as base } from '@playwright/test';

import {
  UsersClient,
  ApiClient
} from '@saeeron/api-client-lib';

import { DbClient } from '@saeeron/db-client-lib';
import { LoginPage, Products, Cart, Checkout, OrderReview, OrderComplete } from '@saeeron/sauce-automation-lib';

type Fixtures = {
  api: ApiClient;
  users: UsersClient;
  db: DbClient;
  loginPage: LoginPage;
  products: Products;
  cart: Cart;
  checkout: Checkout;
  orderReview: OrderReview;
  orderComplete: OrderComplete;
};

export const test = base.extend<Fixtures>({

  api: async ({ request }, use) => {
    const api = new ApiClient(
      request,
      process.env.API_BASE_URL!
    );

    await use(api);
  },

  users: async ({ api }, use) => {
    await use(new UsersClient(api));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  products: async ({ page }, use) => {
    await use(new Products(page));
  },
  cart: async ({ page }, use) => {
    await use(new Cart(page));
  },
  orderReview: async ({ page }, use) => {
    await use(new OrderReview(page));
  },
  orderComplete: async ({ page }, use) => {
    await use(new OrderComplete(page));
  },
  checkout: async ({ page }, use) => {
    await use(new Checkout(page));
  },

  db: async ({}, use) => {

    const db = new DbClient({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!
    });

    await use(db);

    await db.close();
  }
});

export { expect } from '@playwright/test';

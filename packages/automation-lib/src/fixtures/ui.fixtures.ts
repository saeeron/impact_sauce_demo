import { test as base, expect} from '@playwright/test';
import { Cart, Checkout, LoginPage, OrderComplete, OrderReview, Products } from '../POM';

type Fixtures = {
  loginPage: LoginPage;
  products: Products;
  cart: Cart;
  orderComplete: OrderComplete;
  checkout: Checkout;
  orderReview: OrderReview;
};

export const test = base.extend<Fixtures>({
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

});

export { expect };

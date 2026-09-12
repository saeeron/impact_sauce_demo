import { test, expect } from '@saeeron/sauce-automation-lib';


test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
      await page.goto('/');
  });

  test('Verify standard user can log in successfully', async ({ loginPage, products }) => {
    await loginPage.goto()
    expect(await loginPage.isPageComplete()).toBe(true);
    await loginPage.login('standard_user', 'secret_sauce');
    expect(await loginPage.isErrorMessageNotVisible()).toBe(true);
    expect(await products.isPageComplete());
  });

  test('Verify locked out user cannot log in and error message is shown', async ({ loginPage }) => {
    await loginPage.goto()
    expect(await loginPage.isPageComplete()).toBe(true);
    await loginPage.login('locked_out_user', 'secret_sauce');
    expect(await loginPage.isErrorMessageNotVisible()).toBe(false);
    expect(await loginPage.returnErrorMessage()).toBe('Epic sadface: Sorry, this user has been locked out.')
    expect(await loginPage.isPageComplete()).toBe(true);
  })
});

test.describe('Complete Order', () => {
  test.beforeEach(async ({ page }) => {
      await page.goto('/');
  });

  test('Verify standard user can complete an order', async ({ loginPage, products, orderComplete, orderReview, cart, checkout }) => {

    await loginPage.goto()
    expect(await loginPage.isPageComplete()).toBe(true);
    await loginPage.login('standard_user', 'secret_sauce');
    expect(await products.isPageComplete());
    await products.addItemToCart('Sauce Labs Backpack')
    expect(await products.getCartItemCountsInBadge()).toBe(1);
    await products.sortBy('lohi');
    await products.addItemToCart('Sauce Labs Onesie');
    expect(await products.getCartItemCountsInBadge()).toBe(2);
    await products.sortBy('za');
    await products.addItemToCart('Sauce Labs Fleece Jacket');
    expect(await products.getCartItemCountsInBadge()).toBe(3);
    await products.removeItemFromCart('Sauce Labs Backpack');
    expect(await products.getCartItemCountsInBadge()).toBe(2);
    await products.clickCart();
    expect(await cart.isPageComplete()).toBe(true);
    await cart.clickCheckout();
    expect(await checkout.isPageComplete()).toBe(true);
    await checkout.enterFirstName('name');
    await checkout.enterLastName('name');
    await checkout.enterZipCode('12345');
    await checkout.clickContinue();
    expect(await orderReview.isPageComplete()).toBe(true);
    await orderReview.clickFinish();
    expect(await orderComplete.isPageComplete()).toBe(true);
    expect(await orderComplete.isOrderComplete()).toBe(true);
  })
});

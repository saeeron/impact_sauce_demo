import { test, expect } from '@playwright/test';
import { LoginPage, Header, SideBar, Products } from '@saeeron/sauce-automation-lib';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
      await page.goto('/'); // runs before every test in this block only
  });

  test('standard user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto()
    expect(await loginPage.isPageComplete()).toBe(true);
    await loginPage.login('standard_user', 'secret_sauce');
    const products = new Products(page);
    expect(await products.isPageComplete()).toBe(true);
    await products.sortBy('za');
    await products.sortBy('az');
    await products.addItemToCart('Sauce Labs Backpack');
    // await header.openSideBar();
    // const sideBar = new SideBar(page);
    // expect(await sideBar.isAt()).toBe(true);
    // await sideBar.clickAllItems();
  });

});

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

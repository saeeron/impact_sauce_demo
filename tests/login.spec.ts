import { test, expect } from '@playwright/test';
import { LoginPage } from '@saeeron/sauce-automation-lib';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
      await page.goto('/'); // runs before every test in this block only
  });

  test('standard user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto()
    expect(await loginPage.isPageComplete()).toBe(true);
    await loginPage.login('standard_user', 'secret_sauce');
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

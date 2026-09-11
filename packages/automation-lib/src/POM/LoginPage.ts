
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  private readonly unameEntry: Locator;
  private readonly pwdEntry: Locator;
  private readonly logo: Locator;


  constructor(page: Page) {
    const locator : string = '#login-button';
    super(page, page.locator(locator));
    this.unameEntry = page.locator('#user-name');
    this.pwdEntry = page.locator('#password');
    this.logo = page.getByText('Swag Labs');
  }

  async isPageComplete(): Promise<boolean> {

    const results: boolean[] = await Promise.all([
      super.isAt(),
      this.unameEntry.isVisible(),
      this.pwdEntry.isVisible(),
      this.logo.isVisible(),
    ]);

    return results.every((result) => result === true);
  }



  async enterUsername(username: string) {
    await this.unameEntry.fill(username);
  }

  async enterPassword(password: string) {
    await this.pwdEntry.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.mainLocator.click();
  }
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

}


import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

  constructor(protected page: Page, protected readonly mainLocator: Locator) {  }

  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
      return this.page.title();
  }

  //  maybe a back practice depending on the webapp. should be good fot his webapp since there is no polling.
  async waitForPageLoad() {
      await this.page.waitForLoadState('networkidle');
  }

  async isAt(): Promise<boolean> {
    await expect(this.mainLocator).toBeVisible();
    return this.mainLocator.isVisible()
  }

}

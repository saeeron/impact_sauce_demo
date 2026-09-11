import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SideBar extends BasePage {

  private readonly allItems: Locator;
  private readonly about: Locator;
  private readonly logout: Locator;
  private readonly reset: Locator;

  constructor(page: Page) {
    const locator: string = '#react-burger-cross-btn';
    super(page, page.locator(locator));
    this.allItems = page.locator('#inventory_sidebar_link');
    this.about = page.locator('#about_sidebar_link');
    this.logout = page.locator('#logout_sidebar_link');
    this.reset = page.locator('#reset_sidebar_link');
  }

  async isPageComplete(): Promise<boolean> {
    try {
      await Promise.all([
        super.isAt(),
        this.allItems.isVisible(),
        this.about.isVisible(),
        this.logout.isVisible(),
        this.reset.isVisible()
      ]);
      return true;
    } catch {
      return false;
    }
  }

  async clickAllItems() {
    await this.allItems.click();
  }

  async clickAbout() {
    await this.about.click();
  }

  async clickLogout() {
    await this.logout.click()
  }

  async clickReset() {
    await this.reset.click();
  }

}

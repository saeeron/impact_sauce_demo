import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header'

export class Checkout extends BasePage {

  private readonly continueShopping: Locator;
  private readonly header: Header;

  constructor(page: Page) {
    const locator: string = '#checkout';
    super(page, page.locator(locator));
    this.header = new Header(page);
    this.continueShopping = page.locator('#continue-shopping');
  }
}

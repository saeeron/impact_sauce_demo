import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header'

export class Cart extends BasePage {

  private readonly continueShopping: Locator;
  private readonly header: Header;
  private readonly checkoutButton: Locator;
  private readonly yourCartLabel: Locator;

  constructor(page: Page) {
    const locator: string = '#checkout';
    super(page, page.locator(locator));
    this.header = new Header(page);
    this.continueShopping = page.locator('#continue-shopping');
    this.checkoutButton = page.locator('#checkout');
    this.yourCartLabel = page.getByText('Your Cart')
  }

  async isPageComplete(): Promise<boolean> {
    try {
      await Promise.all([
        super.isAt(),
        this.header.isPageComplete(),
        this.continueShopping.waitFor({ state: 'visible' }),
        this.checkoutButton.waitFor({ state: 'visible' }),
        this.yourCartLabel.waitFor({ state: 'visible' })
      ])
      return true
      } catch {
        return false;
      }
  }

  async clickCheckout() {
    await this.checkoutButton.click()
  }
}

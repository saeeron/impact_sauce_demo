import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header'

export class Checkout extends BasePage {

  private readonly header: Header;
  private readonly checkoutLabel: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private zip: Locator;


  constructor(page: Page) {
    const locator: string = '#checkout_info_container';
    super(page, page.locator(locator));
    this.header = new Header(page);
    this.checkoutLabel = page.getByText('Checkout: Your Information');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.zip = page.locator('#postal-code');
  }

  async enterFirstName(name: string) {
    await this.firstName.fill(name);
  }

  async enterLastName(name: string) {
    await this.lastName.fill(name);
  }

  async enterZipCode(string: string) {
    await this.zip.fill(string);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async isPageComplete(): Promise<boolean> {
    try {
      await Promise.all([
        super.isAt(),
        this.header.isPageComplete(),
        this.checkoutLabel.waitFor({ state: 'visible' }),
        this.continueButton.waitFor({ state: 'visible' }),
        this.cancelButton.waitFor({ state: 'visible' }),
        this.firstName.waitFor({ state: 'visible' }),
        this.lastName.waitFor({ state: 'visible' }),
        this.zip.waitFor({ state: 'visible' })
      ])
      return true;
    } catch {
      return false;
    }
  }

}

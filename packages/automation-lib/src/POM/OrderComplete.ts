import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header'

export class OrderComplete extends BasePage {

  private readonly header: Header;
  private readonly checkoutComepleteLabel: Locator;
  private readonly generatePDFButton: Locator;
  private readonly backhomeButton: Locator;
  private readonly completeHeader: Locator;



  constructor(page: Page) {
    const locator: string = '#checkout_complete_container';
    super(page, page.locator(locator));

    this.header = new Header(page);
    this.checkoutComepleteLabel = page.getByText('Checkout: Complete!');
    this.generatePDFButton = page.locator('#generate-pdf-order');
    this.backhomeButton = page.locator('#back-to-products');
    this.completeHeader = this.mainLocator.locator('[data-test="complete-header"]');
  }

  async isPageComplete(): Promise<boolean> {
    try {
      await Promise.all([
        super.isAt(),
        this.header.isPageComplete(),
        this.checkoutComepleteLabel.waitFor({ state: 'visible' }),
        this.generatePDFButton.waitFor({ state: 'visible' }),
        this.backhomeButton.waitFor({ state: 'visible' }),
        this.completeHeader.waitFor({ state: 'visible' }),
      ])
      console.log(this.page.url());
      return this.page.url().includes('checkout-complete.html');
    } catch {
      return false;
    }
  }

  async isOrderComplete(): Promise<boolean> {
    const actualtext = await this.completeHeader.innerText();
    return actualtext === "Thank you for your order!";
  }

}

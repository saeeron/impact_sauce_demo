import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header'

export class OrderReview extends BasePage {

  private readonly header: Header;
  private readonly checkoutOverviewLabel: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    const locator: string = '#checkout_summary_container';
    super(page, page.locator(locator));

    this.header = new Header(page);
    this.checkoutOverviewLabel = page.getByText('Checkout: Overview');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');

  }

  async isPageComplete() {
    try {
      await Promise.all([
        super.isAt(),
        this.header.isPageComplete(),
        this.checkoutOverviewLabel.waitFor({ state: 'visible' }),
        this.finishButton.waitFor({ state: 'visible' }),
        this.cancelButton.waitFor({ state: 'visible' })
      ])
      return true;
    } catch {
      return false;
    }
  }

  async clickFinish() : Promise<void> {
    await this.finishButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }



}

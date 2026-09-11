import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class Header extends BasePage {

  private readonly shoppingCart: Locator;
  private readonly logo: Locator;
  private readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    const locator: string = '#react-burger-menu-btn';
    super(page, page.locator(locator));
    this.shoppingCart = page.locator('#shopping_cart_container');
    this.logo = page.getByText('Swag Labs');
    this.shoppingCartBadge = page.locator('.shopping_cart_link');
  }

  async isPageComplete(): Promise<boolean> {
    try {
      await Promise.all([
        super.isAt(),
        this.shoppingCart.waitFor({ state: 'visible' }),
        this.logo.waitFor({ state: 'visible' }),
      ]);
      return true;
    } catch {
      return false;
    }
  }

  async clickCart() {
    await this.shoppingCart.click();
  }

  async openSideBar() {
    await this.mainLocator.click();
  }

  async findBadgeNumber(): Promise<Number> {
    if (await this.shoppingCartBadge.count() === 0) {
      return 0;
    }
    const text = await this.shoppingCartBadge.innerText();
    return Number(text);
  }

}

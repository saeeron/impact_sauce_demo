import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header'


export class Products extends BasePage {

  private readonly header: Header;
  private readonly inventoryContainer: Locator;
  private readonly sortContainer: Locator;
  private readonly inventoryItems: Locator;
  private readonly inventorySingleItem: Locator;
  private readonly removeButton: Locator;
  private readonly addToCartButton: Locator;

  constructor(page: Page) {

    const locator: string = '.product_sort_container';
    super(page, page.locator(locator));
    this.header = new Header(page);
    this.inventoryContainer = page.locator('#inventory_container').first();
    this.sortContainer = page.locator('.product_sort_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.inventorySingleItem = page.locator('[data-test="inventory-item-name"]');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  private findItemByName(productName: string) : Locator {
    return this.inventoryItems.filter(
      { has: this.inventorySingleItem.filter({ hasText: productName })});
  }

  private findAllItemsInCart(): Locator {
    return this.inventoryItems.filter({ has: this.removeButton });
  }

  async isPageComplete() {

    try {
      await Promise.all([
        super.isAt(),
        this.header.isPageComplete(),
        this.inventoryContainer.waitFor({ state: 'visible' }),
        this.sortContainer.waitFor({ state: 'visible'})
      ])
      return true;
      } catch {
        return false;
      }
  }
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortContainer.selectOption(option);
  }

  async addItemToCart(name: string) : Promise<void> {
      const item = this.findItemByName(name);
      await item.locator(this.addToCartButton).click();
    }

  async removeItemFromCart(name: string): Promise<void> {
    const item = this.findItemByName(name);
    await item.locator(this.removeButton).click();
  }

  async isItemAdded(name: string): Promise<boolean> {
    const item = this.findItemByName(name);
    return item.locator(this.removeButton).isVisible();
  }

  async emptyCart(): Promise<void> {
    const itemsInCart = this.findAllItemsInCart();
    while ((await itemsInCart.count()) > 0) {
        await itemsInCart.first().locator(this.removeButton).click();
      }
  }

  async getCartItemCountsInBadge() {
    return await this.header.findBadgeNumber();
  }

  async clickCart() {
    await this.header.clickCart();
  }
}

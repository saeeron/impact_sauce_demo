import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './Header'


export class Products extends BasePage {

  private readonly header: Header;
  private readonly inventoryContainer: Locator;
  private readonly sortContainer: Locator;
  private readonly inventoryItems: Locator;

  constructor(page: Page) {

    const locator: string = '.product_sort_container';
    super(page, page.locator(locator));
    this.header = new Header(page);
    this.inventoryContainer = page.locator('#inventory_container').first();
    this.sortContainer = page.locator('.product_sort_container');
    this.inventoryItems = page.locator('.inventory_item');

  }

  private findItemByName(productName: string) : Locator {
    return this.inventoryItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName })
    });
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
      await item.locator('button', { hasText: 'Add to cart' }).click();
    }

}

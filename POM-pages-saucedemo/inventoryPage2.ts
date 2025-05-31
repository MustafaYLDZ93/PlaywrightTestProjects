import { Page } from '@playwright/test';

export class InventoryPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get cartCount() {
        return this.page.locator('.shopping_cart_badge');
    }

    get addToCartButtons() {
        return this.page.locator('.btn_primary');
    }

    async addToCart({ index }: { index: number; }) {
        const buttonsCount = await this.addToCartButtons.count();
        if (index < 0 || index >= buttonsCount) {
            throw new Error(`Invalid index: ${index}. There are only ${buttonsCount} items.`);
        }
        await this.addToCartButtons.nth(index).click();
    }

    async getCartCount() {
        return await this.cartCount.innerText();
    }
}

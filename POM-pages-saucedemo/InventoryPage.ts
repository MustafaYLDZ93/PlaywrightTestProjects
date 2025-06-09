import { Page } from '@playwright/test';
import { selectors } from '../fixtures-Saucedemo/selectors';

export class InventoryPage {
    private page: Page;
    private productLabel = selectors.productLabelText;
    private burgerButton = selectors.burgerButtonSelector;
    private logoutLink = selectors.logoutSidebarLink;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad() {
        await this.page.waitForSelector(this.productLabel, { state: 'visible' });
    }

    async getProductLabelText(): Promise<string> {
        return (await this.page.textContent(this.productLabel)) || '';
    }

    async clickBurgerButton() {
        await this.page.click(this.burgerButton);
    }

    async clickLogoutLink() {
        await this.page.waitForSelector(this.logoutLink, { state: 'visible' });
        await this.page.click(this.logoutLink);
    }

    async addToCart(productSelector: string) {
        await this.page.click(productSelector);
    }

    get addToCartButtons() {
        return this.page.locator('.btn_primary');
    }

    async addToCartByIndex({ index }: { index: number; }) {
        const buttonsCount = await this.addToCartButtons.count();
        if (index < 0 || index >= buttonsCount) {
            throw new Error(`Invalid index: ${index}. There are only ${buttonsCount} items.`);
        }
        await this.addToCartButtons.nth(index).click();
    }

    async getCartCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');
        if (await badge.isVisible()) {
            return parseInt(await badge.textContent() || '0', 10);
        }
        return 0;
    }

    async logout() {
        await this.clickBurgerButton();
        await this.clickLogoutLink();
    }

    getPage() {
        return this.page;
    }

    async isLoaded() {
        await this.waitForPageLoad();
    }
}

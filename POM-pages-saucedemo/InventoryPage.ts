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
        return this.page.textContent(this.productLabel);
    }

    async clickBurgerButton() {
        await this.page.click(this.burgerButton);
    }

    async clickLogoutLink() {
        await this.page.waitForSelector(this.logoutLink, { state: 'visible' });
        await this.page.click(this.logoutLink);
    }
}

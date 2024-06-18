import { test, expect, chromium } from '@playwright/test';
import { selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidLoginPage } from '../../CustomCommands/LoginPageCustomCommands';

async function addAllProductsToCartAndVerify(page: any) {
    const products = await page.locator(selectors.inventoryItem).elementHandles();
    const productCount = products.length;

    for (let i = 1; i <= productCount; i++) {
        const productNameElement = await page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);
        await productNameElement.click();
        await expect(page).toHaveURL(/\/inventory-item\.html/);
        await page.click(selectors.buttonAddCart);
        const cartBadge = await page.locator(selectors.shoppingCartBadge);
        await expect(cartBadge).toHaveText(`${i}`);
        await page.goBack();
    }
}

test.describe('Login Tests', () => {
    let browser: any;
    let page: any;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/');
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('Verify adding all products to cart', async () => {
        await ValidLoginPage(page);

        await addAllProductsToCartAndVerify(page);
    });
});

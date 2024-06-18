import { test, expect } from '@playwright/test';
import { ValidLoginPage } from '../../CustomCommands/LoginPageCustomCommands';
import { selectors } from "../../fixtures-Saucedemo/selectors";

async function addProductToCartAndVerify(page: any, productIndex: number) {
    const productNameElement = page.locator(`.inventory_item:nth-child(${productIndex}) .inventory_item_name`);
    await productNameElement.click();
    await expect(page).toHaveURL(/\/inventory-item\.html/);
    await page.click(selectors.buttonAddCart);
    const cartBadge = page.locator(selectors.shoppingCartBadge);
    await expect(cartBadge).toHaveText(`${productIndex}`);
    await page.goBack();
}

async function verifyCartItemCount(page: any, expectedCount: number) {
    await page.click(selectors.shoppingCartLink);
    const cartItems = page.locator(selectors.cart_item);
    await expect(cartItems).toHaveCount(expectedCount);
}

test.describe('Login Tests', () => {
    test('Tüm ürünleri sepete ekleme doğrulama', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await ValidLoginPage(page);

        const productLabel = page.locator(selectors.productLabelText);
        await expect(productLabel).toHaveText('Products');

        const numberOfProductsToTest = 3;
        for (let i = 1; i <= numberOfProductsToTest; i++) {
            await addProductToCartAndVerify(page, i);
        }

        await verifyCartItemCount(page, numberOfProductsToTest);
    });
});




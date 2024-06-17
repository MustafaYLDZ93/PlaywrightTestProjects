import { test, expect } from '@playwright/test';
import { ValidLoginPage} from '../../CustomCommands/LoginPageCustomCommands';
import {selectors} from "../../fixtures-Saucedemo/selectors";

test.describe('Login Tests', () => {
    test('Tüm ürünleri sepete ekleme doğrulama', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        await ValidLoginPage(page);
        const productLabel = page.locator(selectors.productLabelText);
        await expect(productLabel).toHaveText('Products');

        // Belirli sayıda ürün sepete ekleme
        for (let i = 1; i <= 3; i++) {
            // Ürün adını alın
            const productNameElement = page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);
            await productNameElement.click();
            await expect(page).toHaveURL(/\/inventory-item\.html/);
            await page.click(selectors.buttonAddCart);
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText(`${i}`);
            await page.goBack();
        }
        await page.click(selectors.shoppingCartLink);
        const cartItems = page.locator(selectors.cart_item);
        await expect(cartItems).toHaveCount(3);

    });
});
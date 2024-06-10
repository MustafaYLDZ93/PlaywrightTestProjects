import { test, expect, chromium } from '@playwright/test';

test.describe('Login Tests', () => {
    test('Tüm ürünleri sepete ekleme doğrulama', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const username = 'standard_user';
        const password = 'secret_sauce';

        // Kullanıcı girişi yapın
        await page.fill('#user-name', username);
        await page.fill('#password', password);
        await page.click('#login-button');

        // Kullanıcının giriş yaptığından emin olun
        const productLabel = page.locator("[data-test='title']");
        await expect(productLabel).toHaveText('Products');

        // Belirli sayıda ürün sepete ekleme
        for (let i = 1; i <= 3; i++) {
            // Ürün adını alın
            const productNameElement = page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);
            await productNameElement.click();
            await expect(page).toHaveURL(/\/inventory-item\.html/);
            await page.click('.btn_inventory');
            const cartBadge = page.locator('.shopping_cart_badge');
            await expect(cartBadge).toHaveText(`${i}`);
            await page.goBack();
        }

        await page.click('.shopping_cart_link');

        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(3);

    });
});
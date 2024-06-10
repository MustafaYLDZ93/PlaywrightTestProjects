import { test, expect, chromium } from '@playwright/test';

test.describe('Login Tests', () => {
    test('Tüm ürünleri sepete ekleme doğrulama', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const username = 'standard_user';
        const password = 'secret_sauce';

        await page.fill('#user-name', username);
        await page.fill('#password', password);
        await page.click('#login-button');

        const urunler = await page.locator('.inventory_item').elementHandles();
        const urun_sayisi = urunler.length;

        for (let i = 1; i <= urun_sayisi; i++) {
            const productNameElement = await page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);
            await productNameElement.click();
            await expect(page).toHaveURL(/\/inventory-item\.html/);
            await page.click('.btn_inventory');
            const cartBadge = page.locator('.shopping_cart_badge');
            await expect(cartBadge).toHaveText(`${i}`);
            await page.goBack();
        }
    });
});
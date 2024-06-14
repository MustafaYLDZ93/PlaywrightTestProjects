import { test, expect } from '@playwright/test';

async function login(page, username, password) {
    await page.fill(`input[data-test='username']`, username);
    await page.fill('#password', password);
    await page.click('#login-button');
}

test.describe.serial('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/v1/index.html');
    });

    // Geçerli giriş testi
    test('Valid login', async ({ page }) => {

        // Kullanıcı girişi
        await login(page, 'standard_user', 'secret_sauce');

        // Girişin başarılı olduğunu kontrol et
        const productLabel = page.locator('.product_label');
        expect(await productLabel.textContent()).toContain('Products');

        // Logout işlemi
        await page.click('.bm-burger-button');
        await page.waitForSelector('#logout_sidebar_link');
        await page.click('#logout_sidebar_link');
        await page.waitForTimeout(1000);
    });

    // Geçersiz giriş testi
    test('Invalid login', async ({ page }) => {
        // Kullanıcı girişi
        await login(page, 'invaliduser', 'invalidpassword');

        // Hata mesajının göründüğünü kontrol et
        await page.waitForSelector('.error-button');
        const errorMessageDataTest = page.locator('[data-test="error"]');
        expect(await errorMessageDataTest.textContent()).toContain('Username and password do not match any user in this service');
    });
});

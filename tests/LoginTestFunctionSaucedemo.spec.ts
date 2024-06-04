import { test, expect, chromium } from '@playwright/test';

test.describe('Login Tests', () => {
    let browser: any;
    let page: any;

    test.beforeAll(async () => {
        // Tarayıcıyı başlat
        browser = await chromium.launch({ headless: false });

        // Yeni bir sayfa oluştur
        page = await browser.newPage();
    });

    test.afterAll(async () => {
        // Tarayıcıyı kapat
        await browser.close();
    });

    // Login işlemini gerçekleştiren fonksiyon
    async function login(page: any, username: string, password: string) {
        await page.fill(`input[data-test='username']`, username);
        await page.fill('#password', password);
        await page.click('#login-button');
         

    }

    // Geçerli giriş testi
    test('Valid login', async () => {
        await page.goto('https://www.saucedemo.com/v1/index.html');

        // Kullanıcı girişi
        await login(page, 'standard_user', 'secret_sauce');

        // Girişin başarılı olduğunu kontrol et
        const productLabel = await page.locator('.product_label');
        expect(await productLabel.textContent()).toContain('Products');

        // Logout işlemi
        await page.click('.bm-burger-button');
        await page.waitForSelector('#logout_sidebar_link');
        await page.click('#logout_sidebar_link');

    });

    // Geçersiz giriş testi
    test('Invalid login', async () => {
        await page.goto('https://www.saucedemo.com/v1/index.html');

        // Kullanıcı girişi
        await login(page, 'invaliduser', 'invalidpassword');

        // Hata mesajının göründüğünü kontrol et
        await page.waitForSelector('.error-button');
        const errorMessageDataTest = await page.locator('[data-test="error"]');
        expect(await errorMessageDataTest.textContent()).toContain('Username and password do not match any user in this service');
        await page.waitForTimeout(1000);

    });
});

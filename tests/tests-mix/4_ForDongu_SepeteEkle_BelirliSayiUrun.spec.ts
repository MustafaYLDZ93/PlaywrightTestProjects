import { test, expect, chromium } from '@playwright/test';

test.describe('Login Tests', () => {
    let browser: any;
    let page: any;

    test.beforeAll(async () => {
        // Tarayıcıyı başlat
        browser = await chromium.launch({ headless: true });

        // Yeni bir sayfa oluştur
        page = await browser.newPage();
    });

    test.beforeEach(async () => {
        // Saucedemo web sitesine gidin
        await page.goto('https://www.saucedemo.com');
    });

    test('Belirli sayıda ürünü sepete ekleme doğrulama', async () => {
        // Kullanıcı adını ve şifreyi girin
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

            // Ürüne tıklayın
            await productNameElement.click();

            // Seçilen ürünün detay sayfasında olduğunu doğrulayın
            await expect(page).toHaveURL(/\/inventory-item\.html/);

            // Sepete ekle butonuna tıklayın
            await page.click('.btn_inventory');

            // Ürünün sepete eklendiğini doğrulayın
            const cartBadge = page.locator('.shopping_cart_badge');
            await expect(cartBadge).toHaveText(`${i}`);

            // Sayfaya geri dönün
            await page.goBack();
        }

        // Sepete gidin
        await page.click('.shopping_cart_link');

        // Sepetin içindeki ürün sayısını kontrol edin
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(3);

    });

    test.afterAll(async () => {
        // Tarayıcıyı kapat
        await page.waitForTimeout(1000);
        await browser.close();
    });
});

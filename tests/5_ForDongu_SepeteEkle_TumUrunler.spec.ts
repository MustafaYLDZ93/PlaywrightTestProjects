import { test, expect, chromium } from '@playwright/test';

test.describe('Login Tests', () => {
    let browser: any;
    let page: any;

    test.beforeAll(async () => {
        // Tarayıcıyı başlat
        browser = await chromium.launch({ headless: true });

        // Yeni bir sayfa oluştur
        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/');
    });

    test.afterAll(async () => {
        // Tarayıcıyı kapat
        await page.waitForTimeout(1000);
        await browser.close();
    });



test('Tüm ürünleri sepete ekleme doğrulama', async () => {
        // Kullanıcı adını ve şifreyi girin
        const username = 'standard_user';
        const password = 'secret_sauce';

        // Kullanıcı girişi yapın
        await page.fill('#user-name', username);
        await page.fill('#password', password);
        await page.click('#login-button');

        // Ürün sayısını al
        const urunler = await page.locator('.inventory_item').elementHandles();
        const urun_sayisi = urunler.length;

        // for döngüsü ile ürünleri sepete ekle
        for (let i = 1; i <= urun_sayisi; i++) {
            // Ürün adını alın
            const productNameElement = await page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);

            // Ürüne tıklayın
            await productNameElement.click();

            // Seçilen ürünün detay sayfasında olduğunu doğrulayın
            await expect(page).toHaveURL(/\/inventory-item\.html/);

            // Sepete ekle butonuna tıklayın
            await page.click('.btn_inventory');

            // Ürünün sepete eklendiğini doğrulayın
            const cartBadge = await page.locator('.shopping_cart_badge');
            await expect(cartBadge).toHaveText(`${i}`);


            // Sayfaya geri dönün
            await page.goBack();

        }
    });
});


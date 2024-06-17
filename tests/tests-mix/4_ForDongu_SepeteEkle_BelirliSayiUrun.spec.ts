import {test, expect, chromium, Page} from '@playwright/test';
import { selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidLoginPage} from '../../CustomCommands/LoginPageCustomCommands';


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

        await ValidLoginPage(page);
        const productLabel = page.locator(selectors.productLabelText);
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
            await page.click(selectors.buttonAddCart);


            // Ürünün sepete eklendiğini doğrulayın
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText(`${i}`);

            // Sayfaya geri dönün
            await page.goBack();
        }

        // Sepete gidin
        await page.click(selectors.shoppingCartLink);

        // Sepetin içindeki ürün sayısını kontrol edin
        const cartItems = page.locator(selectors.cart_item);
        await expect(cartItems).toHaveCount(3);

    });

    test.afterAll(async () => {
        // Tarayıcıyı kapat
        await page.waitForTimeout(1000);
        await browser.close();
    });
});

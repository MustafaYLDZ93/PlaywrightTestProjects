import { test, expect, chromium } from '@playwright/test';
import { selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidLoginPage} from '../../CustomCommands/LoginPageCustomCommands';

test.describe('Login Tests', () => {
    let browser: any;
    let page: any;

    test.beforeAll(async () => {
        // Tarayıcıyı başlat
        browser = await chromium.launch({});

        // Yeni bir sayfa oluştur
        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/');
    });

    test.afterAll(async () => {
        // Tarayıcıyı kapat
        await browser.close();
    });

    test('Tüm ürünleri sepete ekleme doğrulama', async () => {
        await ValidLoginPage(page);
        const urunler = await page.locator(selectors.inventoryItem).elementHandles();
        const urun_sayisi = urunler.length;

        for (let i = 1; i <= urun_sayisi; i++) {
            const productNameElement = await page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);
            await productNameElement.click();
            await expect(page).toHaveURL(/\/inventory-item\.html/);
            await page.click(selectors.buttonAddCart);
            const cartBadge = await page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText(`${i}`);
            await page.goBack();

        }
    });
});
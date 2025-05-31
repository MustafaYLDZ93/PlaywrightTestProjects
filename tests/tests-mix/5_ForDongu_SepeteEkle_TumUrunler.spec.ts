import { test, expect, Page } from '@playwright/test';
import { selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidLoginPage} from '../../CustomCommands/LoginPageCustomCommands';

test.describe('Tüm Ürünleri Sepete Ekleme ve Doğrulama @chart @chartall', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test.afterAll(async ({ browser }) => {
        // Tarayıcıyı kapat
        await browser.close();
    });


    test('Tüm ürünleri sepete ekleme doğrulama', async ({page}) => {
        await ValidLoginPage(page);
        const urunler = await page.locator(selectors.inventoryItem).elementHandles();
        const urun_sayisi = urunler.length;

        for (let i = 1; i <= urun_sayisi; i++) {
            const productNameElement = await page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);
            const productName = await productNameElement.textContent();
            await productNameElement.click();
            await expect(page).toHaveURL(/\/inventory-item\.html/);
            await page.click(selectors.buttonAddCart);
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText(`${i}`);
            await page.goBack();
            console.log(`Ürün ${i} sepete eklendi.`);
            console.log(`Ürün adı: ${productName}`);

        }
        const cartBadge = page.locator(selectors.shoppingCartBadge);
        const cartBadgeText = await cartBadge.textContent(); // Badge metnini al
        expect(cartBadgeText).toBe('6'); // Metni kontrol et
        console.log(`Sepetteki toplam ürün adedi: ${urun_sayisi}`);
    });
});
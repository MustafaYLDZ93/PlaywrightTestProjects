import { test, expect } from '@playwright/test';
import { loginSelectors, selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidLoginPage} from '../../CustomCommands/LoginPageCustomCommands';

test.describe('Login Tests', () => {
    test('Tüm ürünleri sepete ekleme doğrulama', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        await ValidLoginPage(page);

        const urunler = await page.locator(selectors.inventoryItem).elementHandles();
        const urun_sayisi = urunler.length;

        for (let i = 1; i <= urun_sayisi; i++) {
            const productNameElement = page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);
            await productNameElement.click();
            await expect(page).toHaveURL(/\/inventory-item\.html/);
            await page.click(selectors.buttonAddCart);
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText(`${i}`);
            await page.goBack();
        }
    });
});
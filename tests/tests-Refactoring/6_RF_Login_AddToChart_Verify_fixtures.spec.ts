import { test, expect } from '@playwright/test';
import { selectors } from '../../fixtures-Saucedemo/selectors';
import { inventoryItems } from '../../fixtures-Saucedemo/inventoryItems';
import { ValidLoginPage} from '../../CustomCommands/LoginPageCustomCommands';
import { checkoutPage} from '../../CustomCommands/checkoutPageCustomCommand';


test.describe.serial('Data Verify and Add To Cart Tests', () => {
    test('Data Verify item', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        // Giriş yapma fonksiyonunu çağır
        await ValidLoginPage(page);

        // Her bir ürün için döngü başlat
        for (let i = 0; i < inventoryItems.length; i++) {
            const item = inventoryItems[i];

            // Ürün bilgilerini doğrula
            const inventoryItem = page.locator(selectors.inventoryItem).nth(i);
            const itemName = await inventoryItem.locator(selectors.inventoryItemName).textContent();
            expect(itemName).toBe(item.name);

            const itemPrice = await inventoryItem.locator(selectors.inventoryItemPrice).textContent();
            expect(itemPrice).toBe(item.price);

            const itemImage = page.locator(selectors.inventoryItemImg).nth(i);
            const dataTestValue = await itemImage.getAttribute('data-test');
            expect(dataTestValue).toBe(item.dataTest);

            // Ürünü sepete ekle
            await itemImage.locator('xpath=../../..').getByText('Add to cart').click();

            // Sepet simgesindeki ürün sayısını doğrula
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText((i + 1).toString());
        }

        // Sepet sayfasına git ve sepetteki ürün sayısını doğrula
        await page.locator(selectors.shoppingCartLink).click();
        await expect(page).toHaveURL(/cart\.html/);
        const cartItems = page.locator(selectors.cart_item);
        await expect(cartItems).toHaveCount(inventoryItems.length);
        await page.locator(selectors.checkoutButton).click();

        // Ödeme sayfasındaki formu doldur
        await checkoutPage(page);

        // Ödeme ve teslimat bilgilerini doğrula
        await expect(page.locator(selectors.paymentInfoValue)).toHaveText("SauceCard #31337");
        await expect(page.locator(selectors.shippingInfoValue)).toHaveText("Free Pony Express Delivery!");

        // Toplam fiyatı doğrula
        const subtotal = await page.locator(selectors.subtotalLabel).textContent();
        const expected_total = `Item total: $${inventoryItems.reduce((sum, item) => sum + parseFloat(item.price.substring(1)), 0).toFixed(2)}`;
        expect(expected_total).toBe(subtotal);
        await expect(page.locator(selectors.taxLabel)).toHaveText("Tax: $10.40");
        await expect(page.locator(selectors.totalLabel)).toHaveText("Total: $140.34");

        // Siparişi tamamla ve doğrula
        await page.locator(selectors.finishButton).click();
        await expect(page.locator(selectors.completeHeader)).toHaveText("Thank you for your order!");
        await expect(page.locator(selectors.completeText)).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
        await page.locator(selectors.backToProductsButton).click();
        await expect(page).toHaveURL(/inventory\.html/);

        // Oturumu kapat
        await page.locator(selectors.burgerMenuButton).click();
        await expect(page.locator(selectors.navMenuItemList)).toBeVisible();
        const logout = page.locator(selectors.logoutSidebarLink)
        await logout.click()
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});

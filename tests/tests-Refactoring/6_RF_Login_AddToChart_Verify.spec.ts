import { test, expect, type Page } from '@playwright/test';

// Kullanıcı adı ve şifre ile giriş yapma fonksiyonu
async function loginPage(page: Page): Promise<void> {
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.locator("#login-button").click();
}

// Ödeme sayfasındaki formu doldurma fonksiyonu
async function checkoutPage(page: Page): Promise<void> {
    await page.fill("#first-name", "Mustafa");
    await page.fill("#last-name", "Yıldız");
    await page.fill("#postal-code", "34490");
    await page.locator("#continue").click();
}

// Ürün bilgilerini temsil eden arayüz
interface InventoryItem {
    name: string;
    price: string;
    dataTest: string;
}

// Test tanımı, testlerin seri olarak çalışmasını sağlar
test.describe.serial('Data Verify and Add To Cart Tests', () => {
    test('Data Verify item', async ({ page }) => {
        // Test başlangıcında siteye git
        await page.goto('https://www.saucedemo.com/');
        // Giriş yapma fonksiyonunu çağır
        await loginPage(page);

        // Ürün bilgilerini içeren bir dizi
        const inventory_items: InventoryItem[] = [
            {
                name: 'Sauce Labs Backpack',
                price: '$29.99',
                dataTest: 'inventory-item-sauce-labs-backpack-img',
            },
            {
                name: 'Sauce Labs Bike Light',
                price: '$9.99',
                dataTest: 'inventory-item-sauce-labs-bike-light-img',
            },
            {
                name: 'Sauce Labs Bolt T-Shirt',
                price: '$15.99',
                dataTest: 'inventory-item-sauce-labs-bolt-t-shirt-img',
            },
            {
                name: 'Sauce Labs Fleece Jacket',
                price: '$49.99',
                dataTest: 'inventory-item-sauce-labs-fleece-jacket-img',
            },
            {
                name: 'Sauce Labs Onesie',
                price: '$7.99',
                dataTest: 'inventory-item-sauce-labs-onesie-img',
            },
            {
                name: 'Test.allTheThings() T-Shirt (Red)',
                price: '$15.99',
                dataTest: 'inventory-item-test.allthethings()-t-shirt-(red)-img',
            }
        ];

        // CSS seçicilerini değişkenlerde sakla
        const inventory_item_selector = '.inventory_item';
        const inventory_item_name_selector = '.inventory_item_name';
        const inventory_item_price_selector = '.inventory_item_price';
        const inventory_item_img_selector = 'img.inventory_item_img';
        const shopping_cart_badge_selector = '.shopping_cart_badge';

        // Her bir ürün için döngü başlat
        for (let i = 0; i < inventory_items.length; i++) {
            const item = inventory_items[i];

            // Ürün bilgilerini doğrula
            const inventoryItem = page.locator(inventory_item_selector).nth(i);
            const itemName = await inventoryItem.locator(inventory_item_name_selector).textContent();
            expect(itemName).toBe(item.name);

            const itemPrice = await inventoryItem.locator(inventory_item_price_selector).textContent();
            expect(itemPrice).toBe(item.price);

            const itemImage = page.locator(inventory_item_img_selector).nth(i);
            const dataTestValue = await itemImage.getAttribute('data-test');
            expect(dataTestValue).toBe(item.dataTest);

            // Ürünü sepete ekle
            await itemImage.locator('xpath=../../..').getByText('Add to cart').click();

            // Sepet simgesindeki ürün sayısını doğrula
            const cartBadge = page.locator(shopping_cart_badge_selector);
            await expect(cartBadge).toHaveText((i + 1).toString());
        }

        // Sepet sayfasına git ve sepetteki ürün sayısını doğrula
        await page.locator("[data-test='shopping-cart-link']").click();
        await expect(page).toHaveURL(/cart\.html/);
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(inventory_items.length);
        await page.locator("#checkout").click();

        // Ödeme sayfasındaki formu doldur
        await checkoutPage(page);

        // Ödeme ve teslimat bilgilerini doğrula
        await expect(page.locator("div[data-test='payment-info-value']")).toHaveText("SauceCard #31337");
        await expect(page.locator("[data-test='shipping-info-value']")).toHaveText("Free Pony Express Delivery!");

        // Toplam fiyatı doğrula
        const subtotal = await page.locator("[data-test='subtotal-label']").textContent();
        const expected_total = `Item total: $${inventory_items.reduce((sum, item) => sum + parseFloat(item.price.substring(1)), 0).toFixed(2)}`;
        expect(expected_total).toBe(subtotal);
        await expect(page.locator("[data-test='tax-label']")).toHaveText("Tax: $10.40");
        await expect(page.locator("[data-test='total-label']")).toHaveText("Total: $140.34");

        // Siparişi tamamla ve doğrula
        await page.locator("#finish").click();
        await expect(page.locator("h2[data-test='complete-header']")).toHaveText("Thank you for your order!");
        await expect(page.locator("div[data-test='complete-text']")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
        await page.locator("#back-to-products").click();
        await expect(page).toHaveURL(/inventory\.html/);

        // Oturumu kapat
        await page.locator("#react-burger-menu-btn").click();
        await expect(page.locator("nav.bm-item-list")).toBeVisible();
        const logout = page.locator("[data-test = 'logout-sidebar-link']")
        await logout.click()
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});

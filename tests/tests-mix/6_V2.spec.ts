import { test, expect, chromium, Page} from '@playwright/test';

// Login işlemini gerçekleştiren fonksiyon
async function loginPage(page: Page) {
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.locator("#login-button").click();
}

// Checkout sayfasındaki bilgileri dolduran fonksiyon
async function checkoutPage(page: Page) {
    await page.fill("#first-name", "Mustafa");
    await page.fill("#last-name", "Yıldız");
    await page.fill("#postal-code", "34490");
    await page.locator("#continue").click();
}

test.describe.serial('Data Verify and Add To Cart Tests', () => {
    test('Data Verify item', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
        await loginPage(page);

        const inventory_item = '.inventory_item';
        const inventory_item_name = '.inventory_item_name';
        const inventory_item_price = '.inventory_item_price';
        const inventory_item_img = 'img.inventory_item_img';
        const shopping_cart_badge = '.shopping_cart_badge';
        const add_to_cart_item0 = '#add-to-cart-sauce-labs-backpack';
        const add_to_cart_item1 = '#add-to-cart-sauce-labs-bike-light';
        const add_to_cart_item2 = '#add-to-cart-sauce-labs-bolt-t-shirt';
        const add_to_cart_item3 = '#add-to-cart-sauce-labs-fleece-jacket';
        const add_to_cart_item4 = '#add-to-cart-sauce-labs-onesie';
        const add_to_cart_item5 = "xpath=//*[@id='add-to-cart-test.allthethings()-t-shirt-(red)']";

        const InventoryItem0 = page.locator(inventory_item).first();
        const InventoryItemName0 = await InventoryItem0.locator(inventory_item_name).textContent();
        expect(InventoryItemName0).toBe('Sauce Labs Backpack');
        const InventoryItemPrice0 = await InventoryItem0.locator(inventory_item_price).textContent();
        expect(InventoryItemPrice0).toBe('$29.99');
        const imageInventoryItem0 = page.locator(inventory_item_img).first();
        const dataTestValue0 = await imageInventoryItem0.getAttribute('data-test');
        expect(dataTestValue0).toBe('inventory-item-sauce-labs-backpack-img');

        const inventoryItemCount = await page.locator('.inventory_item').count();
        if (inventoryItemCount > 0) {
            await page.locator(add_to_cart_item0).click();
            const cartBadge = page.locator(shopping_cart_badge);
            await expect(cartBadge).toHaveText('1');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem1 = page.locator(inventory_item).nth(1);
        const InventoryItemName1 = await InventoryItem1.locator(inventory_item_name).textContent();
        expect(InventoryItemName1).toBe('Sauce Labs Bike Light');
        const InventoryItemPrice1 = await InventoryItem1.locator(inventory_item_price).textContent();
        expect(InventoryItemPrice1).toBe('$9.99');
        const imageInventoryItem1 = page.locator(inventory_item_img).nth(1);
        const dataTestValue1 = await imageInventoryItem1.getAttribute('data-test');
        expect(dataTestValue1).toBe('inventory-item-sauce-labs-bike-light-img');

        if (inventoryItemCount > 1) {
            await page.locator(add_to_cart_item1).click();
            const cartBadge = page.locator(shopping_cart_badge);
            await expect(cartBadge).toHaveText('2');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem2 = page.locator(inventory_item).nth(2);
        const InventoryItemName2 = await InventoryItem2.locator(inventory_item_name).textContent();
        expect(InventoryItemName2).toBe('Sauce Labs Bolt T-Shirt');
        const InventoryItemPrice2 = await InventoryItem2.locator(inventory_item_price).textContent();
        expect(InventoryItemPrice2).toBe('$15.99');
        const imageInventoryItem2 = page.locator(inventory_item_img).nth(2);
        const dataTestValue2 = await imageInventoryItem2.getAttribute('data-test');
        expect(dataTestValue2).toBe('inventory-item-sauce-labs-bolt-t-shirt-img');

        if (inventoryItemCount > 2) {
            await page.locator(add_to_cart_item2).click();
            const cartBadge = page.locator(shopping_cart_badge);
            await expect(cartBadge).toHaveText('3');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem3 = page.locator(inventory_item).nth(3);
        const InventoryItemName3 = await InventoryItem3.locator(inventory_item_name).textContent();
        expect(InventoryItemName3).toBe('Sauce Labs Fleece Jacket');
        const InventoryItemPrice3 = await InventoryItem3.locator(inventory_item_price).textContent();
        expect(InventoryItemPrice3).toBe('$49.99');
        const imageInventoryItem3 = page.locator(inventory_item_img).nth(3);
        const dataTestValue3 = await imageInventoryItem3.getAttribute('data-test');
        expect(dataTestValue3).toBe('inventory-item-sauce-labs-fleece-jacket-img');

        if (inventoryItemCount > 3) {
            await page.locator(add_to_cart_item3).click();
            const cartBadge = page.locator(shopping_cart_badge);
            await expect(cartBadge).toHaveText('4');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem4 = page.locator(inventory_item).nth(4);
        const InventoryItemName4 = await InventoryItem4.locator(inventory_item_name).textContent();
        expect(InventoryItemName4).toBe('Sauce Labs Onesie');
        const InventoryItemPrice4 = await InventoryItem4.locator(inventory_item_price).textContent();
        expect(InventoryItemPrice4).toBe('$7.99');
        const imageInventoryItem4 = page.locator(inventory_item_img).nth(4);
        const dataTestValue4 = await imageInventoryItem4.getAttribute('data-test');
        expect(dataTestValue4).toBe('inventory-item-sauce-labs-onesie-img');

        if (inventoryItemCount > 4) {
            await page.locator(add_to_cart_item4).click();
            const cartBadge = page.locator(shopping_cart_badge);
            await expect(cartBadge).toHaveText('5');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem5 = page.locator(inventory_item).nth(5);
        const InventoryItemName5 = await InventoryItem5.locator(inventory_item_name).textContent();
        expect(InventoryItemName5).toBe('Test.allTheThings() T-Shirt (Red)');
        const InventoryItemPrice5 = await InventoryItem5.locator(inventory_item_price).textContent();
        expect(InventoryItemPrice5).toBe('$15.99');
        const imageInventoryItem5 = page.locator(inventory_item_img).nth(5);
        const dataTestValue5 = await imageInventoryItem5.getAttribute('data-test');
        expect(dataTestValue5).toBe('inventory-item-test.allthethings()-t-shirt-(red)-img');

        if (inventoryItemCount > 5) {
            await page.locator(add_to_cart_item5).click();
            const cartBadge = page.locator(shopping_cart_badge);
            await expect(cartBadge).toHaveText('6');
        } else {
            console.log('No inventory items found.');
        }



        await page.locator("[data-test='shopping-cart-link']").click();
        await expect(page).toHaveURL(/cart\.html/);
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(6);
        await page.locator("#checkout").click();


        await checkoutPage(page);

        await expect(page.locator("div[data-test='payment-info-value']")).toHaveText("SauceCard #31337");
        await expect(page.locator("[data-test='shipping-info-value']")).toHaveText("Free Pony Express Delivery!");
        const subtotal = await page.locator("[data-test='subtotal-label']").textContent();
        const expected_total = "Item total: $129.94";
        expect(expected_total).toBe(subtotal);
        await expect(page.locator("[data-test='tax-label']")).toHaveText("Tax: $10.40");
        await expect(page.locator("[data-test='total-label']")).toHaveText("Total: $140.34");
        await page.locator("#finish").click();


        await expect(page.locator("h2[data-test='complete-header']")).toHaveText("Thank you for your order!");
        await expect(page.locator("div[data-test='complete-text']")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
        await page.locator("#back-to-products").click();
        await expect(page).toHaveURL(/inventory\.html/);

        await page.locator("#react-burger-menu-btn").click();
        await expect(page.locator("nav.bm-item-list")).toBeVisible();
        await page.locator("#logout_sidebar_link").click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');

    });


});


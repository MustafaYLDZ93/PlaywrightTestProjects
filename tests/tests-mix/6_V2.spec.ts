import {test, expect} from '@playwright/test';
import { selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidLoginPage} from '../../CustomCommands/LoginPageCustomCommands';
import { checkoutPage} from '../../CustomCommands/checkoutPageCustomCommand';


test.describe.serial('Data Verify and Add To Cart Tests', () => {
    test('Data Verify item', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/', {waitUntil: "domcontentloaded"});
        await ValidLoginPage(page);

        const InventoryItem0 = page.locator(selectors.inventoryItem).first();
        const InventoryItemName0 = await InventoryItem0.locator(selectors.inventoryItemName).textContent();
        expect(InventoryItemName0).toBe('Sauce Labs Backpack');
        const InventoryItemPrice0 = await InventoryItem0.locator(selectors.inventoryItemPrice).textContent();
        expect(InventoryItemPrice0).toBe('$29.99');
        const imageInventoryItem0 = page.locator(selectors.inventoryItemImg).first();
        const dataTestValue0 = await imageInventoryItem0.getAttribute('data-test');
        expect(dataTestValue0).toBe('inventory-item-sauce-labs-backpack-img');

        const inventoryItemCount = await page.locator(selectors.inventoryItem).count();
        if (inventoryItemCount > 0) {
            await page.locator(selectors.add_to_cart_item0).click();
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText('1');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem1 = page.locator(selectors.inventoryItem).nth(1);

        const InventoryItemName1 = await InventoryItem1.locator(selectors.inventoryItemName).textContent();
        expect(InventoryItemName1).toBe('Sauce Labs Bike Light');
        const InventoryItemPrice1 = await InventoryItem1.locator(selectors.inventoryItemPrice).textContent();
        expect(InventoryItemPrice1).toBe('$9.99');
        const imageInventoryItem1 = page.locator(selectors.inventoryItemImg).nth(1);
        const dataTestValue1 = await imageInventoryItem1.getAttribute('data-test');
        expect(dataTestValue1).toBe('inventory-item-sauce-labs-bike-light-img');

        if (inventoryItemCount > 1) {
            await page.locator(selectors.add_to_cart_item1).click();
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText('2');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem2 = page.locator(selectors.inventoryItem).nth(2);
        const InventoryItemName2 = await InventoryItem2.locator(selectors.inventoryItemName).textContent();
        expect(InventoryItemName2).toBe('Sauce Labs Bolt T-Shirt');
        const InventoryItemPrice2 = await InventoryItem2.locator(selectors.inventoryItemPrice).textContent();
        expect(InventoryItemPrice2).toBe('$15.99');
        const imageInventoryItem2 = page.locator(selectors.inventoryItemImg).nth(2);
        const dataTestValue2 = await imageInventoryItem2.getAttribute('data-test');
        expect(dataTestValue2).toBe('inventory-item-sauce-labs-bolt-t-shirt-img');

        if (inventoryItemCount > 2) {
            await page.locator(selectors.add_to_cart_item2).click();
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText('3');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem3 = page.locator(selectors.inventoryItem).nth(3);
        const InventoryItemName3 = await InventoryItem3.locator(selectors.inventoryItemName).textContent();
        expect(InventoryItemName3).toBe('Sauce Labs Fleece Jacket');
        const InventoryItemPrice3 = await InventoryItem3.locator(selectors.inventoryItemPrice).textContent();
        expect(InventoryItemPrice3).toBe('$49.99');
        const imageInventoryItem3 = page.locator(selectors.inventoryItemImg).nth(3);
        const dataTestValue3 = await imageInventoryItem3.getAttribute('data-test');
        expect(dataTestValue3).toBe('inventory-item-sauce-labs-fleece-jacket-img');

        if (inventoryItemCount > 3) {
            await page.locator(selectors.add_to_cart_item3).click();
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText('4');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem4 = page.locator(selectors.inventoryItem).nth(4);
        const InventoryItemName4 = await InventoryItem4.locator(selectors.inventoryItemName).textContent();
        expect(InventoryItemName4).toBe('Sauce Labs Onesie');
        const InventoryItemPrice4 = await InventoryItem4.locator(selectors.inventoryItemPrice).textContent();
        expect(InventoryItemPrice4).toBe('$7.99');
        const imageInventoryItem4 = page.locator(selectors.inventoryItemImg).nth(4);
        const dataTestValue4 = await imageInventoryItem4.getAttribute('data-test');
        expect(dataTestValue4).toBe('inventory-item-sauce-labs-onesie-img');

        if (inventoryItemCount > 4) {
            await page.locator(selectors.add_to_cart_item4).click();
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText('5');
        } else {
            console.log('No inventory items found.');
        }

        const InventoryItem5 = page.locator(selectors.inventoryItem).nth(5);
        const InventoryItemName5 = await InventoryItem5.locator(selectors.inventoryItemName).textContent();
        expect(InventoryItemName5).toBe('Test.allTheThings() T-Shirt (Red)');
        const InventoryItemPrice5 = await InventoryItem5.locator(selectors.inventoryItemPrice).textContent();
        expect(InventoryItemPrice5).toBe('$15.99');
        const imageInventoryItem5 = page.locator(selectors.inventoryItemImg).nth(5);
        const dataTestValue5 = await imageInventoryItem5.getAttribute('data-test');
        expect(dataTestValue5).toBe('inventory-item-test.allthethings()-t-shirt-(red)-img');

        if (inventoryItemCount > 5) {
            await page.locator(selectors.add_to_cart_item5).click();
            const cartBadge = page.locator(selectors.shoppingCartBadge);
            await expect(cartBadge).toHaveText('6');
        } else {
            console.log('No inventory items found.');
        }


        await page.locator(selectors.shoppingCartLink).click();
        await expect(page).toHaveURL(/cart\.html/);
        const cartItems = page.locator(selectors.cart_item);
        await expect(cartItems).toHaveCount(6);
        await page.locator(selectors.checkoutButton).click()


        await checkoutPage(page);

        await expect(page.locator(selectors.paymentInfoValue)).toHaveText("SauceCard #31337")
        await expect(page.locator(selectors.shippingInfoValue)).toHaveText("Free Pony Express Delivery!")
        const subtotal = await page.locator(selectors.subtotalLabel).textContent()
        const expected_total = "Item total: $129.94"
        expect(expected_total).toBe(subtotal)
        await expect(page.locator(selectors.taxLabel)).toHaveText("Tax: $10.40")
        await expect(page.locator(selectors.totalLabel)).toHaveText("Total: $140.34")
        await page.locator(selectors.finishButton).click()


        await expect(page.locator(selectors.completeHeader)).toHaveText("Thank you for your order!")
        await expect(page.locator(selectors.completeText)).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
        await page.locator(selectors.backToProductsButton).click()
        await expect(page).toHaveURL(/inventory\.html/);

        await page.locator(selectors.burgerMenuButton).click()
        await expect(page.locator(selectors.navMenuItemList)).toBeVisible()
        await page.locator(selectors.logoutSidebarLink).click()
        await expect(page).toHaveURL('https://www.saucedemo.com/')

    });

});


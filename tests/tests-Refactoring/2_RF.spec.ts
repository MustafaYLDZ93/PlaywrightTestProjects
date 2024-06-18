import { test, expect } from '@playwright/test';
import { loginSelectors, selectors } from '../../fixtures-Saucedemo/selectors';
import { loginUser, verifyProductInCart, logoutUser } from '../../CustomCommands/loginHelpers';

const testUsers = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'YanlisAd', password: 'YanlisSifre' },
];

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
    });

    test('Belirli sayıda ürünü sepete ekleme doğrulama', async ({ page }) => {
        for (const user of testUsers) {
            await loginUser(page, user.username, user.password);

            if (user.username === 'standard_user' && user.password === 'secret_sauce') {

                await expect(page).toHaveURL(/inventory\.html/);

                const firstProduct = page.locator(selectors.inventoryItem).first();
                const productName = await firstProduct.locator(selectors.inventoryItemName).textContent();
                const productPrice = '$29.99';
                const addToCartButton = firstProduct.locator(selectors.buttonAddCart);

                await addToCartButton.click();

                await verifyProductInCart(page, productName, productPrice);
                await logoutUser(page);
            } else {
                const errorMessage = page.locator(loginSelectors.errorMessageSelector);
                await expect(errorMessage).toBeVisible();
                await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
            }
        }
    });
});

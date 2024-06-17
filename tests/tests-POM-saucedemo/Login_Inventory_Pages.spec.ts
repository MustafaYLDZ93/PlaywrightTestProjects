import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM-pages-saucedemo/LoginPage';
import { InventoryPage } from '../../POM-pages-saucedemo/InventoryPage';

test.describe('SauceDemo Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await page.goto('https://www.saucedemo.com/v1/index.html');
    });

    test('valid login', async ({ page }) => {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLoginButton();

        // Girişin başarılı olduğunu kontrol et
        await expect(page).toHaveURL(/\/v1\/inventory.html/);

        await inventoryPage.waitForPageLoad();
        const productLabelText = await inventoryPage.getProductLabelText();
        expect(productLabelText).toContain('Products');

        // Logout işlemi
        await inventoryPage.clickBurgerButton();
        await inventoryPage.clickLogoutLink();
    });

    test('invalid login', async ({ page }) => {
        await loginPage.enterUsername('invaliduser');
        await loginPage.enterPassword('invalidpassword');
        await loginPage.clickLoginButton();

        // Hata mesajının göründüğünü kontrol et
        await loginPage.waitForErrorMessage()
        const errorMessageText = await loginPage.getErrorMessage();
        expect(errorMessageText).toBe('Epic sadface: Username and password do not match any user in this service');
    });
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM-pages-saucedemo/LoginPage';
import { InventoryPage } from '../../POM-pages-saucedemo/InventoryPage';

test.describe('SauceDemo Tests @smoke @logintests ', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await page.goto('https://www.saucedemo.com/');
    });

    test('valid login @validlogin', async () => {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLoginButton();


        await inventoryPage.waitForPageLoad();
        const productLabelText = await inventoryPage.getProductLabelText();
        expect(productLabelText).toContain('Products');

        // Logout işlemi
        await inventoryPage.clickBurgerButton();
        await inventoryPage.clickLogoutLink();
    });

    test('invalid login @invalidlogin', async () => {
        await loginPage.enterUsername('invaliduser');
        await loginPage.enterPassword('invalidpassword');
        await loginPage.clickLoginButton();

        // Hata mesajının göründüğünü kontrol et
        await loginPage.waitForErrorMessage()
        const errorMessageText = await loginPage.getErrorMessage();
        expect(errorMessageText).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    
});

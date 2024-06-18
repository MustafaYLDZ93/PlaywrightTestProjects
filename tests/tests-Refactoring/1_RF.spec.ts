import { test, expect, Page } from '@playwright/test';
import { loginSelectors, selectors } from '../../fixtures-Saucedemo/selectors';

const userData = {
    valid: { username: 'standard_user', password: 'secret_sauce' },
    invalid: { username: 'invaliduser', password: 'invalidpassword' }
};

async function login(page: Page, username: string, password: string) {
    await page.fill(loginSelectors.usernameInputSelector, username);
    await page.fill(loginSelectors.passwordInputSelector, password);
    await page.click(loginSelectors.LoginButton);
}

// Test tanımı
test('Login and Logout Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Yanlış kullanıcı adı ve şifre ile giriş yapmayı dene
    await login(page, userData.invalid.username, userData.invalid.password);

    // Hata mesajının göründüğünü kontrol et
    await expect(page.locator(loginSelectors.errorMessageSelector)).toBeVisible();
    await expect(page.locator(loginSelectors.errorMessageSelector)).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Doğru kullanıcı adı ve şifre ile giriş yap
    await login(page, userData.valid.username, userData.valid.password);

    // Girişin başarılı olduğunu kontrol et
    await expect(page.locator(selectors.inventoryContainer)).toBeVisible();
    await expect(page.locator(selectors.productLabelText)).toContainText('Products');

    // Menüden çıkış yap
    await page.click(selectors.burgerButtonSelector);
    await page.click(selectors.logoutSidebarLink);
});

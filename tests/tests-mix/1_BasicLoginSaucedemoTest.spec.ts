import { test, expect } from '@playwright/test';
import selectors from '../../fixtures-Saucedemo/selectors';

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const login = async (username: string, password: string) => {
        await page.fill(selectors.username, username);
        await page.fill(selectors.password, password);
        await page.click(selectors.loginButton);
    };

    // Geçersiz kullanıcı adı ve şifre ile giriş yapmayı dene
    await login('invaliduser', 'invalidpassword');
    await expect(page.locator(selectors.error)).toBeVisible();
    await expect(page.locator(selectors.error)).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Geçerli kullanıcı adı ve şifre ile giriş yap
    await login('standard_user', 'secret_sauce');
    await expect(page.locator(selectors.inventoryContainer)).toBeVisible();
    await expect(page.locator(selectors.title)).toContainText('Products');

    // Çıkış yap
    await page.click(selectors.burgerMenuButton);
    await page.click(selectors.logoutSidebarLink);
});
import { test, expect, Locator } from '@playwright/test';

test('saucedemo failed login test', async ({ page }) => {
    try {
        // Saucedemo sitesine git
        await page.goto('https://www.saucedemo.com/');

        // Kullanıcı adı ve şifre alanlarını doldur
        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', 'invalid_password');

        // Giriş butonuna tıkla
        await page.click('#login-button');

        // Hata mesajını bekle ve doğrula
        const errorMessage: Locator = page.locator('.error-message-container');
        await expect(errorMessage).toBeVisible(); // Elementin görünür olup olmadığını kontrol eder

        const errorMessageText = await errorMessage.textContent();
        expect(errorMessageText).toContain('Epic sadface: Username and password do not match any user in this service');

        console.log('Hatalı giriş testi başarıyla tamamlandı.');
    } catch (error) {
        console.error('Bir hata oluştu:', error);
    }
});

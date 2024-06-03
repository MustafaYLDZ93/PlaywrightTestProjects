import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://random-asin-new.vercel.app/');
    await expect(page.locator('body')).toContainText('Giriş Yap');
    await expect(page.getByRole('button', { name: 'Giriş Yap' })).toBeVisible();
    await page.getByRole('button', { name: 'Giriş Yap' }).click();
    await page.getByTestId('login-email').click();
    await page.getByTestId('login-email').fill('');
    await page.getByTestId('login-email').click();
    await page.getByTestId('login-email').fill('ss');
    await page.getByTestId('login-password').click();
    await page.getByTestId('login-password').fill('sese');
    await page.getByTestId('login-remember-me').check();
    await page.getByText('Şifremi Unuttum').click();
    await expect(page.locator('label')).toContainText('Kullanıcı Adı:');
    await page.locator('.auth-container-button > .mantine-focus-auto').first().click();

});
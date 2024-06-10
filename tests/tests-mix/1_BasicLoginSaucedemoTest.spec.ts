import {test, expect, chromium} from '@playwright/test';

test('test', async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standart_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="username"]').click();
    await expect(page.locator('[data-test="username"]')).toHaveValue('standart_user');
    await page.locator('[data-test="password"]').click();
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="error"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});
import { test, expect } from '@playwright/test';
import { loginSelectors, selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidInvalidLoginPage } from '../../CustomCommands/LoginPageCustomCommands';

test.describe.serial('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('Valid login', async ({ page }) => {
        await ValidInvalidLoginPage(page, loginSelectors.username, loginSelectors.password);

        const productLabel = page.locator(selectors.productLabelText);
        await page.waitForSelector(selectors.productLabelText, { state: 'visible' }); // Ensure element is visible before asserting
        await expect(productLabel).toHaveText('Products');

        await page.click(selectors.burgerButtonSelector);
        await page.waitForSelector(selectors.logoutSidebarLink);
        await page.click(selectors.logoutSidebarLink);
    });

    test('Invalid login', async ({ page }) => {
        await ValidInvalidLoginPage(page, 'invaliduser', 'invalidpassword');

        await page.waitForSelector(loginSelectors.errorButton, { state: 'visible' });
        const errorMessage = page.locator(loginSelectors.errorMessageSelector);
        await expect(errorMessage).toContainText('Username and password do not match any user in this service');
    });
});

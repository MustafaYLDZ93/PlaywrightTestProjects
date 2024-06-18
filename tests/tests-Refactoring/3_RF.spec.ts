import { test, expect, Page } from '@playwright/test';
import { loginSelectors, selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidInvalidLoginPage } from '../../CustomCommands/LoginPageCustomCommands';

async function performValidLogin(page: Page) {
    await ValidInvalidLoginPage(page, loginSelectors.username, loginSelectors.password);

    // Sayfanın tam yüklendiğinden emin olun
    const productLabel = page.locator(selectors.productLabelText);
    await expect(productLabel).toHaveText('Products');
    await page.click(selectors.burgerButtonSelector);
    await page.waitForSelector(selectors.logoutSidebarLink);
    await page.click(selectors.logoutSidebarLink);
}

async function performInvalidLogin(page: Page, username: string, password: string) {
    await ValidInvalidLoginPage(page, username, password);

    await page.waitForSelector(loginSelectors.errorButton, { state: "visible" });
    const errorMessage = page.locator(loginSelectors.errorMessageSelector);
    await expect(errorMessage).toContainText('Username and password do not match any user in this service');
}

test.describe.serial('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('Valid login', async ({ page }) => {
        await performValidLogin(page);
    });

    test('Invalid login', async ({ page }) => {
        await performInvalidLogin(page, 'invaliduser', 'invalidpassword');
    });
});

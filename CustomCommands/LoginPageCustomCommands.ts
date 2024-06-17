import { Page } from '@playwright/test';
import { loginSelectors } from '../fixtures-Saucedemo/selectors';

export async function ValidLoginPage(page: Page): Promise<void> {
    await page.fill(loginSelectors.usernameInputSelector, loginSelectors.username);
    await page.fill(loginSelectors.passwordInputSelector, loginSelectors.password);
    await page.locator(loginSelectors.LoginButton).click();
}

export async function ValidInvalidLoginPage(page: Page, username: string, password: string) {
    await page.fill(loginSelectors.usernameInputSelector, username);
    await page.fill(loginSelectors.passwordInputSelector, password);
    await page.click(loginSelectors.LoginButton);
}
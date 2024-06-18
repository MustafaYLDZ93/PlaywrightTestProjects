import {expect, Page} from '@playwright/test';
import { loginSelectors, selectors } from '../fixtures-Saucedemo/selectors';

// Helper function for logging in
export async function loginUser(page: Page, username: string, password: string) {
    await page.fill(loginSelectors.usernameInputSelector, username);
    await page.fill(loginSelectors.passwordInputSelector, password);
    await page.click(loginSelectors.LoginButton);
}

// Helper function for verifying product in the cart
export async function verifyProductInCart(page: Page, productName: string, productPrice: string) {
    const cartLink = page.locator(selectors.shoppingCartLink);
    await cartLink.click();
    await expect(page).toHaveURL(/cart\.html/);

    const cartProductName = await page.locator(selectors.inventoryItemName).textContent();
    const cartProductPrice = await page.locator(selectors.inventoryItemPrice).textContent();

    expect(productName).toBe(cartProductName);
    expect(productPrice).toBe(cartProductPrice);
}

export async function logoutUser(page: Page) {
    const menuButton = page.locator(selectors.burgerButtonSelector);
    await menuButton.click();
    const logoutButton = page.locator(selectors.logoutSidebarLink);
    await logoutButton.click();
}

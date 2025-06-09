import { test as base, expect, Page } from '@playwright/test';

// Custom fixture: username, password ve login olmuş page
export const test = base.extend<{
  username: string;
  password: string;
  loggedInPage: Page;
  logout: (page: Page) => Promise<void>;
  addToCart: (page: Page, productSelector: string) => Promise<void>;
}>({
  username: async ({}, use) => {
    await use('standard_user');
  },
  password: async ({}, use) => {
    await use('secret_sauce');
  },
  loggedInPage: async ({ page, username, password }, use) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
    await expect(page).toHaveURL(/.*inventory/);
    await use(page);
  },
  logout: async ({ loggedInPage }, use) => {
  await use(async () => {
    await loggedInPage.click('#react-burger-menu-btn');
    await loggedInPage.click('#logout_sidebar_link');
    await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/');
  });
},
  addToCart: async ({}, use) => {
    await use(async (page: Page, productSelector: string) => {
      await page.click(productSelector);
    });
  },
});

export { expect } from '@playwright/test';

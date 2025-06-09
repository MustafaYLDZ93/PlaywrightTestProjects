import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../../POM-pages-saucedemo/LoginPage';
import { InventoryPage } from '../../POM-pages-saucedemo/InventoryPage';

export const test = base.extend<{
  username: string;
  password: string;
  inventoryPage: InventoryPage;
}>({
  username: async ({}, use) => {
    await use('standard_user');
  },
  password: async ({}, use) => {
    await use('secret_sauce');
  },
  inventoryPage: async ({ page, username, password }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.isLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM-pages-saucedemo/copilotPOM';

test.describe('SauceDemo Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  async function performLogin(username: string, password: string) {
    await loginPage.login(username, password);
  }

  test('Valid login', async ({ page }) => {
    await performLogin('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Invalid login', async ({ page }) => {
    await performLogin('invalid_user', 'invalid_password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

});
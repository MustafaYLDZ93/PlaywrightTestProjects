import { test, expect, chromium } from '@playwright/test';

test('has title', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await page.waitForTimeout(1000);
  await page.getByText("Get started").click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
  await expect(page.locator("h1")).toContainText('Installation');
  await page.waitForTimeout(1000);
  await browser.close();
});

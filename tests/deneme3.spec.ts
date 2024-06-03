import {test, expect, chromium} from '@playwright/test';

test('test', async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('banner')).toContainText('Playwright enables reliable end-to-end testing for modern web apps.Get startedStar62k+');
    await expect(page.getByRole('banner')).toBeVisible();
    await page.getByRole('img', { name: 'Browsers (Chromium, Firefox,' }).click();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect(page.getByLabel('GitHub repository')).toBeVisible();
    await expect(page.getByLabel('Discord server')).toBeVisible();
    await expect(page.getByLabel('Switch between dark and light')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API', exact: true })).toBeVisible();
    await expect(page.getByText('Node.jsNode.jsPythonJava.NET')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
    await expect(page.getByLabel('Main', { exact: true })).toContainText('Community');
    await page.getByLabel('Search').click();
    await page.getByPlaceholder('Search docs').fill('python');
    await page.getByRole('link', { name: 'Python​ Supported languages' }).click();
    await expect(page.locator('#python')).toContainText('Python');
    await expect(page.getByRole('article')).toContainText('Playwright Pytest plugin is the recommended way to run end-to-end tests. It provides context isolation, running it on multiple browser configurations and more out of the box.');
    await expect(page.locator('#java')).toContainText('Java');
    await page.waitForTimeout(1000);
    await expect(page.getByRole('article')).toContainText('You can choose any testing framework such as JUnit or TestNG based on your project requirements.');
    await expect(page.getByRole('article')).toContainText('Documentation');
    await page.waitForTimeout(1000);
    await page.locator('li').filter({ hasText: 'GitHub repo' }).nth(2).click();
    await expect(page.getByRole('article')).toContainText('Documentation');




});

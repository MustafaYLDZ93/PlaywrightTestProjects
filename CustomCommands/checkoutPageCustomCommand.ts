import { Page } from '@playwright/test';
import {selectors} from '../fixtures-Saucedemo/selectors';

export async function checkoutPage(page: Page): Promise<void> {
    await page.fill(selectors.checkoutFirstName, "Mustafa");
    await page.fill(selectors.checkoutLastName, "Yıldız");
    await page.fill(selectors.checkoutPostalCode, "34490");
    await page.locator(selectors.checkoutContinueButton).click();
}

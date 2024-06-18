import { test, expect, chromium } from '@playwright/test';
import { loginSelectors, selectors } from '../../fixtures-Saucedemo/selectors';
import { ValidInvalidLoginPage} from '../../CustomCommands/LoginPageCustomCommands';


test.describe.serial('Login Tests', () => {
    let browser: any;
    let page: any;

    test.beforeAll(async () => {
        // Tarayıcıyı başlat
        browser = await chromium.launch({ headless: true });

        // Yeni bir sayfa oluştur
        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/');
    });

    test.afterAll(async () => {
        // Tarayıcıyı kapat
        await browser.close();
    });

    // Geçerli giriş testi
    test('Valid login', async () => {

        // Kullanıcı girişi
        await ValidInvalidLoginPage(page, loginSelectors.username, loginSelectors.password);

        // Girişin başarılı olduğunu kontrol et
        const productLabel = page.locator(selectors.productLabelText);
        await expect(productLabel).toHaveText('Products');
        // Logout işlemi
        await page.click(selectors.burgerButtonSelector);
        await page.waitForSelector(selectors.logoutSidebarLink);
        await page.click(selectors.logoutSidebarLink);
        await page.waitForTimeout(1000)


    });

    // Geçersiz giriş testi
    test('Invalid login', async () => {
        // Kullanıcı girişi
        await ValidInvalidLoginPage(page, 'invaliduser', 'invalidpassword');

        // Hata mesajının göründüğünü kontrol et
        await page.waitForSelector(loginSelectors.errorButton);
        const errorMessageDataTest = await page.locator(loginSelectors.errorMessageSelector);
        expect(await errorMessageDataTest.textContent()).toContain('Username and password do not match any user in this service');

    });
});

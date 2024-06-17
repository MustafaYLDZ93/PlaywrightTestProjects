import {test, expect, chromium} from "@playwright/test";
import { loginSelectors, selectors } from '../../fixtures-Saucedemo/selectors';


const testUsers = [
    { username: "standard_user", password: "secret_sauce" },
    { username: "YanlisAd", password: "YanlisSifre" },
];

test.describe('Login Tests', () => {
    let browser: any;
    let page: any;

    test.beforeAll(async () => {
        // Tarayıcıyı başlat
        browser = await chromium.launch({ headless: true });

        // Yeni bir sayfa oluştur
        page = await browser.newPage();
    });

    test.beforeEach(async () => {
        // Saucedemo web sitesine gidin
        await page.goto('https://www.saucedemo.com');
    });


    test('Belirli sayıda ürünü sepete ekleme doğrulama', async () => {
        for (const user of testUsers) {
            const usernameInput = page.locator(loginSelectors.usernameInputSelector);
            const passwordInput = page.locator(loginSelectors.passwordInputSelector);
            const loginButton = page.locator(loginSelectors.LoginButton);

            // Kullanıcı adı ve şifreyi girin
            await usernameInput.fill(user.username);
            await passwordInput.fill(user.password);
            await loginButton.click();

            if (user.username === "standard_user" && user.password === "secret_sauce") {
                // Oturum açıldığını doğrula
                await expect(page).toHaveURL(/inventory\.html/);

                // İlk ürünü seç
                const firstProduct = page.locator(selectors.inventoryItem).first();
                const productName = await firstProduct.locator(selectors.inventoryItemName).textContent();
                const productPrice = "$29.99";
                const addToCartButton = firstProduct.locator(selectors.buttonAddCart);


                // Ürünü sepete ekle
                await addToCartButton.click();
                await page.waitForTimeout(1000); // Gecikme eklendi (sleep yerine)

                // Sepete git
                const cartLink = page.locator(selectors.shoppingCartLink);
                await cartLink.click();

                // Oturum açıldığını doğrula
                await expect(page).toHaveURL(/cart\.html/);

                const cartProductName = await page.locator(selectors.inventoryItemName).textContent();
                const cartProductPrice = await page.locator(selectors.inventoryItemPrice).textContent();

                // Ürün bilgilerinin aynı olduğunu doğrula
                expect(productName).toBe(cartProductName);
                expect(productPrice).toBe(cartProductPrice);

                // Menüden çıkış yap
                const menuButton = page.locator(selectors.burgerButtonSelector);
                await menuButton.click();
                await page.waitForTimeout(1000);

                const logoutButton = page.locator(selectors.logoutSidebarLink);
                await logoutButton.click();
            } else {
                // Hata mesajını kontrol et
                const errorMessage = page.locator(loginSelectors.errorMessageSelector);
                await expect(errorMessage).toBeVisible();
                await expect(errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
            }
        }
    });
});


import { test, expect, } from '@playwright/test';

const testUsers = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'YanlisAd', password: 'YanlisSifre' },
];

test.describe('Login Tests', () => {
    test.beforeEach( async ({ page }) => {
        // Her testten önce Saucedemo web sitesine gidin
         await page.goto('https://www.saucedemo.com');
    });

    test('Belirli sayıda ürünü sepete ekleme doğrulama', async ({ page }) => {
        for (const user of testUsers) {
            const usernameInput = page.locator('#user-name');
            const passwordInput = page.locator('#password');
            const loginButton = page.locator('#login-button');

            // Kullanıcı adı ve şifreyi girin
            await usernameInput.fill(user.username);
            await passwordInput.fill(user.password);

            // Giriş düğmesine tıklayın
            await loginButton.click();

            if (user.username === 'standard_user' && user.password === 'secret_sauce') {
                // Oturum açıldığını doğrula
                await expect(page).toHaveURL(/inventory\.html/);

                // İlk ürünü seç
                const firstProduct = page.locator('.inventory_item').first();
                const productName = await firstProduct.locator('.inventory_item_name').textContent();
                const productPrice = '$29.99';
                const addToCartButton = firstProduct.locator('.btn_primary');

                // Ürünü sepete ekle
                await addToCartButton.click();
                await page.waitForTimeout(1000); // Gecikme eklendi (sleep yerine)

                // Sepete git
                const cartLink = page.locator('.shopping_cart_link');
                await cartLink.click();

                // Sepet sayfasında olduğunu doğrula
                await expect(page).toHaveURL(/cart\.html/);

                const cartProductName = await page.locator('.inventory_item_name').textContent();
                const cartProductPrice = await page.locator('.inventory_item_price').textContent();

                // Ürün bilgilerinin aynı olduğunu doğrula
                expect(productName).toBe(cartProductName);
                expect(productPrice).toBe(cartProductPrice);

                // Menüden çıkış yap
                const menuButton = page.locator('.bm-burger-button');
                await menuButton.click();
                await page.waitForTimeout(1000);

                const logoutButton = page.locator('#logout_sidebar_link');
                 logoutButton.click();
            } else {
                // Hata mesajını kontrol et
                const errorMessage = page.locator('[data-test="error"]');
                 await expect(errorMessage).toBeVisible();
                 await expect(errorMessage).toHaveText(
                     'Epic sadface: Username and password do not match any user in this service'
                 );
            }
        }
    });
});

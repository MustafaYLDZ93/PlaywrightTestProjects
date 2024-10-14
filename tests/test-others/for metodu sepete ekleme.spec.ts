import {expect, test} from '@playwright/test';


test.describe('SauceDemo Product Purchase', () => {

    test('Add all products to the cart and verify', async ({ page }) => {
        // Saucedemo giriş sayfasına git
        await page.goto('https://www.saucedemo.com/');

        // Giriş bilgilerini doldur ve giriş yap
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Sayfanın yüklenmesini bekle
        await page.waitForSelector('.inventory_item');

        // Tüm ürünleri sepete ekle
        const addToCartButtons = await page.$$('.inventory_item .btn_primary');
        for (const button of addToCartButtons) {
            await button.click();
            // Her ekleme arasında kısa bir süre bekle
            await page.waitForTimeout(500); // 500 milisaniye bekle
        }

        // Sepete git ve ürünleri doğrula
        await page.click('.shopping_cart_link');
        await page.waitForSelector('.cart_item'); // Sepet öğelerinin yüklenmesini bekle
        const cartItems = await page.$$('.cart_item');

        // Eklenen ürün sayısının doğru olduğunu doğrula
        expect(cartItems.length).toBe(addToCartButtons.length);

        // Ürün isimlerini topla ve doğrula
        const productNames = [];
        for (const item of cartItems) {
            const name = await item.$eval('.inventory_item_name', el => el.textContent);
            productNames.push(name);
        }

        console.log('Sepetteki Ürünler:', productNames);

        // Beklenen ürün isimleri (örnek olarak bazı ürün isimlerini kullanıyoruz)
        const expectedProductNames = [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)'
        ];

        // Sepetteki ürünlerin beklenen ürünlerle eşleştiğini doğrula
        expectedProductNames.forEach(productName => {
            expect(productNames).toContain(productName);
        });
    });

});

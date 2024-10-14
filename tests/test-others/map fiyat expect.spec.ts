import {expect, test} from '@playwright/test';


test.describe('SauceDemo Product Prices', () => {

    test('Verify all product prices are within a specified range', async ({ page }) => {
        // Saucedemo giriş sayfasına git
        await page.goto('https://www.saucedemo.com/');

        // Giriş bilgilerini doldur ve giriş yap
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Sayfanın yüklenmesini bekle
        await page.waitForSelector('.inventory_item');

        // Ürünlerin fiyatlarını al
        const prices = await page.$$eval('.inventory_item', items =>
            items.map(item => item.querySelector('.inventory_item_price').textContent.replace('$', ''))
        );


        // Fiyatların belirli bir aralık içinde olduğunu doğrula
        const minPrice = 5.00; // Minimum fiyat
        const maxPrice = 50.00; // Maksimum fiyat

        let allPricesInRange = true;

        prices.forEach(price => {
            const numericPrice = parseFloat(price);
            if (numericPrice < minPrice || numericPrice > maxPrice) {
                allPricesInRange = false;
                console.error(`Fiyat ${numericPrice} belirtilen aralık dışında.`);
            }
        });

        // Fiyatların aralık içinde olup olmadığını doğrula
        expect(allPricesInRange).toBe(true);

        // Başarılı durum mesajı
        if (allPricesInRange) {
            console.log(`Tüm fiyatlar ${minPrice} ve ${maxPrice} arasında.`);
        }
    });

});
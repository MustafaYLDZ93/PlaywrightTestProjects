import {expect, test} from '@playwright/test';

test('Add to cart and verify with ternary operator', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Kullanıcı adı ve şifreyi tanımla
    const username = 'standard_user';
    const password = 'secret_sauce';

    // Kullanıcı adı ve şifreyi gir
    await page.fill('#user-name', username);
    await page.fill('#password', password);

    // Login butonuna tıkla
    await page.click('#login-button');

    // Login başarılı mı kontrol et
    const isSuccess = await page.isVisible('.inventory_list');
    expect(isSuccess).toBe(true);

    // İlk ürünü sepete ekle
    const addToCartButtonSelector = '.inventory_item:first-of-type .btn_inventory';
    await page.click(addToCartButtonSelector);

    // Sepet simgesinde 1 ürün olduğunu kontrol et
    const cartBadgeSelector = '.shopping_cart_badge';
    const cartBadgeVisible = await page.isVisible(cartBadgeSelector);
    cartBadgeVisible ? await expect(page.locator(cartBadgeSelector)).toHaveText('1') : console.error('Cart badge is not visible');

    // Sepete git
    await page.click('.shopping_cart_link');

    // Sepetteki ürün sayısını kontrol et
    const cartItemSelector = '.cart_item';
    const cartItemVisible = await page.isVisible(cartItemSelector);
    cartItemVisible ? console.log('Product successfully added to the cart') : console.error('No product found in the cart');
});

test('Login test with ternary operator', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Kullanıcı adı ve şifreyi tanımla
    const username = 'standard_user';
    const password = 'secret_sauce';

    // Kullanıcı adı ve şifreyi gir
    await page.fill('#user-name', username);
    await page.fill('#password', password);

    // Login butonuna tıkla
    await page.click('#login-button');

    // Login başarılı mı kontrol et
    const isSuccess = await page.isVisible('.inventory_list');
    expect(isSuccess).toBe(true);

    // Çıkış yap (Logout) butonunu kontrol et
    await page.click('.bm-burger-button');
    const isLogoutVisible = await page.isVisible('#logout_sidebar_link');
    isLogoutVisible ? await page.click('#logout_sidebar_link') : console.error('Logout link is not visible');
});

import { test, expect } from '../fixtures/customFixture';

// Login olmuş sayfa ile inventory kontrolü ve özelleştirilmiş işlemler

test('Saucedemo login fixture ile ürün ekleme, sepet kontrolü ve logout', async ({ loggedInPage, addToCart, logout }) => {
  // 1. Ürünü sepete ekle
  await addToCart(loggedInPage, '#add-to-cart-sauce-labs-backpack');

  // 2. Sepet simgesindeki ürün sayısını kontrol et
  const cartBadge = loggedInPage.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');

  // 3. Logout işlemini gerçekleştir
  await logout(loggedInPage);

  // 4. Logout sonrası login sayfasında olunduğunu doğrula
  await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/');
});

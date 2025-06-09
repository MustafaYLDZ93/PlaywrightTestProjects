import { test, expect } from '../fixtures/pomFixture';

// POM ve custom fixture ile Saucedemo testi

test('POM ile ürün ekleme, sepet kontrolü ve logout', async ({ inventoryPage }) => {
  // 1. Ürünü sepete ekle
  await inventoryPage.addToCart('#add-to-cart-sauce-labs-backpack');

  // 2. Sepet simgesindeki ürün sayısını kontrol et
  const count = await inventoryPage.getCartCount();
  expect(count).toBe(1);

  // 3. Logout işlemini gerçekleştir
  await inventoryPage.logout();

  // 4. Logout sonrası login sayfasında olunduğunu doğrula
  await expect(inventoryPage.getPage()).toHaveURL('https://www.saucedemo.com/');
});

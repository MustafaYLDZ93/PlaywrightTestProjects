import {expect, test} from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.trendyol.com/sr?q=galatasaray&qt=galatasaray&st=galatasaray&prc=225-500&os=1');

    // Sayfanın tamamen yüklenmesini bekleyin
    await page.waitForLoadState('networkidle');

    // Seçilen öğelerin text içeriklerini almak
    const divPriceCurrent = page.locator(".prc-box-dscntd");
    const divNameCurrent = page.locator(".product-desc-sub-text");

    const pricesText = await divPriceCurrent.allTextContents();
    const namesText = await divNameCurrent.allTextContents();

    // Fiyat değerlerini sayısal değerlere dönüştürmek
    const prices = pricesText.map(price => {
        // Fiyat değerlerinden "TL" ve nokta veya virgül gibi gereksiz karakterleri temizlemek
        return parseFloat(price.replace(' TL', '').replace(/\./g, '').replace(',', '.'));
    });

    // Ürün adları ve fiyatları eşleştirmek
    const products = namesText.map((name, index) => ({
        name: name,
        price: prices[index]
    }));

    // Aralığın dışında kalan ürünleri toplamak
    const outOfRangeProducts = products.filter(product => product.price < 0 || product.price > 400);

    // Aralığın dışında kalan ürünleri konsola yazdırmak
    if (outOfRangeProducts.length > 0) {
        console.log('Aralığın dışında kalan ürünler: ');
        outOfRangeProducts.forEach(product => {
            console.log(`Ürün Adı: ${product.name}, Fiyat: ${product.price} TL`);
        });
    }

    // Aralığın dışında kalan ürünleri kontrol etmek
    console.log('Tüm Ürünler ve Fiyatlar: ', products);

    expect(outOfRangeProducts.length).toBe(0);

});

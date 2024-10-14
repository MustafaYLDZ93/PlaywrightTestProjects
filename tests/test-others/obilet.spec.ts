import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(60000); // 60 saniye olarak ayarlandı

    // Siteye git
    await page.goto('https://www.obilet.com/');

    // Nereye searchbox alanına tıklama ve ankara şehrini arama ve tıklama
    await page.getByLabel('Nereye').click();
    await page.getByRole('searchbox', { name: 'İl veya ilçe adı yazın' }).fill('ankara');
    await page.locator('#destination').getByRole('listitem').first().click();

    // Tarih seçme alanına tıklama ve 26 Ağustos tarihini seçme
    await page.locator('.departure.group').click();
    await page.getByRole('button', { name: '26' }).first().click();

    // Otobüs ara butonuna tıklama
    await page.locator('xpath=/html[1]/body[1]/main[1]/div[1]/div[2]/form[1]/button[1]').click()
    await page.waitForTimeout(2000);

    // Bilet fiyatı
    const ticketprice = page.locator("xpath=/html[1]/body[1]/main[1]/ul[1]/li[1]/div[1]/div[4]/div[1]/span[1]/span[1]")
    const ticketpriceassert = await ticketprice.textContent();


    // Koltuk Seç butonuna tıklama
    await page.locator("xpath=/html/body/main/ul/li[1]/div[1]/div[5]/button[1]").click()

    // Sefer detaylarını görüntüleme ve sefer detay bilgileri doğrulama
    await page.getByRole('button', { name: 'Sefer Detayları' }).click();
    await expect(page.locator('#main')).toContainText('- Belirtilen süreler taşıyıcı firma tarafından iletilmektedir. Kalkış ve varış saatleri tahmini olup sefer saatindeki değişikliklerden obilet.com sorumlu değildir.');
    await expect(page.locator('ul').filter({ hasText: 'Özellikler' })).toBeVisible();
    await page.locator('.header > .close').click();

    // Koltuk Seçme
    await expect(page.getByText('Represents a bus seat. 3 2 1')).toBeVisible();
    const Koltuk = page.locator("xpath=/html[1]/body[1]/main[1]/ul[1]/li[1]/div[2]/div[2]/div[2]/div[1]/div[1]/*[name()='svg'][1]/*[name()='a'][37]/*[name()='text'][1]")
    await Koltuk.click()
    const gender = page.locator("xpath=/html[1]/body[1]/main[1]/div[10]/div[1]/button[1]")
    await gender.click()

    // Seçilen koltuk numarası doğrulama
    const seatAssert = page.locator("xpath=/html[1]/body[1]/main[1]/ul[1]/li[1]/div[2]/div[2]/div[2]/div[2]/div[1]/div[1]/ul[1]/li[1]/img[1]")
    const seataltText = await seatAssert.getAttribute('alt');
    expect(seataltText).toBe('33');
    await page.waitForTimeout(1000);

    // Onayla ve devam et butonu
    await page.waitForTimeout(1000);
    const onayla = page.locator("xpath=/html[1]/body[1]/main[1]/ul[1]/li[1]/div[2]/div[2]/div[2]/div[2]/button[1]/span[1]")
    await onayla.click()

    // Tarih ve koltuk numarası doğrulama
    await page.waitForTimeout(1000);
    const date = page.locator("xpath=/html[1]/body[1]/main[1]/form[1]/fieldset[1]/div[2]/table[1]/tbody[1]/tr[4]/td[1]")
    const dateText = await date.textContent();
    expect(dateText.trim()).toBe('26 Ağustos Pazartesi 00:05');
    const seat = page.locator("xpath=/html[1]/body[1]/main[1]/form[1]/fieldset[1]/div[2]/table[1]/tbody[1]/tr[4]/td[2]/div[1]")
    const seatText = await seat.textContent();
    expect(seatText.trim()).toBe(seataltText);

    // Bilet fiyatı doğrulama
    const ticketprice2 = page.locator("xpath=/html[1]/body[1]/main[1]/form[1]/div[1]/fieldset[1]/div[1]/div[1]/div[6]/button[1]/div[2]/div[1]")
    const ticketpriceassert2 = await ticketprice2.textContent();

    try {
        const price1 = ticketpriceassert.trim().match(/\d+(\.\d+)?/)[0]; // İlk metinden sayıyı al
        const price2 = ticketpriceassert2.trim().match(/\d+(\.\d+)?/)[0]; // İkinci metinden sayıyı al

        expect(price1).toBe(price2);
        console.log("Fiyatlar doğru, birbirini tutuyor.");
    } catch (error) {
        console.error("Fiyatlar birbirini tutmuyor:", error);
    }


});
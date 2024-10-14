import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(90000); // 60 saniye olarak ayarlandı

    await page.goto('https://www.emirates.com/tr/turkish/');
    await page.getByRole('button', { name: 'Kabul et' }).click();
    await page.waitForTimeout(1000);

    await page.getByLabel('Uçuşları ara').getByText('Varış havalimanı', { exact: true }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Varış havalimanı' }).type('tokyo', { delay: 100 });

    await page.waitForTimeout(1000);

    await page.getByText('Tokyo Tüm Havaalanları').click();
    await page.waitForTimeout(1000);

    await expect(page.getByRole('heading', { name: ' Lütfen gidiş tarihinizi seç' })).toBeVisible();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Monday, 02 Eylül' }).click();
    await page.getByRole('button', { name: 'Sunday, 08 Eylül' }).click();
    await expect(page.locator('.js-passenger > .dropdown').first()).toBeVisible();

    // Uçuşları ara butonuna tıkladıktan sonra sayfa yönlendirmesi için bekliyoruz
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }), // Sayfanın yüklenmesini bekler
        page.getByRole('button', { name: 'Uçuşları ara' }).click(),
    ]);

    // Devam eden test adımları
    await expect(page.getByRole('heading', { name: 'Rezervasyon yap' })).toBeVisible();
    await page.locator('#option-0-1-0').click();
    await page.getByRole('link', { name: 'Seç  FLEX USD' }).click();
    await page.locator('#option-1-1-0').click();
    await page.getByRole('link', { name: 'Seç  FLEXPLUS USD' }).click();
    await page.getByRole('link', { name: 'Güncelleme var Özeti görüntüle' }).click();
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_divSearchResults')).toContainText('02 Eyl 24');
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_divSearchResults')).toContainText('08 Eyl 24');
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_divSearchResults')).toContainText('Kalkış IST İstanbul Havalimanı 23:20');
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_divSearchResults')).toContainText('Varış NRTTokyo Narita 17:35 +2 daydays');
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_divSearchResults')).toContainText('Kalkış NRT Tokyo Narita 22:30');
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_divSearchResults')).toContainText('Varış ISTİstanbul Havalimanı 14:25 +1 daydays');
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_divSearchResults')).toContainText('Economy Class Flex');
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_divSearchResults')).toContainText('Economy Class Flex Plus');
    await expect(page.locator('#ctl00_c_SummaryContainer_SummaryBox_strongTotal')).toContainText('USD 2.207,44');
    await expect(page.locator('#totalFlightsSBSC')).toContainText('Toplam Tutar:USD 2.207,44');
    await page.getByRole('link', { name: 'Uçuş bilgilerinizi görün' }).click();
    await expect(page.getByRole('heading', { name: 'Uçuş bilgileri' })).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText('Kalkış IST İstanbul Havalimanı');
    await expect(page.locator('#ctl00_c_SummaryContainer_dvShopingCart p').filter({ hasText: 'Uçuş numarası EK118' }).locator('span')).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText('Uçak tipi');
    await expect(page.getByRole('dialog')).toContainText('Uçuş numarası');
    await expect(page.getByRole('dialog')).toContainText('EK118');
});

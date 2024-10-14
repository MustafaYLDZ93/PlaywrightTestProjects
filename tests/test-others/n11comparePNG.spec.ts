import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { PNG } from 'pngjs';

test('hover over imgHolder and compare screenshots', async ({ page }) => {
    // n11 bilgisayar oyun ve yazılım sayfasına gidin
    await page.goto('https://www.n11.com/bilgisayar/oyun-ve-yazilim?ipg=2');

    // Sayfayı 300 piksel aşağı kaydır
    await page.evaluate(() => window.scrollBy(0, 300));

    // .imgHolder.cargoCampaign sınıfına sahip tüm öğeleri bulun
    const imgHolders = await page.$$('.imgHolder.cargoCampaign');

    if (imgHolders.length === 0) {
        throw new Error('No imgHolder elements found');
    }

    // İlk öğeyi seçin (veya ihtiyaca göre uygun öğeyi seçin)
    const imgHolder = imgHolders[0];

    // Get the bounding box of the imgHolder element
    const boundingBox = await imgHolder.boundingBox();

    if (!boundingBox) {
        throw new Error('Bounding box not found');
    }

    // Calculate positions for left, middle, and right
    const left = { x: boundingBox.x + 5, y: boundingBox.y + boundingBox.height / 2 };
    const middle = { x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y + boundingBox.height / 2 };
    const right = { x: boundingBox.x + boundingBox.width - 5, y: boundingBox.y + boundingBox.height / 2 };

    // Function to get the image source attribute from the data-images attribute and take a screenshot
    const takeScreenshot = async (position: { x: number; y: number; }, filePath: string) => {
        // Move the mouse to the given position
        await page.mouse.move(position.x, position.y);

        // Wait for the image to be visible
        const img = await page.waitForSelector('.imgHolder.cargoCampaign img', { state: 'visible', timeout: 10000 });

        if (!img) throw new Error('Image element not found');

        // Capture a screenshot of only the bounding box area
        await page.screenshot({
            path: filePath,
            clip: {
                x: Math.floor(boundingBox.x),
                y: Math.floor(boundingBox.y),
                width: Math.floor(boundingBox.width),
                height: Math.floor(boundingBox.height)
            }
        });
    };

    // Take screenshots at different positions
    await takeScreenshot(left, 'left.png');
    await takeScreenshot(middle, 'middle.png');
    await takeScreenshot(right, 'right.png');

    // Dynamically import pixelmatch
    // @ts-ignore
    const { default: pixelmatch } = await import('pixelmatch');

    // Compare screenshots
    const compareScreenshots = (filePath1: string, filePath2: string) => {
        const img1 = PNG.sync.read(fs.readFileSync(filePath1));
        const img2 = PNG.sync.read(fs.readFileSync(filePath2));
        const { width, height } = img1;
        const diff = new PNG({ width, height });

        const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        return numDiffPixels;
    };

    const leftVsMiddle = compareScreenshots('left.png', 'middle.png');
    const middleVsRight = compareScreenshots('middle.png', 'right.png');
    const leftVsRight = compareScreenshots('left.png', 'right.png');
    // Check that there are differences between the screenshots
    expect(leftVsMiddle).not.toBe(0);
    expect(middleVsRight).not.toBe(0);
    expect(leftVsRight).not.toBe(0);
});

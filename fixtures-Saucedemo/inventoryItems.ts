export interface InventoryItem {
    name: string;
    price: string;
    dataTest: string;
}

export const inventoryItems: InventoryItem[] = [
    {
        name: 'Sauce Labs Backpack',
        price: '$29.99',
        dataTest: 'inventory-item-sauce-labs-backpack-img',
    },
    {
        name: 'Sauce Labs Bike Light',
        price: '$9.99',
        dataTest: 'inventory-item-sauce-labs-bike-light-img',
    },
    {
        name: 'Sauce Labs Bolt T-Shirt',
        price: '$15.99',
        dataTest: 'inventory-item-sauce-labs-bolt-t-shirt-img',
    },
    {
        name: 'Sauce Labs Fleece Jacket',
        price: '$49.99',
        dataTest: 'inventory-item-sauce-labs-fleece-jacket-img',
    },
    {
        name: 'Sauce Labs Onesie',
        price: '$7.99',
        dataTest: 'inventory-item-sauce-labs-onesie-img',
    },
    {
        name: 'Test.allTheThings() T-Shirt (Red)',
        price: '$15.99',
        dataTest: 'inventory-item-test.allthethings()-t-shirt-(red)-img',
    }
];


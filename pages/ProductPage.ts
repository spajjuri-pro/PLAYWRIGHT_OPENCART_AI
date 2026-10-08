import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly price: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly successAlert: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { level: 1 });
        this.price = page.locator('.price-new');
        this.quantityInput = page.locator('#input-quantity');
        this.addToCartButton = page.locator('#button-cart');
        this.successAlert = page.locator('#alert .alert-success');
        this.cartLink = page.locator('a[title="Shopping Cart"]');
    }

    /**
     * Verifies the product details page is displayed for the given product
     * @param productName - Expected product name
     * @returns Promise<boolean> - true if the product heading and Add to Cart button are visible
     */
    async isProductPageExists(productName: string): Promise<boolean> {
        try {
            await this.heading.filter({ hasText: productName }).waitFor({ state: 'visible' });
            await this.addToCartButton.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the displayed product price
     * @returns Promise<string> - price text, e.g. "$602.00"
     */
    async getPrice(): Promise<string> {
        return ((await this.price.textContent()) ?? '').trim();
    }

    /**
     * Sets the quantity to purchase
     * @param quantity - Quantity to enter
     */
    async setQuantity(quantity: number): Promise<void> {
        await this.quantityInput.fill(String(quantity));
    }

    /**
     * Clicks "Add to Cart"
     */
    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Gets the product-added success message
     * @returns Promise<string> - success message text
     */
    async getSuccessMessage(): Promise<string> {
        await this.successAlert.waitFor({ state: 'visible' });
        return ((await this.successAlert.textContent()) ?? '').trim();
    }

    /**
     * Opens the shopping cart from the header
     */
    async clickCart(): Promise<void> {
        await this.cartLink.click();
    }
}

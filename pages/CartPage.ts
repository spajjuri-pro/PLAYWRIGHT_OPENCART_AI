import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly cartRows: Locator;
    private readonly totalRow: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { name: 'Shopping Cart', level: 1 });
        this.cartRows = page.locator('#shopping-cart table tbody tr');
        this.totalRow = page.locator('#shopping-cart table tfoot tr', { hasText: /^\s*Total/ });
    }

    /**
     * Verifies the Shopping Cart page is displayed
     * @returns Promise<boolean> - true if the page heading is visible
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            await this.heading.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking cart page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the cart row for the product with the given name
     * @param productName - Product name
     */
    private rowFor(productName: string): Locator {
        return this.cartRows.filter({ has: this.page.getByRole('link', { name: productName, exact: true }) });
    }

    /**
     * Verifies the product is present in the cart
     * @param productName - Product name
     * @returns Promise<boolean> - true if the product row is visible
     */
    async isProductInCart(productName: string): Promise<boolean> {
        try {
            await this.rowFor(productName).waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking product in cart: ${error}`);
            return false;
        }
    }

    /**
     * Gets the quantity of the product in the cart
     * @param productName - Product name
     * @returns Promise<number> - quantity
     */
    async getQuantity(productName: string): Promise<number> {
        return Number(await this.rowFor(productName).locator('input[name="quantity"]').inputValue());
    }

    /**
     * Gets the unit price of the product in the cart
     * @param productName - Product name
     * @returns Promise<string> - unit price text, e.g. "$602.00"
     */
    async getUnitPrice(productName: string): Promise<string> {
        const cells = this.rowFor(productName).locator('td');
        return ((await cells.nth(4).textContent()) ?? '').trim();
    }

    /**
     * Gets the cart grand total
     * @returns Promise<string> - total text, e.g. "$602.00"
     */
    async getCartTotal(): Promise<string> {
        const cells = this.totalRow.locator('td');
        return ((await cells.last().textContent()) ?? '').trim();
    }
}

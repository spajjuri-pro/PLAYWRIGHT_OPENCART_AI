import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly productTitleLinks: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { level: 1 });
        this.productTitleLinks = page.locator('.product-thumb h4 a');
    }

    /**
     * Verifies the search results page is displayed for the given search text
     * @param searchText - Text that was searched for
     * @returns Promise<boolean> - true if the results heading is visible
     */
    async isSearchResultsPageExists(searchText: string): Promise<boolean> {
        try {
            await this.heading.filter({ hasText: `Search - ${searchText}` }).waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

    /**
     * Verifies a product with the exact name is listed in the results
     * @param productName - Exact product name
     * @returns Promise<boolean> - true if the product title is visible
     */
    async isProductDisplayed(productName: string): Promise<boolean> {
        try {
            await this.productTitleLinks.getByText(productName, { exact: true }).waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking product in results: ${error}`);
            return false;
        }
    }

    /**
     * Gets the names of all products listed in the results
     * @returns Promise<string[]> - displayed product names
     */
    async getProductNames(): Promise<string[]> {
        await this.productTitleLinks.first().waitFor({ state: 'visible' });
        return (await this.productTitleLinks.allTextContents()).map((name) => name.trim());
    }

    /**
     * Opens the product details page for the product with the exact name
     * @param productName - Exact product name
     */
    async openProduct(productName: string): Promise<void> {
        await this.productTitleLinks.getByText(productName, { exact: true }).click();
    }
}

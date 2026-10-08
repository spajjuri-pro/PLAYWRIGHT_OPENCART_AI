import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly myAccountToggle: Locator;
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.myAccountToggle = page.locator('#top .float-end a.dropdown-toggle');
        this.registerLink = page.locator('#top a.dropdown-item[href*="route=account/register"]');
        this.loginLink = page.locator('#top a.dropdown-item[href*="route=account/login"]');
        this.searchInput = page.locator('#search input[name="search"]');
        this.searchButton = page.locator('#search button');
    }

    /**
     * Searches for a product using the main search field
     * @param productName - Text to search for
     */
    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    /**
     * Opens the "My Account" dropdown in the header
     */
    async clickMyAccount(): Promise<void> {
        await this.myAccountToggle.click();
    }

    /**
     * Clicks "Register" inside the open "My Account" dropdown
     */
    async clickRegister(): Promise<void> {
        await this.registerLink.click();
    }

    /**
     * Clicks "Login" inside the open "My Account" dropdown
     */
    async clickLogin(): Promise<void> {
        await this.loginLink.click();
    }

    /**
     * Verifies the "My Account" dropdown shows unauthenticated options (Login/Register)
     * @returns Promise<boolean> - true if Login and Register links are visible
     */
    async isLoggedOut(): Promise<boolean> {
        try {
            await this.myAccountToggle.click();
            await this.loginLink.waitFor({ state: 'visible' });
            await this.registerLink.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking logged-out state: ${error}`);
            return false;
        }
    }
}

import { Page, Locator } from '@playwright/test';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly continueLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { name: 'Account Logout', level: 1 });
        this.continueLink = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the logout confirmation page is displayed
     * @returns Promise<boolean> - true if the logout confirmation heading is visible
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            await this.heading.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking logout confirmation page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks "Continue" to return to the homepage
     */
    async clickContinue(): Promise<void> {
        await this.continueLink.click();
        await this.page.waitForURL(/route=common\/home/);
    }
}

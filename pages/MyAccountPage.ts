import { Page, Locator } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { name: 'My Account', level: 2 });
        this.logoutLink = page.locator('a.list-group-item[href*="route=account/logout"]');
    }

    /**
     * Verifies the My Account dashboard page is displayed
     * @returns Promise<boolean> - true if the dashboard heading is visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.heading.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking My Account page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the "Logout" link from the account navigation
     */
    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }
}

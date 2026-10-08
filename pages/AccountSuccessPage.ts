import { Page, Locator } from '@playwright/test';

export class AccountSuccessPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly continueLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });
        this.continueLink = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the account-created confirmation is displayed
     * @returns Promise<boolean> - true if the confirmation heading is visible
     */
    async isAccountCreated(): Promise<boolean> {
        try {
            await this.heading.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking account-created confirmation: ${error}`);
            return false;
        }
    }

    /**
     * Clicks "Continue" to navigate to the My Account dashboard
     */
    async clickContinue(): Promise<void> {
        await this.continueLink.click();
    }
}

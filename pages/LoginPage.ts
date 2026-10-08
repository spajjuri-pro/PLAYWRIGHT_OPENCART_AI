import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly warningMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { name: 'Returning Customer', level: 2 });
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.warningMessage = page.locator('.alert-danger');
    }

    /**
     * Verifies the Account Login page is displayed
     * @returns Promise<boolean> - true if the page heading is visible
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            await this.heading.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }

    /**
     * Enters credentials and submits the login form
     * @param email - Customer email
     * @param password - Customer password
     */
    async login(email: string, password: string): Promise<void> {
        try {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        } catch (error) {
            console.log(`Error submitting login form: ${error}`);
            throw error;
        }
    }

    /**
     * Gets the login warning/error message text
     * @returns Promise<string> - the warning message text
     */
    async getWarningMessage(): Promise<string> {
        return (await this.warningMessage.textContent())?.trim() ?? '';
    }
}

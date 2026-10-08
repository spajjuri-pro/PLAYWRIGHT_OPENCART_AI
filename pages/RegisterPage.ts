import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { name: 'Register Account', level: 1 });
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    /**
     * Verifies the Register Account page is displayed
     * @returns Promise<boolean> - true if the page heading is visible
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            await this.heading.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }

    /**
     * Fills the registration form, accepts the privacy policy, and submits it.
     * Note: this OpenCart version's register form has a single Password field
     * (no Confirm Password field exists in the live DOM).
     * @param firstName - Customer first name
     * @param lastName - Customer last name
     * @param email - Unique customer email
     * @param password - Customer password
     */
    async register(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        try {
            await this.firstNameInput.fill(firstName);
            await this.lastNameInput.fill(lastName);
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.privacyPolicyCheckbox.check();
            await this.continueButton.click();
        } catch (error) {
            console.log(`Error completing registration: ${error}`);
            throw error;
        }
    }
}

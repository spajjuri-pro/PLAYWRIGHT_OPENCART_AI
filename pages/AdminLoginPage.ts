import { Page, Locator } from '@playwright/test';

export class AdminLoginPage {
    private readonly page: Page;

    // Locators
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly dashboardHeading: Locator;
    private readonly securityModal: Locator;
    private readonly securityModalClose: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.usernameInput = page.locator('#input-username');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', level: 1 });
        this.securityModal = page.locator('#modal-security');
        this.securityModalClose = page.locator('#modal-security .btn-close');
    }

    /**
     * Opens the Admin Portal login page
     * @param adminUrl - Admin Portal URL
     */
    async open(adminUrl: string): Promise<void> {
        await this.page.goto(adminUrl);
    }

    /**
     * Enters administrator credentials and submits the login form
     * @param username - Admin username
     * @param password - Admin password
     */
    async login(username: string, password: string): Promise<void> {
        try {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        } catch (error) {
            console.log(`Error submitting admin login form: ${error}`);
            throw error;
        }
    }

    /**
     * Verifies the admin dashboard is displayed after login
     * @returns Promise<boolean> - true if the Dashboard heading is visible
     */
    async isDashboardDisplayed(): Promise<boolean> {
        try {
            await this.dashboardHeading.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking admin dashboard: ${error}`);
            return false;
        }
    }

    /**
     * Closes the "Important Security Notification" modal when OpenCart shows it after login.
     * The modal is optional, so a short bounded wait is used and its absence is not an error.
     */
    async closeSecurityNotification(): Promise<void> {
        try {
            await this.securityModal.waitFor({ state: 'visible', timeout: 5000 });
            await this.securityModalClose.click();
            await this.securityModal.waitFor({ state: 'hidden' });
        } catch (error) {
            console.log('Security notification not displayed, continuing');
        }
    }
}

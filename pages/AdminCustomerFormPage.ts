import { Page, Locator } from '@playwright/test';

export class AdminCustomerFormPage {
    private readonly page: Page;

    // Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly statusToggle: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.statusToggle = page.locator('#input-status');
    }

    /**
     * Gets the first name shown on the customer form
     * @returns Promise<string> - first name
     */
    async getFirstName(): Promise<string> {
        return await this.firstNameInput.inputValue();
    }

    /**
     * Gets the last name shown on the customer form
     * @returns Promise<string> - last name
     */
    async getLastName(): Promise<string> {
        return await this.lastNameInput.inputValue();
    }

    /**
     * Gets the email shown on the customer form
     * @returns Promise<string> - email
     */
    async getEmail(): Promise<string> {
        return await this.emailInput.inputValue();
    }

    /**
     * Checks whether the customer status is enabled
     * @returns Promise<boolean> - true if the status toggle is on
     */
    async isStatusEnabled(): Promise<boolean> {
        return await this.statusToggle.isChecked();
    }
}

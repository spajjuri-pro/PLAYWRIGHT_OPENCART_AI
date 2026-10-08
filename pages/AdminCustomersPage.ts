import { Page, Locator } from '@playwright/test';

export class AdminCustomersPage {
    private readonly page: Page;

    // Locators
    private readonly customersMenu: Locator;
    private readonly customersSubMenu: Locator;
    private readonly heading: Locator;
    private readonly emailFilterInput: Locator;
    private readonly filterButton: Locator;
    private readonly customerRows: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.customersMenu = page.locator('#menu-customer > a');
        this.customersSubMenu = page.locator('#menu-customer a[href*="route=customer/customer&"]');
        this.heading = page.getByRole('heading', { name: 'Customers', level: 1 });
        this.emailFilterInput = page.locator('#input-email');
        this.filterButton = page.locator('#button-filter');
        this.customerRows = page.locator('#customer tbody tr');
    }

    /**
     * Opens Customers > Customers from the admin side menu
     */
    async openCustomers(): Promise<void> {
        await this.customersMenu.click();
        await this.customersSubMenu.click();
    }

    /**
     * Verifies the Customers list page is displayed
     * @returns Promise<boolean> - true if the Customers heading is visible
     */
    async isCustomersPageExists(): Promise<boolean> {
        try {
            await this.heading.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking customers page: ${error}`);
            return false;
        }
    }

    /**
     * Filters the customer list by email address
     * @param email - Customer email
     */
    async filterByEmail(email: string): Promise<void> {
        await this.emailFilterInput.fill(email);
        await this.filterButton.click();
    }

    /**
     * Gets the list row for the customer with the given email
     * @param email - Customer email
     */
    private rowFor(email: string): Locator {
        return this.customerRows.filter({ hasText: email });
    }

    /**
     * Verifies a customer with the email is listed
     * @param email - Customer email
     * @returns Promise<boolean> - true if the customer row is visible
     */
    async isCustomerListed(email: string): Promise<boolean> {
        try {
            await this.rowFor(email).waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking customer in list: ${error}`);
            return false;
        }
    }

    /**
     * Gets the number of rows currently listed
     * @returns Promise<number> - row count
     */
    async getListedCustomerCount(): Promise<number> {
        return await this.customerRows.count();
    }

    /**
     * Gets the status text ("Enabled" / "Disabled") shown in the list row
     * @param email - Customer email
     * @returns Promise<string> - row text containing the status
     */
    async getRowText(email: string): Promise<string> {
        return ((await this.rowFor(email).innerText()) ?? '').replace(/\s+/g, ' ').trim();
    }

    /**
     * Opens the customer edit form from the list row
     * @param email - Customer email
     */
    async openCustomer(email: string): Promise<void> {
        await this.rowFor(email).locator('a[href*="customer.form"]').click();
    }
}

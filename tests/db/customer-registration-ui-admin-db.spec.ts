/**
 * Test Case: Customer registration validated across Frontend UI, Admin Portal and MySQL
 *
 * Tags: @master @end-to-end @db
 *
 * Steps:
 * 1) Register a new customer through the frontend using unique generated data
 * 2) Login to the Admin Portal and verify the customer in Customers
 * 3) Query the oc_customer table and verify the customer record
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { executeQuery } from '../../utils/dbClient';
import dotenv from 'dotenv';

dotenv.config();

test('Customer registration UI + Admin + DB validation test @master @end-to-end @db', async ({
    homePage,
    registerPage,
    accountSuccessPage,
    adminLoginPage,
    adminCustomersPage,
    adminCustomerFormPage,
}) => {
    const ADMIN_URL = process.env.ADMIN_APP_URL ?? '';
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? '';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';
    const EXPECTED_STATUS = 1; // newly registered customers are enabled

    // Generated once and reused in every layer
    const customer = {
        firstName: RandomDataUtil.getFirstName(),
        lastName: RandomDataUtil.getLastName(),
        email: RandomDataUtil.getEmail(),
        password: RandomDataUtil.getPassword(),
    };

    await test.step('1) Register a new customer through the frontend', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        expect(await registerPage.isRegisterPageExists(), 'Registration page should be displayed').toBeTruthy();

        await registerPage.register(customer.firstName, customer.lastName, customer.email, customer.password);
        expect(await accountSuccessPage.isAccountCreated(), 'Account-created confirmation should be displayed').toBeTruthy();
    });

    await test.step('2) Verify the customer in the Admin Portal', async () => {
        await adminLoginPage.open(ADMIN_URL);
        await adminLoginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
        expect(await adminLoginPage.isDashboardDisplayed(), 'Admin dashboard should be displayed after login').toBeTruthy();
        await adminLoginPage.closeSecurityNotification();

        await adminCustomersPage.openCustomers();
        expect(await adminCustomersPage.isCustomersPageExists(), 'Customers page should be displayed').toBeTruthy();

        await adminCustomersPage.filterByEmail(customer.email);
        expect(await adminCustomersPage.isCustomerListed(customer.email), `Customer ${customer.email} should be listed in Admin`).toBeTruthy();
        await expect
            .poll(() => adminCustomersPage.getListedCustomerCount(), { message: 'Exactly one customer should match the unique email' })
            .toBe(1);
        expect(await adminCustomersPage.getRowText(customer.email), 'Customer status should be Enabled in the list').toContain('Enabled');

        await adminCustomersPage.openCustomer(customer.email);
        expect(await adminCustomerFormPage.getFirstName(), 'Admin first name should match').toBe(customer.firstName);
        expect(await adminCustomerFormPage.getLastName(), 'Admin last name should match').toBe(customer.lastName);
        expect(await adminCustomerFormPage.getEmail(), 'Admin email should match').toBe(customer.email);
        expect(await adminCustomerFormPage.isStatusEnabled(), 'Admin customer status should be enabled').toBeTruthy();
    });

    await test.step('3) Verify the customer in MySQL (oc_customer)', async () => {
        const [rows] = (await executeQuery(
            'SELECT firstname, lastname, email, status, date_added FROM oc_customer WHERE email = ?',
            [customer.email],
        )) as unknown as [Array<Record<string, any>>, unknown];

        expect(rows.length, `Exactly one oc_customer row should exist for ${customer.email}`).toBe(1);
        expect(rows[0].firstname, 'DB firstname should match').toBe(customer.firstName);
        expect(rows[0].lastname, 'DB lastname should match').toBe(customer.lastName);
        expect(rows[0].email, 'DB email should match').toBe(customer.email);
        expect(rows[0].status, 'DB status should match the expected registration status').toBe(EXPECTED_STATUS);
        expect(rows[0].date_added, 'DB date_added should exist').toBeTruthy();
    });

    console.log('✅ ✔️ Completed successfully!');
});

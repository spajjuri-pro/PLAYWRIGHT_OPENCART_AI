/**
 * Test Case: Login Flow (Data Driven using external file)
 *
 * Tags: @master @datadriven @web
 *
 * Steps:
 * 1) Load login rows from testdata/opencart_logindata.json (one test per row)
 * 2) Navigate to the login page and submit the row's email/password (blank values stay blank)
 * 3) Validate the result against the row's expected value (success / failure)
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';

type LoginRow = {
    testName?: string;
    TestName?: string;
    email: string;
    password: string;
    expected: 'success' | 'failure';
};

const loginRows: LoginRow[] = DataProvider.readJson('./testdata/opencart_logindata.json');

loginRows.forEach((row, index) => {
    const testName = row.testName ?? row.TestName ?? 'Login';
    const email = (row.email ?? '').trim();
    const password = (row.password ?? '').trim();

    test(`${testName} #${index + 1} [${row.expected}] @master @datadriven @web`, async ({ homePage, loginPage, myAccountPage }) => {
        await test.step('1) Navigate to the login page', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
            expect(await loginPage.isLoginPageExists()).toBeTruthy();
        });

        await test.step('2) Submit the login form', async () => {
            await loginPage.login(email, password);
        });

        await test.step(`3) Validate the ${row.expected} result`, async () => {
            if (row.expected === 'success') {
                expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
            } else {
                expect(await loginPage.getWarningMessage()).toContain('Warning: No match for E-Mail Address and/or Password.');
                expect(await loginPage.isLoginPageExists()).toBeTruthy(); // still on the login page, not authenticated
            }
        });

        console.log('✅ ✔️ Completed successfully!');
    });
});

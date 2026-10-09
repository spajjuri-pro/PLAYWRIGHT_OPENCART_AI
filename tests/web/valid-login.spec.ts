/**
 * Test Case: Valid Login flow
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Navigate to My Account > Login
 * 2) Enter valid credentials from the project's configured test data and submit
 * 3) Verify the user is redirected to the My Account dashboard
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Valid login test @master @sanity @web', async ({ homePage, loginPage, myAccountPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Navigate to the login page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        const isLoginPageDisplayed = await loginPage.isLoginPageExists();
        expect(isLoginPageDisplayed).toBeTruthy();
    });

    await test.step('2) Login with valid credentials', async () => {
        await loginPage.login(email, password);
    });

    await test.step('3) Verify the user is redirected to the My Account dashboard', async () => {
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();
    });

    console.log('✅ ✔️ Completed successfully!');
});

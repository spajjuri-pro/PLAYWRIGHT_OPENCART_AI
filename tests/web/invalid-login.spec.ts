/**
 * Test Case: Invalid Login flow
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Navigate to My Account > Login
 * 2) Submit the login form with invalid credentials
 * 3) Verify the warning message and that the customer is not authenticated
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Invalid login test @master @sanity @web', async ({ homePage, loginPage }) => {
    const invalidEmail = RandomDataUtil.getEmail();
    const invalidPassword = RandomDataUtil.getPassword();

    await test.step('1) Navigate to the login page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        const isLoginPageDisplayed = await loginPage.isLoginPageExists();
        expect(isLoginPageDisplayed).toBeTruthy();
    });

    await test.step('2) Submit the login form with an invalid email and password', async () => {
        await loginPage.login(invalidEmail, invalidPassword);
    });

    await test.step('3) Verify the warning message and that the customer is not authenticated', async () => {
        const warningMessage = await loginPage.getWarningMessage();
        expect(warningMessage).toContain('Warning: No match for E-Mail Address and/or Password.');

        const isLoginPageStillDisplayed = await loginPage.isLoginPageExists();
        expect(isLoginPageStillDisplayed).toBeTruthy();
    });

    console.log('✅ ✔️ Completed successfully!');
});

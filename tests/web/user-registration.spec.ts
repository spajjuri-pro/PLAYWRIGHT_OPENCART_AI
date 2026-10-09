/**
 * Test Case: User Registration flow
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Navigate to My Account > Register
 * 2) Fill the registration form with unique customer data and submit
 * 3) Verify the account-created confirmation message
 * 4) Verify the newly created account is available through account navigation
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User registration test @master @sanity @web', async ({ homePage, registerPage, accountSuccessPage, myAccountPage }) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const password = RandomDataUtil.getPassword();

    await test.step('1) Navigate to the registration page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        const isRegisterPageDisplayed = await registerPage.isRegisterPageExists();
        expect(isRegisterPageDisplayed).toBeTruthy();
    });

    await test.step('2) Enter valid registration details, accept the privacy policy and submit', async () => {
        await registerPage.register(firstName, lastName, email, password);
    });

    await test.step('3) Verify the account-created confirmation message', async () => {
        const isAccountCreated = await accountSuccessPage.isAccountCreated();
        expect(isAccountCreated).toBeTruthy();
    });

    await test.step('4) Verify the newly created account is available through account navigation', async () => {
        await accountSuccessPage.clickContinue();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();
    });

    console.log('✅ ✔️ Completed successfully!');
});

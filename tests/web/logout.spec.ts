/**
 * Test Case: Logout flow
 *
 * Tags: @master @sanity
 *
 * Steps:
 * 1) Login using valid customer credentials
 * 2) Logout from the account and verify the logout confirmation page
 * 3) Continue to the homepage and verify authenticated options are no longer available
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Logout test @master @sanity', async ({ homePage, loginPage, myAccountPage, logoutPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Login using valid customer credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.login(email, password);
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();
    });

    await test.step('2) Logout from the account', async () => {
        await myAccountPage.clickLogout();
        const isLogoutPageDisplayed = await logoutPage.isLogoutPageExists();
        expect(isLogoutPageDisplayed).toBeTruthy();
    });

    await test.step('3) Continue to the homepage and verify authenticated options are no longer available', async () => {
        await logoutPage.clickContinue();
        const isLoggedOut = await homePage.isLoggedOut();
        expect(isLoggedOut).toBeTruthy();
    });

    console.log('✅ ✔️ Completed successfully!');
});

/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @regression @end-to-end @web
 *
 * Steps:
 * 1) Register a new customer with unique data
 * 2) Logout
 * 3) Login again with the newly created credentials
 * 4) Search for a known product, open it and add it to the cart
 * 5) Open the cart and verify product, quantity, price and total
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-end shopping flow test @master @regression @end-to-end @web', async ({
    homePage,
    registerPage,
    accountSuccessPage,
    loginPage,
    myAccountPage,
    logoutPage,
    searchResultsPage,
    productPage,
    cartPage,
}) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const password = RandomDataUtil.getPassword();
    const { name, quantity, price } = Helper.getProductDetails();

    await test.step('1) Register a new customer', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        expect(await registerPage.isRegisterPageExists()).toBeTruthy();
        await registerPage.register(firstName, lastName, email, password);
        expect(await accountSuccessPage.isAccountCreated()).toBeTruthy();
        await accountSuccessPage.clickContinue();
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('2) Logout', async () => {
        await myAccountPage.clickLogout();
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
        await logoutPage.clickContinue();
        expect(await homePage.isLoggedOut()).toBeTruthy();
    });

    await test.step('3) Login with the newly created credentials', async () => {
        await homePage.clickLogin();
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
        await loginPage.login(email, password);
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('4) Search for the product and add it to the cart', async () => {
        await homePage.searchProduct(name);
        expect(await searchResultsPage.isProductDisplayed(name)).toBeTruthy();
        await searchResultsPage.openProduct(name);
        expect(await productPage.isProductPageExists(name)).toBeTruthy();
        await productPage.setQuantity(quantity);
        await productPage.clickAddToCart();
        expect(await productPage.getSuccessMessage()).toContain(`Success: You have added ${name} to your shopping cart!`);
    });

    await test.step('5) Verify the cart contents', async () => {
        await productPage.clickCart();
        expect(await cartPage.isCartPageExists()).toBeTruthy();
        expect(await cartPage.isProductInCart(name)).toBeTruthy();
        expect(await cartPage.getQuantity(name)).toBe(quantity);
        expect(await cartPage.getUnitPrice(name)).toBe(price);
        expect(Helper.convertPriceToNumber(await cartPage.getCartTotal())).toBe(
            Helper.convertPriceToNumber(price) * quantity,
        );
    });

    console.log('✅ ✔️ Completed successfully!');
});

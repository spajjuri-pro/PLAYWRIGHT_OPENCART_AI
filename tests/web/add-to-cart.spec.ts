/**
 * Test Case: Add Product to Cart
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Search for a known product and open its details page
 * 2) Set the quantity and add the product to the cart
 * 3) Verify the product-added success message
 * 4) Open the cart and verify the product and quantity
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Add product to cart test @master @sanity @web', async ({ homePage, searchResultsPage, productPage, cartPage }) => {
    const { name, quantity } = Helper.getProductDetails();

    await test.step('1) Search for the product and open its details page', async () => {
        await homePage.searchProduct(name);
        await searchResultsPage.openProduct(name);
        const isProductPageDisplayed = await productPage.isProductPageExists(name);
        expect(isProductPageDisplayed).toBeTruthy();
    });

    await test.step('2) Set the quantity and add the product to the cart', async () => {
        await productPage.setQuantity(quantity);
        await productPage.clickAddToCart();
    });

    await test.step('3) Verify the product-added success message', async () => {
        const message = await productPage.getSuccessMessage();
        expect(message).toContain(`Success: You have added ${name} to your shopping cart!`);
    });

    await test.step('4) Open the cart and verify the product and quantity', async () => {
        await productPage.clickCart();
        const isCartPageDisplayed = await cartPage.isCartPageExists();
        expect(isCartPageDisplayed).toBeTruthy();
        const isProductInCart = await cartPage.isProductInCart(name);
        expect(isProductInCart).toBeTruthy();
        expect(await cartPage.getQuantity(name)).toBe(quantity);
    });

    console.log('✅ ✔️ Completed successfully!');
});

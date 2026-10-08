/**
 * Test Case: Product Search flow
 *
 * Tags: @master @sanity
 *
 * Steps:
 * 1) Search for a known product from the homepage
 * 2) Verify the search results page is displayed
 * 3) Verify the expected product appears in the results
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Product search test @master @sanity', async ({ homePage, searchResultsPage }) => {
    const { name } = Helper.getProductDetails();

    await test.step('1) Search for a known product', async () => {
        await homePage.searchProduct(name);
    });

    await test.step('2) Verify the search results page is displayed', async () => {
        const isResultsPageDisplayed = await searchResultsPage.isSearchResultsPageExists(name);
        expect(isResultsPageDisplayed).toBeTruthy();
    });

    await test.step('3) Verify the expected product appears in the results', async () => {
        const isProductDisplayed = await searchResultsPage.isProductDisplayed(name);
        expect(isProductDisplayed).toBeTruthy();
        const productNames = await searchResultsPage.getProductNames();
        expect(productNames).toContain(name);
        productNames.forEach((productName) => expect(productName).toContain(name));
    });

    console.log('✅ ✔️ Completed successfully!');
});

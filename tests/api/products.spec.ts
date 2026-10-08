import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Products API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);
    const CATEGORY = 'electronics';

    // Checks the important fields of one product
    function expectValidProduct(product: any) {
        expect(typeof product.id, 'Product id should be a number').toBe('number');
        expect(typeof product.title, 'Product title should be a string').toBe('string');
        expect(typeof product.price, 'Product price should be a number').toBe('number');
        expect(typeof product.category, 'Product category should be a string').toBe('string');
        expect(typeof product.image, 'Product image should be a string').toBe('string');
    }

    // ---------------------------------------------------------
    // GET
    // ---------------------------------------------------------

    test('GET - All Products @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);

        expect(response.status(), 'Get all products should return 200').toBe(200);

        const products = await response.json();

        expect(Array.isArray(products), 'Response should be an array').toBeTruthy();
        expect(products.length, 'Product list should not be empty').toBeGreaterThan(0);
        products.forEach(expectValidProduct);
    });

    test('GET - Product by ID @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status(), 'Get product by id should return 200').toBe(200);

        const product = await response.json();

        expect(product.id, 'Returned id should match the requested id').toBe(PRODUCT_ID);
        expectValidProduct(product);
    });

    test('GET - Products with Limit @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        expect(response.status(), 'Get products with limit should return 200').toBe(200);

        const products = await response.json();

        expect(Array.isArray(products), 'Response should be an array').toBeTruthy();
        expect(products.length, `Should return exactly ${LIMIT} products`).toBe(LIMIT);
    });

    test('GET - Sort Products Ascending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'asc')}`);

        expect(response.status(), 'Sort ascending should return 200').toBe(200);

        const ids: number[] = (await response.json()).map((product: any) => product.id);
        const expectedOrder = [...ids].sort((a, b) => a - b);

        expect(ids, 'Product ids should be in ascending order').toEqual(expectedOrder);
    });

    test('GET - Sort Products Descending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'desc')}`);

        expect(response.status(), 'Sort descending should return 200').toBe(200);

        const ids: number[] = (await response.json()).map((product: any) => product.id);
        const expectedOrder = [...ids].sort((a, b) => b - a);

        expect(ids, 'Product ids should be in descending order').toEqual(expectedOrder);
    });

    test('GET - All Product Categories @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CATEGORIES}`);

        expect(response.status(), 'Get categories should return 200').toBe(200);

        const categories = await response.json();

        expect(Array.isArray(categories), 'Response should be an array').toBeTruthy();
        expect(categories.length, 'Category list should not be empty').toBeGreaterThan(0);
    });

    test('GET - Products by Category @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_BY_CATEGORY.replace('{category}', CATEGORY)}`);

        expect(response.status(), 'Get products by category should return 200').toBe(200);

        const products = await response.json();

        expect(Array.isArray(products), 'Response should be an array').toBeTruthy();
        expect(products.length, 'Category should contain products').toBeGreaterThan(0);
        products.forEach((product: any) => {
            expect(product.category, `Product ${product.id} should belong to "${CATEGORY}"`).toBe(CATEGORY);
        });
    });
});

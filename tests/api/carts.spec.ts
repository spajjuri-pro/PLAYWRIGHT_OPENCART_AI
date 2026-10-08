import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Carts API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const CART_ID = Number(process.env.CART_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);
    const START_DATE = process.env.START_DATE ?? '2019-12-10';
    const END_DATE = process.env.END_DATE ?? '2020-10-10';

    // ---------------------------------------------------------
    // GET
    // ---------------------------------------------------------

    test('GET - All Carts @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CARTS}`);

        expect(response.status(), 'Get all carts should return 200').toBe(200);

        const carts = await response.json();

        expect(Array.isArray(carts), 'Response should be an array').toBeTruthy();
        expect(carts.length, 'Cart list should not be empty').toBeGreaterThan(0);
    });

    test('GET - Cart by ID @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`);

        expect(response.status(), 'Get cart by id should return 200').toBe(200);

        const cart = await response.json();

        expect(cart.id, 'Returned id should match the requested id').toBe(CART_ID);
    });

    test('GET - Carts by Date Range @master @regression @api', async ({ request }) => {

        const url = Routes.GET_CARTS_BY_DATE_RANGE.replace('{startdate}', START_DATE).replace('{enddate}', END_DATE);
        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status(), 'Get carts by date range should return 200').toBe(200);

        const carts = await response.json();

        expect(Array.isArray(carts), 'Response should be an array').toBeTruthy();

        const start = new Date(START_DATE).getTime();
        const end = new Date(END_DATE).getTime();
        carts.forEach((cart: any) => {
            const cartDate = new Date(cart.date).getTime();
            expect(cartDate, `Cart ${cart.id} date ${cart.date} should be on or after ${START_DATE}`).toBeGreaterThanOrEqual(start);
            expect(cartDate, `Cart ${cart.id} date ${cart.date} should be on or before ${END_DATE}`).toBeLessThanOrEqual(end);
        });
    });

    test('GET - User Cart @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USER_CART.replace('{userId}', String(USER_ID))}`);

        expect(response.status(), 'Get user cart should return 200').toBe(200);

        const carts = await response.json();

        expect(Array.isArray(carts), 'Response should be an array').toBeTruthy();
        expect(carts.length, 'User should have at least one cart').toBeGreaterThan(0);
        carts.forEach((cart: any) => {
            expect(cart.userId, `Cart ${cart.id} should belong to user ${USER_ID}`).toBe(USER_ID);
        });
    });

    test('GET - Carts with Limit @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_CARTS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        expect(response.status(), 'Get carts with limit should return 200').toBe(200);

        const carts = await response.json();

        expect(Array.isArray(carts), 'Response should be an array').toBeTruthy();
        expect(carts.length, `Should return exactly ${LIMIT} carts`).toBe(LIMIT);
    });

    test('GET - Sort Carts Ascending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_CARTS_SORTED.replace('{order}', 'asc')}`);

        expect(response.status(), 'Sort ascending should return 200').toBe(200);

        const ids: number[] = (await response.json()).map((cart: any) => cart.id);

        expect(ids, 'Cart ids should be in ascending order').toEqual([...ids].sort((a, b) => a - b));
    });

    test('GET - Sort Carts Descending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_CARTS_SORTED.replace('{order}', 'desc')}`);

        expect(response.status(), 'Sort descending should return 200').toBe(200);

        const ids: number[] = (await response.json()).map((cart: any) => cart.id);

        expect(ids, 'Cart ids should be in descending order').toEqual([...ids].sort((a, b) => b - a));
    });
});

import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Users API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);

    // ---------------------------------------------------------
    // GET
    // ---------------------------------------------------------

    test('GET - All Users @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_USERS}`);

        expect(response.status(), 'Get all users should return 200').toBe(200);

        const users = await response.json();

        expect(Array.isArray(users), 'Response should be an array').toBeTruthy();
        expect(users.length, 'User list should not be empty').toBeGreaterThan(0);
    });

    test('GET - User by ID @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        expect(response.status(), 'Get user by id should return 200').toBe(200);

        const user = await response.json();

        expect(user.id, 'Returned id should match the requested id').toBe(USER_ID);
    });

    test('GET - Users with Limit @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        expect(response.status(), 'Get users with limit should return 200').toBe(200);

        const users = await response.json();

        expect(Array.isArray(users), 'Response should be an array').toBeTruthy();
        expect(users.length, `Should return exactly ${LIMIT} users`).toBe(LIMIT);
    });

    test('GET - Sort Users Ascending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', 'asc')}`);

        expect(response.status(), 'Sort ascending should return 200').toBe(200);

        const ids: number[] = (await response.json()).map((user: any) => user.id);

        expect(ids, 'User ids should be in ascending order').toEqual([...ids].sort((a, b) => a - b));
    });

    test('GET - Sort Users Descending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', 'desc')}`);

        expect(response.status(), 'Sort descending should return 200').toBe(200);

        const ids: number[] = (await response.json()).map((user: any) => user.id);

        expect(ids, 'User ids should be in descending order').toEqual([...ids].sort((a, b) => b - a));
    });
});

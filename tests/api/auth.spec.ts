import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Authentication API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USERNAME = process.env.USERNAME ?? '';
    const PASSWORD = process.env.PASSWORD ?? '';

    // ---------------------------------------------------------
    // POST - Login
    // ---------------------------------------------------------

    test('POST - Successful Login @master @sanity @api', async ({ request }) => {

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: { username: USERNAME, password: PASSWORD },
        });

        expect(response.status(), 'Valid login should return 201').toBe(201);

        const responseBody = await response.json();

        expect(responseBody.token, 'Response should contain a token').toBeDefined();
        expect(typeof responseBody.token, 'Token should be a string').toBe('string');
        expect(responseBody.token.length, 'Token should not be empty').toBeGreaterThan(0);
    });

    test('POST - Invalid Login @master @regression @api', async ({ request }) => {

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: RandomDataUtil.generateInvalidLoginPayload(),
        });

        expect(response.status(), 'Invalid login should return 401').toBe(401);

        const responseText = await response.text();

        expect(responseText, 'Error message should explain the failed login').toContain('username or password is incorrect');
    });
});

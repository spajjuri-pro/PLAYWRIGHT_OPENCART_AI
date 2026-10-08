import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { DataProvider } from '../../utils/DataReader';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('JSON Schema Validation API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const CART_ID = Number(process.env.CART_ID ?? 1);

    const ajv = new Ajv({ allErrors: true });

    // Validates a response body against a schema file and fails with readable errors
    function expectMatchesSchema(schemaPath: string, body: unknown) {
        const schema = DataProvider.readJson(schemaPath);
        const validate = ajv.compile(schema);
        const isValid = validate(body);

        if (!isValid) {
            console.log('Schema validation errors:', JSON.stringify(validate.errors, null, 2));
        }
        expect(isValid, `Response should match ${schemaPath}: ${ajv.errorsText(validate.errors)}`).toBeTruthy();
    }

    // ---------------------------------------------------------
    // Schema Tests
    // ---------------------------------------------------------

    test('GET - Product Response Schema @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status(), 'Get product by id should return 200').toBe(200);

        expectMatchesSchema('./api/schemas/product_api_schema.json', await response.json());
    });

    test('GET - User Response Schema @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        expect(response.status(), 'Get user by id should return 200').toBe(200);

        expectMatchesSchema('./api/schemas/user_api_schema.json', await response.json());
    });

    test('GET - Cart Response Schema @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`);

        expect(response.status(), 'Get cart by id should return 200').toBe(200);

        expectMatchesSchema('./api/schemas/cart_api_schema.json', await response.json());
    });
});

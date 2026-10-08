import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('End-to-End API Workflows', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);

    // ---------------------------------------------------------
    // Product CRUD Workflow
    // ---------------------------------------------------------

    test('Workflow - Product CRUD @master @regression @end-to-end @api', async ({ request }) => {

        // Create
        const createPayload = RandomDataUtil.generateProductPayload();
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: createPayload });
        expect(createResponse.status(), 'Create product should return 201').toBe(201);
        const productId = (await createResponse.json()).id;
        expect(productId, 'Create should return a product id').toBeTruthy();

        // Update (same id)
        const updatePayload = RandomDataUtil.generateUpdatedProductPayload();
        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(productId))}`, { data: updatePayload });
        expect(updateResponse.status(), 'Update product should return 200').toBe(200);
        const updated = await updateResponse.json();
        expect(updated.title, 'Title should be updated').toBe(updatePayload.title);
        expect(updated.price, 'Price should be updated').toBe(updatePayload.price);

        // Delete (same id)
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(productId))}`);
        expect(deleteResponse.status(), 'Delete product should return 200').toBe(200);
    });

    // ---------------------------------------------------------
    // User CRUD Workflow
    // ---------------------------------------------------------

    test('Workflow - User CRUD @master @regression @end-to-end @api', async ({ request }) => {

        // Create
        const createPayload = RandomDataUtil.generateUserPayload();
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: createPayload });
        expect(createResponse.status(), 'Create user should return 201').toBe(201);
        const userId = (await createResponse.json()).id;
        expect(userId, 'Create should return a user id').toBeTruthy();

        // Update (same id)
        const updatePayload = RandomDataUtil.generateUserUpdatePayload();
        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(userId))}`, { data: updatePayload });
        expect(updateResponse.status(), 'Update user should return 200').toBe(200);
        const updated = await updateResponse.json();
        expect(updated.username, 'Username should be updated').toBe(updatePayload.username);

        // Delete (same id)
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(userId))}`);
        expect(deleteResponse.status(), 'Delete user should return 200').toBe(200);
    });

    // ---------------------------------------------------------
    // Cart CRUD Workflow
    // ---------------------------------------------------------

    test('Workflow - Cart CRUD @master @regression @end-to-end @api', async ({ request }) => {

        // Create
        const createPayload = RandomDataUtil.generateCartPayload(USER_ID);
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: createPayload });
        expect(createResponse.status(), 'Create cart should return 201').toBe(201);
        const created = await createResponse.json();
        const cartId = created.id;
        expect(cartId, 'Create should return a cart id').toBeTruthy();
        expect(created.userId, 'User id should match the submitted user id').toBe(USER_ID);
        expect(created.products, 'Products should match the submitted products').toEqual(createPayload.products);

        // Update (same id)
        const updatePayload = RandomDataUtil.generateUpdatedCartPayload(USER_ID);
        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(cartId))}`, { data: updatePayload });
        expect(updateResponse.status(), 'Update cart should return 200').toBe(200);
        const updated = await updateResponse.json();
        expect(updated.products[0].quantity, 'Product quantity should be updated').toBe(updatePayload.products[0].quantity);

        // Delete (same id)
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(cartId))}`);
        expect(deleteResponse.status(), 'Delete cart should return 200').toBe(200);
    });
});

import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('CRUD API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const CART_ID = Number(process.env.CART_ID ?? 1);

    // ---------------------------------------------------------
    // PRODUCT - POST - Create Product
    // ---------------------------------------------------------

    test('POST - Create Product @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateProductPayload();

        const response = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: payload });

        expect(response.status(), 'Create product should return 201').toBe(201);

        const created = await response.json();

        expect(created.id, 'A product id should be returned').toBeTruthy();
        expect(created.title, 'Title should match the submitted title').toBe(payload.title);
        expect(created.price, 'Price should match the submitted price').toBe(payload.price);
        expect(created.category, 'Category should match the submitted category').toBe(payload.category);
    });

    // ---------------------------------------------------------
    // PUT - Update Product
    // ---------------------------------------------------------

    test('PUT - Update Product @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateUpdatedProductPayload();

        const response = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(PRODUCT_ID))}`, { data: payload });

        expect(response.status(), 'Update product should return 200').toBe(200);

        const updated = await response.json();

        expect(Number(updated.id), 'Returned id should match the requested id').toBe(PRODUCT_ID);
        expect(updated.title, 'Title should be updated').toBe(payload.title);
        expect(updated.price, 'Price should be updated').toBe(payload.price);
    });

    // ---------------------------------------------------------
    // DELETE - Delete Product
    // ---------------------------------------------------------

    test('DELETE - Delete Product @master @regression @api', async ({ request }) => {

        const response = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status(), 'Delete product should return 200').toBe(200);

        const deleted = await response.json();

        expect(deleted.id, 'Response should contain the deleted product id').toBe(PRODUCT_ID);
    });

    // ---------------------------------------------------------
    // USER - POST - Create User
    // ---------------------------------------------------------

    test('POST - Create User @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateUserPayload();

        const response = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: payload });

        expect(response.status(), 'Create user should return 201').toBe(201);

        const created = await response.json();

        // fakestoreapi is a mock: it returns only { id }, not the submitted fields
        expect(created.id, 'A user id should be returned').toBeTruthy();
        expect(typeof created.id, 'User id should be a number').toBe('number');
    });

    // ---------------------------------------------------------
    // PUT - Update User
    // ---------------------------------------------------------

    test('PUT - Update User @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateUserUpdatePayload();

        const response = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(USER_ID))}`, { data: payload });

        expect(response.status(), 'Update user should return 200').toBe(200);

        const updated = await response.json();

        expect(updated.email, 'Email should be updated').toBe(payload.email);
        expect(updated.username, 'Username should be updated').toBe(payload.username);
    });

    // ---------------------------------------------------------
    // DELETE - Delete User
    // ---------------------------------------------------------

    test('DELETE - Delete User @master @regression @api', async ({ request }) => {

        const response = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(USER_ID))}`);

        expect(response.status(), 'Delete user should return 200').toBe(200);

        const deleted = await response.json();

        expect(deleted.id, 'Response should contain the deleted user id').toBe(USER_ID);
    });

    // ---------------------------------------------------------
    // CART - POST - Create Cart
    // ---------------------------------------------------------

    test('POST - Create Cart @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateCartPayload(USER_ID);

        const response = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: payload });

        expect(response.status(), 'Create cart should return 201').toBe(201);

        const created = await response.json();

        expect(created.id, 'A cart id should be returned').toBeTruthy();
        expect(created.userId, 'User id should match the submitted user id').toBe(USER_ID);
        expect(created.products, 'Products should match the submitted products').toEqual(payload.products);
    });

    // ---------------------------------------------------------
    // PUT - Update Cart
    // ---------------------------------------------------------

    test('PUT - Update Cart @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateUpdatedCartPayload(USER_ID);

        const response = await request.put(`${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(CART_ID))}`, { data: payload });

        expect(response.status(), 'Update cart should return 200').toBe(200);

        const updated = await response.json();

        expect(updated.products[0].quantity, 'Product quantity should be updated').toBe(payload.products[0].quantity);
        expect(updated.products, 'Products should match the submitted products').toEqual(payload.products);
    });

    // ---------------------------------------------------------
    // DELETE - Delete Cart
    // ---------------------------------------------------------

    test('DELETE - Delete Cart @master @regression @api', async ({ request }) => {

        const response = await request.delete(`${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(CART_ID))}`);

        expect(response.status(), 'Delete cart should return 200').toBe(200);

        const deleted = await response.json();

        expect(deleted.id, 'Response should contain the deleted cart id').toBe(CART_ID);
    });
});

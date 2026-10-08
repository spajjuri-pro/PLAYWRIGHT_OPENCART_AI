import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountSuccessPage } from '../pages/AccountSuccessPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { AdminCustomersPage } from '../pages/AdminCustomersPage';
import { AdminCustomerFormPage } from '../pages/AdminCustomerFormPage';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL || 'http://localhost/';

type PageFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    accountSuccessPage: AccountSuccessPage;
    loginPage: LoginPage;
    myAccountPage: MyAccountPage;
    logoutPage: LogoutPage;
    searchResultsPage: SearchResultsPage;
    productPage: ProductPage;
    cartPage: CartPage;
    adminLoginPage: AdminLoginPage;
    adminCustomersPage: AdminCustomersPage;
    adminCustomerFormPage: AdminCustomerFormPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    accountSuccessPage: async ({ page }, use) => {
        await use(new AccountSuccessPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
    logoutPage: async ({ page }, use) => {
        await use(new LogoutPage(page));
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    adminLoginPage: async ({ page }, use) => {
        await use(new AdminLoginPage(page));
    },
    adminCustomersPage: async ({ page }, use) => {
        await use(new AdminCustomersPage(page));
    },
    adminCustomerFormPage: async ({ page }, use) => {
        await use(new AdminCustomerFormPage(page));
    },
});

test.afterEach(async ({ page, context }) => {
    if (!page.isClosed()) {
        await page.close();
    }
    await context.close();
});

export { expect } from '@playwright/test';

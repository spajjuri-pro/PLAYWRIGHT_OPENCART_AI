# 🎭 Playwright + TypeScript Automation Framework

> **A production-grade, multi-layer test automation framework** for **Web UI**, **REST API**, and **Database** testing — built with Playwright, TypeScript, and the Page Object Model pattern.

[![Playwright](https://img.shields.io/badge/Playwright-1.63-45ba4b?logo=playwright)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Allure](https://img.shields.io/badge/Allure-Reporting-orange)](https://allurereport.com/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red?logo=jenkins)](https://www.jenkins.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![Node](https://img.shields.io/badge/Node-20+-339933?logo=node.js)](https://nodejs.org/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Framework Architecture](#-framework-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Configuration](#-environment-configuration)
- [Test Suites & Tags](#-test-suites--tags)
- [Running Tests](#-running-tests)
- [Test Execution Flow](#-test-execution-flow)
- [Page Object Model](#-page-object-model)
- [API Testing](#-api-testing)
- [Database Testing](#-database-testing)
- [Data-Driven Testing](#-data-driven-testing)
- [Reporting](#-reporting)
- [Docker Setup](#-docker-setup)
- [CI/CD with Jenkins](#-cicd-with-jenkins)
- [Utilities](#-utilities)
- [Coding Guidelines](#-coding-guidelines)
- [Author](#-author)

---

## 🎯 Overview

This framework provides a **unified, scalable automation solution** for testing the **OpenCart e-commerce platform** across three layers:

| Layer           | Technology                                  | What We Test                                                                       |
| --------------- | ------------------------------------------- | ---------------------------------------------------------------------------------- |
| 🌐 **Web UI**   | Playwright + Page Object Model              | Customer registration, login/logout, product search, cart management, admin portal |
| 🔌 **REST API** | Playwright `request` fixture + FakeStoreAPI | Products, users, carts, authentication, schema validation                          |
| 🗄️ **Database** | MySQL2 + Admin Portal                       | End-to-end customer registration with DB verification                              |

It is designed for **CI/CD integration** (Jenkins + Docker), supports **multiple reporting formats**, and follows **industry best practices** for maintainability and readability.

---

## ✨ Key Features

- ✅ **Page Object Model (POM)** — 12 reusable page classes for clean test code
- ✅ **Custom Test Fixtures** — Type-safe dependency injection for all page objects
- ✅ **Multi-Layer Testing** — Web UI + REST API + Database in a single framework
- ✅ **Tag-Based Test Suites** — `@master`, `@sanity`, `@regression`, `@web`, `@api`, `@db`, `@end-to-end`, `@datadriven`
- ✅ **Data-Driven Testing** — CSV, JSON, and Excel readers; the login tests are driven from a JSON file
- ✅ **Random Test Data Generation** — Powered by Faker.js
- ✅ **Schema Validation** — JSON Schema validation for API responses via AJV
- ✅ **Multiple Reporters** — HTML, Allure, JUnit XML, Custom HTML dashboard
- ✅ **Parallel Execution** — Fully parallel test execution with configurable workers
- ✅ **CI/CD Ready** — Jenkins pipeline + Docker Compose support
- ✅ **Retries & Artifacts** — Automatic retries, screenshots, videos, and traces on failure

---

## 🏗️ Framework Architecture

```mermaid
flowchart TB
    subgraph Config["⚙️ Configuration Layer"]
        direction LR
        PC["playwright.config.ts<br/>Timeouts, reporters,<br/>browsers, retries"]
        ENV[".env<br/>URLs, credentials,<br/>API keys"]
        TS["tsconfig.json<br/>TypeScript compiler<br/>options"]
    end

    subgraph Tests["🧪 Test Layer"]
        direction TB
        WEB["tests/web/<br/>UI Tests<br/>@web"]
        API["tests/api/<br/>API Tests<br/>@api"]
        DB["tests/db/<br/>DB Tests<br/>@db"]
    end

    subgraph POM["📄 Page Object Layer"]
        HP["HomePage"]
        LP["LoginPage"]
        RP["RegisterPage"]
        ASP["AccountSuccessPage"]
        MAP["MyAccountPage"]
        LOP["LogoutPage"]
        CP["CartPage"]
        PP["ProductPage"]
        SP["SearchResultsPage"]
        AP["AdminLoginPage"]
        ACP["AdminCustomersPage"]
        ACFP["AdminCustomerFormPage"]
    end

    subgraph Utils["🔧 Utility Layer"]
        DG["dataGenerator.ts<br/>Faker.js random data"]
        DR["DataReader.ts<br/>CSV / JSON / Excel"]
        HLP["helper.ts<br/>Price conversion,<br/>test data helpers"]
        DBC["dbClient.ts<br/>MySQL queries"]
        CR["CustomReporter.ts<br/>Custom HTML dashboard"]
    end

    subgraph API_Layer["🌐 API Layer"]
        ROUTES["endpoints/routes.ts<br/>All endpoint URLs"]
        SCHEMAS["schemas/<br/>JSON Schemas for<br/>response validation"]
    end

    subgraph Data["📁 Test Data"]
        CSV["opencart_logindata.csv"]
        JSON["opencart_logindata.json"]
        XLSX["opencart_logindata.xlsx"]
    end

    subgraph Reports["📊 Reporting Layer"]
        HTML["HTML Report<br/>(reports/)"]
        ALLURE["Allure Report<br/>(allure-results/)"]
        JUNIT["JUnit XML<br/>(reports/)"]
        CUSTOM["Custom Dashboard<br/>(custom-report/)"]
    end

    subgraph CI_CD["🚀 CI/CD Layer"]
        DOCKER["Docker /<br/>Docker Compose"]
        JENKINS["Jenkins Pipeline"]
    end

    Tests --> POM
    Tests --> API_Layer
    Tests --> Utils
    Tests --> Data
    POM --> Fixtures["fixtures/pageFixtures.ts"]
    Fixtures --> Tests
    Tests --> Config
    Tests --> Reports
    CI_CD --> Config
    CI_CD --> Tests
```

---

## 📁 Project Structure

```mermaid
graph TD
    ROOT["📦 PLAYWRIGHT_OPENCART_AI/"] --> CONF["⚙️ Config Files"]
    ROOT --> SRC["📂 Source Code"]
    ROOT --> TEST["🧪 Tests"]
    ROOT --> DATA["📁 Test Data"]
    ROOT --> REPORTS["📊 Reports"]
    ROOT --> INFRA["🐳 Infrastructure"]

    CONF --> PC["playwright.config.ts"]
    CONF --> TS["tsconfig.json"]
    CONF --> PKG["package.json"]
    CONF --> ENV[".env.example"]
    CONF --> DI[".dockerignore"]
    CONF --> GI[".gitignore"]

    SRC --> PAGES["pages/<br/>12 Page Objects"]
    SRC --> UTILS["utils/<br/>5 Utilities"]
    SRC --> FIXTURES["fixtures/<br/>pageFixtures.ts"]
    SRC --> API["api/<br/>endpoints + schemas"]

    TEST --> WEB["tests/web/<br/>8 UI test specs"]
    TEST --> API_T["tests/api/<br/>7 API test specs"]
    TEST --> DB_T["tests/db/<br/>1 E2E DB spec"]

    DATA --> CSV["*.csv"]
    DATA --> JSON["*.json"]
    DATA --> XLSX["*.xlsx"]

    REPORTS --> HTML["reports/"]
    REPORTS --> ALLURE["allure-results/"]
    REPORTS --> CUSTOM["custom-report/"]
    REPORTS --> TR["test-results/"]

    INFRA --> DOCKER["Dockerfile"]
    INFRA --> DC["docker-compose.yml"]
    INFRA --> ENTRY["docker-entrypoint.sh"]
    INFRA --> JENKINS["Jenkinsfile"]
    INFRA --> SETUP["env_setup.sh"]
```

### 📂 Folder Breakdown

| Path              | Purpose                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `pages/`          | Page Object classes — each encapsulates locators + actions for a page   |
| `fixtures/`       | Custom Playwright test fixtures for type-safe page object injection     |
| `tests/web/`      | Web UI test specs (login, registration, cart, search, etc.)             |
| `tests/api/`      | REST API test specs against FakeStoreAPI                                |
| `tests/db/`       | Database validation tests (MySQL)                                       |
| `api/endpoints/`  | Centralized API route definitions                                       |
| `api/schemas/`    | JSON Schema files for API response validation                           |
| `utils/`          | Shared utilities (data generation, readers, DB client, custom reporter) |
| `testdata/`       | External test data files (CSV, JSON, Excel)                             |
| `reports/`        | Generated HTML + JUnit reports                                          |
| `allure-results/` | Allure-compatible test result files                                     |
| `custom-report/`  | Custom HTML dashboard output                                            |
| `test-results/`   | Playwright test artifacts (screenshots, videos, traces)                 |
| `docs/`           | Additional documentation                                                |
| `prompts/`        | AI prompt templates for test generation                                 |

---

## 🛠️ Tech Stack

| Technology                                                           | Version | Purpose                          |
| -------------------------------------------------------------------- | ------- | -------------------------------- |
| [Playwright](https://playwright.dev/)                                | ^1.63.0 | Browser automation & API testing |
| [TypeScript](https://www.typescriptlang.org/)                        | ^6.0.3  | Type-safe test code              |
| [Node.js](https://nodejs.org/)                                       | 20+     | Runtime                          |
| [Allure Playwright](https://www.npmjs.com/package/allure-playwright) | ^3.12.2 | Allure reporting integration     |
| [Allure CLI](https://allurereport.org/)                              | ^3.20.1 | Generate and open Allure reports |
| [Faker.js](https://fakerjs.dev/)                                     | ^10.6.0 | Random test data generation      |
| [AJV](https://ajv.js.org/)                                           | ^8.20.0 | JSON Schema validation           |
| [axe-core](https://www.npmjs.com/package/@axe-core/playwright)       | ^4.13.0 | Installed for accessibility checks (not yet used in tests) |
| [Luxon](https://moment.github.io/luxon/)                             | ^3.7.2  | Installed for date/time handling (not yet used in tests)   |
| [MySQL2](https://www.npmjs.com/package/mysql2)                       | ^3.24.4 | MySQL database connectivity      |
| [csv-parse](https://www.npmjs.com/package/csv-parse)                 | ^7.0.2  | CSV file parsing                 |
| [ExcelJS](https://www.npmjs.com/package/exceljs)                     | ^4.4.0  | Excel file parsing               |
| [dotenv](https://www.npmjs.com/package/dotenv)                       | ^18.0.3 | Environment variable management  |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v20 or later → [Download](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)
- **Git** → [Download](https://git-scm.com/)
- **Playwright browsers** (installed with `npx playwright install`)
- **MySQL** (only for the database test in `tests/db/`)
- **Docker Desktop** (optional, for containerized execution) → [Download](https://www.docker.com/products/docker-desktop/)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/spajjuri-pro/PLAYWRIGHT_OPENCART_AI.git
cd PLAYWRIGHT_OPENCART_AI
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Playwright Browsers

```bash
npx playwright install --with-deps
```

### 4️⃣ Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your application URLs and credentials (see [Environment Configuration](#-environment-configuration)).

### 5️⃣ Run All Tests

```bash
npx playwright test
```

---

## 🔧 Environment Configuration

The framework uses a `.env` file for all configurable settings. Copy `.env.example` to `.env` and update the values:

```env
# Environment
APP_ENV=qa                          # qa | prod | dev

# Web Application
WEB_APP_URL=https://awesomeqa.com/ui/
APP_EMAIL=your-email@example.com
APP_PASSWORD=your-password

# Product Details (for cart tests)
PRODUCT_NAME=MacBook
PRODUCT_QUANTITY=1
TOTAL_PRICE=$602.00

# API (FakeStoreAPI)
API_BASE_URL=https://fakestoreapi.com
USERNAME=mor_2314
PASSWORD=83r5^_
USER_ID=1
PRODUCT_ID=1
CART_ID=1
LIMIT=3
START_DATE=2019-12-10
END_DATE=2020-10-10

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-db-password
DB_NAME=openshop

# Admin Portal
ADMIN_APP_URL=http://localhost/opencart/upload/admin/index.php
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password
```

---

## 🏷️ Test Suites & Tags

Tests are organized using Playwright's tag system (`@tag-name` in test titles). Each tag maps to a reusable npm script:

| Tag           | npm Script                | Description                                  |
| ------------- | ------------------------- | -------------------------------------------- |
| `@master`     | `npm run test:master`     | **Master suite** — all critical tests        |
| `@sanity`     | `npm run test:sanity`     | **Sanity checks** — quick smoke tests        |
| `@regression` | `npm run test:regression` | **Full regression** — comprehensive coverage |
| `@web`        | `npm run test:web`        | **Web UI tests only**                        |
| `@api`        | `npm run test:api`        | **API tests only**                           |
| `@end-to-end` | `npm run test:e2e`        | **End-to-end scenarios** (web, API workflows and the UI + Admin + DB test) |
| `@datadriven` | `npm run test:datadriven` | **Data-driven tests**                        |
| `@db`         | `npx playwright test --grep @db` | **Database test** (needs MySQL)       |

Tests can carry **multiple tags** for flexible execution:

```typescript
test('Valid login test @master @sanity @web', async (...) => { ... });
test('GET - All Products @master @sanity @api', async (...) => { ... });
test('Customer registration UI + Admin + DB validation test @master @end-to-end @db', async (...) => { ... });
```

---

## ▶️ Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run by Tag (npm scripts)

```bash
npm run test:sanity          # Sanity tests only
npm run test:regression      # Regression tests
npm run test:web             # Web UI tests
npm run test:api             # API tests
npm run test:e2e             # End-to-end tests
npm run test:master          # Master suite
npm run test:datadriven      # Data-driven tests
```

### Run in Headed Mode (with browser visible)

```bash
npm run test:master:headed
```

### Run with Debugging

```bash
npm run test:sanity:debug    # Opens Playwright Inspector
```

### Run a Single Test File

```bash
npx playwright test tests/web/valid-login.spec.ts
```

### Run with Specific Project / Browser

```bash
npx playwright test --project=chromium
```

### Run with grep (custom tag filter)

```bash
npx playwright test --grep "@sanity"
npx playwright test --grep "@api|@web"    # Multiple tags
```

### Run in CI Mode (2 retries, 1 worker)

```bash
CI=1 npx playwright test              # macOS / Linux
set CI=1 && npx playwright test       # Windows (cmd)
```

---

## 🔄 Test Execution Flow

```mermaid
sequenceDiagram
    participant U as User / CI
    participant PW as Playwright Runner
    participant F as Fixtures
    participant POM as Page Objects
    participant APP as Application
    participant R as Reporters

    U->>PW: npx playwright test --grep @sanity
    PW->>PW: Read playwright.config.ts
    PW->>PW: Parse tags, filter tests
    PW->>PW: Allocate workers (parallel)

    loop Each Test
        PW->>F: Create test context (page, fixtures)
        F->>POM: Inject page objects
        POM->>APP: Navigate / interact
        APP-->>POM: Render / respond
        POM-->>F: Return results
        F-->>PW: Assertions pass/fail

        alt Test Fails
            PW->>PW: Capture screenshot
            PW->>PW: Record video
            PW->>PW: Save trace (on retry)
        end
    end

    PW->>R: Generate reports
    R->>R: HTML report
    R->>R: Allure results
    R->>R: JUnit XML
    R->>R: Custom dashboard
    PW-->>U: Summary with links
```

---

## 📄 Page Object Model

The framework uses the **Page Object Model (POM)** pattern to separate test logic from page-specific implementation details.

### How It Works

Each web page gets its own **Page Object class** that encapsulates:

- **Locators** — CSS selectors / Playwright getters for elements
- **Actions** — Methods that perform operations (click, fill, select)
- **Verifications** — Methods that check state (isVisible, getText)

### Available Page Objects

| Class                   | File                             | Key Methods                                                                        |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| `HomePage`              | `pages/HomePage.ts`              | `searchProduct()`, `clickMyAccount()`, `clickRegister()`, `clickLogin()`, `isLoggedOut()` |
| `LoginPage`             | `pages/LoginPage.ts`             | `isLoginPageExists()`, `login()`, `getWarningMessage()`                            |
| `RegisterPage`          | `pages/RegisterPage.ts`          | `isRegisterPageExists()`, `register()`                                             |
| `AccountSuccessPage`    | `pages/AccountSuccessPage.ts`    | `isAccountCreated()`, `clickContinue()`                                            |
| `MyAccountPage`         | `pages/MyAccountPage.ts`         | `isMyAccountPageExists()`, `clickLogout()`                                         |
| `LogoutPage`            | `pages/LogoutPage.ts`            | `isLogoutPageExists()`, `clickContinue()`                                          |
| `SearchResultsPage`     | `pages/SearchResultsPage.ts`     | `isSearchResultsPageExists()`, `isProductDisplayed()`, `getProductNames()`, `openProduct()` |
| `ProductPage`           | `pages/ProductPage.ts`           | `isProductPageExists()`, `getPrice()`, `setQuantity()`, `clickAddToCart()`, `getSuccessMessage()`, `clickCart()` |
| `CartPage`              | `pages/CartPage.ts`              | `isCartPageExists()`, `isProductInCart()`, `getQuantity()`, `getUnitPrice()`, `getCartTotal()` |
| `AdminLoginPage`        | `pages/AdminLoginPage.ts`        | `open()`, `login()`, `isDashboardDisplayed()`, `closeSecurityNotification()`       |
| `AdminCustomersPage`    | `pages/AdminCustomersPage.ts`    | `openCustomers()`, `isCustomersPageExists()`, `filterByEmail()`, `isCustomerListed()`, `getListedCustomerCount()`, `getRowText()`, `openCustomer()` |
| `AdminCustomerFormPage` | `pages/AdminCustomerFormPage.ts` | `getFirstName()`, `getLastName()`, `getEmail()`, `isStatusEnabled()`               |

### Example: Page Object

```typescript
// pages/LoginPage.ts
export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly warningMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Returning Customer", level: 2 });
    this.emailInput = page.locator("#input-email");
    this.passwordInput = page.locator("#input-password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.warningMessage = page.locator(".alert-danger");
  }

  /** Verifies the Account Login page is displayed */
  async isLoginPageExists(): Promise<boolean> {
    // waits for the heading and returns true/false
  }

  /** Enters credentials and submits the login form */
  async login(email: string, password: string): Promise<void> {
    // fills the email and password, then clicks Login
  }

  /** Returns the warning text shown for invalid credentials */
  async getWarningMessage(): Promise<string> {
    // reads the .alert-danger text
  }
}
```

### Custom Fixtures (Dependency Injection)

Page objects are injected into tests via **custom fixtures** (`fixtures/pageFixtures.ts`), providing type-safe, automatic initialization:

```typescript
// fixtures/pageFixtures.ts
import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
// ...other page objects

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  // ...registerPage, accountSuccessPage, myAccountPage, logoutPage, searchResultsPage,
  // productPage, cartPage, adminLoginPage, adminCustomersPage, adminCustomerFormPage
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto(APP_URL); // WEB_APP_URL from .env
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from "@playwright/test";
```

### Example: Test Using Fixtures

```typescript
// tests/web/valid-login.spec.ts
import { test, expect } from "../../fixtures/pageFixtures";
import { Helper } from "../../utils/helper";

test("Valid login test @master @sanity @web", async ({
  homePage,
  loginPage,
  myAccountPage,
}) => {
  const { email, password } = Helper.getLoginDetails();

  await test.step("1) Navigate to the login page", async () => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    const isLoginPageDisplayed = await loginPage.isLoginPageExists();
    expect(isLoginPageDisplayed).toBeTruthy();
  });

  await test.step("2) Login with valid credentials", async () => {
    await loginPage.login(email, password);
  });

  await test.step("3) Verify the user is redirected to the My Account dashboard", async () => {
    const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
    expect(isMyAccountPageDisplayed).toBeTruthy();
  });
});
```

---

## 🌐 API Testing

The framework tests the [FakeStoreAPI](https://fakestoreapi.com/) — a free REST API for e-commerce.

### API Layer Structure

```
api/
├── endpoints/
│   └── routes.ts          # Centralized route definitions
└── schemas/
    ├── product_api_schema.json
    ├── user_api_schema.json
    └── cart_api_schema.json
```

### Route Definitions

All API endpoints are centralized in `api/endpoints/routes.ts`:

```typescript
export const Routes = {
  BASE_URL: "https://fakestoreapi.com",
  GET_ALL_PRODUCTS: "/products",
  GET_PRODUCT_BY_ID: "/products/{id}",
  GET_PRODUCTS_WITH_LIMIT: "/products?limit={limit}",
  GET_PRODUCTS_SORTED: "/products?sort={order}",
  GET_ALL_CATEGORIES: "/products/categories",
  GET_PRODUCTS_BY_CATEGORY: "/products/category/{category}",
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: "/products/{id}",
  DELETE_PRODUCT: "/products/{id}",
  // ... the same pattern for users and carts
  GET_USER_CART: "/carts/user/{userId}",
  GET_CARTS_BY_DATE_RANGE: "/carts?startdate={startdate}&enddate={enddate}",
  AUTH_LOGIN: "/auth/login",
};
```

### API Test Example

```typescript
// tests/api/products.spec.ts
import { test, expect } from "@playwright/test";
import { Routes } from "../../api/endpoints/routes";

const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;

test("GET - All Products @master @sanity @api", async ({ request }) => {
  const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);
  expect(response.status(), "Get all products should return 200").toBe(200);

  const products = await response.json();
  expect(Array.isArray(products), "Response should be an array").toBeTruthy();
  expect(products.length, "Product list should not be empty").toBeGreaterThan(0);
  products.forEach(expectValidProduct); // checks id, title, price, category, image types
});
```

### API Test Coverage

| Test File                   | Tests | Endpoints Covered                                                              |
| --------------------------- | ----- | ------------------------------------------------------------------------------ |
| `products.spec.ts`          | 7     | GET all, by ID, with limit, sorted asc/desc, all categories, by category       |
| `users.spec.ts`             | 5     | GET all, by ID, with limit, sorted asc/desc                                    |
| `carts.spec.ts`             | 7     | GET all, by ID, by date range, user cart, with limit, sorted asc/desc          |
| `auth.spec.ts`              | 2     | POST login (valid and invalid credentials)                                     |
| `crud.spec.ts`              | 9     | POST, PUT and DELETE for products, users and carts                             |
| `schema-validation.spec.ts` | 3     | JSON Schema validation for product, user and cart responses                    |
| `workflows.spec.ts`         | 3     | End-to-end create → update → delete workflows for products, users and carts    |

---

## 🗄️ Database Testing

The framework validates data persistence by querying **MySQL** directly via the `mysql2` library.

### DB Client

```typescript
// utils/dbClient.ts
import mysql from "mysql2/promise";

export async function executeQuery(sql: string, params?: any[]) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    return await connection.execute(sql, params ?? []); // returns [rows, fields]
  } finally {
    await connection.end(); // the connection is always closed
  }
}
```

### E2E Test Flow (UI → Admin → DB)

The `tests/db/customer-registration-ui-admin-db.spec.ts` spec demonstrates a **three-layer validation**:

```mermaid
flowchart LR
    A["1️⃣ Register customer<br/>via Web UI"] --> B["2️⃣ Verify customer<br/>in Admin Portal"]
    B --> C["3️⃣ Verify customer<br/>in MySQL Database"]
    C --> D["✅ Customer exists<br/>across all layers"]
```

```typescript
// Data is generated once and reused in every layer
const customer = {
  firstName: RandomDataUtil.getFirstName(),
  lastName: RandomDataUtil.getLastName(),
  email: RandomDataUtil.getEmail(),
  password: RandomDataUtil.getPassword(),
};

// Step 1: Register via UI
await registerPage.register(customer.firstName, customer.lastName, customer.email, customer.password);

// Step 2: Verify in Admin Portal
await adminLoginPage.open(ADMIN_URL); // ADMIN_APP_URL from .env
await adminLoginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
await adminCustomersPage.openCustomers();
await adminCustomersPage.filterByEmail(customer.email);
expect(await adminCustomersPage.isCustomerListed(customer.email)).toBeTruthy();

// Step 3: Verify in MySQL
const [rows] = (await executeQuery(
  "SELECT firstname, lastname, email, status, date_added FROM oc_customer WHERE email = ?",
  [customer.email],
)) as unknown as [Array<Record<string, any>>, unknown];
expect(rows.length).toBe(1);
expect(rows[0].firstname).toBe(customer.firstName);
```

---

## 📊 Data-Driven Testing

The framework supports **three external data formats** for data-driven tests:

| Format    | Reader                     | File Example                       |
| --------- | -------------------------- | ---------------------------------- |
| **CSV**   | `DataProvider.readCsv()`   | `testdata/opencart_logindata.csv`  |
| **JSON**  | `DataProvider.readJson()`  | `testdata/opencart_logindata.json` |
| **Excel** | `DataProvider.readExcel()` | `testdata/opencart_logindata.xlsx` |

`tests/web/login-data-driven.spec.ts` reads `testdata/opencart_logindata.json` and generates one test per row. The CSV and Excel files contain the same data for the other readers.

### Data Reader Utility

```typescript
// utils/DataReader.ts
export class DataProvider {
  static readJson(filePath: string) {
    /* ... */
  }
  static readCsv(filePath: string) {
    /* ... */
  }
  static async readExcel(filePath: string): Promise<unknown[][]> {
    /* ... */
  }
}
```

### Random Data Generation

For non-deterministic test data, use the `RandomDataUtil` class powered by Faker.js:

```typescript
import { RandomDataUtil } from "../../utils/dataGenerator";

const firstName = RandomDataUtil.getFirstName();
const lastName = RandomDataUtil.getLastName();
const email = RandomDataUtil.getEmail();
const password = RandomDataUtil.getPassword(12);
const phone = RandomDataUtil.getPhoneNumber();
const address = RandomDataUtil.getStreetAddress();
```

---

## 📊 Reporting

The framework generates **four types of reports** simultaneously:

```mermaid
flowchart LR
    subgraph PW["Playwright Test Runner"]
        T1["Test 1"]
        T2["Test 2"]
        TN["Test N"]
    end

    PW --> R1["📄 HTML Report<br/>(reports/index.html)"]
    PW --> R2["📊 Allure Report<br/>(allure-results/)"]
    PW --> R3["📋 JUnit XML<br/>(reports/results.xml)"]
    PW --> R4["🎨 Custom Dashboard<br/>(custom-report/)"]

    R2 --> AR["allure generate →<br/>allure-report/"]
    R4 --> CR["Open custom-report/<br/>index.html in browser"]
```

### 1️⃣ Playwright HTML Report

```bash
# Auto-generated after test run
open reports/index.html
```

![Playwright HTML Report](images/Playwright%20HTML%20Report.png)

### 2️⃣ Allure Report

```bash
# Generate and serve Allure report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

![Allure Report](images/Allure%20Report.png)

### 3️⃣ JUnit XML Report

Generated at `reports/results.xml` — compatible with Jenkins CI integration.

### 4️⃣ Custom HTML Dashboard

A custom reporter (`utils/CustomReporter.ts`) generates a branded HTML dashboard with:

- Test pass/fail/skip statistics
- Step-by-step execution details
- Screenshot attachments on failure
- Console logs per test step
- Video and trace links
- Status and severity charts

Open `custom-report/index.html` in a browser to view.

![Custom HTML Dashboard](images/Custom%20HTML%20Dashboard.png)

---

## 🐳 Docker Setup

Run tests in a **consistent, isolated container environment** — no local dependencies needed.

### Docker Architecture

```mermaid
flowchart TB
    subgraph Host["🖥️ Host Machine"]
        DC["docker-compose.yml"]
        ENV[".env"]
        VOL["reports/, allure-results/,<br/>custom-report/, test-results/"]
    end

    subgraph Container["📦 Docker Container"]
        DOCKERFILE["Dockerfile<br/>FROM mcr.microsoft.com/playwright"]
        APP["/app<br/>(source code)"]
        NPM["/app/node_modules<br/>(container-only)"]
        ENTRY["docker-entrypoint.sh<br/>(suite selector)"]
    end

    Host -->|docker compose run| Container
    Container -->|bind mount| VOL
    Container -->|reads| ENV
    ENTRY -->|executes| APP
```

### Build the Image

```bash
docker compose build
```

### Run Test Suites

```bash
# Run all tests
docker compose run --rm playwright-tests

# Run specific suites
docker compose run --rm playwright-tests sanity
docker compose run --rm playwright-tests regression
docker compose run --rm playwright-tests web
docker compose run --rm playwright-tests api
docker compose run --rm playwright-tests master
docker compose run --rm playwright-tests e2e
docker compose run --rm playwright-tests datadriven
```

### Pass Extra Playwright Arguments

```bash
docker compose run --rm playwright-tests web --headed --workers 2
```


## 🚇 CI/CD with Jenkins

The project includes a **declarative Jenkins pipeline** (`Jenkinsfile`) for Windows build agents.

### Pipeline Stages

```mermaid
flowchart LR
    A["🔄 Checkout"] --> B["📦 Install<br/>Dependencies"]
    B --> C["🤖 Install<br/>Playwright Browsers"]
    C --> D["🧪 Run Tests"]
    D --> E["📊 Archive<br/>Reports"]
    E --> F["📧 Email<br/>Notification"]
```

### Pipeline Parameters

| Parameter    | Choices                                                                                                | Description             |
| ------------ | ------------------------------------------------------------------------------------------------------ | ----------------------- |
| `TEST_SUITE` | `test:e2e`, `test:master`, `test:sanity`, `test:regression`, `test:api`, `test:web`, `test:datadriven` | Which tests to run      |
| `BROWSER`    | `chromium`, `firefox`, `webkit`                                                                        | Browser selection       |
| `MODE`       | `headless`, `headed`                                                                                   | Headless or headed mode |

### Post-Build Actions

- ✅ Archives HTML reports
- ✅ Publishes JUnit XML results (test trend graph)
- ✅ Generates and publishes Allure reports
- ✅ Sends email notifications with status and report links
- ✅ Cleans up `allure-results` on success

---

## 🔧 Utilities

| Utility          | File                      | Purpose                                                                 |
| ---------------- | ------------------------- | ----------------------------------------------------------------------- |
| `RandomDataUtil` | `utils/dataGenerator.ts`  | Generate random names, emails, passwords, addresses, dates via Faker.js |
| `DataProvider`   | `utils/DataReader.ts`     | Read test data from CSV, JSON, and Excel files                          |
| `Helper`         | `utils/helper.ts`         | Price string-to-number conversion, static test data helpers             |
| `executeQuery`   | `utils/dbClient.ts`       | Execute MySQL queries with parameterized inputs                         |
| `CustomReporter` | `utils/CustomReporter.ts` | Custom Playwright reporter generating a rich HTML dashboard             |

---

## 📋 Coding Guidelines

- Follow the **Page Object Model** pattern for all UI interactions
- Use **tags** (`@tag`) to categorize every test
- Write **descriptive test names** and use `test.step()` for multi-step scenarios
- Keep **locators in page objects** — never in test files
- Use **fixtures** for dependency injection — never instantiate page objects manually
- Add **JSDoc comments** to all public methods
- Run `npx playwright test` locally before submitting

---

## 👨‍🏫 Author

<div >
    <h3>Shashirekha Pajjuri </h3>    
</div>

---


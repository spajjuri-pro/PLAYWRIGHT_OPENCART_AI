# Step-By-Step Guide

## Building a Test Automation Framework with Playwright and TypeScript

### Introduction

This guide walks you step by step through setting up a complete automated testing framework using Playwright and TypeScript, and using an AI coding agent to help generate configuration, utilities, and tests. It uses a demo project called `OpenCart_Playwright` as the running example, but the same approach can be adapted to other projects.

The original instructions, commands, configuration values, and overall flow from the source document are preserved. The AI prompts have been refined for clarity, consistency, and better results when used with an AI coding agent.

## How to Read This Document

- **PROMPT** sections contain text you can copy and paste into your AI coding agent, such as Claude Code, GitHub Copilot, CommandCode, or OpenCode.
- **Code** sections contain file contents or commands that you type or paste directly into your project.
- **Note** sections call out important warnings or clarifications.
- **Why this matters** sections explain the purpose behind a step so you understand not only how to do it, but why it is needed.

---

# Framework Build Guide: Playwright + TypeScript (Web, API, DB)

A step-by-step guide to building this framework with an AI coding agent. Steps marked **Manual** are done by you. Steps marked **Prompt** are given to the agent.

## Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create the project structure](#step-1-create-the-project-structure)
3. [Step 2: Install dependencies](#step-2-install-dependencies)
4. [Step 3: Add configuration files](#step-3-add-configuration-files)
5. [Step 4: Add test data files](#step-4-add-test-data-files)
6. [Step 5: Add API endpoints and schemas](#step-5-add-api-endpoints-and-schemas)
7. [Step 6: Add the custom reporter](#step-6-add-the-custom-reporter)
8. [Step 7: Add the prompt files](#step-7-add-the-prompt-files)
9. [Step 8: Create helper and utility files](#step-8-create-helper-and-utility-files)
10. [Step 9: Generate tests with the agent](#step-9-generate-tests-with-the-agent)
11. [Step 10: Add npm scripts and run the tests](#step-10-add-npm-scripts-and-run-the-tests)
12. [Step 11: Push to GitHub](#step-11-push-to-github)

---

## Prerequisites

Install these first (Manual):

| Tool | Notes |
| --- | --- |
| Node.js | Latest LTS |
| VS Code | Latest |
| AI coding agent | Claude Code, GitHub Copilot, CommandCode, OpenCode or similar. It generates code and helps with debugging. |

Initialise Playwright from VS Code or the terminal:

```bash
npm init playwright@latest
```

---

## Step 1: Create the project structure

Type: **Prompt**

Copy this prompt to your AI coding agent:

```text
Create or update the following configuration files in the project:
- playwright.config.ts
- tsconfig.json
- .env

Create the required folder and file structure for the project root `PLAYWRIGHT_OPENCART_AI`
using the target structure below.

Requirements:
- Create only the required folders and placeholder files.
- Preserve all existing project files unless they must be updated.
- Do not delete or overwrite existing implementation files unnecessarily.
- Keep the configuration valid for a Playwright + TypeScript framework covering Web, API and DB testing.
- Use the existing project naming conventions.
- Do not hard-code new credentials or secrets beyond the values explicitly provided.
- After creating the structure, show the final directory structure and identify the newly created files.
```

Target structure:

```text
PLAYWRIGHT_OPENCART_AI/
├── .env
├── .gitignore
├── api/
│   ├── endpoints/
│   └── schemas/
├── custom-report/
├── fixtures/
├── pages/
├── prompts/
├── reports/
├── testdata/
├── tests/
│   ├── api/
│   ├── db/
│   └── web/
└── utils/
```

---

## Step 2: Install dependencies

Type: **Manual**

```bash
npm install dotenv @faker-js/faker luxon
npm install ajv csv-parse exceljs
npm install @axe-core/playwright
npm install allure-playwright
npm install mysql2
npm install -D @types/node
npx playwright install
```

| Package | Purpose |
| --- | --- |
| `dotenv` | Loads settings from the `.env` file into your code |
| `@faker-js/faker` | Generates realistic test data such as names, emails and addresses |
| `luxon` | Date and time handling |
| `ajv` | Validates API responses against JSON schemas |
| `csv-parse`, `exceljs` | Read CSV and Excel test data |
| `@axe-core/playwright` | Accessibility testing in Playwright tests |
| `allure-playwright` | Detailed Allure test reports |
| `mysql2` | MySQL client for database tests |
| `@types/node` | TypeScript types for Node.js built-in modules |
| `npx playwright install` | Downloads the browser binaries Playwright needs |

---

## Step 3: Add configuration files

Type: **Prompt**

Three files control how the framework behaves:

| File | Purpose |
| --- | --- |
| `playwright.config.ts` | Test runner settings: timeouts, browsers, retries, reporters, traces, screenshots and videos |
| `tsconfig.json` | TypeScript compiler settings |
| `.env` | Environment-specific values and secrets |

Copy this prompt to your AI coding agent:

```text
Create or update playwright.config.ts, tsconfig.json and .env in the project PLAYWRIGHT_OPENCART_AI.
Use the exact configuration values and settings provided in this guide.

Requirements:
- Create the files if they do not already exist.
- Preserve unrelated existing configuration unless it conflicts with the required settings.
- Apply the requested settings exactly.
- Keep the configuration valid for a Playwright + TypeScript framework.
- Preserve the existing project structure and naming conventions.
- Do not hard-code new credentials or secrets beyond the values explicitly provided.
- After making the changes, summarise the files created or updated and the important settings applied.
```

### playwright.config.ts

This file tells Playwright how to run your tests — timeouts, browsers, retries, reporters, traces, screenshots, videos, and other execution settings.

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"], // Detailed console output
    //['line'], // One-line progress output
    //['dot'],  // Minimal console output
    ["html", { open: "never", outputFolder: "reports" }], // HTML report
    //['json', { outputFile: 'reports/results.json' }],   // JSON report
    ["junit", { outputFile: "reports/results.xml" }], // JUnit report
    ["./utils/CustomReporter.ts"], // Custom reporter
    ["allure-playwright", { outputFolder: "allure-results" }], // Allure report
  ],
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,
    viewport: { width: 1280, height: 720 }, // Consistent default viewport
    ignoreHTTPSErrors: true,
    permissions: ["geolocation"], // For geolocation-based tests
  },
  grep: /@master/,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    /*
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }
    }
    */
  ]
});
```

### tsconfig.json

This file configures how TypeScript compiles your code and defines shortcut import paths such as @utils/ and @pages/.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "lib": ["ES2022", "DOM"],
    "moduleResolution": "node16",
    "types": ["node"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": false,
    "outDir": "dist",
    "ignoreDeprecations": "6.0"
  },
  "include": ["playwright.config.ts"],
  "exclude": ["node_modules"]
}
```

### .env

This file stores URLs, login credentials, and other settings your tests need separately from your code.

Note: Values shown below, including sample credentials, are demo/test values used for this OpenCart practice project. Replace them with your own project's values and do not commit real secrets to source control.

> **Important:** `.env` must be listed in `.gitignore` so secrets are never committed. Commit a `.env.example` instead. The values below are demo values for this OpenCart project.

```ini
# ENVIRONMENT
APP_ENV=qa                      # qa | dev | prod

### WEB APP ###
WEB_APP_URL=http://localhost/opencart/upload/
APP_EMAIL=your_email@example.com
APP_PASSWORD=your_password

# Product details
PRODUCT_NAME=MacBook
PRODUCT_QUANTITY=1
TOTAL_PRICE=$1000.00

### API ###
API_BASE_URL=http://fakestoreapi.com
USERNAME=mor_2314
PASSWORD=83r5^_
USER_ID=1
PRODUCT_ID=1
CART_ID=1
LIMIT=3
START_DATE=2019-12-10
END_DATE=2020-10-10

# Optional authentication (uncomment if required)
#BASIC_AUTH_USERNAME=your_username
#BASIC_AUTH_PASSWORD=your_password
#API_KEY=your_api_key
#OAUTH2_CLIENT_ID=your_client_id
#OAUTH2_CLIENT_SECRET=your_client_secret
#AUTHORIZATION_CODE=your_authorization_code
#TOKEN_URL=your_token_url

### DATABASE ###
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=openshop
DB_PORT=3306

### ADMIN APP ###
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password
```

---

## Step 4: Add test data files

Type: **Manual**

Place the data files in `testdata/`:

```text
testdata/
├── opencart_logindata.json
├── opencart_logindata.csv
└── opencart_logindata.xlsx
```

---

## Step 5: Add API endpoints and schemas

Type: **Manual**

```text
api/
├── endpoints/
│   └── routes.ts                  # Endpoint URL constants
└── schemas/
    ├── product_api_schema.json    # Product response schema
    ├── cart_api_schema.json       # Cart response schema
    └── user_api_schema.json       # User response schema
```

---

## Step 6: Add the custom reporter

Type: **Manual**

```text
utils/
└── CustomReporter.ts
```

---

## Step 7: Add the prompt files

Type: **Manual**

These files hold the written instructions you give the AI agent in Step 9 to generate the tests.

```text
prompts/
├── opencart_web_test_prompts.md
├── fakestore_api_test_prompts.md
├── db_test_prompt.md
└── utilities_prompt.md
```

---

## Step 8: Create helper and utility files

Type: **Manual or Prompt**

Attach `prompts/utilities_prompt.md` and give the agent this prompt:

```text
Read and follow all instructions in `prompts/utilities_prompt.md`.

Create or update the required helper and utility files under the `utils/` folder.

Requirements:
- Follow every requirement defined in `utilities_prompt.md`.
- Reuse existing utilities when appropriate instead of creating duplicate functionality.
- Keep the implementation compatible with Playwright + TypeScript.
- Use the existing project structure, aliases, naming conventions and dependencies.
- Do not modify unrelated files.
- Do not create unnecessary utilities.
- If a required utility already exists, update it only when necessary.
- After implementation, list the utility files created or updated and briefly explain their purpose.
```

---

## Step 9: Generate tests with the agent

Type: **Prompt**

You can give the agent each prompt one at a time or all together.

> **Before you start:** Install the **Playwright MCP** or the **Playwright CLI**, and state in each prompt which one the agent should use.

Playwright CLI documentation: <https://playwright.dev/agent-cli/introduction>
Installation: <https://playwright.dev/agent-cli/installation>

```bash
# Install
npm install -g @playwright/cli@latest
playwright-cli install
playwright-cli install --skills

# Verify
playwright-cli --version
```

Attach the Playwright context file (`playwright-mcp-context.md` in the repo root), then provide the test prompts:

| Layer | Prompt file |
| --- | --- |
| Web | `prompts/opencart_web_test_prompts.md` |
| API | `prompts/fakestore_api_test_prompts.md` |
| DB | `prompts/db_test_prompt.md` |

> **Note:** Page objects (`pages/`) and fixtures (`fixtures/`) are not written by hand. The agent generates them as it builds each test, based on the context file.

### Prompt 1: Web

```text
Use the supplied Playwright MCP/CLI setup and the attached Playwright context file as the implementation context.

Read and follow the web test requirements in `prompts/opencart_web_test_prompts.md`.

Generate the required Playwright + TypeScript web tests.

Requirements:
- Follow the supplied test prompt exactly.
- Use Playwright MCP or Playwright CLI as specified for this task.
- Inspect the application when browser interaction is required.
- Follow the framework structure and conventions defined in the supplied context.
- Use Page Object Model and fixtures where required by the framework/context.
- Reuse existing utilities, test data, configuration and fixtures whenever applicable.
- Do not duplicate existing framework functionality.
- Do not modify unrelated files.
- Add appropriate test tags and assertions based on the supplied test requirements.
- Keep tests maintainable, readable and suitable for repeated execution.
- After implementation, list the files created or updated and explain what was implemented.
```

### Prompt 2: API

```text
Use the supplied Playwright MCP/CLI setup and the attached Playwright context file as the implementation context.

Read and follow the API test requirements in `prompts/fakestore_api_test_prompts.md`.

Generate the required Playwright + TypeScript API tests.

Requirements:
- Follow the supplied test prompt exactly.
- Use the existing API configuration, endpoint definitions, schemas, utilities and fixtures where applicable.
- Reuse existing framework components instead of duplicating functionality.
- Validate HTTP status codes, response data and schemas wherever the test prompt requires.
- Keep API tests independent unless the requirements explicitly define a dependency or sequence.
- Do not hard-code environment-specific values that belong in `.env` or test-data files.
- Do not modify unrelated files.
- Add appropriate test tags.
- After implementation, list the files created or updated and briefly explain the API coverage implemented.
```

### Prompt 3: DB

```text
Use the supplied Playwright MCP/CLI setup and the attached Playwright context file as the implementation context.

Read and follow the database test requirements in `prompts/db_test_prompt.md`.

Generate the required Playwright + TypeScript database tests.

Requirements:
- Follow the supplied database test prompt exactly.
- Use the project's existing DB configuration and `mysql2`-based database utilities where applicable.
- Reuse existing DB client/helper functionality instead of creating duplicate implementations.
- Keep database credentials and environment-specific values in `.env`.
- Validate the database results required by the supplied test prompt.
- Ensure database connections are properly handled and released.
- Do not modify unrelated files.
- Add appropriate test tags.
- After implementation, list the files created or updated and briefly explain the database coverage implemented.
```

---

## Step 10: Add npm scripts and run the tests

Type: **Manual**

Add these scripts to `package.json`:

```json
"scripts": {
  "test": "playwright test",
  "allure:generate": "allure generate allure-results --output allure-report",
  "allure:open": "allure open allure-report",
  "test:api": "playwright test --grep @api",
  "test:web": "playwright test --grep @web",
  "test:master": "playwright test --grep @master",
  "test:sanity": "playwright test --grep @sanity",
  "test:regression": "playwright test --grep @regression",
  "test:e2e": "playwright test --grep @e2e",
  "test:datadriven": "playwright test --grep @datadriven",
  "test:master:headed": "playwright test --grep @sanity --headed",
  "test:sanity:debug": "playwright test --grep @sanity --debug"
}
```

| Command | Description |
| --- | --- |
| `npm run test:api` | Run tests tagged `@api` |
| `npm run test:web` | Run tests tagged `@web` |
| `npm run test:master` | Run tests tagged `@master` |
| `npm run test:sanity` | Run tests tagged `@sanity` |
| `npm run test:regression` | Run tests tagged `@regression` |
| `npm run test:e2e` | Run tests tagged `@e2e` |
| `npm run test:datadriven` | Run tests tagged `@datadriven` |
| `npm run test:master:headed` | Run `@sanity` tests in headed mode |
| `npm run test:sanity:debug` | Run `@sanity` tests in debug mode |

### Run the tests

```bash
npm run test:master
```

### Generate and view the Allure report

The Allure reporter was registered in `playwright.config.ts` in Step 3.

```bash
npm run allure:generate
npm run allure:open
```

---

## Step 11: Push to GitHub

Type: **Manual or Prompt**

> Create and configure `.gitignore` before you add, commit and push. It should exclude `node_modules/`, `.env`, and generated reports and results.

### Using git commands

```bash
git init
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

git status
git add .
git commit -m "Initial commit"

git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main

git pull
```

### Using a prompt

```text
Add, commit and push the latest project changes to the configured GitHub repository.

Follow these steps:
1. Review the current Git status and identify all project changes.
2. Ensure appropriate files are staged. Do not commit secrets, `.env` files, generated files, dependencies or other files excluded by `.gitignore`.
3. Stage the required changes.
4. Create a clear, descriptive commit message based on the actual changes.
5. Commit the changes to the current branch.
6. Push the commit to the configured GitHub remote repository.
7. If there are no changes to commit, do not create an empty commit. Report that the working tree is clean.
8. If the push fails, report the exact reason and do not claim that the push was successful.

After completion, report: commit message, branch, and push result (Successful, Failed or No changes to push).
```

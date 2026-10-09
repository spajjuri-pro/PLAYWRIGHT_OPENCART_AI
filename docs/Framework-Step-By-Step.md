PROMPT - Copy/Paste this to your AI Coding Agent

Create or update the following configuration files in the project:

- Playwright.config.ts
- tsconfig.json
- .env

Create the required folder and file structure for the project root `PLAYWRIGHT_OPENCART_AI`

User the target structure shown in the supplied project context/document.

Requirements:

- Create only the required folder and placeholder files
- Preserve all exsting project files unless they must be updated
- Do not delete or overwrite existing implementation files unnecessarily.
- Keep the configuration valid for a Playwright + Typescript automation framework convering Web, API and DB testing.
- Use the existing project naming conventions.
- After creting the structure, show the final directory structure and briefly identify any files that were newly created.
- Do not hard-code new credentials or secrets beyond the values explicitily provided

Note: Create new files if they don't already exist. then add the settings shown below


**Target Structure:
**

PLAYWRIGHT_OPENCART_AI
--- .env
--- .gitignore
--- api/
    --- endpoints/
    --- schemas/
--- custom-report/
--- fixtures/
--- pages/
--- prompts/
--- tests/
    -- web
    -- api/
    -- db/
--- testdata/
--- utils/
--- reports/


Prerequisites (Manual Actions/steps)

Install
---------------

1. Node.js(latest)
2. VS code (latest)
3. Coding Agent - Claude code/  Github Copilor/ CommandCode/ OpeCode or any other AI coding agent. AI assistant will be used to assist with code generation and debugging.


Install Playwright Using the VS code -

Run:
{
npm init playwright@latest
}

Install all the dependencies

npm install dotenv
npm install @faker-js/faker
npm install luxon
npm install ajv csv-parse xlsx
npm install @axe-core/playwright
npm install allure-playwright
npm install -D @types/node
npm playwright install
npm install mysql2

1.dotenv - loads setting from your .env file into your code
2.@faker-js/faker - generates realistic fake data for testing Ex: Names, emails and addresses
3.luxon - a library for working with dates and times
4.ajv, csv-parse,xlsx - validate JSON schemas and parse CSV and Excel files
5.@axe-core/playwright - integrates accessibility testing into your Playwright tests
6.allure-playwright - generates detailed test reports with Allure
7.mysql2 - a MySQL client for Node.js
8 playwright install - downloads the necessary browser binaries for Playwright
9.@types/node - gives Typescript awareness of Node.js built-in modules


**Create or update the following configuration files in the project PLAYWRIGHT_OPENCART_AI:**

- Playwright.config.ts
- tsconfig.json
- .env

Use the exact configuration values and setting provided in this guide.

Requirements:

- Create the files if they do not already exist
- Preserve unrelated existing configuration unless it conflicts with the required settings.
- Apply the requested settinss exactly
- Keep the configuration valid for a Playwright + Typescript automation framework.
- Preserve the existing project structure and naming conventions.
- Do not hard-code new credentials or secrets beyond the values explicitily provided
- After making the changes, summerize the files created or updated and the important settings applied 

**Target Structure:**

PLAYWRIGHT_OPENCART_AI/
--- .env
--- .gitignore
--- api/
    --- endpoints/
    --- schemas/
--- custom-report/
--- fixtures/
--- pages/
--- prompts/
--- tests/
    -- web
    -- api/
    -- db/
--- testdata/
--- utils/
--- reports/

** Step 2 --- Add or update configuration files **

Three configuration files control how the framework behaves:
- playwright.config.ts - Playwright test-runner settings
- tsconfig.json - Typescript settings
- .env - environment values and secrets

Create or update the following configuration files in the project PLAYWRIGHT_OPENCART_AI:

- Playwright.config.ts
- tsconfig.json
- .env

*** Playwright.config.ts ***

This file tells Playwright how to run tests - timeouts, browsers, retries, reporters, traces, screenshots, videos and other execution settings.

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
    ["list"], //Detailed console output
    //['line'],                 //One line progress output
    //['dot'],                  //Minimal console output
    ["html", {open: "never", outputFolder: "reports" }], //HTML Report
    //['json', {outputFile: 'reports/results.json'}], // JSON Report
    ["junit", {outputFile: "reports/results.xml"}], //JUnit Report
    ["./utils/CustorReporter.ts"],  //Custom Reporter
    ["allure-playwright", { outputFolder: "allure-results" }], //Allure Report
  ],
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,
    viewport: { width: 1280, height: 720 }, //Set default viewport size for consistency
    ignoreHTTPSErrors: true, 
    permissions: ["geolocation"], //Set necessary permissions for geolocation based tests
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
    /*
    {
      name: "safari",
      use: { ...devices["Desktop Safari"] }
    }
    */
  ]
});

***tsconfig.json ***
This file configures how TypeScript compiles your code and defines shortcut import paths sunch as @utils/ and @pages/.


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

*** .env ***
This file stores URLs, login credentials, and other environment-specific values.

Note: This file should be added to your .gitignore file to prevent sensitive information from being committed to version control. And the value shown below, including sample credentials are demo/test values used for this OpenCart project.

#Enviornment

APP_ENV=qa # qa. | prod. | dev

### WEB APP CONFIGURATION ###

# WEB APP URLs
WEB_APP_URL=http://localhost/opencart/upload/

#WEB APP LOGIN CREDENTIALS
APP_EMAIL=pavnol@xyz.com
APP_PASSWORD=test123

#PRODUCT DETAILS
PRODUCT_NAME=MacBook
PRODUCT_QUANTITY=1
TOTAL_PRICE=$1000.00

### API CONFIGURATION ###

#API BASE URL
API_BASE_URL=http://fakestoreapi.com

# API USER DETAILS
USERNAME=mor_2314
PASSWORD=83r5^_
USER_ID=1

# API PRODUCT DETAILS
PRODUCT_ID=1
CART_ID=1
LIMIT=3

#DATE RATENG
START_DATE=2019-12-10
END_DATE=2020-10-10

# BASIC AUTHENTICATION CREDENTIALS (IF REQUIRED)
#BASIC_AUTH_USERNAME=your_username
#BASIC_AUTH_PASSWORD=your_password   

# API KEY (IF REQUIRED)
#API_KEY=your_api_key

#OAUTH2 CONFIGURATION(IF REQUIRED)
#OAUTH2_CLIENT_ID=your_client_id
#OAUTH2_CLIENT_SECRET=your_client_secret
#AUTHORIZATION_CODE=your_authorization_code
#TOKEN_URL=your_token_url

### DATABASE CONFIGURATION ###

#DB CONNECTION
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=openshopt
DB_PORT=3306

#ADMIN APP LOGIN CREDENTIALS
ADMIN_USERNAME=admin@yourstore.com
ADMIN_PASSWORD=admin123

### Step 3 - Add Test Data Files

**Manually**

> **Why this matters:** Keeping test data, such as login credentials or product information, in separate files instead of hard-coding it into tests makes tests reusable and easy to update.

Place test data files inside the `testdata/` folder.

```
testdata/
├── opencart_logindata.json
├── opencart_logindata.csv
└── opencart_logindata.xlsx
```

---

## Step 4 — Add API Endpoints and Schemas Under the `api/` Folder

**Manually**

> **Why this matters:** Separating API route definitions (`endpoints/`) from the JSON “shapes” you expect responses to match (`schemas/`) keeps API tests organized and makes it easy to validate responses automatically.

```
api/
├── endpoints/
│   └── routes.ts                 # Centralized endpoint URL constants
└── schemas/
    ├── product_api_schema.json    # JSON Schema for product responses
    ├── cart_api_schema.json       # JSON Schema for cart responses
    └── user_api_schema.json       # JSON Schema for user responses
```

---

## Step 5 — Create the Custom Reporter and Place It in the `utils` Folder

**Manually**

> **Why this matters:** The custom reporter referenced in `playwright.config.ts` needs an actual file to run — this is where it lives.

```
utils/
└── CustomReporter.ts
```

---

## Step 6 — Place Prompt Files in the `prompts` Folder

**Manually**

These are the written instructions you will later provide to your AI coding agent in Step 8 to generate the actual tests.

Add the following files:

1. `opencart_web_test_prompts.md`
2. `fakestore_api_test_prompts.md`
3. `db_test_prompt.md`
4. `utilitis_prompt.md`

```
promtps/
|── opencart_web_test_prompts.md
|── fakestore_api_test_prompts.md
|── db_test_prompt.md
└── utilitis_prompt.md
```

---

## Step 7 - Create Helper & Utility Files

**Manually or Using Prompt**

> ** Why this matters:** Helper and utility files such as data readers, generators, DB clients, and common helpers provide reusable building blocks that your tests and page objects can call instead of repeating the same logic everywhere.

Supply the `utilities_prompt.md` file to the AI agent and give it the prompt below.

### PROMPT - Copy/Paste this to your AI Coding Agent.

''' text
Read and follow alll instructions in `prompts\utilities_prompt.md`.

Create or update the required helper and utility files under the `utils/` folder.

Requirements:

- Follow every requirement defined in `utilitis_prompt.md`.
- Reuse existing utilities when appropriate instead of creating duplicate functionality.
- Keep the implementation compatible with Playwright + TypeScript.
- Use the existing project structure, aliases, naming conventions and dependencies
- Do not modify unrelated files.
- Do not create unncessary utilities
- If a required utlity already exists, update it only when necessary.
- After implementation, list the utlity files created or updated and briefly explain their purpose.

## Step 8 — Generate Tests Using the Prompts Stored in the `prompts` Folder

You can give the AI coding agent each prompt one at a time, or all of them at once.

> **Note:** Make sure you have installed **Playwright MCP** or the **Playwright CLI** before proceeding further. Clearly state in the prompt which mechanism the agent should use: **MCP** or **CLI**.

Refer to the Playwright CLI Documentation:
`https://playwright.dev/agent-cli/introduction`

Installation instructions:
`https://playwright.dev/agent-cli/installation`

```bash
# Installation
npm install -g @playwright/cli@latest
playwright-cli install
playwright-cli install --skills

# Verify
playwright-cli --version
```

Attach `playwright_mcp_context.md`, then provide the test prompts from the following files:

1. `opencart_web_test_prompts.md`
2. `fakestore_api_test_prompts.md`
3. `db_test_prompt.md`

## Prompt 1 — Web

### PROMPT — Copy/Paste This to Your AI Coding Agent

```text
Use the supplied Playwright MCP/CLI setup and the attached `playwright_mcp_context.md` as the implementation context.

Read and follow the web test requirements in `prompts/opencart_web_test_prompts.md`.

Generate the required Playwright + TypeScript web tests.

Requirements:
- Follow the supplied test prompt exactly.
- Use Playwright MCP or Playwright CLI as specified for this task.
- Inspect the application when browser interaction is required.
- Follow the framework structure and conventions defined in the supplied context.
- Use Page Object Model and fixtures where required by the framework/context.
- Reuse existing utilities, test data, configuration, and fixtures whenever applicable.
- Do not duplicate existing framework functionality.
- Do not modify unrelated files.
- Add appropriate test tags and assertions based on the supplied test requirements.
- Keep tests maintainable, readable, and suitable for repeated execution.
- After implementation, list the files created or updated and explain what was implemented.
```

## Prompt 2 — API

### PROMPT — Copy/Paste This to Your AI Coding Agent

```text
Use the supplied Playwright MCP/CLI setup and the attached `playwright_mcp_context.md` as the implementation context.

Read and follow the API test requirements in `prompts/fakestore_api_test_prompts.md`.

Generate the required Playwright + TypeScript API tests.

Requirements:
- Follow the supplied test prompt exactly.
- Use the existing API configuration, endpoint definitions, schemas, utilities, and fixtures where applicable.
- Reuse existing framework components instead of duplicating functionality.
- Validate HTTP status codes, response data, and schemas wherever required by the supplied test prompt.
- Keep API tests independent unless the supplied test requirements explicitly define a dependency or sequence.
- Do not hard-code environment-specific values that belong in `.env` or test-data files.
- Do not modify unrelated files.
- Add appropriate test tags.
- After implementation, list the files created or updated and briefly explain the API coverage implemented.
```

## Prompt 3 — DB

### PROMPT — Copy/Paste This to Your AI Coding Agent

```text
Use the supplied Playwright MCP/CLI setup and the attached `playwright_mcp_context.md` as the implementation context.

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

> **Note:** Page Object classes (`pages/`) and fixtures (`fixtures/`) are not created manually — the coding agent generates them automatically as it builds each test, based on the context supplied in `playwright_mcp_context.md`.

## Step 9 — Update `package.json` With Custom Test Commands

**Manually**

> **Why this matters:** Custom npm scripts let you or your CI pipeline run a specific group of tests — such as only `@sanity` tests — with one short command instead of typing the full Playwright command every time.

Update `package.json` to add the following custom scripts for running tagged test suites:

```json
"scripts": {
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

## Example Commands to Run the Tests

| Command                      | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `npm run test:api`           | Run tests tagged with `@api`                  |
| `npm run test:web`           | Run tests tagged with `@web`                  |
| `npm run test:master`        | Run tests tagged with `@master`               |
| `npm run test:sanity`        | Run tests tagged with `@sanity`               |
| `npm run test:regression`    | Run tests tagged with `@regression`           |
| `npm run test:e2e`           | Run tests tagged with `@e2e`                  |
| `npm run test:datadriven`    | Run tests tagged with `@datadriven`           |
| `npm run test:master:headed` | Run tests taggedwith `@master` in headed mode |
| `npm run test:sanity:debug`  | Run tests tagged with `@sanity` in debug mode |

## Run the Tests

```bash
npm run test:master
```

## Generate and View the Allure Report

The Allure reporter was registered in `playwright.config.ts` in Step 2.

```bash
allure generate ./allure-results -o ./allure-report --clean
allure open ./allure-report
```
---
## Step 10 — Push the Project to GitHub

**Using Prompt or Manually**

> Make sure you create and configure a `.gitignore` file before adding, committing, and pushing your code to GitHub.

### Git Workflow -Using _git_ commands

The most commonly used commands are:

```bash
git init
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

git status
git add .
git commit -m "Initial commit"

git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin master

git pull
### PROMPT — Copy/Paste This to Your AI Coding Agent

```text
Add, commit, and push the latest project changes to the configured GitHub repository.

Follow these steps:

1. Review the current Git status and identify all project changes.
2. Ensure appropriate files are staged. Do not commit secrets, `.env` files, generated files, dependencies, or other files excluded by `.gitignore`.
3. Stage the required changes.
4. Create a clear and descriptive commit message based on the actual changes.
5. Commit the changes to the current branch.
6. Push the commit to the configured GitHub remote repository.
7. If there are no changes to commit, do not create an empty commit. Report that the working tree is clean.
8. If the push fails, report the exact reason and do not claim that the push was successful.

After completion, report:
Commit message,Branch,Push result (Successful or Failed or No changes to push)

```

---

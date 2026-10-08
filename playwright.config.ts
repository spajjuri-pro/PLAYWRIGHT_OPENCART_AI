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
    ["./utils/CustomReporter.ts"],  //Custom Reporter
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
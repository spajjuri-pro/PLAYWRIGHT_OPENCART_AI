#!/usr/bin/env bash

set -e

echo "================================================="
echo "Environment Setup - Playwright + opencart"
echo "================================================="

echo "[1/7] Install test data, env vars, date-time handling"
npm install dotenv @faker-js/faker luxon

echo "[2/7] Install API/data validation"
npm install ajv csv-parse xlsx

echo "[3/7] Install accessibility testing"
npm install @axe-core/playwright

echo "[4/7] Install reporting tools"
npm install allure-playwright

echo "[5/7] Install TypeScript type definitions"
npm install -D @types/node

echo "[6/7] Install Playwright browsers"
npx playwright install

echo "[7/7] Install MySQL client"
npm install mysql2

echo "Environment setup completed successfully."
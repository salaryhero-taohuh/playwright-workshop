# Playwright Workshop - Test Automation

A comprehensive Playwright test automation framework for end-to-end testing. This project demonstrates best practices using the Page Object Model pattern and modern Playwright testing practices.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Yarn** (v1.22 or higher)

You can verify your installation:
```bash
node --version
yarn --version
```

## Project Folder Structure

```
playwright-workshop/
├── tests/                      # Test specifications
│   └── login.spec.ts          # Login feature tests
├── pages/                      # Page Object Model classes
│   └── LoginPage.ts           # Login page object
├── playwright.config.ts        # Playwright configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

### Folder Descriptions

- **`tests/`** - Contains all test specifications (`.spec.ts` files). Organized by feature or page.
- **`pages/`** - Contains Page Object Model classes that encapsulate page interactions and selectors. Each page has its own class.
- **`playwright-report/`** - Generated HTML test reports (auto-generated after test runs).
- **`test-results/`** - Test execution artifacts and traces (auto-generated).

## Installation

1. **Clone or navigate to the project directory:**
```bash
cd playwright-workshop
```

2. **Install dependencies:**
```bash
yarn install
```

This will install all project dependencies including:
- `@playwright/test` - Playwright testing framework
- `@types/node` - TypeScript definitions for Node.js

3. **Install Playwright browsers:**
```bash
yarn playwright:install
```

This command downloads the browser binaries (Chromium, Firefox, WebKit) required for testing. You only need to run this once, or after updating Playwright.

## Setup & Configuration

The project is configured via `playwright.config.ts`. Key configurations:

### Browser
- **Default**: Chromium (configured in `projects`)
- To add more browsers (Firefox, WebKit), uncomment and modify the `projects` array

### Test Directory
- Tests are located in the `./tests` directory

### Parallel Execution
- **Local**: Tests run in parallel for faster execution
- **CI Environment**: Sequential execution (1 worker) for stability

### Retries
- **Local**: No retries (fail fast for development)
- **CI Environment**: 2 retries for flaky test handling

### Reporting
- **HTML Reporter**: Auto-generated after each test run
- View report: Open `playwright-report/index.html` in your browser

### Trace Viewer
- Enabled on first retry for debugging failed tests
- Provides step-by-step execution details and screenshots

## Running Tests

### Run All Tests (Headless)
```bash
yarn test
```
This runs all tests in headless mode and generates an HTML report.

### Run Tests in UI Mode
```bash
yarn test:ui
```
Opens the Playwright Inspector UI where you can:
- Watch tests run in a browser window
- Step through test execution
- Inspect DOM elements
- Debug in real-time

### Run Tests with Debugging
```bash
yarn test:debug
```
Launches Playwright Inspector for step-by-step debugging.

### Run Specific Test File
```bash
yarn test tests/login.spec.ts
```

### Run Tests with Specific Browser
```bash
yarn test --project=chromium
```

### View Test Report
After running tests, view the HTML report:
```bash
yarn report
```

## Project Features

✅ **Parallel Test Execution** - Tests run concurrently for faster feedback  
✅ **Page Object Model** - Maintainable, organized test code  
✅ **HTML Reports** - Detailed test results with screenshots  
✅ **Trace Viewer** - Debug failed tests with full execution traces  
✅ **Smart Retries** - Automatic retry on CI for flaky tests  
✅ **TypeScript Support** - Full type safety for better development experience  

## Understanding the Page Object Model

The Page Object Model (POM) is a design pattern that:
- Encapsulates page elements and interactions in a reusable class
- Reduces test code duplication
- Makes tests more maintainable and readable

### Example: LoginPage

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async fillUsername(username: string) {
    await this.page.fill('[data-testid="username"]', username);
  }

  async fillPassword(password: string) {
    await this.page.fill('[data-testid="password"]', password);
  }

  async clickLogin() {
    await this.page.click('button[type="submit"]');
  }
}
```

### Using in Tests

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('should log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsername('user@example.com');
  await loginPage.fillPassword('password123');
  await loginPage.clickLogin();
  await expect(page).toHaveURL('/dashboard');
});
```

## Troubleshooting

### Tests are slow
- Check if tests are running in parallel (default behavior)
- Reduce browser context reuse if needed
- Review test-specific waits and timeouts

### "Browser not found" error
- Run `yarn playwright:install` to install browser binaries
- Ensure Node.js is properly installed

### Tests fail locally but pass in CI
- Check for environment-specific configurations
- Verify base URL and test data are consistent
- Review trace files in `test-results/` for debugging

### Can't find elements in tests
- Use Playwright Inspector: `yarn test:debug`
- Check DOM structure in browser DevTools
- Verify selectors are stable and unique

## CI/CD Integration

The project is configured for CI environments via the `CI` environment variable:

```bash
CI=true yarn test
```

This will:
- Use 1 worker (sequential execution)
- Retry failed tests up to 2 times
- Generate HTML reports for analysis

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test Guide](https://playwright.dev/docs/intro)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

## License

MIT

## Author

Playwright Workshop Team

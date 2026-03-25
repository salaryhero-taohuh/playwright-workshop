import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;
const adminAccount = {
  email: 'pimpakarn@salary-hero.com',
  password: 'Qa123456789!',
};

test.describe('1. Assertion', () => {
  test('1.1 toBeVisible', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);
    await expect(page.locator('[data-testid="profile-name"]')).toBeVisible();
  });

  test('1.2 toHaveText', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);
    await expect(page.locator('[data-testid="profile-name"]')).toHaveText('Pimpakarn Wannasirikul');
  });

  test('1.3 toHaveAttribute', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);
    await expect(page.locator('[data-testid="profile-name"]')).toHaveAttribute('class', 'sc-enkILE iaGSMa');
  });

  test('1.4 toHaveCount', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);
    await expect(page.locator('[data-testid="profile-name"]')).toHaveCount(1);
  });

  test('1.5 toHaveValue', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);
    await expect(page.locator('[data-testid="input-email"]')).toHaveValue(adminAccount.email);
  });

  test('1.6 toHaveTitle', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await expect(page).toHaveTitle('Backoffice Salary Hero');
  });

  test('1.7 toHaveURL', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await expect(page).toHaveURL('https://backoffice-salary-hero-dev.web.app/login');
  });
})

test.describe('2. Timeout', () => {
  test('2.1 failed because of timeout', async ({ page }) => {
    await page.route('https://apiv2-dev.salary-hero.com/api/v1/admin/account/profile', async (route) => {
      await page.waitForTimeout(6000);
      route.continue();
    });

    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);

    await page.waitForResponse('https://apiv2-dev.salary-hero.com/api/v1/admin/account/profile');
    await expect(page.locator('[data-testid="profile-name"]')).toBeVisible();
  });

  test('2.2 passed because of increased timeout', async ({ page }) => {
    await page.route('https://apiv2-dev.salary-hero.com/api/v1/admin/account/profile', async (route) => {
      await page.waitForTimeout(6000);
      route.continue();
    });

    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);

    // Increase the timeout to 10 seconds to allow for the delayed response
    await expect(page.locator('[data-testid="profile-name"]')).toBeVisible({ timeout: 10000});
  });
});

test.describe('3. UI Changes', () => {
  test('3.1 failed because of UI changes', async ({ page }) => {
    await page.route('https://apiv2-dev.salary-hero.com/api/v2/admin/account/employee?page=1&per_page=10&is_show_deleted=0', async (route) => {
      await page.waitForTimeout(6000);
      route.continue();
    });

    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);

    await page.locator('[data-testid="Employee-menu"]').click();

    await expect(page.locator('[data-testid="undefined-row-0"]').locator('.huMEQW').nth(0))
    .toHaveText('PCS Company - integration');
  });

  test('3.2 passed because of wait for API response', async ({ page }) => {
    await page.route('https://apiv2-dev.salary-hero.com/api/v2/admin/account/employee?page=1&per_page=10&is_show_deleted=0', async (route) => {
      await page.waitForTimeout(6000);
      route.continue();
    });

    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);
    
    await page.locator('[data-testid="Employee-menu"]').click();

    await page.waitForResponse('https://apiv2-dev.salary-hero.com/api/v2/admin/account/employee?page=1&per_page=10&is_show_deleted=0');
    await expect(page.locator('[data-testid="undefined-row-0"]').locator('.huMEQW').nth(0))
    .toHaveText('PCS Company - integration');
  });

  test('3.3 passed but bad practice because wait for a fixed time', async ({ page }) => {
    await page.route('https://apiv2-dev.salary-hero.com/api/v2/admin/account/employee?page=1&per_page=10&is_show_deleted=0', async (route) => {
      await page.waitForTimeout(6000);
      route.continue();
    });

    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);
    
    await page.locator('[data-testid="Employee-menu"]').click();

    // Wait for a fixed time of 6 seconds before checking the assertion
    await page.waitForTimeout(6000);
    await expect(page.locator('[data-testid="undefined-row-0"]').locator('.huMEQW').nth(0))
    .toHaveText('PCS Company - integration');
  })
});

test.describe('4. Locator Issues', () => {
  test('4.1 failed because of locator issues', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);

    await page.locator('[data-testid="Employee-menu"]').click();
    await expect(page.locator('.ant-space-item')).toHaveText('Create Employee');
  });

  test('4.2 passed because of correct locator', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(adminAccount.email, adminAccount.password);

    await page.locator('[data-testid="Employee-menu"]').click();
    await expect(page.getByText('Create Employee')).toBeVisible();
  });
})
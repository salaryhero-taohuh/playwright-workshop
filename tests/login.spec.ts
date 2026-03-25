import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test('should login successfully', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login('testusertest', 'password123');
  await expect(loginPage.page).toHaveURL('https://backoffice-salary-hero-dev.web.app/');
  await expect(loginPage.page.locator('h1')).toHaveText('Welcome, testuser!');
});
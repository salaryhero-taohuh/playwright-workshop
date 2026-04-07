import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.inputEmail = page.locator('[data-testid="input-email"]');
    this.inputPassword = page.locator('[data-testid="input-password"]');
    this.buttonLogin = page.locator('[data-testid="button-login"]');
  }

  async openLoginPage() {
    await this.page.goto('https://backoffice-salary-hero-dev.web.app/');
  }

  async login(username: string, password: string) {
    await this.inputEmail.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
  }
}
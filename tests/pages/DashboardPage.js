const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.url = '/dashboard';
  }

  async goto() {
    await this.page.goto(new URL(this.url, 'http://localhost:3000').toString());
  }

  async logout() {
    await this.page.getByTestId('logout-button').click();
  }

  async expectWelcomeMessage(name) {
    await expect(this.page.getByTestId('dashboard-welcome')).toContainText(name);
  }
}

module.exports = { DashboardPage };

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.url = '/dashboard';
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async logout() {
    await this.page.getByTestId('logout-button').click();
  }

  async expectWelcomeMessage(name) {
    await this.page.getByTestId('dashboard-welcome').toContainText(name);
  }
}

module.exports = { DashboardPage };

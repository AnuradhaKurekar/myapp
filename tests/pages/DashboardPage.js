class DashboardPage {
  constructor(page) {
    this.page = page;
    this.url = '/dashboard';
    this.welcomeMessage = page.getByTestId('dashboard-welcome');
    this.logoutButton = page.getByTestId('logout-button');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { DashboardPage };

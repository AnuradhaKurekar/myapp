class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.url = '/forgot-password';
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async enterEmail(email) {
    await this.page.getByTestId('forgot-email-input').fill(email);
  }

  async submit() {
    await this.page.getByTestId('send-reset-button').click();
  }

  async requestReset(email) {
    await this.enterEmail(email);
    await this.submit();
  }

  async expectError(message) {
    await this.page.getByTestId('forgot-email-error').toHaveText(message);
  }

  async expectSuccessMessage(email) {
    await this.page.getByTestId('reset-success-message').toContainText(email);
  }

  async goBackToLogin() {
    await this.page.getByTestId('back-to-login-link').click();
  }
}

module.exports = { ForgotPasswordPage };

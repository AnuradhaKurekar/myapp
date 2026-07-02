class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.url = '/forgot-password';
    this.emailInput = page.getByTestId('forgot-email-input');
    this.submitButton = page.getByTestId('send-reset-button');
    this.errorMessage = page.getByTestId('forgot-email-error');
    this.successMessage = page.getByTestId('reset-success-message');
    this.backToLoginLink = page.getByTestId('back-to-login-link');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async submit() {
    await this.submitButton.click();
  }

  async requestReset(email) {
    await this.enterEmail(email);
    await this.submit();
  }

  async goBackToLogin() {
    await this.backToLoginLink.click();
  }
}

module.exports = { ForgotPasswordPage };

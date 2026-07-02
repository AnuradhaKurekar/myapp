class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = '/login';
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.submitButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('login-error');
    this.forgotPasswordLink = page.getByTestId('forgot-password-link');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillCredentials({ email = '', password = '' }) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(credentials) {
    await this.fillCredentials(credentials);
    await this.submit();
  }

  async openForgotPassword() {
    await this.forgotPasswordLink.click();
  }
}

module.exports = { LoginPage };

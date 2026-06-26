class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = '/login';
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillCredentials({ email, password }) {
    if (email !== undefined) {
      await this.page.getByTestId('login-email-input').fill(email);
    }
    if (password !== undefined) {
      await this.page.getByTestId('login-password-input').fill(password);
    }
  }

  async submit() {
    await this.page.getByTestId('login-button').click();
  }

  async login(credentials) {
    await this.fillCredentials(credentials);
    await this.submit();
  }

  async openForgotPassword() {
    await this.page.getByTestId('forgot-password-link').click();
  }

  async expectError(message) {
    await this.page.getByTestId('login-error').toHaveText(message);
  }
}

module.exports = { LoginPage };

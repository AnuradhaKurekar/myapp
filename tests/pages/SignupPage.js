class SignupPage {
  constructor(page) {
    this.page = page;
    this.url = '/signup';
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillForm({ firstName, lastName, email, password }) {
    if (firstName !== undefined) {
      await this.page.getByTestId('firstname-input').fill(firstName);
    }
    if (lastName !== undefined) {
      await this.page.getByTestId('lastname-input').fill(lastName);
    }
    if (email !== undefined) {
      await this.page.getByTestId('email-input').fill(email);
    }
    if (password !== undefined) {
      await this.page.getByTestId('password-input').fill(password);
    }
  }

  async submit() {
    await this.page.getByTestId('submit-button').click();
  }

  async signup(user) {
    await this.fillForm(user);
    await this.submit();
  }

  async getErrorText(field) {
    return this.page.getByTestId(`${field}-error`).textContent();
  }

  async expectFirstNameError(message) {
    await this.page.getByTestId('firstname-error').toHaveText(message);
  }

  async expectLastNameError(message) {
    await this.page.getByTestId('lastname-error').toHaveText(message);
  }

  async expectEmailError(message) {
    await this.page.getByTestId('email-error').toHaveText(message);
  }

  async expectPasswordError(message) {
    await this.page.getByTestId('password-error').toHaveText(message);
  }
}

module.exports = { SignupPage };

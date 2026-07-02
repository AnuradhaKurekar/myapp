class SignupPage {
  constructor(page) {
    this.page = page;
    this.url = '/signup';
    this.firstNameInput = page.getByTestId('firstname-input');
    this.lastNameInput = page.getByTestId('lastname-input');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByTestId('submit-button');
    this.firstNameError = page.getByTestId('firstname-error');
    this.lastNameError = page.getByTestId('lastname-error');
    this.emailError = page.getByTestId('email-error');
    this.passwordError = page.getByTestId('password-error');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillForm({ firstName = '', lastName = '', email = '', password = '' }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async signUp(user) {
    await this.fillForm(user);
    await this.submit();
  }
}

module.exports = { SignupPage };

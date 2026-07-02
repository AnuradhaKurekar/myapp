# Integration Testing Agent

## Purpose of this testing setup

This project uses Playwright with a Page Object Model (POM) structure to test the React authentication flows end to end. The goal is to validate real user journeys such as sign up, login, password reset, and dashboard access while keeping tests maintainable, readable, and isolated from raw UI selectors.

The setup is designed to:
- test the app through the browser as a real user would
- keep selectors centralized in page objects
- make tests easier to extend for future features
- verify validation, success, failure, and navigation flows

## Folder structure and what each file does

```text
tests/
├── pages/
│   ├── SignupPage.js
│   ├── LoginPage.js
│   ├── ForgotPasswordPage.js
│   └── DashboardPage.js
├── signup/
│   └── signup.spec.js
├── login/
│   └── login.spec.js
├── forgotPassword/
│   └── forgotPassword.spec.js
└── dashboard/
    └── dashboard.spec.js
```

### Page objects
- `tests/pages/SignupPage.js`: encapsulates selectors and actions for the signup page.
- `tests/pages/LoginPage.js`: encapsulates selectors and actions for the login page.
- `tests/pages/ForgotPasswordPage.js`: encapsulates selectors and actions for the forgot-password page.
- `tests/pages/DashboardPage.js`: encapsulates selectors and actions for the dashboard page.

### Spec files
- `tests/signup/signup.spec.js`: tests signup validation and successful registration.
- `tests/login/login.spec.js`: tests login validation, error handling, and navigation.
- `tests/forgotPassword/forgotPassword.spec.js`: tests email validation, reset request success, and navigation back to login.
- `tests/dashboard/dashboard.spec.js`: tests protected-route behavior and logout flow.

## Page Object Model conventions used

The tests follow these conventions:
- Page objects own all selectors and UI actions.
- Spec files contain only test logic and assertions.
- Each page object exposes methods like `goto()`, `fillForm()`, `submit()`, or `login()`.
- Tests use the page object API instead of calling `page.locator(...)` directly.
- Shared setup such as clearing `localStorage` is handled in `beforeEach` inside each spec.

## How to run the tests

From the project root:

### Run all browsers
```bash
npx playwright test
```

### Run a single browser
```bash
npx playwright test --project=chromium
```

Other valid browser project names:
```bash
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a single file
```bash
npx playwright test tests/signup/signup.spec.js
```

### Run a specific test by title
```bash
npx playwright test tests/login/login.spec.js --grep "logs in successfully"
```

### Show the HTML report
```bash
npx playwright show-report
```

## Scenarios covered per module

### Signup module
Covered scenarios:
- empty form submission shows all required field errors
- invalid email format shows the email validation error
- short password shows the password validation error
- successful signup redirects to the login page

### Login module
Covered scenarios:
- login without an existing account shows the correct error
- invalid credentials show the authentication error
- successful login redirects to the dashboard
- the forgot-password link navigates to the reset page

### Forgot password module
Covered scenarios:
- empty email shows a validation error
- invalid email format shows a validation error
- valid email submission shows the success message
- back-to-login link returns to the login page

### Dashboard module
Covered scenarios:
- unauthenticated access redirects to login
- authenticated access shows the welcome message
- logout returns the user to login

## How to add new page objects and tests for future features

1. Create a new page object file in `tests/pages/`.
2. Define a class that accepts `page` and stores selectors using Playwright locators.
3. Add reusable methods for actions such as navigation, filling fields, submitting forms, and reading UI state.
4. Create a new spec file in the relevant folder under `tests/`.
5. Keep the spec focused on test steps and assertions only.
6. Reuse the same setup pattern for clearing storage and navigating to the app.
7. Use existing page objects as patterns for naming and structure.

Example pattern:
```js
class NewFeaturePage {
  constructor(page) {
    this.page = page;
    this.url = '/new-feature';
    this.someInput = page.getByTestId('some-input');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async doSomething() {
    await this.someInput.fill('value');
  }
}
```

## data-testid naming convention used

The app uses a simple, descriptive `data-testid` convention based on the UI element purpose:

- form field names are prefixed by the feature and field role, for example:
  - `firstname-input`
  - `lastname-input`
  - `email-input`
  - `password-input`
  - `login-email-input`
  - `login-password-input`
  - `forgot-email-input`
- action buttons use a clear verb-based name, for example:
  - `submit-button`
  - `login-button`
  - `send-reset-button`
  - `logout-button`
- validation and feedback elements use descriptive names such as:
  - `firstname-error`
  - `email-error`
  - `login-error`
  - `forgot-email-error`
  - `reset-success-message`
  - `dashboard-welcome`
- navigation links use intent-based names such as:
  - `forgot-password-link`
  - `back-to-login-link`

When adding new UI elements for tests, follow the same pattern:
```text
<feature>-<element-type-or-purpose>
```

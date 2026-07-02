const { test, expect } = require('@playwright/test');
const  LoginPage  = require('../pages/LoginPage');
const  SignupPage  = require('../pages/SignupPage');

const uniqueEmail = () => `login${Date.now()}@example.com`;

test.describe('Login flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows an error when no account exists', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login({ email: 'missing@example.com', password: 'password123' });

    await loginPage.expectError('No account found. Please sign up first.');
  });

  test('shows an error for invalid credentials', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const email = uniqueEmail();

    await signupPage.goto();
    await signupPage.signup({
      firstName: 'Login',
      lastName: 'User',
      email,
      password: 'correctpass123'
    });

    await loginPage.goto();
    await loginPage.login({ email, password: 'wrongpass' });

    await loginPage.expectError('Invalid email or password.');
  });

  test('logs in successfully and navigates to dashboard', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const email = uniqueEmail();

    await signupPage.goto();
    await signupPage.signup({
      firstName: 'Login',
      lastName: 'User',
      email,
      password: 'correctpass123'
    });

    await loginPage.goto();
    await loginPage.login({ email, password: 'correctpass123' });

    await expect(page).toHaveURL(/\/dashboard$/);
  });

  test('navigates to forgot password page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.openForgotPassword();

    await expect(page).toHaveURL(/\/forgot-password$/);
  });
});

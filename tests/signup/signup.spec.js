const { test, expect } = require('@playwright/test');
const SignupPage = require('../pages/SignupPage');

const uniqueEmail = () => `user${Date.now()}@example.com`;

test.describe('Signup flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows validation errors for empty signup submission', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.submit();

    await expect(page.getByTestId('firstname-error')).toHaveText('First name is required');
    await expect(page.getByTestId('lastname-error')).toHaveText('Last name is required');
    await expect(page.getByTestId('email-error')).toHaveText('Email is required');
    await expect(page.getByTestId('password-error')).toHaveText('Password is required');
  });

  test('shows validation errors for invalid email and short password', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'invalid-email',
      password: '123'
    });

    await expect(page.getByTestId('email-error')).toHaveText('Email is invalid');
    await expect(page.getByTestId('password-error')).toHaveText('Password must be at least 6 characters');
  });

  test('registers a new user and redirects to login', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const email = uniqueEmail();

    await signupPage.goto();
    await signupPage.signup({
      firstName: 'Jane',
      lastName: 'Doe',
      email,
      password: 'securepass123'
    });

    await expect(page).toHaveURL(/\/login$/);
  });
});

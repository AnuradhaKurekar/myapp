const { test, expect } = require('@playwright/test');
const ForgotPasswordPage = require('../pages/ForgotPasswordPage');


test.describe('Forgot password flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows validation errors for empty email', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();
    await forgotPasswordPage.submit();

    await forgotPasswordPage.expectError('Email is required');
  });

  test('shows validation error for invalid email format', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();
    await forgotPasswordPage.requestReset('invalid-email');

    await forgotPasswordPage.expectError('Please enter a valid email');
  });

  test('shows a success message for a valid email', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();
    await forgotPasswordPage.requestReset('user@example.com');

    await forgotPasswordPage.expectSuccessMessage('user@example.com');
  });

  test('returns to login from forgot password', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();
    await forgotPasswordPage.goBackToLogin();

    await expect(page).toHaveURL(/\/login$/);
  });
});

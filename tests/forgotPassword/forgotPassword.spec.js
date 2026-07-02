const { test, expect } = require('@playwright/test');
const { ForgotPasswordPage } = require('../pages/ForgotPasswordPage');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('shows validation error for empty email', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.goto();
  await forgotPasswordPage.submit();

  await expect(forgotPasswordPage.errorMessage).toHaveText('Email is required');
});

test('shows validation error for invalid email format', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.goto();
  await forgotPasswordPage.requestReset('not-an-email');

  await expect(forgotPasswordPage.errorMessage).toHaveText('Please enter a valid email');
});

test('shows success message for a valid reset request', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.goto();
  await forgotPasswordPage.requestReset('ada@example.com');

  await expect(forgotPasswordPage.successMessage).toContainText('a reset link has been sent');
});

test('returns to login from forgot password page', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.goto();
  await forgotPasswordPage.goBackToLogin();

  await expect(page).toHaveURL(/\/login$/);
});

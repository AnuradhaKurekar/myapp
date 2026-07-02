const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('shows validation errors for empty signup submission', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.submit();

  await expect(signupPage.firstNameError).toHaveText('First name is required');
  await expect(signupPage.lastNameError).toHaveText('Last name is required');
  await expect(signupPage.emailError).toHaveText('Email is required');
  await expect(signupPage.passwordError).toHaveText('Password is required');
});

test('shows validation errors for invalid email and short password', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.fillForm({
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'invalid-email',
    password: '123'
  });
  await signupPage.submit();

  await expect(signupPage.emailError).toHaveText('Email is invalid');
  await expect(signupPage.passwordError).toHaveText('Password must be at least 6 characters');
});

test('registers a user successfully and redirects to login', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.signUp({
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    password: 'password123'
  });

  await expect(page).toHaveURL(/\/login$/);
});

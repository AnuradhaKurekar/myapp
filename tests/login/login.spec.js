const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('shows an error when no account exists', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login({ email: 'missing@example.com', password: 'password123' });

  await expect(loginPage.errorMessage).toHaveText('No account found. Please sign up first.');
});

test('shows an error for invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.evaluate(() => {
    localStorage.setItem('registeredUser', JSON.stringify({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      password: 'password123',
      name: 'Ada Lovelace'
    }));
  });
  await loginPage.goto();
  await loginPage.login({ email: 'ada@example.com', password: 'wrongpass' });

  await expect(loginPage.errorMessage).toHaveText('Invalid email or password.');
});

test('logs in successfully and redirects to dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.evaluate(() => {
    localStorage.setItem('registeredUser', JSON.stringify({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      password: 'password123',
      name: 'Ada Lovelace'
    }));
  });
  await loginPage.goto();
  await loginPage.login({ email: 'ada@example.com', password: 'password123' });

  await expect(page).toHaveURL(/\/dashboard$/);
});

test('navigates to forgot password page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.openForgotPassword();

  await expect(page).toHaveURL(/\/forgot-password$/);
});

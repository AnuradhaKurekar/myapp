const { test, expect } = require('@playwright/test');
const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

const uniqueEmail = () => `dashboard${Date.now()}@example.com`;

test.describe('Dashboard flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows the dashboard welcome message for authenticated users', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const email = uniqueEmail();

    await signupPage.goto();
    await signupPage.signup({
      firstName: 'Dashboard',
      lastName: 'User',
      email,
      password: 'dashboardpass123'
    });

    await loginPage.goto();
    await loginPage.login({ email, password: 'dashboardpass123' });

    await dashboardPage.expectWelcomeMessage('Dashboard User');
  });

  test('logs out and redirects to login', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const email = uniqueEmail();

    await signupPage.goto();
    await signupPage.signup({
      firstName: 'Logout',
      lastName: 'User',
      email,
      password: 'logoutpass123'
    });

    await loginPage.goto();
    await loginPage.login({ email, password: 'logoutpass123' });
    await dashboardPage.logout();

    await expect(page).toHaveURL(/\/login$/);
  });

  test('redirects to login when no user is logged in', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();

    await expect(page).toHaveURL(/\/login$/);
  });
});

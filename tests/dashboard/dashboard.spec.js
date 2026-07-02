const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('redirects unauthenticated users to login', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();

  await expect(page).toHaveURL(/\/login$/);
});

test('shows the dashboard for an authenticated user and allows logout', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await page.evaluate(() => {
    localStorage.setItem('loggedInUser', JSON.stringify({
      name: 'Ada Lovelace',
      email: 'ada@example.com'
    }));
  });
  await dashboardPage.goto();

  await expect(dashboardPage.welcomeMessage).toHaveText('Welcome, Ada Lovelace! 🎉');
  await dashboardPage.logout();

  await expect(page).toHaveURL(/\/login$/);
});

const { chromium } = require('@playwright/test');
const { SignupPage } = require('./pages/SignupPage');
const { LoginPage } = require('./pages/LoginPage');
const { ForgotPasswordPage } = require('./pages/ForgotPasswordPage');
const { DashboardPage } = require('./pages/DashboardPage');

const uniqueEmail = (prefix) => `${prefix}${Date.now()}@example.com`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const signupPage = new SignupPage(page);
  const loginPage = new LoginPage(page);
  const forgotPasswordPage = new ForgotPasswordPage(page);
  const dashboardPage = new DashboardPage(page);

  try {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());

    const email = uniqueEmail('signup');
    await signupPage.goto();
    await signupPage.signup({
      firstName: 'Integration',
      lastName: 'User',
      email,
      password: 'password123'
    });
    await page.waitForURL('**/login');

    await loginPage.goto();
    await loginPage.login({ email, password: 'password123' });
    await page.waitForURL('**/dashboard');
    await dashboardPage.expectWelcomeMessage('Integration User');

    await dashboardPage.logout();
    await page.waitForURL('**/login');

    await forgotPasswordPage.goto();
    await forgotPasswordPage.requestReset('reset@example.com');
    await forgotPasswordPage.expectSuccessMessage('reset@example.com');

    console.log('All integration scenarios completed successfully');
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();

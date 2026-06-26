const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/signup');
  await page.getByTestId('firstname-input').fill('Playwright');
  await page.getByTestId('lastname-input').fill('User');
  await page.getByTestId('email-input').fill('playwright@example.com');
  await page.getByTestId('password-input').fill('password123');
  await page.getByTestId('submit-button').click();
  await page.waitForURL('**/login');
  console.log('Smoke test passed');
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

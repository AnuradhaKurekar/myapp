# Integration Testing Agent

## Purpose
This document captures the signup flow integration testing approach for `my-app`, including the test plan executed, the current Playwright setup, and guidelines for adding future integration tests.

## Scope
The current integration tests focus on the signup and authentication flow:
- Signup form validation
- Signup → Login → Dashboard → Logout happy path
- Login error handling
- Access guard for dashboard when logged out
- Duplicate email signup edge case

## What we changed
### App behavior
- `src/Signup.js`
  - Added persistent `registeredUsers` storage in `localStorage`
  - Added duplicate email detection and error messaging
- `src/Login.js`
  - Updated login logic to use the multi-user store
  - Kept legacy support for single stored `registeredUser` if present

### Test coverage
- `tests/signup.spec.js`
  - Added validation checks for:
    - empty fields
    - invalid email format
    - password shorter than 6 characters
  - Added duplicate email signup handling test
  - Kept and extended the full end-to-end signup → login → dashboard → logout flow
  - Kept login error cases and dashboard access guard tests

### Test runner config
- `playwright.config.js`
  - Added `webServer` config to start the React dev server automatically before test execution
  - Uses `npm start` and `http://localhost:3000`

## How to run the integration tests
1. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
2. Run the signup integration tests in Chromium:
   ```bash
   npx playwright test tests/signup.spec.js --project=chromium
   ```
3. Optionally, run the same suite across all configured browsers:
   ```bash
   npx playwright test tests/signup.spec.js
   ```
4. Open the HTML report after execution:
   ```bash
   npx playwright show-report
   ```

## Current test plan followed
1. Verify the app starts and `http://localhost:3000` is reachable.
2. Clear `localStorage` before each test to avoid state leakage.
3. Validate signup form behavior with incorrect and missing user input.
4. Create a new user with a unique email and ensure navigation proceeds to login.
5. Log in with correct credentials and confirm dashboard landing and welcome text.
6. Refresh the dashboard page and confirm session persistence via `localStorage`.
7. Log out and confirm redirect back to `/login`.
8. Confirm login error messages when credentials are incorrect or no account exists.
9. Confirm dashboard access redirects to login when the user is not authenticated.
10. Confirm duplicate signup email is rejected with the proper error message.

## Guidelines for adding future integration tests
### Test structure
- Put browser-based integration tests in `tests/`.
- Use `@playwright/test` and the existing project configuration.
- Keep tests independent by clearing app state at the start of each test.
- Use stable `data-testid` attributes to locate elements.

### Recommended scenarios to add next
- `forgot password` or recovery flows if introduced
- `remember me` / persistent login behavior
- `already logged in` redirects from `/signup` or `/login` to `/dashboard`
- simultaneous account creation and login scenarios
- deeper dashboard interactions if the UI expands

### Naming and style
- Name tests clearly with the expected behavior, e.g. `shows validation error when password is too short`.
- Use helper functions when you need repeated setup logic, such as unique email generation.
- Prefer explicit waits and assertions for element text or URL changes.
- Keep tests small and focused on one behavior per test.

## Notes
- The app currently stores user credentials in `localStorage` for demo/testing purposes only.
- If the app grows beyond this demo flow, migrate auth persistence away from client-local storage and update integration tests accordingly.

# How to setup new Playwright project

1. Install latest Playwright

```
npm init playwright@latest
```

2. Generate basic Playwright project
3. Add basic scripts

```json
"scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:headed": "playwright test --headed"
  }
```

4. Add eslint, husky & prettier
   Based on https://playwrightsolutions.com/the-definitive-guide-to-api-test-automation-with-playwright-part-8-adding-eslint-prettier-and-husky/

5. Add environment config
   Based on https://medium.com/@irfan17sat/configuring-multiple-environments-in-playwright-67e402c1c627

6. Add reporters
   Based on https://playwright.dev/docs/test-reporters

7. Add retry request possibility: https://hackernoon.com/enhancing-test-reliability-exploring-playwrights-retry-apis-for-robust-testing

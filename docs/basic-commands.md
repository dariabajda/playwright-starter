# CLI commands

Run all the tests

```bash
npx playwright test
```

Run a single test file

```bash
npx playwright test tests/todo-page.spec.ts
```

Run a set of test files

```bash
npx playwright test tests/todo-page/ tests/landing-page/
```

Run files that have my-spec or my-spec-2 in the file name

```bash
npx playwright test my-spec my-spec-2
```

Run tests that are in line 42 in my-spec.ts

```bash
npx playwright test my-spec.ts:42
```

Run the test with the title

```bash
npx playwright test -g "add a todo item"
```

Run tests in headed browsers

```bash
npx playwright test --headed
```

Run all the tests against a specific project

```bash
npx playwright test --project=chromium
```

Disable parallelization

```bash
npx playwright test --workers=1
```

Choose a reporter

```bash
npx playwright test --reporter=dot
```

Run in debug mode with Playwright Inspector

```bash
npx playwright test --debug
```

-- Run tests in interactive UI mode, with a built-in watch mode (Preview)

```bash
npx playwright test --ui
```

Ask for help

```bash
npx playwright test --help
```

More at https://playwright.dev/docs/test-cli

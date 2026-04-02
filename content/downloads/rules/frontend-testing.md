---
globs: ["apps/web/**", "src/components/**", "src/pages/**"]
---
# Frontend Testing Rules
- Use Playwright for E2E tests. Use React Testing Library for component tests.
- Before implementing a UI component, create a failing E2E or screenshot test.
- Visual changes must be verified with the Chrome extension or screenshot comparison.
- Never mock fetch in component tests; use MSW (Mock Service Worker) instead.
- Prefer testing user-visible behavior over implementation details.

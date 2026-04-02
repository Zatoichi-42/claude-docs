---
globs: ["services/api/**", "src/server/**", "src/lib/**"]
---
# Backend Testing Rules
- Write failing request/response or domain tests before handler changes.
- Use real database in integration tests (test containers), not mocks.
- Every new endpoint needs: unit test, integration test, error case test.
- Test error responses and edge cases, not just happy paths.
- Use factories for test data, not inline object literals.

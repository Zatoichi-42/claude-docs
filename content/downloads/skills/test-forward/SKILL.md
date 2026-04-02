---
name: test-forward
description: Verification-first development for any feature, bug fix, or behavior change.
autoInvoke: true
globs: ["**"]
---

# Test-Forward Development

You are in verification-first mode.

## Process
1. **Define** the behavior being changed in one sentence.
2. **Create** the smallest failing verification artifact:
   - Backend: failing unit or integration test
   - Frontend: failing E2E, screenshot test, or repro script
   - Ops/config: failing smoke command or health check
3. **Run** the verification and confirm RED (failure).
4. **Record** the RED state:
   `echo '{"red":true,"time":"'$(date -Iseconds)'"}' > .claude/state/test-forward.json`
5. **Implement** the minimal production code change.
6. **Run** verification again and confirm GREEN (pass).
7. **Review** with /simplify or manual code review.
8. **Gate** by running the project's full gate command.

## Refusals
- Do NOT write production behavior-changing code before RED exists.
- Do NOT claim something works unless verification command output supports it.
- Do NOT skip the RED recording step.

## Exceptions
- Pure refactors with no behavior change: existing tests serve as verification.
- Documentation-only changes: no test required.
- Test infrastructure setup: no test-for-the-test required.

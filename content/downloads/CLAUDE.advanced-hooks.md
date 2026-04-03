# Advanced Hook Workflow Addendum

Merge these rules into your repo `CLAUDE.md` when you want Claude Code to mirror a strict Codex-style workflow:

- Always read applicable `AGENTS.md` before substantive work.
- Use max TDD: name the tests first, then write or update tests before implementation.
- Do not edit non-test source without a recent RED signal.
- Reproduce the exact user command before claiming a fix when feasible.
- For CLI or output bugs, add at least one integration test for the real entrypoint.
- If the user gives an exact error string, reproduce that exact string in a test when feasible.
- For stdout or stderr requirements, verify startup output, progress output, final output, and flushing behavior.
- Do not let unrelated failing tests redefine the task.
- No silent failures; adapters should return data or typed errors where possible.
- Surface progress and errors clearly for CLI work unless a higher-priority instruction overrides it.

Keep judgment-heavy interpretation here in `CLAUDE.md`.
Use hooks only for the machine-checkable parts.

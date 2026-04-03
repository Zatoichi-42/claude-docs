# Advanced Hooks Pack

This pack translates a strict Codex workflow setup into Claude Code flavor.

## What is included

- `CLAUDE.advanced-hooks.md` — merge this into your repo `CLAUDE.md`
- `.claude/settings.advanced-hooks.json` — merge these hook entries into your `.claude/settings.json`
- `.claude/hooks/hooklib.sh`
- `.claude/hooks/session-start.sh`
- `.claude/hooks/pre-tool-use-guard.sh`
- `.claude/hooks/post-tool-use-audit.sh`
- `.claude/hooks/stop-guard.sh`

## Claude-specific translation

- Put shared workflow rules in `CLAUDE.md`, not `model_instructions_file`
- Guard source edits with `Write|Edit|MultiEdit`
- Guard shell commands with `Bash`
- Record RED on `PostToolUseFailure` and GREEN on `PostToolUse`

## Quick validation

```bash
claude --version
bash -n .claude/hooks/hooklib.sh
bash -n .claude/hooks/session-start.sh
bash -n .claude/hooks/pre-tool-use-guard.sh
bash -n .claude/hooks/post-tool-use-audit.sh
bash -n .claude/hooks/stop-guard.sh
```

## Smoke test

1. confirm a non-test source edit is blocked before RED
2. run a failing test and confirm the edit is then allowed
3. attempt to finish before a passing test and confirm Stop blocks
4. run a passing test and confirm Stop allows completion

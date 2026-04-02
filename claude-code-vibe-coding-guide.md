# Claude Code Vibe Coding: The Definitive Team Playbook

**Last verified: April 1, 2026 — Claude Code v2.1.89 · Opus 4.6 · Superpowers v5.0.6**

---

## Critique of the Source Document

Before building on the original guide, several claims need correction:

1. **`/plan` attribution.** The original correctly notes `/plan` is native to Claude Code, not from Superpowers. However, it still conflates the two in places. `/plan` is a built-in mode toggle (also accessible via `Shift+Tab`). Superpowers provides *skills* (brainstorming, write-plan, execute-plan) that are a *methodology layer on top of* planning, not a replacement for it.

2. **Superpowers command surface.** The original says "command names are shifting." As of v5.0.6, this shift is *complete*: old slash commands (`/brainstorm`, `/write-plan`, `/execute-plan`) are formally deprecated and redirect to skills. The current invocation paths are `/superpowers:brainstorm`, `/superpowers:write-plan`, `/superpowers:execute-plan`, or automatic activation via the "1% rule" (Claude checks for relevant skills before every response). The `using-superpowers` meta-skill bootstraps this protocol at session start.

3. **Hook event count understated.** The original describes 3–4 hook events. As of March 2026, Claude Code exposes **21+ lifecycle events** across 4 handler types (command, http, prompt, agent). Key additions include `PermissionDenied` (v2.1.89), `TeammateIdle`, `TaskCompleted`, `Elicitation`, `ElicitationResult` (v2.1.76+), `SessionStart`, `SessionEnd`, `SubagentStart`, `SubagentStop`, `PreCompact`, `ConfigChange`, and more.

4. **Missing features.** The original omits several features now central to professional Claude Code workflows:
   - `/rc` (Remote Control) — continue sessions from phone/browser
   - `/fast` — Opus 4.6 at 2.5× speed for rapid iteration
   - `/loop` — session-level cron for recurring monitoring
   - `/batch` — parallel codebase-wide migrations with worktree isolation
   - `/simplify` — 3-agent parallel post-implementation review
   - `/debug` — structured debugging skill
   - `/effort` — set model reasoning effort (low/medium/high)
   - `/voice` — push-to-talk voice mode
   - `/color` — color-code sessions for multi-session work
   - `/rewind` — selective rollback (conversation-only or code-only)
   - Agent Teams — coordinated multi-instance parallel development
   - Auto Mode — AI-classified permission decisions (March 24, 2026)
   - Computer Use — Claude can interact with screen UI (March 23, 2026)
   - `--worktree` — isolated git worktree per session
   - `--from-pr` — resume sessions linked to a GitHub PR
   - 1M token context window (Max/Team/Enterprise, March 2026)

5. **`opusplan` model alias.** Still valid. Uses Opus for planning, Sonnet for execution. But note that `/fast` mode runs Opus 4.6 with speed-optimized settings for interactive iteration, which is a separate and useful toggle.

6. **Hook `if` field.** Correctly noted as added in v2.1.85. Still the recommended way to reduce hook overhead.

7. **`defer` permission decision.** Added in v2.1.89. Allows headless sessions to pause at a tool call and resume later. Important for CI/CD pipelines with human-in-the-loop gates.

---

## The Core Methodology: Explore → Plan → RED → GREEN → Review → Ship

This workflow aligns with Anthropic's own best-practices documentation and Superpowers' TDD methodology. The key principle from Anthropic: **give Claude something to verify against**. The key principle from Superpowers: **no production code before a failing check**.

Combined, the strongest policy for a team is:

> **No production behavior change until a failing verification artifact exists.**

For backend/domain logic, that artifact is a failing test. For UI, it may be a failing E2E, screenshot diff, or reproduction script. For migrations/ops/config, it may be a smoke command or health check.

---

## Phase 0: Environment & Tooling Setup

### Installation & Authentication

```bash
# Native installer (recommended, zero dependencies, auto-updates)
curl -fsSL https://cli.claude.ai/install.sh | bash

# Or via npm
npm install -g @anthropic-ai/claude-code

# Verify
claude --version   # Should show 2.1.89+
claude doctor      # Environment diagnostics

# Authenticate
claude              # Opens browser for OAuth (Pro/Max/Team/Enterprise)
# Or for CI/CD:
export ANTHROPIC_API_KEY=sk-ant-...
```

### Essential First-Session Commands

```bash
claude                        # Start interactive session
/init                         # Bootstrap CLAUDE.md from your codebase
/terminal-setup               # Enable Alt+T (thinking), Alt+P (model picker)
/config                       # Configure preferences including Remote Control
/skills                       # List all available skills (built-in + plugins)
/hooks                        # Inspect active hooks
/permissions                  # Review allow/ask/deny rules
```

### VS Code Integration

Anthropic recommends the VS Code extension for inline diffs, `@`-mention file references, and plan review/editing before acceptance. Install via `/ide` from within Claude Code or the VS Code marketplace.

---

## Phase 1: Project Configuration

### Repository Structure

```text
repo/
├── CLAUDE.md                          # Project rules (< 200 lines)
├── .claude/
│   ├── settings.json                  # Team-shared: hooks, permissions, model
│   ├── settings.local.json            # Personal overrides (gitignored)
│   ├── hooks/
│   │   ├── require-test-first.sh      # PreToolUse gate
│   │   ├── run-related-tests.sh       # PostToolUse feedback
│   │   ├── auto-format.sh             # PostToolUse formatter
│   │   └── block-dangerous.sh         # PreToolUse security
│   ├── rules/
│   │   ├── frontend-testing.md        # Scoped to apps/web/**
│   │   └── backend-testing.md         # Scoped to services/api/**
│   ├── skills/
│   │   └── test-forward/
│   │       └── SKILL.md               # Custom verification-first skill
│   ├── agents/
│   │   ├── code-reviewer.md           # Custom reviewer subagent
│   │   └── security-auditor.md        # Custom security subagent
│   └── plans/                         # Stored plans from /plan sessions
├── .gitignore                         # Include .claude/settings.local.json
│                                      # Include .claude/worktrees/
└── tests/ or __tests__/ or spec/
```

### CLAUDE.md

Anthropic recommends keeping this under ~200 lines, focused on what Claude cannot infer from code alone. Move heavy reference material into skills or rules.

```markdown
# Project Working Rules

## Default workflow
- For features, bug fixes, and behavior changes: explore → plan → RED → GREEN → review.
- Use Plan Mode (Shift+Tab or /plan) for multi-file or ambiguous work.
- No production behavior change until a failing verification artifact exists.
- After every production code change, run the smallest relevant verification.
- Before stopping, run the full repo gate.

## Verification policy
- Backend/domain logic: failing automated test first.
- UI work: failing E2E, screenshot expectation, or repro script first.
- Migrations/ops/config: failing smoke/repro command first.
- After implementation: run /simplify before opening a PR.

## Scope discipline
- No opportunistic refactors outside the task unless explicitly asked.
- Keep diffs small. Explain any unavoidable architectural fallout.
- One logical change per commit.

## Project commands
- Test (targeted):  pnpm test -- <target>
- Lint:             pnpm lint
- Typecheck:        pnpm typecheck
- Fast gate:        pnpm lint && pnpm typecheck
- Full gate:        pnpm test && pnpm lint && pnpm typecheck

## Architecture notes
- [Add 2-3 sentences about key architectural decisions Claude can't infer]
- [Add test framework, ORM, router, state management specifics]
- [Add any naming conventions or file organization rules]
```

### settings.json

```jsonc
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "opusplan",
  "plansDirectory": ".claude/plans",
  "permissions": {
    "allow": [
      "Bash(pnpm test *)",
      "Bash(pnpm lint)",
      "Bash(pnpm typecheck)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git add *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/require-test-first.sh",
            "timeout": 5
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/block-dangerous.sh",
            "timeout": 5
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/run-related-tests.sh",
            "async": true,
            "timeout": 180
          },
          {
            "type": "command",
            "command": "bash .claude/hooks/auto-format.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Verify all required tests pass. Run the project's full gate command. If verification is incomplete or failing, respond with decision: block and explain what remains.",
            "timeout": 180
          }
        ]
      }
    ]
  }
}
```

**Why this arrangement works:**

- **`PreToolUse`** is the hard gate. It runs before permission prompts and can deny the action via exit code 2 or JSON `permissionDecision: "deny"`. This is where you enforce "no production code before RED."
- **`PostToolUse`** is the fast-feedback loop. Async hooks run tests after every edit without blocking Claude. Use synchronous hooks for formatting (Prettier, Black, etc.) since those are fast and should always run.
- **`Stop` agent hook** is the final gate. Agent-type hooks can inspect files, run commands, and refuse to let Claude stop until verification passes. Return `decision: "block"` with a reason to force continuation.
- **`PermissionDenied`** (v2.1.89) fires after auto mode classifier denials. Return `{retry: true}` to let Claude retry with a different approach.

### Hook Scripts

**block-dangerous.sh** — Security gate:
```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -iE '\b(rm\s+-rf\s+/|DROP\s+TABLE|DELETE\s+FROM\s+\w+\s*;|TRUNCATE|FORMAT)\b' > /dev/null; then
  echo "BLOCKED: Destructive command detected: $COMMAND" >&2
  exit 2
fi
exit 0
```

**require-test-first.sh** — TDD enforcement:
```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Always allow writes to test files, docs, config, and non-source paths
if echo "$FILE_PATH" | grep -qE '(test|spec|__tests__|\.test\.|\.spec\.|\.md$|\.json$|\.yaml$|\.yml$|\.toml$|\.lock$|\.config\.)'; then
  exit 0
fi

# Always allow writes under specific directories
if echo "$FILE_PATH" | grep -qE '^(tests/|spec/|__tests__/|docs/|\.claude/|\.github/)'; then
  exit 0
fi

# For source files: check if a RED token exists (test failed recently)
STATE_FILE=".claude/state/test-forward.json"
if [ -f "$STATE_FILE" ]; then
  AGE=$(( $(date +%s) - $(stat -f%m "$STATE_FILE" 2>/dev/null || stat -c%Y "$STATE_FILE" 2>/dev/null) ))
  if [ "$AGE" -lt 600 ]; then  # Valid for 10 minutes
    exit 0
  fi
fi

echo "BLOCKED: No failing test found. Write a failing test first, then run it to create the RED token." >&2
exit 2
```

**auto-format.sh** — Post-edit formatting:
```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.html)
    npx prettier --write "$FILE_PATH" 2>/dev/null || true ;;
  *.py)
    python3 -m black "$FILE_PATH" 2>/dev/null || true ;;
  *.go)
    gofmt -w "$FILE_PATH" 2>/dev/null || true ;;
esac
exit 0
```

### Rules (Scoped Instructions)

Place in `.claude/rules/` to scope instructions to file types or directories.

**frontend-testing.md:**
```markdown
---
globs: ["apps/web/**", "src/components/**"]
---
# Frontend Testing Rules
- Use Playwright for E2E tests. Use React Testing Library for component tests.
- Before implementing a UI component, create a failing E2E or screenshot test.
- Visual changes must be verified with the Chrome extension or screenshot comparison.
- Never mock fetch in component tests; use MSW (Mock Service Worker) instead.
```

**backend-testing.md:**
```markdown
---
globs: ["services/api/**", "src/server/**"]
---
# Backend Testing Rules
- Write failing request/response or domain tests before handler changes.
- Use real database in integration tests (test containers), not mocks.
- Every new endpoint needs: unit test, integration test, error case test.
```

### Custom Skill: Test-Forward

**`.claude/skills/test-forward/SKILL.md`:**
```markdown
---
name: test-forward
description: Verification-first development for any feature, bug fix, or behavior change.
autoInvoke: true
globs: ["**"]
---

# Test-Forward Development

## Process
1. Define the behavior being changed in one sentence.
2. Create the smallest failing verification artifact:
   - Backend: failing unit or integration test
   - Frontend: failing E2E, screenshot test, or repro script
   - Ops/config: failing smoke command or health check
3. Run the verification and confirm RED (failure).
4. Record the RED state: `echo '{"red":true,"time":"'$(date -Iseconds)'"}' > .claude/state/test-forward.json`
5. Implement the minimal production code change.
6. Run verification again and confirm GREEN (pass).
7. Run /simplify or review for code quality.
8. Run the project's full gate command.

## Refusals
- Do NOT write production behavior-changing code before RED exists.
- Do NOT claim something works unless verification command output supports it.
- Do NOT skip the RED recording step.

## Exceptions
- Pure refactors with no behavior change: existing tests serve as verification.
- Documentation-only changes: no test required.
- Test infrastructure setup: obviously no test-for-the-test required.
```

---

## Phase 2: Daily Workflow

### The Vibe Coding Loop

```
┌─ EXPLORE ──────────────────────────────────────────┐
│  Shift+Tab → Plan Mode                             │
│  "Read src/auth/ and explain the session flow"      │
│  "What would break if we changed X?"                │
└────────────────────┬───────────────────────────────┘
                     │
┌─ PLAN ─────────────▼───────────────────────────────┐
│  "Create a plan for adding Google OAuth"            │
│  Ctrl+G → edit plan in your editor                  │
│  Review, revise, approve                            │
└────────────────────┬───────────────────────────────┘
                     │
┌─ RED ──────────────▼───────────────────────────────┐
│  Shift+Tab → Normal Mode                           │
│  "Write a failing test for the OAuth callback"      │
│  "Run the test and confirm it fails"                │
└────────────────────┬───────────────────────────────┘
                     │
┌─ GREEN ────────────▼───────────────────────────────┐
│  "Implement the OAuth callback handler"             │
│  PostToolUse hooks auto-run tests after each edit   │
│  "Run the test and confirm it passes"               │
└────────────────────┬───────────────────────────────┘
                     │
┌─ REVIEW ───────────▼───────────────────────────────┐
│  /simplify          (3-agent parallel code review)  │
│  /security-review   (security-focused audit)        │
│  Stop hook verifies full gate passes                │
└────────────────────┬───────────────────────────────┘
                     │
┌─ SHIP ─────────────▼───────────────────────────────┐
│  "Commit with a descriptive message and open a PR"  │
│  Stop hook runs final verification                  │
└─────────────────────────────────────────────────────┘
```

### Mode Cycling

`Shift+Tab` cycles: **Normal Mode → Auto-Accept → Plan Mode → Normal Mode**

- **Plan Mode**: Claude reads and analyzes but cannot edit files. Use for exploration and planning.
- **Normal Mode**: Claude reads, writes, and runs commands with permission prompts.
- **Auto-Accept**: Claude proceeds without asking for edit/run permission. Use when you trust the current task scope.
- **Auto Mode** (`--permission-mode auto`): AI classifier evaluates each tool call. Blocks dangerous operations, allows safe ones. Launched March 24, 2026.

### Essential Daily Commands

| Command | Purpose |
|---------|---------|
| `/plan` | Enter Plan Mode directly |
| `/compact [focus]` | Compress context, optionally retaining specific info |
| `/context` | Check context window usage |
| `/simplify [focus]` | 3-agent parallel code review on recent changes |
| `/debug` | Structured debugging skill |
| `/batch <description>` | Parallel codebase-wide migration |
| `/loop <interval> <prompt>` | Recurring task (e.g., `/loop 5m check deploy status`) |
| `/rc` or `/remote-control` | Enable Remote Control for phone/browser access |
| `/fast` | Toggle Opus 4.6 at 2.5× speed |
| `/effort <level>` | Set reasoning effort: low, medium, high |
| `/model <name>` | Switch model: opus, sonnet, haiku, opusplan |
| `/voice` | Push-to-talk voice mode |
| `/rewind` | Selective rollback (code-only or conversation-only) |
| `/color <color>` | Color-code the session prompt bar |
| `/rename <name>` | Name the session for easy identification |
| `/stats` | Usage statistics (Pro/Max) |
| `/cost` | Token cost (API users) |
| `!<command>` | Run bash directly without Claude interpretation |
| `@<filepath>` | Smart file reference with autocomplete |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Shift+Tab` | Cycle permission modes |
| `Alt+T` or `Option+T` | Toggle extended thinking |
| `Alt+P` or `Option+P` | Model picker |
| `Ctrl+G` | Open current content in external editor |
| `Ctrl+C` | Interrupt Claude (redirect mid-task) |
| `Esc+Esc` | Open rewind menu |
| `Ctrl+S` | Screenshot stats |

---

## Phase 3: Scaling Up

### Subagents: Writer/Reviewer Split

Custom subagents run in isolated context windows. Define them in `.claude/agents/`:

**code-reviewer.md:**
```markdown
---
name: code-reviewer
description: Reviews implementation against plan and standards.
model: sonnet
tools: Read, Grep, Glob, Bash
hooks:
  PostToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "bash .claude/hooks/auto-format.sh"
---
You are a code reviewer. Given a plan and recent changes:
1. Verify each plan item was implemented correctly.
2. Check for missed edge cases, security issues, and test gaps.
3. Rate issues as CRITICAL (blocks merge), MAJOR (should fix), or MINOR (nice to fix).
4. CRITICAL issues must be resolved before proceeding.
```

### Agent Teams: Parallel Development

Agent Teams (research preview, v2.1.32+) coordinate multiple Claude instances with shared task lists and inter-agent messaging.

**Enable:**
```jsonc
// In settings.json or environment
"env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" }
```

**Usage:**
```
Create an agent team for the payment integration feature:
- API agent: implement Stripe webhook handlers in services/payments/
- Frontend agent: build the checkout flow in apps/web/checkout/
- Test agent: write integration tests covering the full payment flow
Use Sonnet for each teammate to manage costs.
```

**Best practices for teams:**
- 3–5 teammates is the sweet spot. Beyond that, coordination overhead dominates.
- Use `delegate mode` to prevent the lead from grabbing implementation work.
- Use `TeammateIdle` hooks to reassign finished teammates to review work.
- Use `TaskCompleted` hooks to enforce quality gates before task closure.
- Assign clear file ownership to prevent merge conflicts.
- Token costs scale linearly: budget accordingly.

### /batch: Codebase-Wide Migrations

For applying the same transformation across many files:

```
/batch migrate all API routes from Express to Hono
/batch add type annotations to all untyped function parameters
/batch replace lodash imports with native equivalents
```

Each unit runs in an isolated git worktree. Workers automatically run `/simplify` before committing and creating PRs. Typically decomposes into 5–30 parallel units.

### Remote Control: Mobile Continuity

Start a long-running task, then monitor from your phone:

```bash
# At your desk
claude --rc "refactor the auth module to use the new session store"

# Or mid-session
/rc
```

Scan the QR code or open the session URL on your phone via the Claude app or claude.ai/code. Your full local environment stays available: filesystem, MCP servers, hooks, skills, CLAUDE.md — nothing moves to the cloud.

**Tip:** Run `/rename auth-refactor` before `/rc` so you can find the session easily on your phone.

---

## Phase 4: Plugins

### Superpowers (v5.0.6)

**What it does:** A comprehensive skills framework enforcing structured workflows: Socratic brainstorming → spec → micro-task planning → TDD implementation → code review → completion verification.

**Install:**
```
/plugin install superpowers@claude-plugins-official
/reload-plugins
/skills
```

**Current skill invocation (as of v5.0.6):**

| Skill | Trigger | What it does |
|-------|---------|--------------|
| `using-superpowers` | Auto at session start | Bootstraps the skill-checking protocol |
| `/superpowers:brainstorm` | Before starting complex features | Socratic requirements exploration |
| `/superpowers:write-plan` | After brainstorming | Generates micro-task plan with TDD steps |
| `/superpowers:execute-plan` | After plan approval | Subagent-driven implementation with review |
| Auto-invoked skills | Always (1% rule) | Claude checks for relevant skills before every response |

**Important:** Old slash commands (`/brainstorm`, `/write-plan`, `/execute-plan`) are **deprecated** and redirect to skills. Don't rely on them.

**The Superpowers + native Claude Code stack:**
- Use **native `/plan`** for exploration and high-level planning.
- Use **Superpowers brainstorming** for deep requirements elicitation.
- Use **Superpowers write-plan** for micro-task decomposition with TDD.
- Use **Superpowers execute-plan** for subagent-driven parallel implementation.
- Use **native `/simplify`** for post-implementation review.
- Use **native hooks** for deterministic enforcement of all rules.

### Other Recommended Plugins

| Plugin | Purpose |
|--------|---------|
| **Code Review** | Replaces deprecated built-in `/review` |
| **LSP plugins** (typescript-lsp, pyright-lsp) | Automatic diagnostics after every edit |

**Security note:** Plugins execute with your user privileges. Use project-scope installs only for plugins you trust. Audit plugin source before installing.

**Install pattern:**
```
/plugin install <name>@claude-plugins-official
/reload-plugins
```

---

## Phase 5: CI/CD Integration

### Headless Mode for Pipelines

```bash
# One-shot analysis
claude -p "review for security vulnerabilities" < src/auth.ts > report.md

# With permission restrictions
claude -p "run the full test suite and report results" \
  --allowedTools "Read" "Bash(npm test *)" "Grep" "Glob"

# With auto mode for autonomous operation
claude -p "fix lint errors and commit" --permission-mode auto

# With structured output
claude -p "list all TODO comments as JSON" --json-schema todo-schema.json
```

### Using `defer` for Human-in-the-Loop CI

New in v2.1.89: `PreToolUse` hooks can return `permissionDecision: "defer"`, which pauses headless sessions. Resume with `-p --resume` to have the hook re-evaluate.

```jsonc
// In CI hook: defer destructive operations for human review
{
  "hookSpecificOutput": {
    "permissionDecision": "defer",
    "permissionDecisionReason": "Destructive operation requires human approval"
  }
}
```

---

## Session Management Best Practices

### Context is Your Most Precious Resource

Claude's context window fills fast. Performance degrades as it fills. This is the single most important resource to manage.

1. **Watch context usage.** Use `/context` or a custom status line. Act when usage exceeds 70–80%.
2. **Compact aggressively.** `/compact retain the TDD state and current test failures` preserves what matters while freeing space.
3. **Use subagents for investigation.** Subagents get their own context windows. Spawn them for exploration so your main context stays clean.
4. **Course-correct early.** `Ctrl+C` to interrupt Claude going in the wrong direction. Every wrong turn wastes context.
5. **Use `/rewind`** to selectively roll back conversation or code changes without losing everything.
6. **Name and resume sessions.** `/rename feature-oauth` then `claude -r "feature-oauth"` or `claude -c` to continue.
7. **Fork sessions.** `claude -c --fork-session` to branch off without losing the original.

### Multi-Session Work

- **`/color red`** for production hotfix session, **`/color blue`** for feature work.
- **`--worktree feature-branch`** runs Claude in an isolated git worktree.
- **`--worktree feature-branch --tmux`** adds tmux pane integration.
- Use `/batch` when work is parallelizable without inter-agent coordination.
- Use Agent Teams when workers need to communicate and coordinate.

---

## What Changed Recently (March–April 2026)

| Date | Version | Change |
|------|---------|--------|
| Apr 1 | v2.1.89 | `defer` PreToolUse decision, `PermissionDenied` hook, named subagents in @-mention, thinking summaries off by default |
| Mar 29 | v2.1.88 | Session ID header for proxies, Jujutsu/Sapling VCS support |
| Mar 24 | — | Auto Mode launched (AI-classified permissions) |
| Mar 23 | — | Computer Use added to Claude Code and Cowork |
| Mar 13 | v2.1.75 | 1M token context window default for Opus 4.6 (Max/Team/Enterprise), `/color` command |
| Mar 11 | v2.1.76 | `/effort` command, MCP elicitation, `Elicitation`/`ElicitationResult` hooks |
| Mar 7 | v2.1.71 | `/loop` command for recurring tasks |
| Mar 3 | v2.1.69 | `/voice` push-to-talk mode |
| Feb 28 | v2.1.63 | `/simplify` and `/batch` bundled skills |
| Feb 25 | — | Remote Control (`/rc`) research preview |
| Feb 5 | v2.1.32 | Agent Teams research preview |

---

## The Recommended Stack, Summarized

For a technical team transitioning to vibe coding, adopt these layers in order:

### Layer 1: Foundation (Day 1)
- Write a tight `CLAUDE.md` (< 200 lines) with workflow rules and project commands.
- Configure `settings.json` with model, permissions, and basic hooks.
- Learn the mode cycle: `Shift+Tab` between Plan/Normal/Auto-Accept.
- Learn `Ctrl+C` (interrupt), `@file` (reference), `!cmd` (raw bash).

### Layer 2: Verification (Week 1)
- Add `PreToolUse` hook to block source edits without a RED token.
- Add `PostToolUse` hook to auto-run related tests and format code.
- Add `Stop` agent hook to enforce full gate before completion.
- Write scoped rules in `.claude/rules/` for different parts of the codebase.
- Create the `test-forward` custom skill.

### Layer 3: Productivity (Week 2)
- Install Superpowers for structured brainstorming and TDD methodology.
- Install LSP plugins for automatic diagnostics.
- Learn `/simplify` (post-implementation), `/debug` (structured debugging).
- Set up Remote Control (`/rc`) for mobile continuity.
- Use `/fast` for rapid interactive iteration.

### Layer 4: Scale (Week 3+)
- Use `/batch` for codebase-wide migrations.
- Use subagents for writer/reviewer splits.
- Experiment with Agent Teams for complex multi-domain features.
- Integrate Claude Code into CI/CD with headless mode and `defer`.
- Use `/loop` for automated monitoring during development.
- Use `--worktree` for isolated parallel sessions.

### Layer 5: Continuous Improvement
- Run `/insights` monthly to analyze usage patterns and costs.
- Check `/release-notes` weekly — this platform evolves fast.
- Codify learnings into new skills: ask Claude to generate a skill from a successful session.
- Share hooks, rules, and skills via `settings.json` (team-shared, committed to repo).
- Keep personal overrides in `settings.local.json` (gitignored).

---

## Appendix: Quick Reference Card

```
MODES          Shift+Tab cycles: Normal → Auto-Accept → Plan
PLAN           /plan or Shift+Tab to Plan Mode
THINK          Alt+T toggles extended thinking
MODEL          Alt+P opens model picker
FAST           /fast for 2.5× speed Opus
EFFORT         /effort low|medium|high
VERIFY         /simplify after implementation
REVIEW         /security-review before security-sensitive PRs
MIGRATE        /batch <description> for parallel codebase changes
MONITOR        /loop 5m <prompt> for recurring checks
MOBILE         /rc to continue from phone
CONTEXT        /context to check, /compact to compress
ROLLBACK       Esc+Esc to rewind, /rewind for selective rollback
SESSION        /rename <name>, claude -r <name>, claude -c
WORKTREE       claude -w <branch> for isolated git worktree
DEBUG          /debug for structured debugging
VOICE          /voice for push-to-talk
COLOR          /color <color> to distinguish sessions
TEAMS          Agent Teams for coordinated multi-instance work
AUTO           --permission-mode auto for AI-classified permissions
```

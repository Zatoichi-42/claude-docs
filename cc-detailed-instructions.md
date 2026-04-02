# Claude Code: Complete Team Onboarding Instructions

**Version:** April 2026 · Claude Code v2.1.89 · Opus 4.6 · Superpowers v5.0.6

---

## Part 1: First-Time Setup (15 minutes)

### 1.1 Install Claude Code

Choose one method:

**Native installer (recommended):**
```bash
curl -fsSL https://cli.claude.ai/install.sh | bash
```
Zero dependencies, auto-updates in the background, primary method Anthropic tests and supports.

**npm (for version pinning):**
```bash
npm install -g @anthropic-ai/claude-code
```

**Verify:**
```bash
claude --version   # Expect 2.1.89 or later
claude doctor      # Diagnoses environment issues
```

### 1.2 Authenticate

**Interactive (Pro/Max/Team/Enterprise):**
```bash
claude
# Browser opens → sign in → CLI receives OAuth token
```

**CI/CD (API key):**
```bash
export ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 1.3 Configure Your Terminal

Run inside your first Claude Code session:
```
/terminal-setup
```
This enables keyboard shortcuts:
- `Alt+T` / `Option+T` — toggle extended thinking
- `Alt+P` / `Option+P` — model picker
- `Ctrl+G` — open content in external editor
- `Shift+Tab` — cycle permission modes

### 1.4 Install VS Code Extension

From inside Claude Code:
```
/ide
```
Or install from the VS Code marketplace. Provides:
- Inline diffs with accept/reject
- `@`-mention file references
- Plan review and editing before acceptance
- Compaction shown as collapsible card

### 1.5 Bootstrap Your Project

Navigate to your project root and run:
```bash
claude
/init
```
This analyzes your codebase and generates `CLAUDE.md`. For the interactive setup flow that also walks through skills, hooks, and memory files:
```bash
CLAUDE_CODE_NEW_INIT=1 claude
```

---

## Part 2: Project Configuration (Team Lead Does This Once)

### 2.1 Write CLAUDE.md

**Location:** Project root.
**Rule:** Keep under 200 lines. HTML comments (`<!-- -->`) are hidden from Claude when auto-injected.

**Template:**
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
<!-- Add 2-3 sentences about key architectural decisions -->
<!-- Add test framework, ORM, router, state management specifics -->
<!-- Add naming conventions or file organization rules -->
```

### 2.2 Create Directory Structure

```bash
mkdir -p .claude/hooks .claude/rules .claude/skills/test-forward .claude/agents .claude/plans .claude/state
```

### 2.3 Write settings.json

**Location:** `.claude/settings.json` (committed to repo, team-shared)

```json
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
      "Bash(git commit *)",
      "Bash(git push *)"
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
            "command": "bash .claude/hooks/auto-format.sh",
            "timeout": 10
          },
          {
            "type": "command",
            "command": "bash .claude/hooks/run-related-tests.sh",
            "async": true,
            "timeout": 180
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Verify that all required tests for this task pass. Run the project's full gate command. If verification is incomplete or failing, respond with decision: block and explain exactly what remains.",
            "timeout": 180
          }
        ]
      }
    ]
  }
}
```

**Key decisions explained:**

| Setting | Why |
|---------|-----|
| `model: "opusplan"` | Opus for planning (better reasoning), Sonnet for execution (faster, cheaper) |
| `plansDirectory` | Plans persist across sessions for resumption |
| `permissions.allow` | Pre-approve safe, frequent commands to reduce permission fatigue |
| `permissions.deny` | Hard-block secrets access |
| `PreToolUse` on Write/Edit | TDD gate: block source edits without RED token |
| `PreToolUse` on Bash | Security gate: block destructive commands |
| `PostToolUse` sync (format) | Auto-format every edit immediately |
| `PostToolUse` async (tests) | Run related tests without blocking Claude |
| `Stop` agent hook | Final verification gate before Claude can finish |

### 2.4 Write Hook Scripts

**`.claude/hooks/block-dangerous.sh`:**
```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block destructive patterns
if echo "$COMMAND" | grep -iE '\b(rm\s+-rf\s+/|DROP\s+TABLE|DELETE\s+FROM\s+\w+\s*;|TRUNCATE\s+TABLE|FORMAT\s+C)\b' > /dev/null; then
  echo "BLOCKED: Destructive command detected: $COMMAND" >&2
  exit 2  # Exit 2 = BLOCK. Not exit 1!
fi
exit 0
```

**`.claude/hooks/require-test-first.sh`:**
```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Allow writes to test files, docs, config, and non-source paths
if echo "$FILE_PATH" | grep -qE '(test|spec|__tests__|\.test\.|\.spec\.|\.md$|\.json$|\.yaml$|\.yml$|\.toml$|\.lock$|\.config\.)'; then
  exit 0
fi

# Allow writes under infrastructure directories
if echo "$FILE_PATH" | grep -qE '^(tests/|spec/|__tests__/|docs/|\.claude/|\.github/|\.vscode/)'; then
  exit 0
fi

# For source files: check if a RED token exists
STATE_FILE=".claude/state/test-forward.json"
if [ -f "$STATE_FILE" ]; then
  # Check freshness (10 minute TTL)
  if [ "$(uname)" = "Darwin" ]; then
    AGE=$(( $(date +%s) - $(stat -f%m "$STATE_FILE") ))
  else
    AGE=$(( $(date +%s) - $(stat -c%Y "$STATE_FILE") ))
  fi
  if [ "$AGE" -lt 600 ]; then
    exit 0
  fi
fi

echo "BLOCKED: No recent failing test found. Write and run a failing test first." >&2
echo "Run your test command and let it fail to create the RED token." >&2
exit 2
```

**`.claude/hooks/auto-format.sh`:**
```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.html|*.md)
    npx prettier --write "$FILE_PATH" 2>/dev/null || true ;;
  *.py)
    python3 -m black "$FILE_PATH" 2>/dev/null || true ;;
  *.go)
    gofmt -w "$FILE_PATH" 2>/dev/null || true ;;
  *.rs)
    rustfmt "$FILE_PATH" 2>/dev/null || true ;;
esac
exit 0
```

**`.claude/hooks/run-related-tests.sh`:**
```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Skip non-source files
if echo "$FILE_PATH" | grep -qE '\.(md|json|yaml|yml|toml|lock)$'; then
  exit 0
fi

# Try to find and run related test file
BASE=$(basename "$FILE_PATH" | sed 's/\.[^.]*$//')
TEST_FILE=$(find . -name "${BASE}.test.*" -o -name "${BASE}.spec.*" -o -name "test_${BASE}.*" 2>/dev/null | head -1)

if [ -n "$TEST_FILE" ]; then
  pnpm test -- "$TEST_FILE" 2>&1 || true
fi
exit 0
```

Make all hooks executable:
```bash
chmod +x .claude/hooks/*.sh
```

### 2.5 Write Scoped Rules

**`.claude/rules/frontend-testing.md`:**
```markdown
---
globs: ["apps/web/**", "src/components/**", "src/pages/**"]
---
# Frontend Testing Rules
- Use Playwright for E2E tests. Use React Testing Library for component tests.
- Before implementing a UI component, create a failing E2E or screenshot test.
- Visual changes must be verified with the Chrome extension or screenshot comparison.
- Never mock fetch in component tests; use MSW (Mock Service Worker) instead.
- Prefer testing user-visible behavior over implementation details.
```

**`.claude/rules/backend-testing.md`:**
```markdown
---
globs: ["services/api/**", "src/server/**", "src/lib/**"]
---
# Backend Testing Rules
- Write failing request/response or domain tests before handler changes.
- Use real database in integration tests (test containers), not mocks.
- Every new endpoint needs: unit test, integration test, error case test.
- Test error responses and edge cases, not just happy paths.
- Use factories for test data, not inline object literals.
```

### 2.6 Create the Test-Forward Skill

**`.claude/skills/test-forward/SKILL.md`:**
```markdown
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
```

### 2.7 Create Custom Agents

**`.claude/agents/code-reviewer.md`:**
```markdown
---
name: code-reviewer
description: Reviews implementation against plan and coding standards.
model: sonnet
tools: Read, Grep, Glob, Bash
---
You are a code reviewer. Given a plan and recent changes:

1. Run `git diff` to see all changes.
2. Verify each plan item was implemented correctly.
3. Check for:
   - Missed edge cases
   - Security issues (injection, auth bypass, data exposure)
   - Missing or insufficient tests
   - Performance concerns (N+1 queries, unnecessary allocations)
   - Style violations against project conventions
4. Rate each issue:
   - **CRITICAL**: Blocks merge. Must fix before proceeding.
   - **MAJOR**: Should fix. Creates real risk or tech debt.
   - **MINOR**: Nice to fix. Style, naming, or minor improvement.
5. CRITICAL issues must be resolved before proceeding.
6. Summarize: what's good, what needs work, risk assessment.
```

### 2.8 Update .gitignore

Add to your `.gitignore`:
```gitignore
# Claude Code personal overrides
.claude/settings.local.json

# Claude Code worktrees (used by /batch)
.claude/worktrees/

# Claude Code state (ephemeral)
.claude/state/
```

### 2.9 Install Plugins

From inside Claude Code:
```
/plugin install superpowers@claude-plugins-official
/reload-plugins
/skills
```

Verify Superpowers skills appear:
- `using-superpowers` (auto-bootstraps at session start)
- `superpowers:brainstorm`
- `superpowers:write-plan`
- `superpowers:execute-plan`

Optional but recommended:
```
/plugin install code-review@claude-plugins-official
/reload-plugins
```

For TypeScript projects:
```
/plugin install typescript-lsp@claude-plugins-official
/reload-plugins
```

---

## Part 3: Daily Workflow Instructions

### 3.1 Starting a Feature

```bash
# Start a named session
claude -n "feature-oauth"

# Or continue a previous session
claude -c           # Most recent session
claude -r "feature-oauth"  # By name
```

### 3.2 The Six-Step Loop

**Step 1: EXPLORE (Plan Mode)**
```
Shift+Tab  →  Plan Mode indicator appears

You: "Read src/auth/ and explain how sessions work.
      Also look at how we handle environment variables for secrets."
```
Claude reads files and answers questions without making any edits.

**Step 2: PLAN**
```
You: "I want to add Google OAuth. What files need to change?
      What's the session flow? Create a detailed plan."

[Claude produces plan]

Ctrl+G  →  Opens plan in your editor for review and editing
```

**Step 3: RED (back to Normal Mode)**
```
Shift+Tab  →  Normal Mode

You: "Write a failing test for the Google OAuth callback handler.
      Run it and confirm it fails."

[Claude writes test, runs it, test fails]
[RED token is created at .claude/state/test-forward.json]
```

**Step 4: GREEN**
```
You: "Implement the OAuth callback handler to make the test pass."

[Claude implements code]
[PostToolUse hook auto-runs related tests after each edit]

You: "Run the test and confirm it passes."
```

**Step 5: REVIEW**
```
/simplify

[3 parallel agents review: code reuse, quality, efficiency]
[Fixes are applied automatically]

/security-review   (if auth/security-related)
```

**Step 6: SHIP**
```
You: "Commit with a descriptive message and open a PR."

[Stop hook runs full gate verification]
[If gate fails, Claude fixes and re-verifies]
```

### 3.3 Quick Tasks (Skip Planning)

For trivial changes where the overhead of planning exceeds the benefit:
```
You: "Fix the typo in src/components/Header.tsx line 42:
      'recieve' should be 'receive'"
```
No need for Plan Mode, no need for a test. Just do it.

### 3.4 Debugging

```
/debug

You: "Users report login fails after session timeout.
      Here's the error: [paste error].
      Check the auth flow in src/auth/, especially token refresh."
```

The `/debug` skill follows a structured 4-phase approach:
1. **Root cause investigation** (not guessing)
2. **Pattern analysis** (is this a recurring issue?)
3. **Hypothesis testing** (test theories before fixing)
4. **Implementation** (with verification)

Safeguard: If 3 fix attempts fail, triggers architectural review.

### 3.5 Context Management

**Monitor:**
```
/context     # Check usage percentage
```

**Compress at 70-80%:**
```
/compact retain the TDD state, current test failures, and the OAuth plan
```

**Use subagents for investigation** (they get their own context):
```
You: "Spawn a subagent to investigate all uses of the deprecated
      SessionManager class across the codebase and report back."
```

**Course-correct immediately:**
- `Ctrl+C` to interrupt if Claude goes in the wrong direction
- Every wrong turn wastes precious context

### 3.6 Multi-Session Work

```bash
# Color-code sessions
/color red       # Production hotfix
/color blue      # Feature work
/color green     # Test writing

# Isolated worktrees
claude -w feature-branch        # Own git worktree
claude -w feature-branch --tmux # With tmux panes

# Fork a session
claude -c --fork-session        # Branch off without losing original
```

### 3.7 Remote Control

```
/rename oauth-feature
/rc
```

Scan QR code with Claude app. Or open session URL at claude.ai/code. Your full local environment stays available.

**Habits:**
- `/rename` before `/rc` — sessions named "sure, go ahead" are impossible to find on your phone
- Sleep recovery is automatic; power-off kills the session
- `claude rc` starts server mode (new session); `/rc` carries over conversation history

### 3.8 Speed and Effort Toggles

```
/fast           # Opus 4.6 at 2.5× speed (same model, speed-optimized)
/effort high    # More thorough reasoning (costs more)
/effort low     # Faster, cheaper for simple tasks
```

Use "ultrathink" keyword in your prompt for maximum reasoning effort (the old "max" level).

---

## Part 4: Scaling Workflows

### 4.1 /batch — Codebase-Wide Migrations

```
/batch migrate all API routes from Express to Hono
/batch replace all uses of lodash with native equivalents
/batch add type annotations to all untyped function parameters
/batch standardize all API error responses
```

**How it works:**
1. Research and Plan: `/batch` explores affected files, decomposes into 5–30 independent units
2. Spawn Workers: One agent per unit in an isolated git worktree
3. Each worker: implement → run /simplify → run tests → commit → open PR
4. Merge independently — failure in one unit doesn't affect others

**Prerequisites:** Git repository required (uses worktrees for isolation). Add `.claude/worktrees/` to `.gitignore`.

### 4.2 Agent Teams — Coordinated Parallel Work

**Enable:**
```json
// In settings.json
"env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" }
```

**Usage:**
```
Create an agent team for the payment integration:
- API agent: implement Stripe webhook handlers in services/payments/
- Frontend agent: build the checkout flow in apps/web/checkout/
- Test agent: write integration tests covering the full payment flow
Use Sonnet for each teammate to manage costs.
```

**Display modes:**
- **In-process** (default in non-tmux): Shift+Up/Down to switch between teammates
- **Split panes** (in tmux/iTerm2): Each teammate in its own pane
- **Auto**: Detects tmux → split panes, otherwise in-process

**Team hooks:**
- `TeammateIdle`: Fires when a teammate is about to go idle. Exit 2 to reassign work.
- `TaskCompleted`: Fires when a task is marked complete. Exit 2 to enforce quality gates.

**Best practices:**
- 3–5 teammates is the sweet spot
- Enable delegate mode to prevent the lead from doing implementation
- Assign clear file ownership per agent
- Token costs scale linearly with team size
- Use subagents for quick focused work; Agent Teams for coordination-heavy work

### 4.3 /loop — Recurring Monitoring

```
/loop 5m check the deploy status and report any errors
/loop 10m run the test suite and summarize failures
/loop 30m scan for new TODO comments added since last check
```

Session-level cron. Stays active while the session is open. Disable with `CLAUDE_CODE_DISABLE_CRON`.

### 4.4 /simplify — Post-Implementation Review

Run after finishing any feature, before opening a PR:
```
/simplify
/simplify focus on memory efficiency
/simplify focus on error handling
```

Spawns 3 parallel agents:
1. **Code Reuse Agent**: Scans for duplicated patterns, checks for existing utilities
2. **Code Quality Agent**: Looks for dead code, unclear logic, style issues
3. **Efficiency Agent**: Profiles for unnecessary allocations, redundant loops, batch opportunities

Findings are aggregated and fixes applied automatically. You review the diff.

---

## Part 5: CI/CD Integration

### 5.1 Non-Interactive (Headless) Mode

```bash
# Basic analysis
claude -p "review for security vulnerabilities" < src/auth.ts > report.md

# Restricted tools
claude -p "analyze test coverage gaps" \
  --allowedTools "Read" "Grep" "Glob"

# Pipe input
cat error.log | claude -p "summarize the key errors in this log"

# Auto mode for autonomous operation
claude -p "fix all lint errors and commit" --permission-mode auto

# Structured output
claude -p "list all TODO comments as JSON" --json-schema todo-schema.json

# Bare mode (skip hooks/LSP/plugins for speed)
claude -p "explain this function" --bare

# Max turns (circuit breaker)
claude -p "refactor auth module" --max-turns 20
```

### 5.2 Human-in-the-Loop with defer

In v2.1.89+, PreToolUse hooks can return `permissionDecision: "defer"` to pause headless sessions at specific tool calls. Resume with `claude -p --resume` after human review.

**Example hook that defers destructive operations:**
```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qE '(deploy|publish|release|migrate)'; then
  echo '{"hookSpecificOutput":{"permissionDecision":"defer","permissionDecisionReason":"Production operation requires human approval"}}' 
  exit 0
fi
exit 0
```

### 5.3 PR-Linked Sessions

```bash
# Resume session linked to a specific PR
claude --from-pr 42

# Sessions auto-link to PRs when created via gh pr create
```

---

## Part 6: Superpowers Plugin (v5.0.6)

### 6.1 Installation

```
/plugin install superpowers@claude-plugins-official
/reload-plugins
/skills
```

### 6.2 How It Works

Superpowers installs a set of composable skills and a meta-skill (`using-superpowers`) that bootstraps automatically at session start. The "1% rule" means Claude checks for relevant skills before any response.

**You do not need to manually invoke skills.** Start describing what you want to build, and Superpowers activates automatically. If you want explicit control:

| Invoke | What Happens |
|--------|--------------|
| `/superpowers:brainstorm` | Socratic requirements exploration. Asks clarifying questions. Produces a spec in digestible chunks. |
| `/superpowers:write-plan` | Generates micro-task plan (2–5 min tasks) with exact file paths, commands, and TDD steps. |
| `/superpowers:execute-plan` | Subagent-driven implementation. Each task → code → review checkpoint. |
| `/using-superpowers` | Re-reminds Claude of all available skills (useful mid-session if it seems to forget). |

### 6.3 What Superpowers Enforces

- **RED-GREEN-REFACTOR TDD**: Tests must fail before implementation. If Claude writes code before tests, the skill makes it delete the code and start over.
- **YAGNI**: Build the simplest thing that works.
- **Evidence over claims**: Claude must verify everything works with actual command output.
- **Code review between tasks**: The `requesting-code-review` skill activates between implementation tasks.
- **Architectural review safeguard**: After 3 failed fix attempts, triggers deeper analysis.

### 6.4 Deprecated Commands

These old commands **still work but redirect** to skills:
- `/brainstorm` → redirects to `superpowers:brainstorm`
- `/write-plan` → redirects to `superpowers:write-plan`  
- `/execute-plan` → redirects to `superpowers:execute-plan`

Do not rely on these. Use the skill invocations or let auto-invocation handle it.

---

## Part 7: Complete Command Quick Reference

### Permission Modes
| Input | Mode | Behavior |
|-------|------|----------|
| `Shift+Tab` (1×) | Auto-Accept | Claude proceeds without asking |
| `Shift+Tab` (2×) | Plan Mode | Read-only, no edits |
| `Shift+Tab` (3×) | Normal | Permission prompts for edits/runs |
| `--permission-mode auto` | Auto Mode | AI classifier decides |

### Session Management
```
/compact [focus]        Compress context (specify what to retain)
/context                Check context usage
/clear                  Reset conversation
/rewind                 Selective rollback (code-only or chat-only)
/rename <name>          Name current session
/rc                     Enable Remote Control
/color <color>          Color-code prompt bar
/stats                  Usage stats (Pro/Max)
/cost                   Token cost (API)
/usage                  Rate limit status
```

### Development
```
/plan                   Enter Plan Mode
/fast                   Toggle 2.5× speed Opus
/effort <level>         Set reasoning: low/medium/high
/model <name>           Switch: opus/sonnet/haiku/opusplan
/voice                  Push-to-talk voice mode
/simplify [focus]       3-agent parallel code review
/debug                  Structured debugging
/batch <desc>           Parallel codebase migration
/loop <int> <prompt>    Recurring scheduled task
/security-review        Security audit of current branch
```

### Project
```
/init                   Bootstrap CLAUDE.md
/memory                 Inspect/edit CLAUDE.md
/skills                 List all skills
/hooks                  Inspect hooks
/permissions            Review permission rules
/config                 Configure preferences
/doctor                 Environment diagnostics
/insights               Monthly usage analysis
/release-notes          What changed in this version
```

### Plugins
```
/plugin install <n>@<marketplace>    Install plugin
/reload-plugins                      Reload after install/update
/ide                                 Install IDE extension
```

### CLI Flags
```
claude                          Interactive session
claude "prompt"                 Start with initial prompt
claude -p "prompt"              Non-interactive (headless)
claude -c                       Continue most recent session
claude -r "name"                Resume by name
claude -n "name"                Start named session
claude -w branch                Isolated git worktree
claude -w branch --tmux         Worktree + tmux panes
claude -c --fork-session        Fork (new ID, keeps context)
claude --rc                     Start with Remote Control
claude --from-pr 42             Resume PR-linked session
claude --bare                   Skip hooks/LSP/plugins
claude --permission-mode auto   AI-classified permissions
claude --model opus             Specific model
claude --effort high            Reasoning effort
claude --agents                 Define subagents inline
claude --max-turns 20           Turn limit (circuit breaker)
claude --debug "api,hooks"      Debug mode with category filter
claude --chrome                 Chrome debugging integration
```

### Keyboard Shortcuts
```
Shift+Tab       Cycle permission modes
Alt+T           Toggle extended thinking
Alt+P           Model picker
Ctrl+G          Open in external editor
Ctrl+C          Interrupt Claude
Esc+Esc         Rewind menu
Ctrl+S          Screenshot stats
!command        Raw bash execution
@filepath       File reference autocomplete
```

---

## Part 8: Troubleshooting

| Problem | Solution |
|---------|----------|
| Hooks not firing | Verify with `/hooks`. Check matcher regex (case-sensitive). Restart session after editing settings.json. |
| Hook blocks unexpectedly | Check exit codes: 0=allow, 2=block, 1=warning. Use `Ctrl+O` for verbose hook output. |
| Context filling too fast | `/compact` at 70-80%. Use subagents for investigation. `@file` references instead of having Claude search. |
| Superpowers skills not loading | Run `/reload-plugins`, then `/skills`. Check with `/using-superpowers`. |
| Permission prompt fatigue | Pre-approve safe commands in `permissions.allow`. Use Auto-Accept mode or Auto Mode. |
| Agent Team lead doing work itself | Enable delegate mode. Specify "do not implement anything yourself" in the prompt. |
| /batch creating too many PRs | Be more specific in the description. Use `/batch` only for truly independent, parallelizable changes. |
| Remote Control session not found | `/rename` before `/rc`. Check claude.ai/code or Claude app → Code tab. |
| Old Superpowers commands fail | Old `/brainstorm` etc. are deprecated. Use `/superpowers:brainstorm` or let auto-invoke handle it. |
| Hooks slow down session | Budget 500ms max per PreToolUse hook. Use `async: true` for PostToolUse. Use `if` field (v2.1.85+) to narrow hook scope. |
| `claude doctor` shows errors | Run `claude update` first. Check Node.js version, authentication, and network. |

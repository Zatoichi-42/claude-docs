/* eslint-disable react/no-unescaped-entities */
import React from "react";

/* Helper to make links that use the SPA navigate */
function L({ to, children, navigate, className }) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

/* Annotated code block — each line gets a comment tooltip */
function CodeBlock({ children }) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}

export const PAGES = {
  /* ═══════════════════════════════════════════════════════════════════════════
   GETTING STARTED
   ═══════════════════════════════════════════════════════════════════════════ */
  "getting-started": {
    searchText:
      "install setup sign in team account init bootstrap terminal configure",
    render: (nav) => (
      <>
        <h1>First-Time Setup</h1>
        <p className="version-tag">
          Aligned with official docs at{" "}
          <a href="https://code.claude.com/docs/en/quickstart">
            code.claude.com
          </a>
        </p>

        <div className="callout callout-warn">
          <strong>⚠️ This is not a production setup</strong>
          <p>
            The default Claude Code configuration is barely functional for
            serious work. Without enforcement hooks, session recovery, and a
            disciplined implementation protocol, you will get low compliance and
            low completion rates — and waste tokens re-explaining context and
            debugging the same issues repeatedly.
          </p>
          <p>
            Complete this page to get signed in and working, then go to the{" "}
            <strong>Production Setup</strong> section to configure a fully
            functional workflow before starting real project work.
          </p>
        </div>

        <p>
          This page gets you into Claude Code with the least friction. The goal
          is <strong>not</strong> to build the final repo setup. The goal is to
          sign in correctly, get the terminal working, and start coding with
          Claude — <em>today</em>.
        </p>

        <div className="callout callout-info">
          <strong>🏢 Use the team account for this setup</strong>
          <p>
            <strong>Personal account</strong> — fine for side experiments or
            learning in your own sandbox. <strong>Team account</strong> — use
            this for real repo work, shared access, and the subscription-backed
            environment this site assumes.
          </p>
          <p>
            If Claude Code opens under the wrong account, quit with{" "}
            <code>Ctrl+C</code>, restart <code>claude</code>, and sign into the
            team workspace before continuing.
          </p>
        </div>

        <h2>1. Install Claude Code</h2>
        <p>
          Choose the method that fits your team. The{" "}
          <strong>native installer auto-updates</strong> in the background —
          that's why it's recommended. Homebrew and npm require manual updates.
        </p>

        <h3>Native installer (recommended)</h3>
        <CodeBlock>{`# macOS and Linux — downloads the binary and adds it to your PATH
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex`}</CodeBlock>

        <h3>Homebrew (does NOT auto-update)</h3>
        <CodeBlock>{`brew install --cask claude-code

# You'll need to run this periodically:
brew upgrade claude-code`}</CodeBlock>

        <h3>npm (useful when your team pins versions)</h3>
        <CodeBlock>{`npm install -g @anthropic-ai/claude-code`}</CodeBlock>

        <h3>Verify your install</h3>
        <CodeBlock>{`claude --version    # Should print the version number
claude doctor       # Checks your environment for common issues`}</CodeBlock>
        <p>
          If <code>claude doctor</code> reports problems, fix them before
          continuing. Common issues: missing <code>git</code>, wrong Node
          version, or firewall blocking the auth flow.
        </p>

        <h2>2. Sign in with the team account</h2>
        <CodeBlock>{`# Just run claude — it opens a browser sign-in flow
claude`}</CodeBlock>
        <p>
          Choose the <strong>team account or team workspace</strong>, not your
          personal account. API-key authentication is a later topic covered in{" "}
          <L to="advanced/ci-cd" navigate={nav}>
            CI/CD Integration
          </L>
          .
        </p>

        <h2>3. Configure the terminal once</h2>
        <CodeBlock>{`# Inside your first Claude Code session, run:
/terminal-setup`}</CodeBlock>
        <p>This enables the keyboard controls you'll use every single day:</p>

        <table>
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>What it does</th>
              <th>When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>Shift+Tab</code>
              </td>
              <td>Cycle permission modes</td>
              <td>Switch between Normal → Auto-Accept → Plan Mode</td>
            </tr>
            <tr>
              <td>
                <code>Esc</code>
              </td>
              <td>Stop Claude mid-action</td>
              <td>When Claude starts going down the wrong path</td>
            </tr>
            <tr>
              <td>
                <code>Esc+Esc</code>
              </td>
              <td>Rewind / checkpoint menu</td>
              <td>Restore conversation or code to any earlier point</td>
            </tr>
            <tr>
              <td>
                <code>Ctrl+G</code>
              </td>
              <td>Open plan in your editor</td>
              <td>Edit Claude's plan in VS Code before execution</td>
            </tr>
            <tr>
              <td>
                <code>Alt+T</code>
              </td>
              <td>Toggle extended thinking</td>
              <td>When you need deeper reasoning on a hard problem</td>
            </tr>
            <tr>
              <td>
                <code>Alt+P</code>
              </td>
              <td>Model picker</td>
              <td>Switch between Opus, Sonnet, or custom models</td>
            </tr>
          </tbody>
        </table>

        <h2>4. Connect your editor</h2>
        <CodeBlock>{`/ide`}</CodeBlock>
        <p>
          This installs or connects the VS Code extension so you get inline
          diffs, <code>@file</code> mentions, and plan review without leaving
          the terminal workflow. JetBrains users can install the plugin from the
          marketplace instead.
        </p>

        <h2>5. Bootstrap the project with /init</h2>
        <p>
          Run <code>/init</code> inside an interactive session. It{" "}
          <strong>analyzes your actual codebase</strong> to detect build
          systems, test frameworks, and code patterns, then generates a starter{" "}
          <code>CLAUDE.md</code> tailored to your repo.
        </p>
        <CodeBlock>{`# Inside Claude Code:
/init`}</CodeBlock>

        <div className="callout callout-tip">
          <strong>💡 Keep CLAUDE.md short — under 200 lines</strong>
          <p>
            This is one of the most important official best practices. For each
            line in your CLAUDE.md, ask:{" "}
            <em>"Would removing this cause Claude to make mistakes?"</em> If
            not, cut it. Bloated files cause Claude to ignore your actual
            instructions because important rules get lost in the noise.
          </p>
          <p>
            For detailed domain docs, use <code>@path/to/file</code> imports
            instead of inlining. Claude reads referenced files on demand without
            bloating the context window.
          </p>
        </div>

        <h2>6. Recommended quick bootstrap</h2>
        <p>
          If you want the full recommended project setup in one shot, here's the
          fastest path:
        </p>
        <CodeBlock>{`# Step 1: Install Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# Step 2: Start and sign in with team account
claude

# Step 3: Generate CLAUDE.md from your codebase
/init

# Step 4: Set up your global ~/.claude config
#   See the "Production Setup Tutorial" tutorial for the full walkthrough.
#   It includes:
#     ~/.claude/CLAUDE.md            — global constitution (TDD, code rules)
#     ~/.claude/settings.json        — permissions + 9 event-driven hooks
#     ~/.claude/hooks/*.sh           — safety, formatting, session recovery
#     ~/.claude/rules/*.md           — scoped rules (testing, UI, safety)
#     ~/.claude/commands/*.md        — /build, /evolve, /status

# Step 5: For team projects, copy the project-level subset and commit
mkdir -p .claude/hooks .claude/rules
cp ~/.claude/settings.json .claude/settings.json
cp ~/.claude/rules/*.md .claude/rules/
git add .claude/ && git commit -m "Add Claude Code team baseline"`}</CodeBlock>

        <h2>7. What to do next</h2>
        <p>
          Do <strong>not</strong> jump straight to the full configuration page.
          Follow this path — each step builds on the last:
        </p>
        <ol className="step-list">
          <li>
            <strong>
              <L to="tutorials/core-commands" navigate={nav}>
                Core Session Commands
              </L>
            </strong>{" "}
            — learn the 8 commands you'll use every day
          </li>
          <li>
            <strong>
              <L to="tutorials/first-feature" navigate={nav}>
                Your First Feature
              </L>
            </strong>{" "}
            — practice the Explore → RED → GREEN loop with a real task
          </li>
          <li>
            <strong>
              <L to="tutorials/todo-and-tasks" navigate={nav}>
                TODO Lists & Tasks
              </L>
            </strong>{" "}
            — track multi-step work so nothing gets skipped
          </li>
          <li>
            <strong>
              <L to="workflows/daily" navigate={nav}>
                Daily Workflow
              </L>
            </strong>{" "}
            — make the loop a repeatable habit
          </li>
          <li>
            <strong>
              <L to="tutorials/project-setup" navigate={nav}>
                Production Setup
              </L>
            </strong>{" "}
            — commit shared config only after the workflow is familiar
          </li>
        </ol>
      </>
    ),
  },

  /* ═══════════════════════════════════════════════════════════════════════════
   FIRST HOOK — with line-by-line commented code
   ═══════════════════════════════════════════════════════════════════════════ */
  "tutorials/first-hook": {
    searchText:
      "hook PreToolUse PostToolUse Stop block dangerous format test guard exit code settings.json",
    render: (nav) => (
      <>
        <h1>Your First Hook</h1>
        <p>
          Hooks are automations or guardrails that run at specific moments in a
          Claude Code session. They're <strong>deterministic</strong> — unlike
          CLAUDE.md instructions which are advisory, hooks guarantee the action
          happens every time.
        </p>

        <p>
          This tutorial starts with a harmless example to teach the mechanics,
          then shows you the <strong>three most useful production hooks</strong>{" "}
          with line-by-line explanations.
        </p>

        <div className="callout callout-info">
          <strong>🧱 Hooks are just event listeners + handlers</strong>
          <p>
            Something happens (Claude tries to edit a file) → your script runs →
            your script decides what to do by exiting with a code and optionally
            printing JSON. The clean way to block a <code>PreToolUse</code>{" "}
            action is <code>exit 0</code> with JSON{" "}
            <code>permissionDecision:"deny"</code>. That's the entire model.
          </p>
        </div>

        <h2>Step 1: Create a harmless log hook</h2>
        <p>
          Before you build anything that blocks Claude, start with something
          that just watches. This log hook records every file Claude edits, so
          you can inspect what happened after a session.
        </p>

        <CodeBlock>{`mkdir -p .claude/hooks .claude/state`}</CodeBlock>

        <p>
          Create <code>.claude/hooks/log-edit.sh</code>:
        </p>
        <CodeBlock>{`#!/bin/bash
# ──────────────────────────────────────────────────────────
# LOG-EDIT HOOK — records every file Claude edits
# Trigger: PostToolUse on Write|Edit|MultiEdit
# Purpose: Leave a breadcrumb trail you can inspect later
# ──────────────────────────────────────────────────────────

# Claude sends a JSON payload to stdin with details about
# what just happened. We read it into a variable:
INPUT=$(cat)

# Extract the file path from the JSON payload.
# The structure is: { "tool_input": { "file_path": "src/foo.ts" } }
# jq's "// empty" means: if the field is missing, return nothing
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Append a timestamped log entry.
# This file accumulates across the whole session.
echo "$(date -Iseconds) EDITED $FILE_PATH" >> .claude/state/edited-files.log

# Exit 0 = ALLOW. Claude keeps going normally.
# We're just observing — never blocking.
exit 0`}</CodeBlock>

        <h2>Step 2: Wire it in settings.json</h2>
        <p>
          Open <code>.claude/settings.json</code> and add the hook
          configuration. Here's what each field means:
        </p>

        <CodeBlock>{`{
  "hooks": {
    "PostToolUse": [
      // ↑ "PostToolUse" = fires AFTER a tool call succeeds
      //   Other options: "PreToolUse" (before), "Stop" (when done)
      {
        "matcher": "Write|Edit|MultiEdit",
        // ↑ Only triggers for file-editing tools.
        //   Without a matcher, the hook fires for ALL tools.
        //   Use | (pipe) to match multiple tools.
        "hooks": [
          {
            "type": "command",
            // ↑ "command" = run a shell script
            //   Other types: "agent" (AI judgment), "prompt", "http"
            "command": "bash .claude/hooks/log-edit.sh",
            // ↑ The actual command to run.
            //   Paths are relative to the repo root.
            "timeout": 5
            // ↑ Kill the hook if it takes longer than 5 seconds.
            //   Always set a timeout — runaway hooks freeze sessions.
          }
        ]
      }
    ]
  }
}`}</CodeBlock>

        <h2>Step 3: Test it</h2>
        <p>Make one small edit in Claude Code, then inspect the log:</p>
        <CodeBlock>{`# Ask Claude to make a tiny edit:
"Make a one-line docs edit so we can prove the hook runs."

# Then check the log:
cat .claude/state/edited-files.log

# You should see something like:
# 2026-04-05T10:23:45+00:00 EDITED README.md`}</CodeBlock>

        <h2>The exit code model</h2>
        <table>
          <thead>
            <tr>
              <th>Exit code</th>
              <th>Meaning</th>
              <th>What happens</th>
              <th>When to use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>0</code>
              </td>
              <td>
                <strong>Success</strong>
              </td>
              <td>
                Hook ran successfully. Print JSON to stdout to control behavior
                (block, allow, inject context).
              </td>
              <td>All hooks — this is the normal path</td>
            </tr>
            <tr>
              <td>
                <code>1</code>
              </td>
              <td>
                <strong>Warn</strong>
              </td>
              <td>
                Claude keeps going but sees stderr as a warning.{" "}
                <strong>Does NOT block.</strong>
              </td>
              <td>Soft guardrails, reminders</td>
            </tr>
            <tr>
              <td>
                <code>2</code>
              </td>
              <td>
                <strong>Crash</strong>
              </td>
              <td>
                Hook crashed — "fail closed." Treated as unexpected error, not
                an intentional decision.
              </td>
              <td>Only as a trap handler for unexpected errors</td>
            </tr>
          </tbody>
        </table>

        <div className="callout callout-tip">
          <strong>💡 The clean way to block a PreToolUse action</strong>
          <p>
            Don't use <code>exit 2</code> to block — it triggers the crash
            handler. Instead, <code>exit 0</code> and print JSON:{" "}
            <code>{`{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"..."}}`}</code>
            . This is a deliberate decision, not a crash.
          </p>
        </div>

        <h2>The 3 most useful production hooks</h2>
        <p>
          These three hooks cover the vast majority of what teams actually need.
          They map directly to the six-step loop: block dangerous things, format
          after edits, and run related tests for fast feedback.
        </p>

        <h3>Hook 1: block-dangerous.sh — Safety gate</h3>
        <p>
          This <code>PreToolUse</code> hook fires <strong>before</strong> Claude
          runs a shell command. If the command matches a destructive pattern,
          it's blocked before it ever executes.
        </p>

        <CodeBlock>{`#!/bin/bash
# ──────────────────────────────────────────────────────────
# BLOCK-DANGEROUS HOOK — prevents destructive shell commands
# Trigger: PreToolUse on Bash
# Purpose: Stop "rm -rf /", DROP TABLE, etc. BEFORE they run
# Exit: always 0. Block via JSON permissionDecision:"deny"
# ──────────────────────────────────────────────────────────

# Crash handler — if anything unexpected fails, fail closed
trap 'echo "BLOCKED: Security hook crashed — failing closed" >&2; exit 2' ERR

# Read the JSON payload from Claude
INPUT=$(cat)

# Extract the shell command Claude wants to run
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Check against destructive patterns
if echo "$COMMAND" | grep -qE 'rm -rf [^.]|drop (database|table)|truncate'; then
  # Exit 0 + JSON = clean, intentional block
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Destructive command detected. Ask the human to run it manually."}}'
  exit 0
fi

# Block force-push to main/master
if echo "$COMMAND" | grep -qE 'git push.*(-f|--force).*(main|master)'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Force push to main/master blocked."}}'
  exit 0
fi

# Block committing secrets
if echo "$COMMAND" | grep -qiE 'git (add|commit)'; then
  if git diff --cached --name-only 2>/dev/null | grep -qE '\\.(env|key|pem)$|credentials'; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Staging/committing sensitive files blocked."}}'
    exit 0
  fi
fi

# If we get here, the command is safe — let it through
exit 0`}</CodeBlock>

        <h3>Hook 2: auto-format.sh — Convenience feedback</h3>
        <p>
          This <code>PostToolUse</code> hook fires <strong>after</strong> Claude
          successfully edits a file. It runs your team's formatter so code style
          is always consistent — Claude sees the post-format version.
        </p>

        <CodeBlock>{`#!/bin/bash
# ──────────────────────────────────────────────────────────
# AUTO-FORMAT HOOK — formats files after Claude edits them
# Trigger: PostToolUse on Write|Edit|MultiEdit
# Purpose: Ensure consistent style without Claude having to
#          know your exact Prettier/Black/gofmt config
# ──────────────────────────────────────────────────────────

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Match file extension to the right formatter.
# "2>/dev/null || true" means: if the formatter isn't installed
# or fails, silently continue — never block edits over formatting.
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.html|*.md)
    # Prettier for web files — uses your project's .prettierrc
    npx prettier --write "$FILE_PATH" 2>/dev/null || true
    ;;
  *.py)
    # Black for Python — uses your project's pyproject.toml
    python3 -m black "$FILE_PATH" 2>/dev/null || true
    ;;
  *.go)
    # gofmt for Go — the standard formatter
    gofmt -w "$FILE_PATH" 2>/dev/null || true
    ;;
  *.rs)
    # rustfmt for Rust
    rustfmt "$FILE_PATH" 2>/dev/null || true
    ;;
esac

# Always exit 0 — formatting is a convenience, never a gate
exit 0`}</CodeBlock>

        <h3>Hook 3: run-related-tests.sh — Fast feedback</h3>
        <p>
          This <code>PostToolUse</code> hook finds and runs tests related to the
          file Claude just edited. The <code>"async": true</code> flag means it
          runs in the background — Claude doesn't have to wait for tests to
          finish before continuing.
        </p>

        <CodeBlock>{`#!/bin/bash
# ──────────────────────────────────────────────────────────
# RUN-RELATED-TESTS HOOK — finds and runs relevant tests
# Trigger: PostToolUse on Write|Edit|MultiEdit (async)
# Purpose: Give Claude fast feedback on whether its edit
#          broke anything, without blocking the session
# ──────────────────────────────────────────────────────────

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Skip non-source files — no point testing docs or config
if echo "$FILE_PATH" | grep -qE '\\.(md|json|yaml|yml|toml|lock)$'; then
  exit 0
fi

# Extract the base filename without extension
# e.g., "src/auth/session.ts" → "session"
BASE=$(basename "$FILE_PATH" | sed 's/\\.[^.]*$//')

# Search for a matching test file using common naming conventions:
#   session.test.ts, session.spec.ts, test_session.py
TEST_FILE=$(find . -name "\${BASE}.test.*" \\
                 -o -name "\${BASE}.spec.*" \\
                 -o -name "test_\${BASE}.*" \\
  2>/dev/null | head -1)

# If we found a related test file, run it
if [ -n "$TEST_FILE" ]; then
  echo "Running related test: $TEST_FILE"
  pnpm test -- "$TEST_FILE" 2>&1 || true
  # ↑ "|| true" ensures we always exit 0
  #   The test result is feedback, not a gate
fi

# Always exit 0 — this is async feedback, not enforcement
exit 0`}</CodeBlock>

        <h2>Wiring all three hooks together</h2>
        <p>
          Here's the complete <code>.claude/settings.json</code> hook block with
          all three hooks:
        </p>

        <CodeBlock>{`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "bash .claude/hooks/block-dangerous.sh",
          "timeout": 5
        }]
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
    ]
  }
}`}</CodeBlock>

        <div className="callout callout-tip">
          <strong>💡 The "async" flag is important</strong>
          <p>
            Without <code>"async": true</code>, Claude waits for the test to
            finish before continuing. For fast unit tests, that's fine. For
            slower integration tests, you want async — Claude keeps working
            while tests run in the background, and sees the results when they
            complete.
          </p>
        </div>

        <h2>Adding a Stop gate (the SHIP enforcer)</h2>
        <p>
          This is the hook that prevents Claude from declaring "done" while
          verification is incomplete. It uses the <code>agent</code> handler
          type, which means Claude itself evaluates whether the gate passes:
        </p>

        <CodeBlock>{`{
  "Stop": [
    {
      "hooks": [{
        "type": "agent",
        // ↑ "agent" = Claude evaluates this prompt with tool access
        //   It can read files, run commands, and make a judgment
        "prompt": "Verify that all required tests for this task pass. Run the project's full gate command. If verification is incomplete or failing, respond with decision: block and explain exactly what remains.",
        // ↑ This prompt is sent to a fresh Claude instance.
        //   It runs the gate and decides: allow or block.
        "timeout": 180
        // ↑ 3 minutes — enough for a full test suite
      }]
    }
  ]
}`}</CodeBlock>

        <h2>Common beginner mistakes</h2>
        <ul>
          <li>
            <strong>
              Adding several hooks before the team understands the workflow.
            </strong>{" "}
            Hooks that enforce a workflow nobody has practiced feel like random
            resistance.
          </li>
          <li>
            <strong>Putting slow work in PreToolUse.</strong> Pre-hooks block
            Claude from doing anything until they finish. Keep them fast (&lt;5
            seconds).
          </li>
          <li>
            <strong>Using exit 1 for safety hooks.</strong> Exit 1 only warns —
            the action still happens. For <code>PreToolUse</code> hooks, use{" "}
            <code>exit 0</code> with JSON <code>permissionDecision:"deny"</code>{" "}
            to cleanly block. Exit 2 triggers the crash handler ("failing
            closed") which is for unexpected errors, not intentional blocks.
          </li>
          <li>
            <strong>Missing "async": true on slow PostToolUse hooks.</strong>{" "}
            Without it, Claude sits waiting for your 2-minute test suite on
            every edit.
          </li>
          <li>
            <strong>No timeout.</strong> A runaway hook with no timeout freezes
            the entire session.
          </li>
        </ul>

        <h2>Next step</h2>
        <p>
          Once the hook mechanics feel comfortable, continue to{" "}
          <L to="tutorials/project-setup" navigate={nav}>
            Production Setup
          </L>{" "}
          to assemble the complete repo baseline, or jump straight to{" "}
          <L to="tutorials/global-setup" navigate={nav}>
            Production Setup Tutorial
          </L>{" "}
          for the full personal configuration.
        </p>
      </>
    ),
  },

  /* ═══════════════════════════════════════════════════════════════════════════
   TODO & TASKS
   ═══════════════════════════════════════════════════════════════════════════ */
  "tutorials/todo-and-tasks": {
    searchText:
      "todo tasks TodoWrite checklist multi-step tracking alignment verification",
    render: (nav) => (
      <>
        <h1>TODO Lists & Tasks</h1>
        <p className="version-tag">
          NEW — Based on official Claude Code Tasks (v2.1.16+)
        </p>

        <p>
          Claude Code has a built-in task management system that tracks progress
          through multi-step work. It's one of the most{" "}
          <strong>underused</strong> features and one of the{" "}
          <strong>highest-leverage</strong> ones for reliability.
        </p>

        <div className="callout callout-tip">
          <strong>🎯 Why this matters so much</strong>
          <p>
            When Claude has a visible checklist, it is far less likely to skip
            steps, do work out of order, or lose track of what's been done.
            Think of the TODO list as Claude's "repeat back what I heard"
            confirmation — you see misunderstandings{" "}
            <em>before any code is written</em>.
          </p>
        </div>

        <h2>1. Ask Claude to create a TODO list first</h2>
        <p>
          For any complex request, tell Claude to plan before coding. This
          single habit dramatically improves results:
        </p>
        <CodeBlock>{`# Good: explicit checklist request
Add user authentication — create a todo list first, then implement each step

# Also good: be specific about what the checklist should cover
Implement the payment webhook handler.
Before writing any code, create a todo list covering:
- the endpoint setup
- signature verification  
- idempotency handling
- error responses
- tests for each case`}</CodeBlock>

        <p>
          <strong>What you should see:</strong> A checklist appears in your
          terminal showing Claude's plan. Items show three states:{" "}
          <code>pending</code>, <code>in_progress</code>, and{" "}
          <code>completed</code>. The list updates in real-time as Claude works.
        </p>

        <h2>2. Verify alignment before execution</h2>
        <p>
          Read the TODO list before Claude starts coding. These are the most
          common misalignment patterns — catch them early:
        </p>

        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>What it looks like</th>
              <th>How to fix it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Out of order</strong>
              </td>
              <td>
                You said "tests first" but todos list implementation first
              </td>
              <td>"Reorder: write the failing test before implementation"</td>
            </tr>
            <tr>
              <td>
                <strong>Missing steps</strong>
              </td>
              <td>You mentioned error handling but todos skip it</td>
              <td>"Add a step for error response testing"</td>
            </tr>
            <tr>
              <td>
                <strong>Too vague</strong>
              </td>
              <td>"Update the component" instead of specific changes</td>
              <td>
                "Break that into: change height, add padding, update color"
              </td>
            </tr>
            <tr>
              <td>
                <strong>Misinterpretation</strong>
              </td>
              <td>You said "review" but Claude plans "commit"</td>
              <td>"I meant review the diff, not commit yet"</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Steer mid-task</h2>
        <p>
          The checklist updates in real-time as you give feedback. Claude
          preserves completed work while adjusting pending items:
        </p>
        <CodeBlock>{`# Claude shows:
# [x] Fix navigation menu alignment
# [x] Update footer text
# [ ] Change button color to blue    ← pending
# [ ] Update documentation            ← pending

# You say:
Actually, make the button green instead of blue

# Claude updates the pending item and continues — completed work stays intact`}</CodeBlock>

        <h2>4. Demand specific, measurable todos</h2>
        <table>
          <thead>
            <tr>
              <th>❌ Vague (causes drift)</th>
              <th>✅ Specific (keeps Claude on track)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Style the navigation bar</td>
              <td>
                Change navbar height from 60px to 80px, reduce padding from 20px
                to 12px
              </td>
            </tr>
            <tr>
              <td>Fix the bug</td>
              <td>
                Reproduce the timeout error in a test, then fix the refresh
                logic in session.ts
              </td>
            </tr>
            <tr>
              <td>Add tests</td>
              <td>
                Add unit test for empty input, integration test for expired
                token, E2E test for login flow
              </td>
            </tr>
            <tr>
              <td>Update the API</td>
              <td>
                Add pagination to /api/users (limit, offset params), update
                OpenAPI spec, add test
              </td>
            </tr>
          </tbody>
        </table>

        <h2>5. Add TODO discipline to CLAUDE.md</h2>
        <p>
          For teams that want this to be the default behavior on every session:
        </p>
        <CodeBlock>{`# In CLAUDE.md

## Task tracking
- For any work involving 3+ steps, create a todo list before starting
- Check the todo list before beginning each step  
- Mark items complete only after verification passes
- If the human corrects course, update pending items immediately`}</CodeBlock>

        <h2>6. Tasks for cross-session work (v2.1.16+)</h2>
        <p>
          Since January 2026, Claude Code has a native <strong>Tasks</strong>{" "}
          system that goes beyond single-session TODO lists. Tasks persist
          across sessions, support dependency tracking, and work with
          multi-agent orchestration.
        </p>
        <CodeBlock>{`# Ask Claude to create persistent tasks with dependencies:
Create tasks for the OAuth integration:
1. Set up OAuth provider config (no deps)
2. Implement callback handler (depends on 1)  
3. Add session management (depends on 2)
4. Write integration tests (depends on 2, 3)
5. Update API docs (depends on 2)

# Next session, resume and Claude reads the task state:
claude -c
# Claude knows exactly which tasks are done and what's next`}</CodeBlock>

        <div className="callout callout-info">
          <strong>📋 TODO vs Tasks — when to use each</strong>
          <p>
            <strong>TODO lists</strong> — use for single-session work. Quick,
            lightweight, no persistence needed.
          </p>
          <p>
            <strong>Tasks</strong> — use when work spans multiple sessions, has
            dependencies between items, or involves multiple agents working in
            parallel.
          </p>
        </div>
      </>
    ),
  },

  /* ═══════════════════════════════════════════════════════════════════════════
   CONTEXT MASTERY
   ═══════════════════════════════════════════════════════════════════════════ */
  "tutorials/context-mastery": {
    searchText:
      "context window compact clear btw subagent rewind checkpoint investigation",
    render: (nav) => (
      <>
        <h1>Context Mastery</h1>
        <p className="version-tag">
          NEW — The #1 operational skill for Claude Code
        </p>

        <div className="callout callout-warn">
          <strong>🧠 The fundamental constraint</strong>
          <p>
            Claude's context window holds your entire conversation — every
            message, every file Claude reads, every command output.{" "}
            <strong>
              It fills up fast, and performance degrades as it fills.
            </strong>{" "}
            When context is getting full, Claude may start "forgetting" earlier
            instructions or making more mistakes.
          </p>
          <p>
            Managing context is more important than any other Claude Code skill.
            — <em>Official Anthropic Best Practices</em>
          </p>
        </div>

        <h2>1. Monitor with /context</h2>
        <CodeBlock>{`/context`}</CodeBlock>
        <p>
          Run this <strong>regularly</strong> — before the session feels broken,
          not after. Think of it like checking your fuel gauge while driving,
          not when the car stalls.
        </p>

        <h2>2. Compact with intent at 70–80%</h2>
        <p>
          When context is filling up, use <code>/compact</code> with explicit
          guidance about what to keep:
        </p>
        <CodeBlock>{`# GOOD — names exactly what matters:
/compact retain the current plan, the failing test output,
the three files we're editing, and the next action

# BAD — too vague, Claude keeps the wrong things:
/compact summarize this`}</CodeBlock>

        <p>
          You can also make compaction smarter by adding rules to CLAUDE.md:
        </p>
        <CodeBlock>{`# In CLAUDE.md
When compacting, always preserve:
- The full list of modified files
- Any test commands and their output
- The current implementation plan
- Any error messages we're debugging`}</CodeBlock>

        <h2>3. Use subagents for investigation</h2>
        <p>
          This is the{" "}
          <strong>single most powerful context-saving technique</strong>. When
          Claude needs to explore code to answer a question, it reads lots of
          files — all consuming your context. Subagents run in separate context
          windows and report back summaries:
        </p>
        <CodeBlock>{`# Instead of Claude reading 20 files in YOUR context:
Use subagents to investigate how our auth system handles
token refresh, and whether we have existing OAuth utilities.

# The subagent reads all 20 files in ITS OWN context,
# then reports back a 200-word summary — that's all that
# enters YOUR context. Massive savings.`}</CodeBlock>

        <p>You can also use subagents for post-implementation review:</p>
        <CodeBlock>{`Use a subagent to review this code for edge cases and security issues`}</CodeBlock>

        <h2>4. Use /btw for side questions</h2>
        <CodeBlock>{`/btw what's the syntax for a TypeScript mapped type?
/btw how do I destructure a tuple in Python 3.12?
/btw what's our Stripe API version?`}</CodeBlock>
        <p>
          The answer appears in a <strong>dismissible overlay</strong> and{" "}
          <strong>never enters conversation history</strong>. Use this for quick
          reference lookups without growing context. It's like whispering a
          question to a colleague without interrupting the meeting.
        </p>

        <h2>5. Interrupt drift immediately</h2>
        <p>
          Press <code>Esc</code> the moment Claude starts going down the wrong
          path. Every unnecessary file scan, speculative edit, and
          wrong-direction exploration burns context you could have spent on the
          actual task.
        </p>
        <CodeBlock>{`# Claude starts reading files in the wrong directory...
# Don't wait — press Esc immediately, then redirect:

That's the wrong area. The auth code is in src/auth/, 
not src/middleware/. Focus there instead.`}</CodeBlock>

        <h2>6. Clear between unrelated tasks</h2>
        <CodeBlock>{`/clear`}</CodeBlock>
        <p>
          Use this <strong>liberally</strong>. The most common Claude Code
          failure mode is the "kitchen sink session" — you start with one task,
          ask something unrelated, then go back to the first task. Context is
          full of irrelevant information and Claude's quality drops.
        </p>

        <div className="callout callout-tip">
          <strong>💡 The two-correction rule</strong>
          <p>
            If you've corrected Claude more than twice on the same issue, the
            context is cluttered with failed approaches. <code>/clear</code> and
            start fresh with a more specific prompt that incorporates what you
            learned. A clean session with a better prompt <em>almost always</em>{" "}
            outperforms a long session with accumulated corrections.
          </p>
        </div>

        <h2>7. Rewind selectively</h2>
        <CodeBlock>{`Esc+Esc    # Opens the checkpoint menu`}</CodeBlock>
        <p>
          Every action Claude makes creates a checkpoint. You can restore
          conversation only, code only, or both. You can also{" "}
          <strong>"Summarize from here"</strong> to condense messages from a
          specific point forward — keeping earlier context intact while freeing
          space.
        </p>

        <h2>Context management checklist</h2>
        <ul>
          <li>
            ✅ Check <code>/context</code> proactively — before things break
          </li>
          <li>✅ Compact around 70–80% with explicit retention guidance</li>
          <li>
            ✅ Interrupt drift with <code>Esc</code> — don't let Claude waste
            context
          </li>
          <li>
            ✅ Use subagents for investigation — they have their own context
          </li>
          <li>
            ✅ Use <code>/btw</code> for quick questions — zero context cost
          </li>
          <li>
            ✅ <code>/clear</code> between unrelated tasks — ruthlessly
          </li>
          <li>
            ✅ Use <code>@filepath</code> to point Claude at specific files
            instead of broad scanning
          </li>
          <li>
            ✅ Resume or fork sessions instead of overloading one long
            conversation
          </li>
        </ul>
      </>
    ),
  },

  /* ═══════════════════════════════════════════════════════════════════════════
   RATCHET PATTERN
   ═══════════════════════════════════════════════════════════════════════════ */
  "workflows/ratchet": {
    searchText:
      "ratchet quality gate test regression forward backward enforce stop hook",
    render: (nav) => (
      <>
        <h1>The Ratchet Pattern</h1>
        <p className="version-tag">NEW — Quality only moves forward</p>

        <p>
          A ratchet is a mechanical device that permits motion in only one
          direction. In Claude Code development, the ratchet pattern means:{" "}
          <strong>once a quality gate passes, it must keep passing.</strong>{" "}
          Quality never moves backward.
        </p>

        <p>
          This is the pattern that separates teams getting reliable results from
          teams fighting constant regressions. It works especially well with
          Claude because the agent can run verification automatically — the
          ratchet costs almost nothing to enforce.
        </p>

        <h2>How the ratchet works</h2>
        <ol className="step-list">
          <li>
            <strong>Establish the baseline before any changes.</strong> Run the
            full gate: <code>pnpm lint && pnpm typecheck && pnpm test</code>.
            Record what passes now. This is your floor.
          </li>
          <li>
            <strong>Every change must pass the same gate.</strong> After each
            implementation step, re-run the gate. If something that passed
            before now fails, the change is rejected — full stop.
          </li>
          <li>
            <strong>New tests only add to coverage.</strong> Never delete a
            passing test to make a change work. If a test needs updating because
            behavior intentionally changed, update it to cover the <em>new</em>{" "}
            behavior — don't weaken it.
          </li>
          <li>
            <strong>Lint and type errors only decrease.</strong> Track the
            count. If your change introduces new warnings, fix them before
            shipping. The count can go down, never up.
          </li>
        </ol>

        <h2>Enforcing the ratchet with a Stop hook</h2>
        <p>
          The <code>Stop</code> hook is the primary enforcement point. When
          Claude says "I'm done," this hook verifies that the ratchet hasn't
          slipped:
        </p>

        <CodeBlock>{`// In .claude/settings.json
"Stop": [{
  "hooks": [{
    "type": "agent",
    "prompt": "Run the project's full gate command (lint + typecheck + test). Compare results against the baseline. If ANY test that was passing before this task now fails, respond with decision: block. List the specific regressions. If all gates pass and no regressions exist, respond with decision: allow.",
    "timeout": 180
  }]
}]`}</CodeBlock>

        <div className="callout callout-info">
          <strong>🔒 The Stop hook is a one-way valve</strong>
          <p>
            It doesn't prevent Claude from trying things that break tests during
            implementation — that's normal development. It prevents Claude from{" "}
            <em>declaring success</em> while regressions exist. Claude must fix
            the regressions before the session can complete.
          </p>
        </div>

        <h2>Ratchet rules for CLAUDE.md</h2>
        <CodeBlock>{`# In CLAUDE.md

## Ratchet rules
- Run the full gate before AND after every change
- Never delete or weaken a passing test to make a change work
- New warnings/errors are not acceptable — fix them before shipping
- If a refactor breaks something, the refactor is incomplete, not the test
- Track: test count can only increase, error count can only decrease`}</CodeBlock>

        <h2>Combining ratchet with the six-step loop</h2>
        <table>
          <thead>
            <tr>
              <th>Step</th>
              <th>Ratchet behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Explore</strong>
              </td>
              <td>Run the gate to establish the baseline before any changes</td>
            </tr>
            <tr>
              <td>
                <strong>Plan</strong>
              </td>
              <td>
                Identify which existing tests cover the area you're changing
              </td>
            </tr>
            <tr>
              <td>
                <strong>RED</strong>
              </td>
              <td>New test only — never delete old ones to make room</td>
            </tr>
            <tr>
              <td>
                <strong>GREEN</strong>
              </td>
              <td>Old tests still pass + new test now passes</td>
            </tr>
            <tr>
              <td>
                <strong>Review</strong>
              </td>
              <td>Verify no regressions in lint, typecheck, or test count</td>
            </tr>
            <tr>
              <td>
                <strong>Ship</strong>
              </td>
              <td>Full gate must pass — the Stop hook enforces this</td>
            </tr>
          </tbody>
        </table>

        <h2>Why it works especially well with AI agents</h2>
        <p>
          Like a Brownian ratchet in physics, individual steps may be small or
          imperfect, but the direction is always forward. This matters
          especially with AI agents because:
        </p>
        <ul>
          <li>
            Agents can run the full gate automatically — the enforcement cost is
            near zero
          </li>
          <li>
            Agents sometimes make confident-sounding changes that actually break
            things — the ratchet catches these
          </li>
          <li>
            When multiple agents or developers work in parallel, the ratchet
            prevents their changes from eroding each other's work
          </li>
          <li>
            It gives the team confidence to let Claude work more autonomously —
            the safety net is mechanical, not human attention
          </li>
        </ul>
      </>
    ),
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   Generate stub pages for remaining routes
   ═══════════════════════════════════════════════════════════════════════════ */

// Simple page factory for pages that need less custom content
function simplePage(title, searchText, content) {
  return { searchText, render: () => content };
}

// Add all remaining pages as simpler entries
Object.assign(PAGES, {
  "tutorials/core-commands": simplePage(
    "Core Commands",
    "plan context compact rename btw ide plugin session named",
    <>
      <h1>Core Session Commands</h1>
      <p>
        Learn the 8 commands that make ordinary sessions calmer and easier to
        resume. These are the foundation everything else builds on.
      </p>

      <h2>1. Start a named session</h2>
      <CodeBlock>{`claude -n "core-commands"`}</CodeBlock>
      <p>
        Named sessions are resumable. You'll thank yourself later when you need
        to pick up where you left off. Good names describe the <em>goal</em>,
        not the date.
      </p>

      <h2>2. Plan before changing code</h2>
      <CodeBlock>{`/plan
Read the relevant area and outline the smallest safe implementation plan.
Do not edit yet.`}</CodeBlock>
      <p>
        Plan Mode is <strong>native Claude Code</strong> — toggle with{" "}
        <code>Shift+Tab</code> (twice). Claude reads files and answers questions
        without making any changes. Use this whenever you're not sure about the
        approach.
      </p>

      <h2>3. Check context usage</h2>
      <CodeBlock>{`/context`}</CodeBlock>
      <p>
        Shows how full the context window is right now. Think of this as your
        fuel gauge — check it regularly, not when the car stalls.
      </p>

      <h2>4. Compact with intent</h2>
      <CodeBlock>{`/compact retain the current plan, the important files, and the next action`}</CodeBlock>
      <p>
        Good compaction names <strong>exactly what must survive</strong>. Bad
        compaction says only "summarize this" — Claude keeps the wrong things
        and loses what matters.
      </p>

      <h2>5. Rename weak session titles</h2>
      <CodeBlock>{`/rename checkout-cleanup`}</CodeBlock>

      <h2>6. Quick side questions with /btw</h2>
      <CodeBlock>{`/btw what's the correct import syntax for this library?`}</CodeBlock>
      <p>
        Answer appears in a dismissible overlay and{" "}
        <strong>never enters conversation history</strong>. Zero context cost.
        Use this constantly for quick lookups.
      </p>

      <h2>7. Connect your editor</h2>
      <CodeBlock>{`/ide`}</CodeBlock>

      <h2>8. Review installed plugins</h2>
      <CodeBlock>{`/plugin`}</CodeBlock>

      <h2>Commands worth memorizing first</h2>
      <CodeBlock>{`/plan          /context       /compact       /rename
/btw           /ide           /simplify      /debug`}</CodeBlock>
    </>,
  ),

  "tutorials/first-feature": simplePage(
    "First Feature",
    "explore plan red green review ship commit verification first win",
    <>
      <h1>Your First Feature</h1>
      <p>
        A concrete first win using the{" "}
        <strong>Explore → Plan → RED → GREEN → Review → Ship</strong> loop. The
        goal is not a large feature — it's learning the rhythm you'll repeat
        every day.
      </p>

      <div className="callout callout-tip">
        <strong>🎯 Verification is the highest-leverage practice</strong>
        <p>
          Claude performs <em>dramatically</em> better when it can verify its
          own work — run tests, compare screenshots, validate outputs. Without
          clear success criteria, you become the only feedback loop and every
          mistake requires your attention.
        </p>
      </div>

      <ol className="step-list">
        <li>
          <strong>Start a named session:</strong>{" "}
          <code>claude -n "first-feature"</code>
        </li>
        <li>
          <strong>Explore before editing:</strong> "Read the relevant area.
          Explain how this feature should fit. Don't edit yet."
        </li>
        <li>
          <strong>Create a small plan:</strong> "I want a small, reviewable
          change. Keep scope tight." Press <code>Ctrl+G</code> to edit the plan
          in your editor.
        </li>
        <li>
          <strong>Create the failing verification (RED):</strong> "Write the
          smallest failing test. Run it and confirm it fails."
        </li>
        <li>
          <strong>Implement the change (GREEN):</strong> "Implement only what's
          needed to make that test pass."
        </li>
        <li>
          <strong>Review:</strong> Run <code>/simplify</code>. Add{" "}
          <code>/security-review</code> for auth, payments, or secrets.
        </li>
        <li>
          <strong>Ship:</strong> "Commit with a descriptive message."
        </li>
      </ol>
    </>,
  ),

  "tutorials/six-step-loop": simplePage(
    "Six-Step Loop",
    "explore plan red green review ship verification TDD test-forward",
    <>
      <h1>The Six-Step Loop</h1>
      <p>
        The formal version of what you practiced in Your First Feature, with the
        concrete task of adding input validation.
      </p>

      <h2>EXPLORE</h2>
      <CodeBlock>{`Read the current validation flow and explain what happens today
when invalid input arrives. Do not edit yet.`}</CodeBlock>
      <p>
        This protects the session from speculative edits and gives you a chance
        to correct bad assumptions while the context window is still clean.
      </p>

      <h2>PLAN</h2>
      <CodeBlock>{`Create a detailed plan for adding the missing validation
with the smallest possible change.`}</CodeBlock>

      <h2>RED</h2>
      <CodeBlock>{`Write the smallest failing verification for invalid input.
Run it and confirm the failure.`}</CodeBlock>

      <h2>GREEN</h2>
      <CodeBlock>{`Implement the validation so the RED check turns GREEN.`}</CodeBlock>

      <h2>REVIEW</h2>
      <CodeBlock>{`/simplify focus on error handling`}</CodeBlock>

      <h2>SHIP</h2>
      <CodeBlock>{`Commit the validation change with a descriptive message
and summarize the verification that passed.`}</CodeBlock>

      <div className="callout callout-info">
        <strong>📐 When to skip the full loop</strong>
        <p>
          Not every task needs all six steps. For a typo, copy change, or tiny
          docs fix, just be direct. The rule of thumb: if the overhead of
          planning and verification is bigger than the change itself, stay
          light.
        </p>
      </div>
    </>,
  ),

  "tutorials/review-debug": simplePage(
    "Review & Debug",
    "simplify security-review debug permissions hooks code-reviewer",
    <>
      <h1>Review & Debug Commands</h1>
      <p>
        Commands for when Claude has already made progress and you need review,
        debugging, or visibility.
      </p>
      <h2>/simplify — 3-agent parallel review</h2>
      <CodeBlock>{`/simplify
/simplify focus on memory efficiency`}</CodeBlock>
      <p>
        Spawns 3 parallel agents: <strong>Code Reuse</strong> (finds duplicated
        patterns), <strong>Code Quality</strong> (dead code, unclear logic), and{" "}
        <strong>Efficiency</strong> (unnecessary allocations, redundant loops).
        Findings are aggregated and fixes applied automatically — you review the
        diff.
      </p>
      <h2>/security-review</h2>
      <CodeBlock>{`/security-review`}</CodeBlock>
      <p>
        Use for auth, secrets, permissions, payments, or anything
        production-sensitive.
      </p>
      <h2>/debug — investigate before guessing</h2>
      <CodeBlock>{`/debug
The checkout session expires too early. Here is the error: ...
Investigate before proposing a fix.`}</CodeBlock>
      <h2>/permissions and /hooks — inspect the system</h2>
      <CodeBlock>{`/permissions    # See current permission rules
/hooks          # See active hooks and their configuration`}</CodeBlock>
    </>,
  ),

  "tutorials/skills": simplePage(
    "Skills",
    "skills SKILL.md test-forward autoInvoke disable-model-invocation",
    <>
      <h1>Using Skills</h1>
      <p>
        Skills are reusable workflows packaged as <code>SKILL.md</code> files in{" "}
        <code>.claude/skills/</code>. They teach Claude specific behaviors for
        recurring task types — think of them as playbooks Claude can apply
        automatically.
      </p>
      <h2>Check what's available</h2>
      <CodeBlock>{`/skills`}</CodeBlock>
      <h2>Create a workflow skill</h2>
      <CodeBlock>{`# .claude/skills/fix-issue/SKILL.md
---
name: fix-issue
description: Fix a GitHub issue end-to-end
disable-model-invocation: true
---
Analyze and fix the GitHub issue: $ARGUMENTS.
1. Use gh issue view to get details
2. Search the codebase for relevant files
3. Implement changes and write tests
4. Verify tests pass
5. Commit and push, then create a PR`}</CodeBlock>
      <p>
        Invoke with <code>/fix-issue 1234</code>. The{" "}
        <code>disable-model-invocation: true</code> flag means Claude won't
        invoke this automatically — only when you explicitly call it.
      </p>
      <h2>Skills vs Hooks vs CLAUDE.md</h2>
      <table>
        <thead>
          <tr>
            <th>Mechanism</th>
            <th>Purpose</th>
            <th>Enforcement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>CLAUDE.md</strong>
            </td>
            <td>Project rules and context</td>
            <td>Advisory — Claude follows but can drift</td>
          </tr>
          <tr>
            <td>
              <strong>Skills</strong>
            </td>
            <td>Reusable workflow patterns</td>
            <td>Advisory — teaches process, doesn't block</td>
          </tr>
          <tr>
            <td>
              <strong>Hooks</strong>
            </td>
            <td>Lifecycle automation/gates</td>
            <td>Deterministic — blocks or transforms</td>
          </tr>
        </tbody>
      </table>
    </>,
  ),

  "tutorials/mcp": simplePage(
    "MCP Tools",
    "mcp model context protocol github scope user project",
    <>
      <h1>Using MCP Tools</h1>
      <p>
        MCP connects Claude Code to external tools and data. Start personal,
        move to project scope only when genuinely shared.
      </p>
      <h2>Add a personal MCP server</h2>
      <CodeBlock>{`claude mcp add --scope user --transport http github https://api.githubcopilot.com/mcp/`}</CodeBlock>
      <h2>Authenticate and use</h2>
      <CodeBlock>{`/mcp
# Then try:
Use the GitHub MCP connection to show me open PRs assigned to me.`}</CodeBlock>
      <h2>Three scopes</h2>
      <table>
        <thead>
          <tr>
            <th>Scope</th>
            <th>Use for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>user</code>
            </td>
            <td>Personal utilities across all projects</td>
          </tr>
          <tr>
            <td>
              <code>project</code>
            </td>
            <td>Team-shared integrations in .mcp.json</td>
          </tr>
          <tr>
            <td>
              <code>local</code>
            </td>
            <td>Experiments for one project, one developer</td>
          </tr>
        </tbody>
      </table>
    </>,
  ),

  "tutorials/company-mcp": simplePage(
    "Company MCP",
    "company team github jira notion sentry shared mcp",
    <>
      <h1>Company MCP Servers</h1>
      <p className="version-tag">NEW</p>
      <p>
        Setting up MCP servers the whole team uses. Start with the{" "}
        <code>gh</code> CLI (most universally useful), then add project-scoped{" "}
        <code>.mcp.json</code> for shared integrations.
      </p>
      <h2>Start with GitHub</h2>
      <CodeBlock>{`# The gh CLI is the most context-efficient approach
brew install gh && gh auth login

# Claude already knows how to use gh:
# "Use gh to show me PRs that need review"
# "Create a PR for my changes with gh"`}</CodeBlock>
      <h2>Project scope for team-wide access</h2>
      <CodeBlock>{`// .mcp.json (commit to git)
{
  "mcpServers": {
    "github": {
      "transport": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}`}</CodeBlock>
      <div className="callout callout-danger">
        <strong>🔒 Use read-only access by default</strong>
        <p>
          MCP servers can give Claude write access to external systems. Start
          read-only and expand only when the team explicitly decides to allow
          writes.
        </p>
      </div>
    </>,
  ),

  "tutorials/project-setup": {
    searchText:
      "baseline settings hooks rules production setup global personal team ~/.claude permissions session recovery enforcement download",
    render: (nav) => (
      <>
        <h1>Download & Install</h1>
        <p className="version-tag">
          Install the production-tested ~/.claude setup and add a minimal
          project baseline.
        </p>

        <p>
          Claude Code configuration lives in two places: your{" "}
          <strong>personal global setup</strong> (<code>~/.claude/</code>) that
          follows you across all projects, and the{" "}
          <strong>project-level config</strong> (<code>.claude/</code>) that's
          committed to git and shared with your team.
        </p>

        <div className="callout callout-warn">
          <strong>⚠️ Prerequisites matter here</strong>
          <p>
            Don't start with this page. Go through{" "}
            <strong>
              First-Time Setup → Core Commands → Your First Feature → Your First
              Hook
            </strong>{" "}
            first. Configuration you haven't practiced becomes mysterious
            friction — not a productivity boost.
          </p>
        </div>

        <div className="download-card">
          <span className="download-icon">📦</span>
          <div className="download-card-text">
            <h3>~/.claude Global Setup — Proven in Production</h3>
            <p>
              Complete <code>~/.claude/</code> directory: CLAUDE.md ·
              settings.json · 9 hooks · safety/testing/ui rules · /build,
              /evolve, /status commands. Untar into your home directory.
            </p>
          </div>
          <a
            href="/downloads/claude-global-setup.zip"
            download
            className="download-btn"
          >
            ⬇ Download ZIP
          </a>
        </div>
        <CodeBlock>{`# Install global config
cd ~
unzip ~/Downloads/claude-global-setup.zip
chmod +x ~/.claude/hooks/*.sh

# Verify jq is installed (hooks need it)
jq --version || brew install jq   # macOS
# jq --version || apt install jq  # Linux`}</CodeBlock>

        <h2>The two-layer model</h2>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Scope</th>
              <th>In git?</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>~/.claude/</code>
              </td>
              <td>You, everywhere</td>
              <td>No</td>
              <td>
                Your personal workflow: enforcement hooks, session recovery,
                slash commands, code rules
              </td>
            </tr>
            <tr>
              <td>
                <code>.claude/</code>
              </td>
              <td>This project's team</td>
              <td>Yes</td>
              <td>
                Shared safety hooks, scoped rules, permissions — team baseline
              </td>
            </tr>
            <tr>
              <td>
                <code>.claude/settings.local.json</code>
              </td>
              <td>You, this project</td>
              <td>Gitignored</td>
              <td>Personal overrides for this project only</td>
            </tr>
          </tbody>
        </table>
        <p>
          Settings load in order: <strong>global → project → local</strong>.
          Later files override earlier ones. This means your global setup
          provides defaults, and project config overrides for team needs.
        </p>

        <h2>Step 1: Build your global setup first</h2>
        <p>
          See{" "}
          <L to="tutorials/global-setup" navigate={nav}>
            Production Setup Tutorial
          </L>{" "}
          for the full step-by-step walkthrough of every hook, rule, and
          command.
        </p>

        <h2>Step 2: Add .gitignore entries and commit a project baseline</h2>
        <CodeBlock>{`# Add to .gitignore:
.claude/settings.local.json  # Personal overrides
.claude/JOURNAL.md           # Session state (written by hooks)
.claude/HANDOFF.md           # Compact recovery (written by hooks)

# Commit the team baseline:
git add .claude/ .gitignore
git commit -m "Add Claude Code team baseline"

# Every developer gets the same safety net:
# git pull && chmod +x .claude/hooks/*.sh`}</CodeBlock>

        <div className="callout callout-tip">
          <strong>💡 What stays global vs. what goes in the project</strong>
          <p>
            <strong>Global</strong> (personal): session recovery hooks (journal,
            handoff, session-start), implementation protocol enforcement
            (UserPromptSubmit), TDD write guard, slash commands (/build,
            /evolve). <strong>Project</strong> (team): safety hooks,
            auto-formatter, scoped rules, permissions. The dividing line: if it
            enforces <em>your</em> workflow, it's global. If it enforces{" "}
            <em>team</em> standards, it's project-level.
          </p>
        </div>

        <h2>What each piece does</h2>
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Where</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>CLAUDE.md</code>
              </td>
              <td>~/.claude/ + repo root</td>
              <td>Global rules + project-specific instructions</td>
            </tr>
            <tr>
              <td>
                <code>settings.json</code>
              </td>
              <td>~/.claude/ + .claude/</td>
              <td>Permissions + hook wiring</td>
            </tr>
            <tr>
              <td>
                <code>pre-tool-security.sh</code>
              </td>
              <td>~/.claude/hooks/ or .claude/hooks/</td>
              <td>Blocks destructive commands, secret commits, force-push</td>
            </tr>
            <tr>
              <td>
                <code>post-edit-autoformat.sh</code>
              </td>
              <td>.claude/hooks/</td>
              <td>Runs Prettier/Black/gofmt after every file edit</td>
            </tr>
            <tr>
              <td>
                <code>session-start.sh</code>
              </td>
              <td>~/.claude/hooks/</td>
              <td>Loads JOURNAL.md for session recovery</td>
            </tr>
            <tr>
              <td>
                <code>stop-journal.sh</code>
              </td>
              <td>~/.claude/hooks/</td>
              <td>Writes JOURNAL.md with test status on every turn</td>
            </tr>
            <tr>
              <td>
                <code>post-compact-handoff.sh</code>
              </td>
              <td>~/.claude/hooks/</td>
              <td>Writes HANDOFF.md when context is compacted</td>
            </tr>
            <tr>
              <td>
                <code>impl-protocol-reminder.sh</code>
              </td>
              <td>~/.claude/hooks/</td>
              <td>
                Reads live ## Build Sequence from project CLAUDE.md; hard-blocks
                if missing; /quick bypasses
              </td>
            </tr>
            <tr>
              <td>
                <code>rules/*.md</code>
              </td>
              <td>.claude/rules/</td>
              <td>Path-scoped rules that auto-trigger on matching files</td>
            </tr>
            <tr>
              <td>
                <code>commands/*.md</code>
              </td>
              <td>~/.claude/commands/</td>
              <td>Slash commands: /build, /evolve, /status</td>
            </tr>
          </tbody>
        </table>

        <h2>Minimal project setup — without breaking global defaults</h2>
        <p>
          The most important constraint:{" "}
          <strong>project config must not fight your global config</strong>. The
          global setup's hooks (session recovery, safety, write guard,
          enforcement) should be additive with project config. Here's the safe
          minimum:
        </p>

        <div className="callout callout-tip">
          <strong>
            💡 Project config adds restrictions — it doesn't replace global ones
          </strong>
          <p>
            Your global <code>~/.claude/settings.json</code> is always loaded
            first. Project <code>.claude/settings.json</code> is merged on top.
            Use project config to <em>add</em> project-specific permissions and
            rules — not to reconfigure what your global setup already handles.
            Repeating global hook wiring in the project config creates duplicate
            hook execution.
          </p>
        </div>

        <CodeBlock>{`# Minimal .claude/ for a project — respects your global setup
mkdir -p .claude/rules

# Project CLAUDE.md — project-specific context only
# Your global ~/.claude/CLAUDE.md handles universal rules
cat > CLAUDE.md << 'EOF'
# [Project Name]

## Stack
- [e.g., TypeScript, Next.js 14, Vitest, Drizzle, PostgreSQL]

## Verification gate
pnpm lint && pnpm typecheck && pnpm test

## Key conventions
- [Add only rules Claude would otherwise get wrong for THIS project]
- [Remove anything your global CLAUDE.md already covers]

## Build Sequence

> Claude: read this on every turn. Find the first unchecked - [ ] box. That is your current step.
> Do not proceed until ALL gates for the current phase are met.

### Phase 1 — [name]
- [ ] Step description
- [ ] Run the test command → GREEN
- [ ] Run /simplify on changed files

**Gate:** all boxes checked, tests passing.

## Test Command
pnpm lint && pnpm typecheck && pnpm test
EOF`}</CodeBlock>

        <p>
          The project-level <code>.claude/settings.json</code> should contain
          only permissions specific to your project's toolchain — not hooks
          (your global setup handles those):
        </p>

        <CodeBlock>{`{
  "permissions": {
    "allow": [
      "Bash(pnpm *)",
      "Bash(drizzle-kit *)",
      "Bash(docker compose *)"
    ],
    "deny": [
      "Bash(git push * main)",
      "Bash(git push * master)"
    ]
  }
  // No "hooks" block — your ~/.claude/settings.json already handles:
  // ✓ pre-tool-security.sh  (destructive command blocking)
  // ✓ pre-write-guard.sh    (TDD test file protection)
  // ✓ post-edit-autoformat.sh (Prettier/Black/gofmt)
  // ✓ stop-journal.sh       (JOURNAL.md on every turn)
  // ✓ session-start.sh      (context recovery)
  // ✓ impl-protocol-reminder.sh (build enforcement)
}`}</CodeBlock>

        <p>Add project-scoped rules that only apply to files in this repo:</p>
        <CodeBlock>{`# .claude/rules/api.md — only fires when editing API routes
---
paths: ["src/api/**","src/routes/**","app/api/**"]
---
# API Rules
Always validate request body with Zod. Return typed Result objects.
Never expose internal error messages to clients.`}</CodeBlock>

        <p>Gitignore the runtime state files (written by your global hooks):</p>
        <CodeBlock>{`# Add to .gitignore:
.claude/JOURNAL.md      # Written by stop-journal.sh on every turn
.claude/HANDOFF.md      # Written by post-compact-handoff.sh
.claude/settings.local.json  # Personal overrides`}</CodeBlock>

        <CodeBlock>{`# Commit the project baseline:
git add CLAUDE.md .claude/ .gitignore
git commit -m "Add Claude Code project baseline"

# Team members get the project rules and permissions.
# Their own global ~/.claude/ handles personal workflow.`}</CodeBlock>

        <h2>Next steps</h2>
        <ol className="step-list">
          <li>
            Download and install the global setup above if you haven't yet
          </li>
          <li>
            See{" "}
            <L to="tutorials/global-setup" navigate={nav}>
              Production Setup Tutorial
            </L>{" "}
            for step-by-step hook explanations
          </li>
          <li>
            See{" "}
            <L to="workflows/feature" navigate={nav}>
              Feature Workflow
            </L>{" "}
            for using the full setup on real work
          </li>
        </ol>
      </>
    ),
  },

  "tutorials/global-setup": {
    searchText:
      "global setup ~/.claude personal CLAUDE.md settings.json hooks session recovery journal handoff enforcement implementation protocol TDD write guard UserPromptSubmit SessionStart Stop PostCompact rules commands build evolve production tested",
    render: (nav) => (
      <>
        <h1>Production Setup Tutorial</h1>
        <p className="version-tag">
          A battle-tested ~/.claude configuration for serious Claude Code users.
        </p>

        <p>
          This tutorial builds a complete personal <code>~/.claude/</code> setup
          step by step. Every piece here was discovered the hard way — by
          running Claude Code on real multi-week projects and fixing what broke.
          By the end, you'll have:
        </p>
        <ul>
          <li>
            <strong>Session recovery</strong> — Claude always knows where it
            left off, even after crashes
          </li>
          <li>
            <strong>Implementation enforcement</strong> — Claude follows a
            disciplined protocol on every build prompt
          </li>
          <li>
            <strong>Safety hooks</strong> — destructive commands, secret
            commits, and force-pushes are blocked before they execute
          </li>
          <li>
            <strong>TDD write guard</strong> — test files are protected during
            implementation (tests are the spec, not the thing you edit to pass)
          </li>
          <li>
            <strong>Auto-formatting</strong> — Prettier/Black/gofmt runs after
            every file edit
          </li>
          <li>
            <strong>Slash commands</strong> — /build, /evolve, /status available
            in every project
          </li>
        </ul>

        <div className="callout callout-info">
          <strong>
            🧱 Why global (~/.claude) instead of per-project (.claude)?
          </strong>
          <p>
            Your personal workflow — how you enforce discipline, recover
            context, and structure implementation — doesn't change between
            projects. <strong>Global config follows you everywhere.</strong>{" "}
            Team-specific rules (permissions, shared hooks, scoped rules) go in
            the project's <code>.claude/</code> directory. See{" "}
            <L to="tutorials/project-setup" navigate={nav}>
              Build the Full Project Setup
            </L>{" "}
            for the team layer.
          </p>
        </div>

        <h2>The final directory structure</h2>
        <p>
          Here's what you're building. Each section below explains one piece and
          why it exists.
        </p>
        <div className="file-tree">{`~/.claude/
├── CLAUDE.md                    # Global constitution — always loaded
├── settings.json                # Permissions + 9 event-driven hooks
├── hooks/
│   ├── session-start.sh         # SessionStart: loads journal, checks hooks
│   ├── impl-protocol-reminder.sh # UserPromptSubmit: enforces build protocol
│   ├── pre-tool-security.sh     # PreToolUse/Bash: blocks dangerous commands
│   ├── pre-write-guard.sh       # PreToolUse/Write: TDD file protection
│   ├── post-edit-autoformat.sh  # PostToolUse/Write: auto Prettier/Black/gofmt
│   ├── stop-journal.sh          # Stop: writes JOURNAL.md every turn
│   ├── post-compact-handoff.sh  # PostCompact: writes HANDOFF.md
│   ├── subagent-start.sh        # SubagentStart: TDD phase for test writers
│   └── notify.sh                # Notification: desktop alert when idle
├── rules/
│   ├── safety.md                # Fires on: *.sh, *.env*, hooks/, Dockerfile
│   ├── testing.md               # Fires on: *.test.*, *.spec.*, __tests__/
│   └── ui.md                    # Fires on: *.tsx, *.jsx, *.vue, *.svelte
└── commands/
    ├── build.md                 # /build — staged implementation with audit
    ├── evolve.md                # /evolve — ratchet loop for agent prompts
    ├── status.md                # /status — project health summary
    └── quick.md                 # /quick [task] — bypass build sequence for one-off tasks`}</div>

        <h2>Step 1: CLAUDE.md — The Global Constitution</h2>
        <p>
          This is the single most important file. It's loaded into every Claude
          Code session across all projects. Keep it concise — under 60 lines.
          Every line must earn its place.
        </p>

        <CodeBlock>{`# Claude Code — Global Constitution

## Prime Directives
1. Read this file, then project CLAUDE.md, then .claude/rules/ before substantive work.
2. Do not edit non-test source without a recent RED signal (failing test).
3. No silent failures — all code paths return data or typed errors.
4. Do not let unrelated failing tests redefine the current task.
5. There are no edge cases. If it can happen, it will.

## Implementation Protocol (no exceptions)
1. Read this file, then project CLAUDE.md, then .claude/agents/, config/, evals/, docs/.
2. Follow the project's build sequence exactly. Do not skip steps.
3. After each step, run the project's test command. Do not proceed until green.
4. When a stage is complete: stop. Write a summary of what was built.
5. Run /simplify on all changed files.
6. Produce an audit table: Item | Complete % | Reason | Suggestion.
7. Ask: "Would you like me to implement the suggestions?"

## TDD Protocol
1. Name the tests first — describe what you're proving before writing anything.
2. Write tests before implementation. Confirm RED.
3. Implement the MINIMUM to go GREEN. Refactor only while GREEN.
4. NEVER modify test files to make them pass — fix the source code.

## Code Rules
- Files under 300 lines. Functions under 40 lines.
- No any types — use unknown and narrow.
- Prefer composition over inheritance. Named exports over default.

## Context Management
- At 50%: /compact preserving modified files, test status, branch, tasks.
- At 70%: commit work, write HANDOFF, new session.

## Git Workflow
- Branch: feat/, fix/, refactor/, test/, docs/
- Commits: conventional (feat:, fix:, refactor:, test:)
- NEVER commit to main or master directly.`}</CodeBlock>

        <p>
          <strong>Why each section exists:</strong>
        </p>
        <ul>
          <li>
            <strong>Prime Directives</strong> — These prevent the most common
            Claude mistakes: editing code without a failing test, swallowing
            errors silently, and getting distracted by unrelated test failures.
          </li>
          <li>
            <strong>Implementation Protocol</strong> — Without this, Claude
            skips steps, builds ahead of the plan, and never stops to verify.
            The protocol forces read-first, test-after-each-step,
            stop-at-boundary discipline. This is the single biggest productivity
            improvement.
          </li>
          <li>
            <strong>TDD Protocol</strong> — "NEVER modify test files to make
            them pass" exists because Claude's default instinct is to make tests
            pass by any means necessary — including changing the tests. This
            rule forces it to fix the source code instead.
          </li>
          <li>
            <strong>Context Management</strong> — Long sessions hit context
            limits. These rules prevent the common failure mode of continuing
            until everything degrades, then losing context in an emergency
            compact.
          </li>
        </ul>

        <h2>Step 2: settings.json — Hook Wiring</h2>
        <p>
          This file connects each hook script to the event that triggers it.
          Here's the complete configuration:
        </p>

        <CodeBlock>{`{
  "permissions": {
    "allow": [
      "Bash(npm run *)", "Bash(npx *)", "Bash(pnpm *)",
      "Bash(node *)", "Bash(python *)", "Bash(python3 *)",
      "Bash(git add *)", "Bash(git commit *)", "Bash(git checkout *)",
      "Bash(git branch *)", "Bash(git diff *)", "Bash(git log *)",
      "Bash(git status*)", "Bash(git stash*)", "Bash(git merge *)",
      "Bash(cat *)", "Bash(ls *)", "Bash(grep *)", "Bash(find *)",
      "Bash(mkdir *)", "Bash(cp *)", "Bash(mv *)", "Bash(chmod +x *)",
      "Bash(jq *)", "Bash(sort *)", "Bash(sed *)", "Bash(awk *)",
      "Read", "Write", "Edit", "MultiEdit", "Glob", "Grep", "Agent"
    ],
    "deny": [
      "Bash(rm -rf /)", "Bash(rm -rf ~)", "Bash(rm -rf .git)",
      "Bash(sudo *)", "Bash(curl * | bash)", "Bash(curl * | sh)",
      "Bash(eval *)", "Bash(git push * -f *)", "Bash(git push * --force *)",
      "Bash(git push * main)", "Bash(git push * master)",
      "Bash(chmod 777 *)", "Bash(mkfs *)", "Bash(dd *)"
    ]
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/impl-protocol-reminder.sh\\"",
        "timeout": 5
      }]
    }],
    "SessionStart": [{
      "matcher": "startup|resume|compact|clear",
      "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/session-start.sh\\"",
        "timeout": 15,
        "statusMessage": "Loading session context..."
      }]
    }],
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/pre-tool-security.sh\\"",
        "timeout": 5
      }]},
      { "matcher": "Write|Edit|MultiEdit", "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/pre-write-guard.sh\\"",
        "timeout": 5
      }]}
    ],
    "PostToolUse": [{
      "matcher": "Write|Edit|MultiEdit",
      "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/post-edit-autoformat.sh\\"",
        "timeout": 30
      }]
    }],
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/stop-journal.sh\\"",
        "timeout": 45
      }]
    }],
    "SubagentStart": [{
      "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/subagent-start.sh\\"",
        "timeout": 5
      }]
    }],
    "PostCompact": [{
      "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/post-compact-handoff.sh\\"",
        "timeout": 15,
        "statusMessage": "Preserving state..."
      }]
    }],
    "Notification": [{
      "matcher": "idleprompt",
      "hooks": [{
        "type": "command",
        "command": "bash \\"$HOME/.claude/hooks/notify.sh\\"",
        "timeout": 5,
        "async": true
      }]
    }]
  }
}`}</CodeBlock>

        <p>
          <strong>Key design decisions:</strong>
        </p>
        <ul>
          <li>
            <strong>
              Paths use <code>$HOME/.claude/hooks/</code>
            </strong>{" "}
            — not relative paths. Global hooks must work from any project
            directory.
          </li>
          <li>
            <strong>Every hook has a timeout</strong> — a runaway hook with no
            timeout freezes the entire session.
          </li>
          <li>
            <strong>Permissions are generous but deny is strict</strong> — allow
            common dev commands to avoid constant permission prompts, but
            hard-block anything destructive.
          </li>
        </ul>

        <h2>Step 3: Session Recovery Hooks (the most valuable trio)</h2>
        <p>
          These three hooks solve the #1 pain point of long Claude Code
          sessions: <strong>losing context</strong>. Together they ensure Claude
          always knows where it left off — even after crashes, rate limits,
          compactions, or new sessions.
        </p>

        <h3>stop-journal.sh — captures state on every turn</h3>
        <p>
          Fires on the <code>Stop</code> event (every time Claude finishes
          responding). Writes branch name, test status, recent commits, and next
          tasks to <code>.claude/JOURNAL.md</code>.
        </p>
        <CodeBlock>{`#!/usr/bin/env bash
# Stop hook — writes JOURNAL.md with current state
# CRITICAL: Must check stop_hook_active to prevent infinite loop

INPUT=$(cat 2>/dev/null || echo '{}')
STOP_ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false' 2>/dev/null || echo "false")
[ "$STOP_ACTIVE" = "true" ] && exit 0

TS=$(date +%Y-%m-%d\\ %H:%M:%S)
BR=$(git branch --show-current 2>/dev/null || echo "unknown")
MC=$(git diff --name-only 2>/dev/null | wc -l | tr -d ' ')

# Quick test status (30s timeout)
TEST="unknown"
if [ -f "package.json" ] && grep -q '"test"' package.json 2>/dev/null; then
  (timeout 30 npm run test -- --passWithNoTests --silent 2>/dev/null) && TEST="PASSING" || TEST="FAILING"
elif [ -f "pyproject.toml" ]; then
  (timeout 30 python -m pytest --tb=no -q 2>/dev/null) && TEST="PASSING" || TEST="FAILING"
fi

mkdir -p .claude 2>/dev/null || true
cat > .claude/JOURNAL.md << JOURNAL
# Journal — \${TS}
Branch: \${BR} | \${MC} uncommitted | Tests: \${TEST}
Commits: $(git log --oneline -3 2>/dev/null || echo "none")
Resume: read this, check git diff, run tests, continue next incomplete task.
JOURNAL

exit 0`}</CodeBlock>

        <p>
          <strong>Why this exists:</strong> Without it, after a crash or rate
          limit, you start a new session and Claude has zero memory of what it
          was doing. With the journal, the session-start hook loads this file
          and Claude picks up exactly where it left off.
        </p>

        <div className="callout callout-tip">
          <strong>💡 The infinite loop guard is critical</strong>
          <p>
            The Stop hook fires when Claude responds. If the hook output causes
            Claude to respond again, the hook fires again — infinite loop. The{" "}
            <code>stop_hook_active</code> check prevents this. If you write your
            own Stop hook, always include this guard.
          </p>
        </div>

        <h3>post-compact-handoff.sh — preserves state during compaction</h3>
        <p>
          Fires on <code>PostCompact</code> — after <code>/compact</code>{" "}
          compresses the conversation. Writes a snapshot to{" "}
          <code>.claude/HANDOFF.md</code>.
        </p>
        <CodeBlock>{`#!/usr/bin/env bash
PROJ="\${CLAUDE_PROJECT_DIR:-.}"
mkdir -p "$PROJ/.claude" 2>/dev/null || true
cat > "$PROJ/.claude/HANDOFF.md" << H
# Handoff — $(date +%Y%m%d_%H%M%S) (post-compact)
Branch: $(cd "$PROJ" && git branch --show-current 2>/dev/null || echo "?")
Modified: $(cd "$PROJ" && git diff --name-only 2>/dev/null | head -20)
Commits: $(cd "$PROJ" && git log --oneline -3 2>/dev/null || echo "none")
Resume: read this, check git diff, run tests, continue from TODO.
H
echo '{"systemMessage":"Compacted. Read .claude/HANDOFF.md to restore context."}'
exit 0`}</CodeBlock>

        <div className="callout callout-danger">
          <strong>
            🔴 PostCompact JSON trap — the #1 hook debugging mistake
          </strong>
          <p>
            PostCompact hooks must output{" "}
            <code>{`{"systemMessage":"..."}`}</code>, NOT{" "}
            <code>{`{"hookSpecificOutput":{...}}`}</code>. The{" "}
            <code>hookSpecificOutput</code> field is only valid for{" "}
            <strong>PreToolUse</strong>, <strong>PostToolUse</strong>, and{" "}
            <strong>UserPromptSubmit</strong> events. Using it on any other
            event causes silent validation failure — the hook runs but its
            output is discarded. This is the single most common hook debugging
            trap.
          </p>
        </div>

        <h3>session-start.sh — loads context on startup</h3>
        <p>
          Fires on <code>SessionStart</code>. Reads the journal, fixes hook
          permissions, checks dependencies, shows blocked items.
        </p>
        <CodeBlock>{`#!/usr/bin/env bash
echo "=== Session Start ==="
echo "Branch: $(git branch --show-current 2>/dev/null || echo 'not in git')"
echo "Modified: $(git diff --name-only 2>/dev/null | wc -l | tr -d ' ') files"

# Fix hook permissions (needed after git clone)
for hook in .claude/hooks/*.sh; do
  [ -f "$hook" ] && [ ! -x "$hook" ] && chmod +x "$hook" 2>/dev/null
done

# Check jq dependency
if ! command -v jq &>/dev/null; then
  echo "WARNING: jq not installed. Security hooks will FAIL CLOSED."
fi

# Load journal (the key context recovery step)
if [ -f ".claude/JOURNAL.md" ]; then
  echo ""
  echo "=== Previous Session State ==="
  cat .claude/JOURNAL.md
  echo "=== End State ==="
fi

echo "====================="
exit 0`}</CodeBlock>

        <p>
          <strong>The three hooks work together as a cycle:</strong> Stop writes
          the journal → Compact writes the handoff → SessionStart loads the
          journal. No matter how the session ends (crash, rate limit, normal
          exit, compact), state is always captured and always loaded.
        </p>

        <h2>Step 4: Safety Hooks</h2>

        <h3>pre-tool-security.sh — blocks dangerous Bash commands</h3>
        <p>
          Fires on <code>PreToolUse</code> for <code>Bash</code> tool calls.
          Blocks destructive commands, secret commits, and force-pushes{" "}
          <strong>before they execute</strong>.
        </p>
        <CodeBlock>{`#!/usr/bin/env bash
# Crash handler — if anything unexpected fails, fail closed
trap 'echo "BLOCKED: Security hook crashed — failing closed" >&2; exit 2' ERR

INPUT=$(cat 2>/dev/null || echo '{}')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
[ -z "$COMMAND" ] && exit 0

# Block credential/secret commits
if echo "$COMMAND" | grep -qiE 'git (add|commit)'; then
  if git diff --cached --name-only 2>/dev/null | grep -qE '\\.(env|key|pem)$|credentials'; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Staging/committing sensitive files blocked."}}'
    exit 0
  fi
fi

# Block destructive operations
if echo "$COMMAND" | grep -qE 'rm -rf [^.]|drop (database|table)|truncate'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Destructive command blocked."}}'
  exit 0
fi

# Block force-push to main
if echo "$COMMAND" | grep -qE 'git push.*(-f|--force).*(main|master)'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Force push to main/master blocked."}}'
  exit 0
fi

exit 0`}</CodeBlock>

        <p>
          <strong>Key pattern:</strong> <code>exit 0</code> + JSON with{" "}
          <code>permissionDecision:"deny"</code> is the clean way to block. The{" "}
          <code>trap ... exit 2</code> is only for unexpected crashes ("fail
          closed"). Never use <code>exit 2</code> for intentional blocking — it
          triggers the crash handler, not a clean decision. See the{" "}
          <L to="advanced/hooks" navigate={nav}>
            Hooks & Events Reference
          </L>{" "}
          for the full JSON format.
        </p>

        <h3>pre-write-guard.sh — TDD file protection</h3>
        <p>
          Fires on <code>PreToolUse</code> for <code>Write|Edit|MultiEdit</code>
          . Prevents Claude from editing test files during implementation. Tests
          are the specification — you fix the source code to pass them, not the
          other way around.
        </p>
        <CodeBlock>{`#!/usr/bin/env bash
trap 'echo "BLOCKED: Write guard crashed" >&2; exit 2' ERR

INPUT=$(cat 2>/dev/null || echo '{}')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -z "$FILE_PATH" ] && exit 0

# Always protect lock files
if echo "$FILE_PATH" | grep -qE 'package-lock\\.json|yarn\\.lock|pnpm-lock\\.yaml'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Protected file. Do not edit directly."}}'
  exit 0
fi

# Protect test files during implementation
if echo "$FILE_PATH" | grep -qE '\\.test\\.|\\spec\\.|__tests__/'; then
  # Allow if tdd-test-writer agent is running
  AGENT_NAME=$(echo "$INPUT" | jq -r '.agent_name // empty' 2>/dev/null)
  [ "$AGENT_NAME" = "tdd-test-writer" ] && exit 0
  # Allow if in explicit TDD red phase
  [ "\${CLAUDE_TDD_PHASE:-}" = "red" ] && exit 0
  [ -f ".claude/.tdd-red-phase" ] && exit 0

  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Cannot modify test files during implementation. Fix the source code instead. Use tdd-test-writer agent for new tests."}}'
  exit 0
fi

exit 0`}</CodeBlock>

        <p>
          <strong>Why this matters:</strong> Claude's strongest instinct when a
          test fails is to edit the test. This hook blocks that instinct and
          forces it to fix the actual code. The escape hatches (tdd-test-writer
          agent, TDD phase marker) allow deliberate test writing when that's the
          explicit task.
        </p>

        <h2>Step 5: Implementation Protocol Enforcement</h2>

        <h3>impl-protocol-reminder.sh — live Build Sequence enforcement</h3>
        <p>
          Fires on <code>UserPromptSubmit</code> — every time you send a
          message. Reads the <code>## Build Sequence</code> section from your
          project's CLAUDE.md fresh on every prompt and injects it as live
          context. If no CLAUDE.md or no Build Sequence is found, it{" "}
          <strong>hard-blocks the prompt</strong> and tells you exactly what to
          add. Use <code>/quick [task]</code> to bypass for one-off tasks.
        </p>
        <CodeBlock>{`#!/usr/bin/env bash
# UserPromptSubmit hook — injects live Build Sequence from project CLAUDE.md.
# Hard-blocks when no sequence found. /quick [task] bypasses for one prompt.

INPUT=$(cat)
PROMPT=$(jq -r '.prompt // ""'  <<< "$INPUT" 2>/dev/null)
PROJECT_DIR=$(jq -r '.cwd // ""' <<< "$INPUT" 2>/dev/null)
[ -z "$PROJECT_DIR" ] && PROJECT_DIR="$PWD"

# /quick bypass — first line only to prevent mid-prompt triggers
FIRST_LINE="\${PROMPT%%$'\\n'*}"
if [[ "$FIRST_LINE" =~ ^[[:space:]]*/quick([[:space:]]|$) ]]; then
  jq -n '{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":"/quick bypass active — build sequence checks skipped for this prompt. No protocol enforcement."}}'
  exit 0
fi

find_claude_md() {
  local dir="$1"
  while [[ "$dir" != "/" && -n "$dir" ]]; do
    [[ -f "$dir/CLAUDE.md" ]] && { echo "$dir/CLAUDE.md"; return 0; }
    dir="\${dir%/*}"
  done
  return 1
}

block() { jq -n --arg r "$1" '{"decision":"block","reason":$r}'; exit 0; }
emit()  { jq -n --arg c "$1" '{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":$c}}'; exit 0; }

FORMAT_TEMPLATE='Add this to your CLAUDE.md:

## Build Sequence

> Claude: read this on every turn. Find the first unchecked - [ ] box. That is your current step.
> Do not proceed until ALL gates for the current phase are met.

### Phase 1 — [name]
- [ ] Step description
- [ ] Run the test command → GREEN
- [ ] Run /simplify on changed files

**Gate:** all boxes checked, tests passing.

## Test Command
your-test-command-here'

CLAUDE_PATH=$(find_claude_md "$PROJECT_DIR")
[ -z "$CLAUDE_PATH" ] && block "BLOCKED: No CLAUDE.md found in project tree ($PROJECT_DIR). $FORMAT_TEMPLATE"

BUILD_SECTION=$(awk '/^## Build Sequence/{found=1; next} found && /^## /{exit} found{print}' "$CLAUDE_PATH")
[[ -z "\${BUILD_SECTION//[[:space:]]/}" ]] && block "BLOCKED: ## Build Sequence in $CLAUDE_PATH is empty. $FORMAT_TEMPLATE"

if ! [[ "$BUILD_SECTION" == *"- [ ]"* ]]; then
  emit "All steps complete (no unchecked boxes in $CLAUDE_PATH). Add new steps or confirm the phase is done."
fi

emit "LIVE BUILD SEQUENCE from $CLAUDE_PATH

Format: - [ ] unchecked (do this next) | - [x] done (skip) | **Gate:** must be met before advancing | /quick [task] = bypass for one-off tasks

$BUILD_SECTION

---
INSTRUCTION: Find the first - [ ] box above. That is your ONLY current step. Do not skip. Do not build ahead. Run the test command after each step. When all phase boxes are checked: STOP — write summary, run /simplify, produce audit table (Item | Complete % | Reason | Suggestion), offer to implement."
exit 0`}</CodeBlock>

        <p>
          <strong>
            This is the enforcement layer that makes the build sequence stick.
          </strong>{" "}
          Instead of injecting a generic protocol reminder, the hook reads your{" "}
          <em>actual</em> build sequence live from the project CLAUDE.md — so
          Claude always sees exactly which step is next. If the project has no
          Build Sequence, the prompt is <strong>hard-blocked</strong> with a
          template showing exactly what to add.
        </p>

        <div className="callout callout-tip">
          <strong>💡 Format rules</strong>
          <ul>
            <li>
              <code>- [ ]</code> = unchecked (do this next)
            </li>
            <li>
              <code>- [x]</code> = done (skip)
            </li>
            <li>
              <strong>Gate:</strong> = must be satisfied before advancing to
              next phase
            </li>
            <li>
              <code>/quick [task]</code> = bypass build sequence for one-off
              tasks
            </li>
          </ul>
        </div>

        <p>
          This creates <strong>three-layer enforcement</strong>:
        </p>
        <ol>
          <li>
            <strong>CLAUDE.md Build Sequence</strong> — the canonical checklist
            Claude reads (advisory)
          </li>
          <li>
            <strong>UserPromptSubmit hook</strong> — injects the live sequence
            on every prompt; hard-blocks when missing (enforcement)
          </li>
          <li>
            <strong>/build command</strong> — explicit invocation with step
            detection and post-stage audit (execution)
          </li>
        </ol>

        <h2>Step 6: Convenience Hooks</h2>

        <h3>post-edit-autoformat.sh — auto-format after edits</h3>
        <CodeBlock>{`#!/usr/bin/env bash
INPUT=$(cat 2>/dev/null || true)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null || true)
[ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ] && exit 0

case "$FILE_PATH" in
  *.py) ruff format "$FILE_PATH" 2>/dev/null || black "$FILE_PATH" 2>/dev/null || true ;;
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.html|*.md) npx prettier --write "$FILE_PATH" 2>/dev/null || true ;;
  *.go) gofmt -w "$FILE_PATH" 2>/dev/null || true ;;
esac
exit 0`}</CodeBlock>
        <p>
          PostToolUse hooks cannot block — they're purely informational. This
          one is best-effort: if the formatter isn't installed, it silently
          continues.
        </p>

        <h3>notify.sh — desktop notification when idle</h3>
        <CodeBlock>{`#!/usr/bin/env bash
TITLE="Claude Code"
MSG="Waiting for your input"
if command -v osascript &>/dev/null; then
  osascript -e "display notification \\"$MSG\\" with title \\"$TITLE\\"" 2>/dev/null || true
elif command -v notify-send &>/dev/null; then
  notify-send "$TITLE" "$MSG" 2>/dev/null || true
else
  printf '\\a' 2>/dev/null || true
fi
exit 0`}</CodeBlock>
        <p>
          Runs async on the <code>Notification</code> event (idleprompt
          matcher). Useful when Claude needs input but you've tabbed away.
        </p>

        <h3>subagent-start.sh — TDD phase for test-writer agents</h3>
        <CodeBlock>{`#!/usr/bin/env bash
INPUT=$(cat 2>/dev/null || echo '{}')
AN=$(echo "$INPUT" | jq -r '.agent_name // "unknown"' 2>/dev/null)
PROJ="\${CLAUDE_PROJECT_DIR:-.}"
# Set TDD phase for test-writing agents
[ "$AN" = "tdd-test-writer" ] && [ -n "$CLAUDE_ENV_FILE" ] && echo "export CLAUDE_TDD_PHASE=red" >> "$CLAUDE_ENV_FILE"
echo "{\\"hookSpecificOutput\\":{\\"hookEventName\\":\\"SubagentStart\\",\\"additionalContext\\":\\"Project: $PROJ\\"}}"
exit 0`}</CodeBlock>
        <p>
          Works with the write guard: when a <code>tdd-test-writer</code>{" "}
          subagent starts, this hook sets the TDD phase to "red" so the write
          guard allows test file edits.
        </p>

        <h2>Step 7: Path-Scoped Rules</h2>
        <p>
          Rules are markdown files with a <code>paths:</code> frontmatter field.
          They auto-trigger when Claude edits files matching the glob patterns —
          no hook wiring needed.
        </p>

        <h3>rules/safety.md</h3>
        <CodeBlock>{`---
paths: ["**/*.sh","**/*.env*","**/hooks/**","**/settings.json","**/Dockerfile"]
---
# Safety Rules
1. NEVER hardcode secrets/keys/passwords. 2. NEVER commit .env. 3. NEVER eval user input.
4. NEVER curl|bash. 5. NEVER chmod 777. 6. NEVER disable SSL.
Shell: set -euo pipefail (scripts not hooks), quote vars.
Hooks: NEVER exit 1 to block (non-blocking!). Use JSON permissionDecision:"deny" + exit 0.`}</CodeBlock>

        <h3>rules/testing.md</h3>
        <CodeBlock>{`---
paths: ["**/*.test.*","**/*.spec.*","**/__tests__/**","**/test/**","**/tests/**"]
---
# Testing Rules
Tests are SPECS. One assertion per test. Independent. Fast.
Bug fix: reproduce EXACT error string. Test real entrypoint for CLI.
Don't chase unrelated failures. NEVER mock unit under test. Fix implementation, not tests.`}</CodeBlock>

        <h3>rules/ui.md</h3>
        <CodeBlock>{`---
paths: ["**/*.tsx","**/*.jsx","**/*.vue","**/*.svelte","src/components/**"]
---
# UI Rules
One component per file. PascalCase. <200 lines. No business logic in components.
a11y: keyboard, alt text, labels, contrast 4.5:1, semantic HTML, ARIA only when needed.
Mobile-first. Test 320/768/1024px.`}</CodeBlock>

        <p>
          <strong>Why rules instead of CLAUDE.md?</strong> Rules only fire when
          the matching files are being edited. If you put UI accessibility rules
          in CLAUDE.md, they load on every session — including when you're
          editing a database migration. Rules keep the context window clean.
        </p>

        <h2>Step 8: Slash Commands</h2>
        <p>
          Slash commands are markdown files in <code>~/.claude/commands/</code>.
          They become available as <code>/build</code>, <code>/evolve</code>,{" "}
          <code>/status</code> in every project.
        </p>

        <h3>commands/build.md — Staged implementation with audit</h3>
        <CodeBlock>{`Read CLAUDE.md completely. Then read every file in .claude/agents/, config/, evals/, docs/.

Identify where we are by reading the project's build sequence. Report which stage and step.

## Implementation Rules (no exceptions)
1. Follow the build sequence exactly. Do not skip steps. Do not build ahead.
2. Begin at the current step, not the first step.
3. After EACH step: run the project's test command. Do not proceed until green.
4. When the current stage is complete: STOP. Do not begin the next stage.

## Post-Stage Protocol
### Step A — Summary
Write what was built: files created, functions added, tests written.
### Step B — Simplify
Run /simplify on all changed files.
### Step C — Audit Table
| Item | Complete % | Reason | Suggestion |
### Step D — Offer
Ask: "Would you like me to implement the suggestions?"

$ARGUMENTS`}</CodeBlock>

        <p>
          <strong>
            Why /build exists alongside the CLAUDE.md protocol and the
            UserPromptSubmit hook:
          </strong>{" "}
          CLAUDE.md is advisory — Claude can drift from it. The UserPromptSubmit
          hook reinforces it on build prompts. <code>/build</code> is the
          explicit invocation that includes step detection (figuring out which
          stage you're at) and the full post-stage audit. Three layers,
          increasing specificity.
        </p>

        <h2>Step 9: Install it</h2>
        <CodeBlock>{`# Create the directory structure
mkdir -p ~/.claude/hooks ~/.claude/rules ~/.claude/commands

# Copy each file from the tutorial above into the right location
# (or clone a starter repo if you've shared one)

# Make hooks executable
chmod +x ~/.claude/hooks/*.sh

# Verify jq is installed (hooks depend on it)
jq --version || echo "Install jq: brew install jq / apt install jq"`}</CodeBlock>

        <h2>Step 10: Verify it works</h2>
        <CodeBlock>{`# Start a new session
claude

# You should see session-start.sh output:
# === Session Start ===
# Branch: main
# Modified: 0 files
# =====================

# Type a build prompt:
# "build the auth module"
# You should see the Implementation Protocol injected as context

# Make an edit to a .ts file — auto-format should run
# Try to edit a .test.ts file — write guard should block it`}</CodeBlock>

        <h2>Lessons learned the hard way</h2>
        <table>
          <thead>
            <tr>
              <th>Lesson</th>
              <th>What went wrong</th>
              <th>What fixed it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>hookSpecificOutput validity</strong>
              </td>
              <td>
                PostCompact hook used hookSpecificOutput — output was silently
                discarded
              </td>
              <td>
                Only PreToolUse, PostToolUse, UserPromptSubmit support
                hookSpecificOutput. All other events use systemMessage.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Exit codes</strong>
              </td>
              <td>
                Used exit 2 to block commands — triggered crash handler instead
                of clean block
              </td>
              <td>
                exit 0 + JSON permissionDecision:"deny" is the clean approach.
                exit 2 is for unexpected crashes only.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Implementation enforcement</strong>
              </td>
              <td>
                Claude read the protocol in CLAUDE.md but ignored it under
                pressure
              </td>
              <td>
                Three-layer enforcement: CLAUDE.md (advisory) + UserPromptSubmit
                hook (reinforcement) + /build (execution)
              </td>
            </tr>
            <tr>
              <td>
                <strong>Test file editing</strong>
              </td>
              <td>
                Claude edited tests to make them pass instead of fixing the
                source code
              </td>
              <td>
                Write guard blocks test files during implementation. TDD agent
                and red-phase marker provide escape hatches.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Session context loss</strong>
              </td>
              <td>
                After crashes/compaction, Claude had no memory of what it was
                doing
              </td>
              <td>
                Three-hook recovery cycle: Stop writes journal, PostCompact
                writes handoff, SessionStart loads journal.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Stop hook infinite loop</strong>
              </td>
              <td>
                Stop hook output → Claude responds → Stop hook fires again →
                infinite
              </td>
              <td>
                Check stop_hook_active in hook input JSON. Exit immediately if
                true.
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Next steps</h2>
        <ol className="step-list">
          <li>Build the global setup and run it for a week as-is</li>
          <li>
            See{" "}
            <L to="tutorials/project-setup" navigate={nav}>
              Production Setup
            </L>{" "}
            to extract the team subset into your project's <code>.claude/</code>
          </li>
          <li>
            See{" "}
            <L to="workflows/feature" navigate={nav}>
              Feature Workflow
            </L>{" "}
            for using the full setup on real feature work
          </li>
          <li>
            See{" "}
            <L to="advanced/hooks" navigate={nav}>
              Hooks & Events Reference
            </L>{" "}
            for the complete event and JSON format documentation
          </li>
        </ol>
      </>
    ),
  },

  "tutorials/vscode": simplePage(
    "VS Code & IDE",
    "vscode jetbrains desktop teleport dispatch",
    <>
      <h1>VS Code & IDE Integration</h1>
      <p className="version-tag">
        Updated — covers VS Code, JetBrains, and Desktop
      </p>
      <h2>Install</h2>
      <CodeBlock>{`/ide     # From inside Claude Code`}</CodeBlock>
      <p>
        Or search "Claude Code" in VS Code Extensions. JetBrains users install
        from the marketplace.
      </p>
      <h2>Desktop App</h2>
      <p>
        Standalone app with visual diff review, multiple sessions, and scheduled
        tasks. Download from{" "}
        <a href="https://code.claude.com/docs/en/overview">code.claude.com</a>.
      </p>
      <h2>Hand off between surfaces</h2>
      <CodeBlock>{`/desktop        # Hand terminal session to Desktop app
/rc             # Continue from mobile or web
claude --teleport  # Pull cloud session into terminal`}</CodeBlock>
    </>,
  ),

  "workflows/daily": simplePage(
    "Daily Workflow",
    "session resume fork explore plan red green review ship interview",
    <>
      <h1>Daily Workflow</h1>
      <p>
        The repeatable operating loop. Core idea: Claude Code works best with a
        calm, explicit loop — not giant one-shot prompts.
      </p>
      <h2>1. Named sessions</h2>
      <CodeBlock>{`claude -n "feature-oauth"     # New named session
claude -c                      # Resume last
claude -r "feature-oauth"      # Resume by name
claude -c --fork-session       # Branch the investigation`}</CodeBlock>
      <h2>2. Explore before editing</h2>
      <CodeBlock>{`Read the relevant files and explain the current flow.
Do not edit. Tell me what matters and what looks risky.`}</CodeBlock>
      <h2>3. The six-step loop for behavior changes</h2>
      <p>Explore → Plan → RED → GREEN → Review → Ship</p>
      <h2>4. Let Claude interview you for large features</h2>
      <CodeBlock>{`I want to build [brief description]. Interview me using AskUserQuestion.
Ask about technical implementation, edge cases, and tradeoffs.
Keep going until we've covered everything, then write a spec to SPEC.md.`}</CodeBlock>
      <p>
        Then start a fresh session to execute the spec — clean context focused
        on implementation.
      </p>
      <h2>5. Context management as habit</h2>
      <CodeBlock>{`/context       # Check usage regularly
/compact       # Compress at 70-80%
/clear         # Reset between unrelated tasks
/btw           # Side questions, zero context cost`}</CodeBlock>
    </>,
  ),

  "workflows/feature": {
    searchText:
      "feature workflow TODO tasks plan spec CLAUDE.md /build /compact /simplify code review explore red green ship hooks automatic journal handoff context commands",
    render: (nav) => (
      <>
        <h1>Feature Workflow</h1>
        <p>
          The complete loop for shipping a real feature — from the first "what
          should I build?" to merged and reviewed. This workflow integrates the
          tools, commands, hooks, and files that make Claude Code productive on
          serious work.
        </p>

        <h2>Phase 1: Capture and plan</h2>
        <p>
          Start with a clear task before touching any code. Vague prompts
          produce vague results.
        </p>

        <h3>Create a TODO first</h3>
        <p>
          Tell Claude what you need. Let it interview you to make it concrete,
          then record it:
        </p>
        <CodeBlock>{`# Option A: Quick task (already clear)
"Add rate limiting to the /api/auth/login endpoint.
 Write the task to TODO.md before starting."

# Option B: Unclear feature — let Claude interview you
"I want to add a notification system. Interview me using AskUserQuestion.
 Ask about delivery channels, triggers, user preferences, and database impact.
 When we've covered everything, write a spec to docs/SPEC-notifications.md
 and add the first task to TODO.md."`}</CodeBlock>

        <div className="callout callout-tip">
          <strong>💡 TODO.md vs Native Tasks</strong>
          <p>
            <strong>TODO.md</strong> — plain markdown, persists across sessions,
            your global hooks track it (the Stop journal reads remaining tasks).
            Use for multi-session feature work.
          </p>
          <p>
            <strong>Native Tasks</strong> (<code>/tasks</code>) — in-session
            task list Claude manages directly. Best for breaking down work
            within one session. Doesn't persist after <code>/clear</code>.
          </p>
          <p>
            For a feature that spans multiple sessions: use TODO.md as the
            canonical list, Native Tasks for the current session's breakdown.
          </p>
        </div>

        <h3>Special files in play</h3>
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Purpose</th>
              <th>Who writes it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>TODO.md</code>
              </td>
              <td>Canonical task list for the feature</td>
              <td>You or Claude</td>
            </tr>
            <tr>
              <td>
                <code>docs/SPEC-*.md</code>
              </td>
              <td>Full feature spec from the interview</td>
              <td>Claude (after interview)</td>
            </tr>
            <tr>
              <td>
                <code>CLAUDE.md</code>
              </td>
              <td>Project rules + build sequence</td>
              <td>You (maintained)</td>
            </tr>
            <tr>
              <td>
                <code>.claude/JOURNAL.md</code>
              </td>
              <td>Session state — auto-written by stop-journal hook</td>
              <td>Hook (automatic)</td>
            </tr>
            <tr>
              <td>
                <code>.claude/HANDOFF.md</code>
              </td>
              <td>
                Compact recovery state — auto-written by post-compact hook
              </td>
              <td>Hook (automatic)</td>
            </tr>
            <tr>
              <td>
                <code>.claude/BLOCKED.md</code>
              </td>
              <td>Blockers that need human input</td>
              <td>Claude (when stuck)</td>
            </tr>
          </tbody>
        </table>

        <h3>Embed the build sequence in CLAUDE.md</h3>
        <p>
          For features with multiple stages, add the sequence to your project's
          CLAUDE.md. This is what <code>/build</code> reads to determine where
          you are:
        </p>
        <CodeBlock>{`## Build sequence — Notifications

### Stage 1: Database schema
1. Add notifications table migration
2. Add NotificationRepository with CRUD ops
3. Write tests for repository
Done when: npm test passes

### Stage 2: Delivery engine
1. Build NotificationQueue with retry logic
2. Add email delivery adapter
3. Wire to user preference settings
Done when: integration tests pass, email verified in staging

### Stage 3: API endpoints
1. POST /api/notifications/send
2. GET /api/notifications (paginated)
3. PATCH /api/notifications/:id/read
Done when: all endpoints return correct status codes, schema validated`}</CodeBlock>

        <p>
          Now <code>/build</code> can detect the current stage, implement it,
          test it, stop at the boundary, and produce an audit table —
          automatically.
        </p>

        <h2>Phase 2: Explore without editing</h2>
        <p>
          Before any code changes, get the lay of the land. This prevents
          incorrect assumptions:
        </p>
        <CodeBlock>{`"Read the auth module and any related middleware.
 Explain the current flow and flag anything that looks risky.
 Do not edit anything yet."`}</CodeBlock>
        <p>
          This is the most skipped step and the source of most rework. Claude's
          first instinct is to start building. Train yourself to always explore
          first.
        </p>

        <h2>Phase 3: Implement with /build</h2>
        <p>
          Once you understand the codebase and have a spec, run{" "}
          <code>/build</code>:
        </p>
        <CodeBlock>{`/build`}</CodeBlock>
        <p>What happens automatically:</p>
        <ul>
          <li>Claude reads CLAUDE.md, all agents, config, docs</li>
          <li>Detects which stage you're at by checking what code exists</li>
          <li>Implements the current step only — stops at stage boundary</li>
          <li>
            Runs <code>npm test</code> after each step — blocks on failure
          </li>
          <li>Produces audit table when stage completes</li>
        </ul>
        <p>
          The <strong>UserPromptSubmit hook</strong> also injects the
          Implementation Protocol on plain implementation prompts — so even
          without <code>/build</code>, Claude is reminded to read first, test
          after each step, and stop at boundaries.
        </p>

        <h2>Phase 4: Manage context during a long feature</h2>
        <p>
          Long features exhaust context. Manage it proactively — don't wait for
          degradation:
        </p>

        <h3>/context — monitor usage</h3>
        <CodeBlock>{`/context    # Shows current usage %`}</CodeBlock>
        <p>
          Check after complex steps. At 50%, compact. At 70%, commit and start a
          fresh session.
        </p>

        <h3>/compact — compress with intent</h3>
        <CodeBlock>{`/compact    # Auto-compresses to summary

# Better: tell it what to preserve
"Compact. Preserve: current stage (Stage 2), passing tests, the NotificationQueue interface we settled on, and the next 3 TODO items."`}</CodeBlock>
        <p>
          After compacting, your <strong>PostCompact hook</strong> automatically
          writes <code>.claude/HANDOFF.md</code> with branch, commits, and
          modified files. Your <strong>SessionStart hook</strong> loads the
          JOURNAL.md on the next session start. Together they mean Claude
          recovers context automatically — you don't need to re-explain where
          you left off.
        </p>

        <h3>/btw — side questions without burning context</h3>
        <CodeBlock>{`/btw what does the NotificationQueue retry strategy look like in production?
/btw is there a race condition risk in the current approach?`}</CodeBlock>
        <p>
          Side questions asked with <code>/btw</code> don't count against the
          conversation context. Use freely for investigation without derailing
          the main task.
        </p>

        <h3>/clear + fresh session — when context is too dirty</h3>
        <CodeBlock>{`# Commit completed work first:
git add -A && git commit -m "feat(notifications): stage 2 delivery engine"

# Then start fresh with the handoff:
/clear
"Read .claude/JOURNAL.md and CLAUDE.md. Continue from the current TODO."`}</CodeBlock>

        <h2>Phase 5: Review and ship</h2>

        <h3>What hooks handle automatically</h3>
        <p>
          By the time you reach review, several things have already happened
          without any prompting:
        </p>
        <table>
          <thead>
            <tr>
              <th>What happened</th>
              <th>Which hook did it</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Every file Claude edited was auto-formatted</td>
              <td>post-edit-autoformat.sh</td>
              <td>After each Write/Edit</td>
            </tr>
            <tr>
              <td>Destructive commands and secret commits were blocked</td>
              <td>pre-tool-security.sh</td>
              <td>Before each Bash call</td>
            </tr>
            <tr>
              <td>Test files were protected during implementation</td>
              <td>pre-write-guard.sh</td>
              <td>Before each Write on test files</td>
            </tr>
            <tr>
              <td>Session state was saved on every Claude turn</td>
              <td>stop-journal.sh</td>
              <td>After every Stop event</td>
            </tr>
          </tbody>
        </table>

        <h3>/simplify — code quality review before PR</h3>
        <CodeBlock>{`/simplify`}</CodeBlock>
        <p>
          Launches three parallel review agents: code reuse (are you duplicating
          existing utilities?), quality (hacky patterns, redundant state,
          unnecessary comments), and efficiency (N+1 queries, missed
          parallelism, unbounded data). Fixes issues automatically. Run this
          before committing your final diff.
        </p>

        <h3>Manual code review</h3>
        <CodeBlock>{`"Review the changes since main for correctness, security, and edge cases.
 Focus on: input validation, error handling, and anything that touches auth.
 Do not suggest refactors — only flag bugs and security issues."`}</CodeBlock>

        <h3>/security-review — targeted security scan</h3>
        <CodeBlock>{`/security-review    # Scans for OWASP top 10, injection, auth issues`}</CodeBlock>

        <h3>Final gate before PR</h3>
        <CodeBlock>{`pnpm lint && pnpm typecheck && pnpm test   # Full verification gate

git diff main    # Review the complete changeset

# Create PR:
"Create a PR for this feature. Include: what changed, why,
 how to test it, and any migration steps."`}</CodeBlock>

        <h2>The complete command reference for feature work</h2>
        <table>
          <thead>
            <tr>
              <th>Command</th>
              <th>When to use</th>
              <th>Automatic?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>/build</code>
              </td>
              <td>Start or continue staged implementation</td>
              <td>No — you invoke it</td>
            </tr>
            <tr>
              <td>
                <code>/simplify</code>
              </td>
              <td>Before every PR — code quality review + fix</td>
              <td>No — you invoke it</td>
            </tr>
            <tr>
              <td>
                <code>/context</code>
              </td>
              <td>Check context usage during long sessions</td>
              <td>No — monitor yourself</td>
            </tr>
            <tr>
              <td>
                <code>/compact</code>
              </td>
              <td>Compress at 50-70% context</td>
              <td>Partially — handoff written automatically after</td>
            </tr>
            <tr>
              <td>
                <code>/btw</code>
              </td>
              <td>Investigation questions that shouldn't pollute context</td>
              <td>No — you invoke it</td>
            </tr>
            <tr>
              <td>
                <code>/plan</code>
              </td>
              <td>
                Ask Claude to plan before doing — review and edit the plan
              </td>
              <td>No — use when uncertain</td>
            </tr>
            <tr>
              <td>
                <code>/security-review</code>
              </td>
              <td>Security-focused review before shipping</td>
              <td>No — before PRs</td>
            </tr>
            <tr>
              <td>Auto-format</td>
              <td>After every file edit</td>
              <td>Yes — post-edit-autoformat hook</td>
            </tr>
            <tr>
              <td>Safety block</td>
              <td>On dangerous Bash commands</td>
              <td>Yes — pre-tool-security hook</td>
            </tr>
            <tr>
              <td>Session journal</td>
              <td>After every Claude response</td>
              <td>Yes — stop-journal hook</td>
            </tr>
            <tr>
              <td>Context recovery</td>
              <td>On session start</td>
              <td>Yes — session-start hook</td>
            </tr>
          </tbody>
        </table>

        <h2>The shape of a well-run feature session</h2>
        <CodeBlock>{`# Start or resume
claude -r "feature-notifications"   # or: claude -c

# Session loads automatically:
# === Session Start ===
# Branch: feat/notifications
# Modified: 3 files
# Previous Session State: Stage 2 complete, next: Stage 3 endpoints
# =====================

# Your prompt:
"Continue. We're at Stage 3 — API endpoints."

# /build takes it from here:
# - Reads CLAUDE.md, finds Stage 3 spec
# - Implements POST /api/notifications/send
# - Runs npm test — passes
# - Implements GET /api/notifications
# - Runs npm test — passes
# - Implements PATCH endpoint
# - Runs npm test — passes
# - Stage 3 complete: STOP
# - Produces audit table
# - Asks: "Would you like me to implement the suggestions?"

# Then:
/simplify                   # Quality review
/security-review            # Security scan
"Create a PR"               # Ship`}</CodeBlock>
      </>
    ),
  },

  "reference/commands": simplePage(
    "Commands",
    "slash command plan context compact rename btw simplify debug batch loop",
    <>
      <h1>Command Quick Reference</h1>
      <h2>Session</h2>
      <CodeBlock>{`/plan          /context       /compact [focus]  /rename <name>
/btw [q]       /clear         /rewind           /rc
/color         /stats         /usage            /cost`}</CodeBlock>
      <h2>Review & Debug</h2>
      <CodeBlock>{`/simplify [focus]    /debug              /security-review
/permissions         /hooks`}</CodeBlock>
      <h2>Project</h2>
      <CodeBlock>{`/init        /memory      /skills      /mcp
/plugin      /ide         /desktop     /schedule
/doctor      /release-notes`}</CodeBlock>
      <h2>Speed & Scale</h2>
      <CodeBlock>{`/fast        /effort <level>    /batch <desc>    /loop <int> <prompt>`}</CodeBlock>
      <h2>CLI Flags</h2>
      <CodeBlock>{`claude -n "name"        # New named session
claude -c               # Resume last
claude -r "name"        # Resume by name
claude -p "prompt"      # Non-interactive (headless)
claude --from-pr 42     # Resume PR session
claude --teleport       # Pull cloud session local
claude --permission-mode auto   # AI classifier
claude --model opus     # Model selection
claude --max-turns 20   # Circuit breaker
claude --bare           # Skip hooks/plugins`}</CodeBlock>
      <h2>Keyboard</h2>
      <CodeBlock>{`Shift+Tab    Cycle permission modes
Esc          Stop Claude mid-action
Esc+Esc      Rewind / checkpoint menu
Alt+T        Toggle extended thinking
Alt+P        Model picker
Ctrl+G       Open plan in editor
@filepath    Mention a file
!command     Run shell command`}</CodeBlock>
    </>,
  ),

  "reference/best-links": simplePage(
    "Best Links",
    "official docs community code.claude.com anthropic",
    <>
      <h1>Best Links</h1>
      <h2>
        Official Claude Code docs{" "}
        <span className="tag tag-official">official</span>
      </h2>
      <ul>
        <li>
          <a href="https://code.claude.com/docs/en/overview">Overview</a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/quickstart">Quickstart</a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/best-practices">
            Best Practices
          </a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/common-workflows">
            Common Workflows
          </a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/memory">
            CLAUDE.md & Memory
          </a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/skills">Skills</a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/hooks-guide">Hooks Guide</a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/hooks">Hooks Reference</a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/mcp">MCP</a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/context-window">
            Context Window
          </a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/permission-modes">
            Permission Modes
          </a>
        </li>
      </ul>
      <h2>
        Community <span className="tag tag-community">community</span>
      </h2>
      <ul>
        <li>
          <a href="https://claudcod.com/">ClaudCod</a>
        </li>
        <li>
          <a href="https://www.claudecodecommunity.org/">
            Claude Code Community
          </a>
        </li>
      </ul>
    </>,
  ),

  "reference/faq": simplePage(
    "FAQ",
    "questions answers init auto mode permissions CLAUDE.md",
    <>
      <h1>FAQ</h1>
      <h3>Where should a new developer start?</h3>
      <p>
        First-Time Setup → Core Commands → Your First Feature. Don't start with
        configuration.
      </p>
      <h3>How do I stop so many confirmations?</h3>
      <p>
        <strong>Best:</strong> Improve permissions in settings.json.{" "}
        <strong>Session:</strong> --allowedTools. <strong>AI:</strong>{" "}
        --permission-mode auto. <strong>Last resort:</strong>{" "}
        --dangerously-skip-permissions (sandboxes only).
      </p>
      <h3>What's the difference between skills, hooks, and MCP?</h3>
      <p>
        <strong>Skills</strong> teach workflows. <strong>Hooks</strong> enforce
        lifecycle events. <strong>MCP</strong> connects external tools.
      </p>
      <h3>How should I keep CLAUDE.md effective?</h3>
      <p>
        Under 200 lines. For each line: "Would removing this cause Claude to
        make mistakes?" If not, cut it.
      </p>
    </>,
  ),

  "reference/glossary": simplePage(
    "Glossary",
    "terms definitions plan mode auto accept tasks ratchet",
    <>
      <h1>Glossary</h1>
      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Definition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plan Mode</td>
            <td>Read-only mode. Shift+Tab (2x) or /plan.</td>
          </tr>
          <tr>
            <td>Auto Mode</td>
            <td>
              AI classifier evaluates permissions. --permission-mode auto.
            </td>
          </tr>
          <tr>
            <td>Tasks</td>
            <td>
              Native task management (v2.1.16+). Dependencies, cross-session.
            </td>
          </tr>
          <tr>
            <td>Ratchet</td>
            <td>
              Quality-only-forward. Once a gate passes, it must keep passing.
            </td>
          </tr>
          <tr>
            <td>Skills</td>
            <td>SKILL.md files teaching Claude specific behaviors.</td>
          </tr>
          <tr>
            <td>Hooks</td>
            <td>Commands/prompts triggered at lifecycle points.</td>
          </tr>
          <tr>
            <td>MCP</td>
            <td>Model Context Protocol. External tool connections.</td>
          </tr>
          <tr>
            <td>Subagent</td>
            <td>Focused worker with its own context window.</td>
          </tr>
          <tr>
            <td>/btw</td>
            <td>Side question that never enters conversation history.</td>
          </tr>
          <tr>
            <td>/simplify</td>
            <td>3-agent parallel review: reuse, quality, efficiency.</td>
          </tr>
          <tr>
            <td>defer</td>
            <td>v2.1.89 PreToolUse decision pausing headless sessions.</td>
          </tr>
        </tbody>
      </table>
    </>,
  ),

  "reference/troubleshooting": simplePage(
    "Troubleshooting",
    "problems issues fix hooks context CLAUDE.md",
    <>
      <h1>Troubleshooting</h1>
      <h3>Claude ignores my CLAUDE.md rules</h3>
      <p>
        The file is too long. Prune to under 200 lines. Cut anything Claude
        already does correctly.
      </p>
      <h3>Context fills up too fast</h3>
      <p>
        Use subagents for investigation. /btw for quick questions. /clear
        between tasks. Compact at 70-80%.
      </p>
      <h3>Hooks slow down every edit</h3>
      <p>
        Don't put slow work in PreToolUse. Use "async": true for post-edit
        hooks. Use the "if" field (v2.1.85+).
      </p>
      <h3>Hook not firing</h3>
      <p>
        Run /hooks to verify config. Check matcher matches the tool name. Use
        claude --debug "hooks".
      </p>
    </>,
  ),

  "reference/changelog": simplePage(
    "Changelog",
    "release changes version update new features",
    <>
      <h1>Release Changes</h1>
      <p className="version-tag">Last verified: April 5, 2026</p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Version</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apr 1</td>
            <td>v2.1.89</td>
            <td>defer, PermissionDenied hook, named subagents</td>
          </tr>
          <tr>
            <td>Mar 24</td>
            <td>—</td>
            <td>Auto Mode (AI-classified permissions)</td>
          </tr>
          <tr>
            <td>Mar 13</td>
            <td>v2.1.75</td>
            <td>1M token context window</td>
          </tr>
          <tr>
            <td>Mar 11</td>
            <td>v2.1.76</td>
            <td>/effort, MCP elicitation</td>
          </tr>
          <tr>
            <td>Mar 7</td>
            <td>v2.1.71</td>
            <td>/loop command</td>
          </tr>
          <tr>
            <td>Feb 28</td>
            <td>v2.1.63</td>
            <td>/simplify and /batch</td>
          </tr>
          <tr>
            <td>Feb 25</td>
            <td>—</td>
            <td>Remote Control (/rc)</td>
          </tr>
          <tr>
            <td>Jan 22</td>
            <td>v2.1.16</td>
            <td>Native Tasks system</td>
          </tr>
        </tbody>
      </table>
    </>,
  ),

  "advanced/hooks": simplePage(
    "Hooks & Events",
    "hook lifecycle PreToolUse PostToolUse Stop UserPromptSubmit PostCompact hookSpecificOutput events reference session recovery",
    <>
      <h1>Hooks & Events Reference</h1>
      <p>
        Full lifecycle event reference. Start with the Your First Hook tutorial
        if you're new.
      </p>
      <h2>All events</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>When</th>
            <th>Can block?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SessionStart</td>
            <td>Session begins/resumes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>UserPromptSubmit</td>
            <td>Every user prompt — before Claude processes it</td>
            <td>Yes (decision:"block")</td>
          </tr>
          <tr>
            <td>PreToolUse</td>
            <td>Before tool executes</td>
            <td>Yes (permissionDecision:"deny")</td>
          </tr>
          <tr>
            <td>PostToolUse</td>
            <td>After tool succeeds</td>
            <td>No</td>
          </tr>
          <tr>
            <td>PostToolUseFailure</td>
            <td>After tool fails (RED signals!)</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Stop</td>
            <td>Claude finishes responding</td>
            <td>Yes (decision:"block")</td>
          </tr>
          <tr>
            <td>Notification</td>
            <td>System notifications (idleprompt, etc.)</td>
            <td>No</td>
          </tr>
          <tr>
            <td>PreCompact/PostCompact</td>
            <td>Before/after context compaction</td>
            <td>No</td>
          </tr>
          <tr>
            <td>SubagentStart/Stop</td>
            <td>Subagent lifecycle</td>
            <td>No</td>
          </tr>
          <tr>
            <td>PermissionDenied</td>
            <td>Auto mode denial</td>
            <td>No</td>
          </tr>
          <tr>
            <td>TaskCreated/Completed</td>
            <td>Task system events</td>
            <td>No</td>
          </tr>
          <tr>
            <td>TeammateIdle</td>
            <td>Agent Teams teammate idle</td>
            <td>No</td>
          </tr>
          <tr>
            <td>FileChanged</td>
            <td>Filesystem changes</td>
            <td>No</td>
          </tr>
        </tbody>
      </table>

      <h2>hookSpecificOutput — which events support it</h2>
      <p>
        Only <strong>three events</strong> support the{" "}
        <code>hookSpecificOutput</code> JSON field. Using it on other events
        causes a validation error and the hook silently fails.
      </p>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>hookSpecificOutput fields</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>PreToolUse</strong>
            </td>
            <td>
              <code>permissionDecision</code> ("allow"/"deny"/"ask"/"defer"),{" "}
              <code>permissionDecisionReason</code>, <code>updatedInput</code>
            </td>
          </tr>
          <tr>
            <td>
              <strong>PostToolUse</strong>
            </td>
            <td>
              <code>additionalContext</code> (injected into model context)
            </td>
          </tr>
          <tr>
            <td>
              <strong>UserPromptSubmit</strong>
            </td>
            <td>
              <code>additionalContext</code> (injected into model context)
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        All other events (PostCompact, Stop, SessionStart, etc.) use only
        top-level fields: <code>systemMessage</code>, <code>continue</code>,{" "}
        <code>stopReason</code>, <code>decision</code>.
      </p>

      <div className="callout callout-tip">
        <strong>💡 This is the #1 hook debugging trap</strong>
        <p>
          If your PostCompact hook writes{" "}
          <code>{`{"hookSpecificOutput":{"hookEventName":"PostCompact",...}}`}</code>
          , it will fail validation silently. Use{" "}
          <code>{`{"systemMessage":"Your message here"}`}</code> instead. Same
          for Stop hooks — use <code>decision:"block"</code> at the top level,
          not inside hookSpecificOutput.
        </p>
      </div>

      <h2>Session recovery pattern</h2>
      <p>
        Three hooks working together give you crash-proof context recovery
        across sessions:
      </p>
      <table>
        <thead>
          <tr>
            <th>Hook</th>
            <th>Event</th>
            <th>Writes</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>stop-journal.sh</td>
            <td>Stop</td>
            <td>.claude/JOURNAL.md</td>
            <td>Captures branch, test status, next tasks on every turn</td>
          </tr>
          <tr>
            <td>post-compact-handoff.sh</td>
            <td>PostCompact</td>
            <td>.claude/HANDOFF.md</td>
            <td>Preserves state when context is compressed</td>
          </tr>
          <tr>
            <td>session-start.sh</td>
            <td>SessionStart</td>
            <td>(reads)</td>
            <td>Loads JOURNAL.md into session context on startup</td>
          </tr>
        </tbody>
      </table>
      <p>
        Result: Claude always knows where it left off — even after crashes, rate
        limits, or new sessions. See the{" "}
        <strong>Production Setup Tutorial</strong> tutorial for the full
        implementation.
      </p>

      <h2>Handler types</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>command</td>
            <td>Start here. Shell scripts, fast and local.</td>
          </tr>
          <tr>
            <td>agent</td>
            <td>When hook needs to read files and make judgments.</td>
          </tr>
          <tr>
            <td>prompt</td>
            <td>Model judgment without tool access.</td>
          </tr>
          <tr>
            <td>http</td>
            <td>External policy servers.</td>
          </tr>
        </tbody>
      </table>
    </>,
  ),

  "advanced/scaling": simplePage(
    "Scaling",
    "batch agent teams loop simplify parallel worktree",
    <>
      <h1>Scaling Workflows</h1>
      <h2>/batch — codebase-wide migrations</h2>
      <CodeBlock>{`/batch migrate all API routes from Express to Hono
/batch replace all lodash with native equivalents`}</CodeBlock>
      <p>
        Decomposes into 5-30 units, spawns workers in isolated worktrees, each
        implements → reviews → tests → commits → opens PR.
      </p>
      <h2>Agent Teams</h2>
      <p>Coordinated multi-instance development. 3-5 teammates is optimal.</p>
      <h2>/loop — recurring monitoring</h2>
      <CodeBlock>{`/loop 5m check deploy status
/loop 30m scan for new TODO comments`}</CodeBlock>
    </>,
  ),

  "advanced/ci-cd": simplePage(
    "CI/CD",
    "headless non-interactive defer pipeline automation",
    <>
      <h1>CI/CD Integration</h1>
      <h2>Headless mode</h2>
      <CodeBlock>{`claude -p "review for security vulnerabilities" < src/auth.ts > report.md
claude -p "fix all lint errors" --permission-mode auto
claude -p "refactor auth module" --max-turns 20`}</CodeBlock>
      <h2>Human-in-the-loop with defer</h2>
      <CodeBlock>{`#!/bin/bash
# Hook that pauses headless sessions for human review
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
if echo "$COMMAND" | grep -qE '(deploy|publish|release|migrate)'; then
  echo '{"hookSpecificOutput":{"permissionDecision":"defer","permissionDecisionReason":"Production operation requires human approval"}}'
  exit 0
fi
exit 0`}</CodeBlock>
      <p>
        Resume with <code>claude -p --resume</code> after review.
      </p>
    </>,
  ),

  "advanced/superpowers": simplePage(
    "Superpowers",
    "superpowers plugin brainstorm write-plan execute-plan",
    <>
      <h1>Superpowers Plugin</h1>
      <p>
        Check with <code>/plugin</code> first. Use as reinforcement for a
        workflow the team already understands.
      </p>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>/superpowers:brainstorm</td>
            <td>Requirements exploration</td>
          </tr>
          <tr>
            <td>/superpowers:write-plan</td>
            <td>Plan generation</td>
          </tr>
          <tr>
            <td>/superpowers:execute-plan</td>
            <td>Execution against plan</td>
          </tr>
        </tbody>
      </table>
    </>,
  ),
});

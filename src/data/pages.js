/* eslint-disable react/no-unescaped-entities */
import React from 'react';

/* Helper to make links that use the SPA navigate */
function L({ to, children, navigate, className }) {
  return (
    <a href={`#${to}`} className={className} onClick={e => { e.preventDefault(); navigate(to); }}>
      {children}
    </a>
  );
}

/* Annotated code block — each line gets a comment tooltip */
function CodeBlock({ children }) {
  return <pre><code>{children}</code></pre>;
}

export const PAGES = {

/* ═══════════════════════════════════════════════════════════════════════════
   GETTING STARTED
   ═══════════════════════════════════════════════════════════════════════════ */
'getting-started': {
  searchText: 'install setup sign in team account init bootstrap terminal configure',
  render: (nav) => (<>
    <h1>First-Time Setup</h1>
    <p className="version-tag">Aligned with official docs at <a href="https://code.claude.com/docs/en/quickstart">code.claude.com</a></p>

    <p>This page gets you into Claude Code with the least friction. The goal is <strong>not</strong> to build the final repo setup. The goal is to sign in correctly, get the terminal working, and start coding with Claude — <em>today</em>.</p>

    <div className="callout callout-info">
      <strong>🏢 Use the team account for this setup</strong>
      <p><strong>Personal account</strong> — fine for side experiments or learning in your own sandbox. <strong>Team account</strong> — use this for real repo work, shared access, and the subscription-backed environment this site assumes.</p>
      <p>If Claude Code opens under the wrong account, quit with <code>Ctrl+C</code>, restart <code>claude</code>, and sign into the team workspace before continuing.</p>
    </div>

    <h2>1. Install Claude Code</h2>
    <p>Choose the method that fits your team. The <strong>native installer auto-updates</strong> in the background — that's why it's recommended. Homebrew and npm require manual updates.</p>

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
    <p>If <code>claude doctor</code> reports problems, fix them before continuing. Common issues: missing <code>git</code>, wrong Node version, or firewall blocking the auth flow.</p>

    <h2>2. Sign in with the team account</h2>
    <CodeBlock>{`# Just run claude — it opens a browser sign-in flow
claude`}</CodeBlock>
    <p>Choose the <strong>team account or team workspace</strong>, not your personal account. API-key authentication is a later topic covered in <L to="advanced/ci-cd" navigate={nav}>CI/CD Integration</L>.</p>

    <h2>3. Configure the terminal once</h2>
    <CodeBlock>{`# Inside your first Claude Code session, run:
/terminal-setup`}</CodeBlock>
    <p>This enables the keyboard controls you'll use every single day:</p>

    <table>
      <thead><tr><th>Shortcut</th><th>What it does</th><th>When to use it</th></tr></thead>
      <tbody>
        <tr><td><code>Shift+Tab</code></td><td>Cycle permission modes</td><td>Switch between Normal → Auto-Accept → Plan Mode</td></tr>
        <tr><td><code>Esc</code></td><td>Stop Claude mid-action</td><td>When Claude starts going down the wrong path</td></tr>
        <tr><td><code>Esc+Esc</code></td><td>Rewind / checkpoint menu</td><td>Restore conversation or code to any earlier point</td></tr>
        <tr><td><code>Ctrl+G</code></td><td>Open plan in your editor</td><td>Edit Claude's plan in VS Code before execution</td></tr>
        <tr><td><code>Alt+T</code></td><td>Toggle extended thinking</td><td>When you need deeper reasoning on a hard problem</td></tr>
        <tr><td><code>Alt+P</code></td><td>Model picker</td><td>Switch between Opus, Sonnet, or custom models</td></tr>
      </tbody>
    </table>

    <h2>4. Connect your editor</h2>
    <CodeBlock>{`/ide`}</CodeBlock>
    <p>This installs or connects the VS Code extension so you get inline diffs, <code>@file</code> mentions, and plan review without leaving the terminal workflow. JetBrains users can install the plugin from the marketplace instead.</p>

    <h2>5. Bootstrap the project with /init</h2>
    <p>Run <code>/init</code> inside an interactive session. It <strong>analyzes your actual codebase</strong> to detect build systems, test frameworks, and code patterns, then generates a starter <code>CLAUDE.md</code> tailored to your repo.</p>
    <CodeBlock>{`# Inside Claude Code:
/init`}</CodeBlock>

    <div className="callout callout-tip">
      <strong>💡 Keep CLAUDE.md short — under 200 lines</strong>
      <p>This is one of the most important official best practices. For each line in your CLAUDE.md, ask: <em>"Would removing this cause Claude to make mistakes?"</em> If not, cut it. Bloated files cause Claude to ignore your actual instructions because important rules get lost in the noise.</p>
      <p>For detailed domain docs, use <code>@path/to/file</code> imports instead of inlining. Claude reads referenced files on demand without bloating the context window.</p>
    </div>

    <h2>6. Recommended quick bootstrap (download + install)</h2>
    <p>If you want the full recommended project setup in one shot, here's the fastest path:</p>
    <CodeBlock>{`# Step 1: Install Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# Step 2: Start and sign in with team account
claude

# Step 3: Generate CLAUDE.md from your codebase
/init

# Step 4: Download the starter kit from the Project Setup page
#   It includes:
#     .claude/settings.json        — shared permissions + hooks
#     .claude/hooks/*.sh           — safety + feedback hooks
#     .claude/rules/*.md           — scoped testing rules
#     .claude/skills/test-forward/ — verification-first skill
#     .claude/agents/code-reviewer.md — review subagent

# Step 5: Unzip into your repo root and commit
unzip starter-kit.zip -d .
git add .claude/ && git commit -m "Add Claude Code team baseline"`}</CodeBlock>

    <h2>7. What to do next</h2>
    <p>Do <strong>not</strong> jump straight to the full configuration page. Follow this path — each step builds on the last:</p>
    <ol className="step-list">
      <li><strong><L to="tutorials/core-commands" navigate={nav}>Core Session Commands</L></strong> — learn the 8 commands you'll use every day</li>
      <li><strong><L to="tutorials/first-feature" navigate={nav}>Your First Feature</L></strong> — practice the Explore → RED → GREEN loop with a real task</li>
      <li><strong><L to="tutorials/todo-and-tasks" navigate={nav}>TODO Lists & Tasks</L></strong> — track multi-step work so nothing gets skipped</li>
      <li><strong><L to="workflows/daily" navigate={nav}>Daily Workflow</L></strong> — make the loop a repeatable habit</li>
      <li><strong><L to="configuration" navigate={nav}>Project Setup</L></strong> — commit shared config only after the workflow is familiar</li>
    </ol>
  </>),
},

/* ═══════════════════════════════════════════════════════════════════════════
   FIRST HOOK — with line-by-line commented code
   ═══════════════════════════════════════════════════════════════════════════ */
'tutorials/first-hook': {
  searchText: 'hook PreToolUse PostToolUse Stop block dangerous format test guard exit code settings.json',
  render: (nav) => (<>
    <h1>Your First Hook</h1>
    <p>Hooks are automations or guardrails that run at specific moments in a Claude Code session. They're <strong>deterministic</strong> — unlike CLAUDE.md instructions which are advisory, hooks guarantee the action happens every time.</p>

    <p>This tutorial starts with a harmless example to teach the mechanics, then shows you the <strong>three most useful production hooks</strong> with line-by-line explanations.</p>

    <div className="callout callout-info">
      <strong>🧱 Hooks are just event listeners + handlers</strong>
      <p>Something happens (Claude tries to edit a file) → your script runs → your script decides: <strong>allow</strong> (exit 0), <strong>warn</strong> (exit 1), or <strong>block</strong> (exit 2). That's the entire model.</p>
    </div>

    <h2>Step 1: Create a harmless log hook</h2>
    <p>Before you build anything that blocks Claude, start with something that just watches. This log hook records every file Claude edits, so you can inspect what happened after a session.</p>

    <CodeBlock>{`mkdir -p .claude/hooks .claude/state`}</CodeBlock>

    <p>Create <code>.claude/hooks/log-edit.sh</code>:</p>
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
    <p>Open <code>.claude/settings.json</code> and add the hook configuration. Here's what each field means:</p>

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

    <h2>The exit code model — the whole thing in three words</h2>
    <table>
      <thead><tr><th>Exit code</th><th>Word</th><th>What happens</th><th>When to use</th></tr></thead>
      <tbody>
        <tr><td><code>0</code></td><td><strong>Allow</strong></td><td>Claude keeps going normally</td><td>Logging, formatting, feedback</td></tr>
        <tr><td><code>1</code></td><td><strong>Warn</strong></td><td>Claude keeps going but sees a warning message</td><td>Soft guardrails, reminders</td></tr>
        <tr><td><code>2</code></td><td><strong>Block</strong></td><td>Claude is stopped; your stderr message explains why</td><td>Safety gates, enforcement</td></tr>
      </tbody>
    </table>

    <h2>The 3 most useful production hooks</h2>
    <p>These three hooks cover the vast majority of what teams actually need. They map directly to the six-step loop: block dangerous things, format after edits, and run related tests for fast feedback.</p>

    <h3>Hook 1: block-dangerous.sh — Safety gate</h3>
    <p>This <code>PreToolUse</code> hook fires <strong>before</strong> Claude runs a shell command. If the command matches a destructive pattern, it's blocked before it ever executes.</p>

    <CodeBlock>{`#!/bin/bash
# ──────────────────────────────────────────────────────────
# BLOCK-DANGEROUS HOOK — prevents destructive shell commands
# Trigger: PreToolUse on Bash
# Purpose: Stop "rm -rf /", DROP TABLE, etc. BEFORE they run
# Exit: 0 = allow, 2 = block (NEVER exit 1 for safety hooks)
# ──────────────────────────────────────────────────────────

# Read the JSON payload from Claude
INPUT=$(cat)

# Extract the shell command Claude wants to run
# Example payload: { "tool_input": { "command": "rm -rf /tmp/foo" } }
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Check against destructive patterns using case-insensitive regex
# \\b = word boundary, so "rm" won't match "format"
if echo "$COMMAND" | grep -iE '\\b(rm\\s+-rf\\s+/|DROP\\s+TABLE|DELETE\\s+FROM\\s+\\w+\\s*;|TRUNCATE\\s+TABLE)\\b' > /dev/null; then

  # Write the block reason to stderr — Claude sees this message
  # and understands WHY it was blocked
  echo "BLOCKED: Destructive command detected: $COMMAND" >&2
  echo "If this is intentional, ask the human to run it manually." >&2

  # Exit 2 = BLOCK. This is critical.
  # Exit 1 would only warn, and the command would still run!
  exit 2
fi

# If we get here, the command is safe — let it through
exit 0`}</CodeBlock>

    <h3>Hook 2: auto-format.sh — Convenience feedback</h3>
    <p>This <code>PostToolUse</code> hook fires <strong>after</strong> Claude successfully edits a file. It runs your team's formatter so code style is always consistent — Claude sees the post-format version.</p>

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
    <p>This <code>PostToolUse</code> hook finds and runs tests related to the file Claude just edited. The <code>"async": true</code> flag means it runs in the background — Claude doesn't have to wait for tests to finish before continuing.</p>

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
    <p>Here's the complete <code>.claude/settings.json</code> hook block with all three hooks:</p>

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
      <p>Without <code>"async": true</code>, Claude waits for the test to finish before continuing. For fast unit tests, that's fine. For slower integration tests, you want async — Claude keeps working while tests run in the background, and sees the results when they complete.</p>
    </div>

    <h2>Adding a Stop gate (the SHIP enforcer)</h2>
    <p>This is the hook that prevents Claude from declaring "done" while verification is incomplete. It uses the <code>agent</code> handler type, which means Claude itself evaluates whether the gate passes:</p>

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
      <li><strong>Adding several hooks before the team understands the workflow.</strong> Hooks that enforce a workflow nobody has practiced feel like random resistance.</li>
      <li><strong>Putting slow work in PreToolUse.</strong> Pre-hooks block Claude from doing anything until they finish. Keep them fast (&lt;5 seconds).</li>
      <li><strong>Using exit 1 for safety hooks.</strong> Exit 1 only warns — the action still happens. Use exit 2 to actually block.</li>
      <li><strong>Missing "async": true on slow PostToolUse hooks.</strong> Without it, Claude sits waiting for your 2-minute test suite on every edit.</li>
      <li><strong>No timeout.</strong> A runaway hook with no timeout freezes the entire session.</li>
    </ul>

    <h2>Next step</h2>
    <p>Once the hook mechanics feel comfortable, continue to <L to="tutorials/project-setup" navigate={nav}>Build the Full Project Setup</L> to assemble the complete repo baseline. For the advanced RED→GREEN→STOP enforcement stack, see <L to="tutorials/advanced-hooks" navigate={nav}>Build an Advanced Hook Stack</L>.</p>
  </>),
},

/* ═══════════════════════════════════════════════════════════════════════════
   TODO & TASKS
   ═══════════════════════════════════════════════════════════════════════════ */
'tutorials/todo-and-tasks': {
  searchText: 'todo tasks TodoWrite checklist multi-step tracking alignment verification',
  render: (nav) => (<>
    <h1>TODO Lists & Tasks</h1>
    <p className="version-tag">NEW — Based on official Claude Code Tasks (v2.1.16+)</p>

    <p>Claude Code has a built-in task management system that tracks progress through multi-step work. It's one of the most <strong>underused</strong> features and one of the <strong>highest-leverage</strong> ones for reliability.</p>

    <div className="callout callout-tip">
      <strong>🎯 Why this matters so much</strong>
      <p>When Claude has a visible checklist, it is far less likely to skip steps, do work out of order, or lose track of what's been done. Think of the TODO list as Claude's "repeat back what I heard" confirmation — you see misunderstandings <em>before any code is written</em>.</p>
    </div>

    <h2>1. Ask Claude to create a TODO list first</h2>
    <p>For any complex request, tell Claude to plan before coding. This single habit dramatically improves results:</p>
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

    <p><strong>What you should see:</strong> A checklist appears in your terminal showing Claude's plan. Items show three states: <code>pending</code>, <code>in_progress</code>, and <code>completed</code>. The list updates in real-time as Claude works.</p>

    <h2>2. Verify alignment before execution</h2>
    <p>Read the TODO list before Claude starts coding. These are the most common misalignment patterns — catch them early:</p>

    <table>
      <thead><tr><th>Problem</th><th>What it looks like</th><th>How to fix it</th></tr></thead>
      <tbody>
        <tr><td><strong>Out of order</strong></td><td>You said "tests first" but todos list implementation first</td><td>"Reorder: write the failing test before implementation"</td></tr>
        <tr><td><strong>Missing steps</strong></td><td>You mentioned error handling but todos skip it</td><td>"Add a step for error response testing"</td></tr>
        <tr><td><strong>Too vague</strong></td><td>"Update the component" instead of specific changes</td><td>"Break that into: change height, add padding, update color"</td></tr>
        <tr><td><strong>Misinterpretation</strong></td><td>You said "review" but Claude plans "commit"</td><td>"I meant review the diff, not commit yet"</td></tr>
      </tbody>
    </table>

    <h2>3. Steer mid-task</h2>
    <p>The checklist updates in real-time as you give feedback. Claude preserves completed work while adjusting pending items:</p>
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
      <thead><tr><th>❌ Vague (causes drift)</th><th>✅ Specific (keeps Claude on track)</th></tr></thead>
      <tbody>
        <tr><td>Style the navigation bar</td><td>Change navbar height from 60px to 80px, reduce padding from 20px to 12px</td></tr>
        <tr><td>Fix the bug</td><td>Reproduce the timeout error in a test, then fix the refresh logic in session.ts</td></tr>
        <tr><td>Add tests</td><td>Add unit test for empty input, integration test for expired token, E2E test for login flow</td></tr>
        <tr><td>Update the API</td><td>Add pagination to /api/users (limit, offset params), update OpenAPI spec, add test</td></tr>
      </tbody>
    </table>

    <h2>5. Add TODO discipline to CLAUDE.md</h2>
    <p>For teams that want this to be the default behavior on every session:</p>
    <CodeBlock>{`# In CLAUDE.md

## Task tracking
- For any work involving 3+ steps, create a todo list before starting
- Check the todo list before beginning each step  
- Mark items complete only after verification passes
- If the human corrects course, update pending items immediately`}</CodeBlock>

    <h2>6. Tasks for cross-session work (v2.1.16+)</h2>
    <p>Since January 2026, Claude Code has a native <strong>Tasks</strong> system that goes beyond single-session TODO lists. Tasks persist across sessions, support dependency tracking, and work with multi-agent orchestration.</p>
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
      <p><strong>TODO lists</strong> — use for single-session work. Quick, lightweight, no persistence needed.</p>
      <p><strong>Tasks</strong> — use when work spans multiple sessions, has dependencies between items, or involves multiple agents working in parallel.</p>
    </div>
  </>),
},

/* ═══════════════════════════════════════════════════════════════════════════
   CONTEXT MASTERY
   ═══════════════════════════════════════════════════════════════════════════ */
'tutorials/context-mastery': {
  searchText: 'context window compact clear btw subagent rewind checkpoint investigation',
  render: (nav) => (<>
    <h1>Context Mastery</h1>
    <p className="version-tag">NEW — The #1 operational skill for Claude Code</p>

    <div className="callout callout-warn">
      <strong>🧠 The fundamental constraint</strong>
      <p>Claude's context window holds your entire conversation — every message, every file Claude reads, every command output. <strong>It fills up fast, and performance degrades as it fills.</strong> When context is getting full, Claude may start "forgetting" earlier instructions or making more mistakes.</p>
      <p>Managing context is more important than any other Claude Code skill. — <em>Official Anthropic Best Practices</em></p>
    </div>

    <h2>1. Monitor with /context</h2>
    <CodeBlock>{`/context`}</CodeBlock>
    <p>Run this <strong>regularly</strong> — before the session feels broken, not after. Think of it like checking your fuel gauge while driving, not when the car stalls.</p>

    <h2>2. Compact with intent at 70–80%</h2>
    <p>When context is filling up, use <code>/compact</code> with explicit guidance about what to keep:</p>
    <CodeBlock>{`# GOOD — names exactly what matters:
/compact retain the current plan, the failing test output,
the three files we're editing, and the next action

# BAD — too vague, Claude keeps the wrong things:
/compact summarize this`}</CodeBlock>

    <p>You can also make compaction smarter by adding rules to CLAUDE.md:</p>
    <CodeBlock>{`# In CLAUDE.md
When compacting, always preserve:
- The full list of modified files
- Any test commands and their output
- The current implementation plan
- Any error messages we're debugging`}</CodeBlock>

    <h2>3. Use subagents for investigation</h2>
    <p>This is the <strong>single most powerful context-saving technique</strong>. When Claude needs to explore code to answer a question, it reads lots of files — all consuming your context. Subagents run in separate context windows and report back summaries:</p>
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
    <p>The answer appears in a <strong>dismissible overlay</strong> and <strong>never enters conversation history</strong>. Use this for quick reference lookups without growing context. It's like whispering a question to a colleague without interrupting the meeting.</p>

    <h2>5. Interrupt drift immediately</h2>
    <p>Press <code>Esc</code> the moment Claude starts going down the wrong path. Every unnecessary file scan, speculative edit, and wrong-direction exploration burns context you could have spent on the actual task.</p>
    <CodeBlock>{`# Claude starts reading files in the wrong directory...
# Don't wait — press Esc immediately, then redirect:

That's the wrong area. The auth code is in src/auth/, 
not src/middleware/. Focus there instead.`}</CodeBlock>

    <h2>6. Clear between unrelated tasks</h2>
    <CodeBlock>{`/clear`}</CodeBlock>
    <p>Use this <strong>liberally</strong>. The most common Claude Code failure mode is the "kitchen sink session" — you start with one task, ask something unrelated, then go back to the first task. Context is full of irrelevant information and Claude's quality drops.</p>

    <div className="callout callout-tip">
      <strong>💡 The two-correction rule</strong>
      <p>If you've corrected Claude more than twice on the same issue, the context is cluttered with failed approaches. <code>/clear</code> and start fresh with a more specific prompt that incorporates what you learned. A clean session with a better prompt <em>almost always</em> outperforms a long session with accumulated corrections.</p>
    </div>

    <h2>7. Rewind selectively</h2>
    <CodeBlock>{`Esc+Esc    # Opens the checkpoint menu`}</CodeBlock>
    <p>Every action Claude makes creates a checkpoint. You can restore conversation only, code only, or both. You can also <strong>"Summarize from here"</strong> to condense messages from a specific point forward — keeping earlier context intact while freeing space.</p>

    <h2>Context management checklist</h2>
    <ul>
      <li>✅ Check <code>/context</code> proactively — before things break</li>
      <li>✅ Compact around 70–80% with explicit retention guidance</li>
      <li>✅ Interrupt drift with <code>Esc</code> — don't let Claude waste context</li>
      <li>✅ Use subagents for investigation — they have their own context</li>
      <li>✅ Use <code>/btw</code> for quick questions — zero context cost</li>
      <li>✅ <code>/clear</code> between unrelated tasks — ruthlessly</li>
      <li>✅ Use <code>@filepath</code> to point Claude at specific files instead of broad scanning</li>
      <li>✅ Resume or fork sessions instead of overloading one long conversation</li>
    </ul>
  </>),
},

/* ═══════════════════════════════════════════════════════════════════════════
   RATCHET PATTERN
   ═══════════════════════════════════════════════════════════════════════════ */
'workflows/ratchet': {
  searchText: 'ratchet quality gate test regression forward backward enforce stop hook',
  render: (nav) => (<>
    <h1>The Ratchet Pattern</h1>
    <p className="version-tag">NEW — Quality only moves forward</p>

    <p>A ratchet is a mechanical device that permits motion in only one direction. In Claude Code development, the ratchet pattern means: <strong>once a quality gate passes, it must keep passing.</strong> Quality never moves backward.</p>

    <p>This is the pattern that separates teams getting reliable results from teams fighting constant regressions. It works especially well with Claude because the agent can run verification automatically — the ratchet costs almost nothing to enforce.</p>

    <h2>How the ratchet works</h2>
    <ol className="step-list">
      <li><strong>Establish the baseline before any changes.</strong> Run the full gate: <code>pnpm lint && pnpm typecheck && pnpm test</code>. Record what passes now. This is your floor.</li>
      <li><strong>Every change must pass the same gate.</strong> After each implementation step, re-run the gate. If something that passed before now fails, the change is rejected — full stop.</li>
      <li><strong>New tests only add to coverage.</strong> Never delete a passing test to make a change work. If a test needs updating because behavior intentionally changed, update it to cover the <em>new</em> behavior — don't weaken it.</li>
      <li><strong>Lint and type errors only decrease.</strong> Track the count. If your change introduces new warnings, fix them before shipping. The count can go down, never up.</li>
    </ol>

    <h2>Enforcing the ratchet with a Stop hook</h2>
    <p>The <code>Stop</code> hook is the primary enforcement point. When Claude says "I'm done," this hook verifies that the ratchet hasn't slipped:</p>

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
      <p>It doesn't prevent Claude from trying things that break tests during implementation — that's normal development. It prevents Claude from <em>declaring success</em> while regressions exist. Claude must fix the regressions before the session can complete.</p>
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
      <thead><tr><th>Step</th><th>Ratchet behavior</th></tr></thead>
      <tbody>
        <tr><td><strong>Explore</strong></td><td>Run the gate to establish the baseline before any changes</td></tr>
        <tr><td><strong>Plan</strong></td><td>Identify which existing tests cover the area you're changing</td></tr>
        <tr><td><strong>RED</strong></td><td>New test only — never delete old ones to make room</td></tr>
        <tr><td><strong>GREEN</strong></td><td>Old tests still pass + new test now passes</td></tr>
        <tr><td><strong>Review</strong></td><td>Verify no regressions in lint, typecheck, or test count</td></tr>
        <tr><td><strong>Ship</strong></td><td>Full gate must pass — the Stop hook enforces this</td></tr>
      </tbody>
    </table>

    <h2>Why it works especially well with AI agents</h2>
    <p>Like a Brownian ratchet in physics, individual steps may be small or imperfect, but the direction is always forward. This matters especially with AI agents because:</p>
    <ul>
      <li>Agents can run the full gate automatically — the enforcement cost is near zero</li>
      <li>Agents sometimes make confident-sounding changes that actually break things — the ratchet catches these</li>
      <li>When multiple agents or developers work in parallel, the ratchet prevents their changes from eroding each other's work</li>
      <li>It gives the team confidence to let Claude work more autonomously — the safety net is mechanical, not human attention</li>
    </ul>
  </>),
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
  'tutorials/core-commands': simplePage('Core Commands',
    'plan context compact rename btw ide plugin session named',
    <>
      <h1>Core Session Commands</h1>
      <p>Learn the 8 commands that make ordinary sessions calmer and easier to resume. These are the foundation everything else builds on.</p>

      <h2>1. Start a named session</h2>
      <CodeBlock>{`claude -n "core-commands"`}</CodeBlock>
      <p>Named sessions are resumable. You'll thank yourself later when you need to pick up where you left off. Good names describe the <em>goal</em>, not the date.</p>

      <h2>2. Plan before changing code</h2>
      <CodeBlock>{`/plan
Read the relevant area and outline the smallest safe implementation plan.
Do not edit yet.`}</CodeBlock>
      <p>Plan Mode is <strong>native Claude Code</strong> — toggle with <code>Shift+Tab</code> (twice). Claude reads files and answers questions without making any changes. Use this whenever you're not sure about the approach.</p>

      <h2>3. Check context usage</h2>
      <CodeBlock>{`/context`}</CodeBlock>
      <p>Shows how full the context window is right now. Think of this as your fuel gauge — check it regularly, not when the car stalls.</p>

      <h2>4. Compact with intent</h2>
      <CodeBlock>{`/compact retain the current plan, the important files, and the next action`}</CodeBlock>
      <p>Good compaction names <strong>exactly what must survive</strong>. Bad compaction says only "summarize this" — Claude keeps the wrong things and loses what matters.</p>

      <h2>5. Rename weak session titles</h2>
      <CodeBlock>{`/rename checkout-cleanup`}</CodeBlock>

      <h2>6. Quick side questions with /btw</h2>
      <CodeBlock>{`/btw what's the correct import syntax for this library?`}</CodeBlock>
      <p>Answer appears in a dismissible overlay and <strong>never enters conversation history</strong>. Zero context cost. Use this constantly for quick lookups.</p>

      <h2>7. Connect your editor</h2>
      <CodeBlock>{`/ide`}</CodeBlock>

      <h2>8. Review installed plugins</h2>
      <CodeBlock>{`/plugin`}</CodeBlock>

      <h2>Commands worth memorizing first</h2>
      <CodeBlock>{`/plan          /context       /compact       /rename
/btw           /ide           /simplify      /debug`}</CodeBlock>
    </>
  ),

  'tutorials/first-feature': simplePage('First Feature',
    'explore plan red green review ship commit verification first win',
    <>
      <h1>Your First Feature</h1>
      <p>A concrete first win using the <strong>Explore → Plan → RED → GREEN → Review → Ship</strong> loop. The goal is not a large feature — it's learning the rhythm you'll repeat every day.</p>

      <div className="callout callout-tip">
        <strong>🎯 Verification is the highest-leverage practice</strong>
        <p>Claude performs <em>dramatically</em> better when it can verify its own work — run tests, compare screenshots, validate outputs. Without clear success criteria, you become the only feedback loop and every mistake requires your attention.</p>
      </div>

      <ol className="step-list">
        <li><strong>Start a named session:</strong> <code>claude -n "first-feature"</code></li>
        <li><strong>Explore before editing:</strong> "Read the relevant area. Explain how this feature should fit. Don't edit yet."</li>
        <li><strong>Create a small plan:</strong> "I want a small, reviewable change. Keep scope tight." Press <code>Ctrl+G</code> to edit the plan in your editor.</li>
        <li><strong>Create the failing verification (RED):</strong> "Write the smallest failing test. Run it and confirm it fails."</li>
        <li><strong>Implement the change (GREEN):</strong> "Implement only what's needed to make that test pass."</li>
        <li><strong>Review:</strong> Run <code>/simplify</code>. Add <code>/security-review</code> for auth, payments, or secrets.</li>
        <li><strong>Ship:</strong> "Commit with a descriptive message."</li>
      </ol>
    </>
  ),

  'tutorials/six-step-loop': simplePage('Six-Step Loop',
    'explore plan red green review ship verification TDD test-forward',
    <>
      <h1>The Six-Step Loop</h1>
      <p>The formal version of what you practiced in Your First Feature, with the concrete task of adding input validation.</p>

      <h2>EXPLORE</h2>
      <CodeBlock>{`Read the current validation flow and explain what happens today
when invalid input arrives. Do not edit yet.`}</CodeBlock>
      <p>This protects the session from speculative edits and gives you a chance to correct bad assumptions while the context window is still clean.</p>

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
        <p>Not every task needs all six steps. For a typo, copy change, or tiny docs fix, just be direct. The rule of thumb: if the overhead of planning and verification is bigger than the change itself, stay light.</p>
      </div>
    </>
  ),

  'tutorials/review-debug': simplePage('Review & Debug', 'simplify security-review debug permissions hooks code-reviewer', <>
    <h1>Review & Debug Commands</h1>
    <p>Commands for when Claude has already made progress and you need review, debugging, or visibility.</p>
    <h2>/simplify — 3-agent parallel review</h2>
    <CodeBlock>{`/simplify
/simplify focus on memory efficiency`}</CodeBlock>
    <p>Spawns 3 parallel agents: <strong>Code Reuse</strong> (finds duplicated patterns), <strong>Code Quality</strong> (dead code, unclear logic), and <strong>Efficiency</strong> (unnecessary allocations, redundant loops). Findings are aggregated and fixes applied automatically — you review the diff.</p>
    <h2>/security-review</h2>
    <CodeBlock>{`/security-review`}</CodeBlock>
    <p>Use for auth, secrets, permissions, payments, or anything production-sensitive.</p>
    <h2>/debug — investigate before guessing</h2>
    <CodeBlock>{`/debug
The checkout session expires too early. Here is the error: ...
Investigate before proposing a fix.`}</CodeBlock>
    <h2>/permissions and /hooks — inspect the system</h2>
    <CodeBlock>{`/permissions    # See current permission rules
/hooks          # See active hooks and their configuration`}</CodeBlock>
  </>),

  'tutorials/skills': simplePage('Skills', 'skills SKILL.md test-forward autoInvoke disable-model-invocation', <>
    <h1>Using Skills</h1>
    <p>Skills are reusable workflows packaged as <code>SKILL.md</code> files in <code>.claude/skills/</code>. They teach Claude specific behaviors for recurring task types — think of them as playbooks Claude can apply automatically.</p>
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
    <p>Invoke with <code>/fix-issue 1234</code>. The <code>disable-model-invocation: true</code> flag means Claude won't invoke this automatically — only when you explicitly call it.</p>
    <h2>Skills vs Hooks vs CLAUDE.md</h2>
    <table><thead><tr><th>Mechanism</th><th>Purpose</th><th>Enforcement</th></tr></thead><tbody>
    <tr><td><strong>CLAUDE.md</strong></td><td>Project rules and context</td><td>Advisory — Claude follows but can drift</td></tr>
    <tr><td><strong>Skills</strong></td><td>Reusable workflow patterns</td><td>Advisory — teaches process, doesn't block</td></tr>
    <tr><td><strong>Hooks</strong></td><td>Lifecycle automation/gates</td><td>Deterministic — blocks or transforms</td></tr>
    </tbody></table>
  </>),

  'tutorials/mcp': simplePage('MCP Tools', 'mcp model context protocol github scope user project', <>
    <h1>Using MCP Tools</h1>
    <p>MCP connects Claude Code to external tools and data. Start personal, move to project scope only when genuinely shared.</p>
    <h2>Add a personal MCP server</h2>
    <CodeBlock>{`claude mcp add --scope user --transport http github https://api.githubcopilot.com/mcp/`}</CodeBlock>
    <h2>Authenticate and use</h2>
    <CodeBlock>{`/mcp
# Then try:
Use the GitHub MCP connection to show me open PRs assigned to me.`}</CodeBlock>
    <h2>Three scopes</h2>
    <table><thead><tr><th>Scope</th><th>Use for</th></tr></thead><tbody>
    <tr><td><code>user</code></td><td>Personal utilities across all projects</td></tr>
    <tr><td><code>project</code></td><td>Team-shared integrations in .mcp.json</td></tr>
    <tr><td><code>local</code></td><td>Experiments for one project, one developer</td></tr>
    </tbody></table>
  </>),

  'tutorials/company-mcp': simplePage('Company MCP', 'company team github jira notion sentry shared mcp', <>
    <h1>Company MCP Servers</h1>
    <p className="version-tag">NEW</p>
    <p>Setting up MCP servers the whole team uses. Start with the <code>gh</code> CLI (most universally useful), then add project-scoped <code>.mcp.json</code> for shared integrations.</p>
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
    <div className="callout callout-danger"><strong>🔒 Use read-only access by default</strong><p>MCP servers can give Claude write access to external systems. Start read-only and expand only when the team explicitly decides to allow writes.</p></div>
  </>),

  'tutorials/project-setup': {
  searchText: 'baseline settings hooks rules skills agent starter kit download install zip unzip project setup',
  render: (nav) => (<>
    <h1>Build the Full Project Setup</h1>
    <p className="version-tag">The capstone of the tutorial sequence — only start here after completing the tutorials.</p>

    <p>This page assembles everything into a single, committable <code>.claude/</code> directory your whole team shares. The starter kit download below gives you all the files pre-written, so you can unzip and commit in under two minutes.</p>

    <div className="callout callout-warn">
      <strong>⚠️ Prerequisites matter here</strong>
      <p>Don't start with this page. Go through <strong>First-Time Setup → Core Commands → Your First Feature → Your First Hook</strong> first. Configuration you haven't practiced becomes mysterious friction — not a productivity boost.</p>
    </div>

    <h2>Step 1: Download the Starter Kit</h2>
    <p>The starter kit is a ZIP containing the complete <code>.claude/</code> directory structure. Unzip it into your repo root and you're ready to commit.</p>

    <div className="download-card">
      <span className="download-icon">📦</span>
      <div className="download-card-text">
        <h3>Claude Code Starter Kit</h3>
        <p>settings.json · block-dangerous.sh · auto-format.sh · run-related-tests.sh · log-edit.sh · stop-guard.sh · rules · test-forward skill · code-reviewer agent</p>
      </div>
      <a href="/downloads/claude-starter-kit.zip" download className="download-btn">
        ⬇ Download ZIP
      </a>
    </div>

    <h2>Step 2: Unzip into your repo root</h2>
    <CodeBlock>{`# From your repo root:
unzip claude-starter-kit.zip

# This creates:
# .claude/settings.json
# .claude/hooks/block-dangerous.sh
# .claude/hooks/auto-format.sh
# .claude/hooks/run-related-tests.sh
# .claude/hooks/log-edit.sh
# .claude/hooks/stop-guard.sh
# .claude/rules/frontend-testing.md
# .claude/rules/backend-testing.md
# .claude/skills/test-forward/SKILL.md
# .claude/agents/code-reviewer.md
# .claude/state/.gitkeep

# Make hooks executable:
chmod +x .claude/hooks/*.sh`}</CodeBlock>

    <h2>Step 3: Complete repo structure</h2>
    <p>After unzipping, your repo should look like this. Add <code>CLAUDE.md</code> using <code>/init</code> if you haven't already:</p>
    <div className="file-tree">{`repo/
├── CLAUDE.md                          # < 200 lines — generated by /init
├── .claude/
│   ├── settings.json                  # Team-shared: permissions + hooks
│   ├── settings.local.json            # Personal (gitignored)
│   ├── hooks/
│   │   ├── block-dangerous.sh         # PreToolUse — blocks rm -rf /, DROP TABLE
│   │   ├── auto-format.sh             # PostToolUse — runs Prettier/Black/gofmt
│   │   ├── run-related-tests.sh       # PostToolUse async — runs related tests
│   │   ├── log-edit.sh                # PostToolUse — logs every edited file
│   │   └── stop-guard.sh              # Stop — gate must pass before "done"
│   ├── rules/
│   │   ├── frontend-testing.md        # Scoped to apps/web/**
│   │   └── backend-testing.md         # Scoped to services/api/**
│   ├── skills/
│   │   └── test-forward/
│   │       └── SKILL.md               # Verification-first workflow skill
│   ├── agents/
│   │   └── code-reviewer.md           # Focused code review subagent
│   └── state/
│       └── .gitkeep                   # Runtime state for hooks
└── .gitignore                         # Add .claude/state/*.log`}</div>

    <h2>Step 4: Review and customize settings.json</h2>
    <p>The settings file is the most important piece. Here's what's in the starter kit and why each part matters:</p>
    <CodeBlock>{`{
  "permissions": {
    "allow": [
      // ↑ These commands run without asking for confirmation.
      //   Limit this to commands Claude uses in every session.
      "Bash(git:*)",        // git status, git add, git commit, etc.
      "Bash(pnpm:*)",       // pnpm test, pnpm lint, pnpm build
      "Bash(npm:*)",        // npm scripts
      "Bash(node:*)",       // node scripts
      "Bash(ls:*)",         // directory listing
      "Bash(cat:*)",        // reading files
      "Bash(grep:*)",       // searching
      "Bash(find:*)",       // finding files
      "Bash(mkdir:*)",      // creating directories
      "Bash(touch:*)"       // creating files
    ],
    "deny": [
      // ↑ These are ALWAYS blocked, regardless of anything else.
      //   Belts AND suspenders for the most dangerous operations.
      "Bash(rm -rf /*)",
      "Bash(sudo rm:*)",
      "Bash(DROP TABLE:*)",
      "Bash(DELETE FROM:*)"
    ]
  },
  "hooks": {
    // The starter kit includes 4 hook events:
    "PreToolUse": [...],    // block-dangerous.sh — runs BEFORE any Bash command
    "PostToolUse": [...],   // auto-format, run-related-tests, log-edit
    "Stop": [...]           // stop-guard.sh — gate check when Claude finishes
  }
}`}</CodeBlock>

    <h2>Step 5: Add .gitignore entries</h2>
    <CodeBlock>{`# Add to your .gitignore:
.claude/state/*.log          # Hook log files (runtime, not config)
.claude/settings.local.json  # Personal overrides (per-developer)`}</CodeBlock>

    <h2>Step 6: Commit the baseline</h2>
    <CodeBlock>{`git add .claude/ .gitignore
git commit -m "Add Claude Code team baseline (.claude/ config)"

# Now every developer on the team gets:
# - The same permission settings
# - The same safety hooks
# - The same skills and agents
# Just: git pull && chmod +x .claude/hooks/*.sh`}</CodeBlock>

    <div className="callout callout-tip">
      <strong>💡 Roll out in layers — don't activate everything at once</strong>
      <p>Start with <strong>Layer 1</strong>: CLAUDE.md + settings.json + permissions only. Let the team work with that for a week. Then add one hook. Then another. Trying to activate the full stack on day one causes confusion about what's blocking what.</p>
    </div>

    <h2>What each file in the starter kit does</h2>
    <table>
      <thead><tr><th>File</th><th>Type</th><th>What it does</th></tr></thead>
      <tbody>
        <tr><td><code>settings.json</code></td><td>Config</td><td>Permissions allowlist/denylist + hook wiring</td></tr>
        <tr><td><code>block-dangerous.sh</code></td><td>Hook (PreToolUse)</td><td>Blocks rm -rf /, DROP TABLE, and similar destructive commands</td></tr>
        <tr><td><code>auto-format.sh</code></td><td>Hook (PostToolUse)</td><td>Runs Prettier/Black/gofmt after every file edit</td></tr>
        <tr><td><code>run-related-tests.sh</code></td><td>Hook (PostToolUse async)</td><td>Finds and runs the test file related to the edited file</td></tr>
        <tr><td><code>log-edit.sh</code></td><td>Hook (PostToolUse)</td><td>Logs every edited file to .claude/state/edited-files.log</td></tr>
        <tr><td><code>stop-guard.sh</code></td><td>Hook (Stop)</td><td>Runs the full gate before Claude can declare "done"</td></tr>
        <tr><td><code>frontend-testing.md</code></td><td>Rule (scoped)</td><td>Testing rules for apps/web/** — Vitest + Testing Library</td></tr>
        <tr><td><code>backend-testing.md</code></td><td>Rule (scoped)</td><td>Testing rules for services/api/** — Supertest integration tests</td></tr>
        <tr><td><code>test-forward/SKILL.md</code></td><td>Skill</td><td>Teaches the verification-first development workflow</td></tr>
        <tr><td><code>code-reviewer.md</code></td><td>Agent</td><td>Focused review subagent: correctness, security, edge cases</td></tr>
      </tbody>
    </table>

    <h2>Next steps</h2>
    <ol className="step-list">
      <li>Download, unzip, commit the baseline — run it for a week as-is</li>
      <li>Customize <code>settings.json</code> permissions to match your actual stack</li>
      <li>Add the <code>stop-guard.sh</code> gate command that matches your project's test runner</li>
      <li>See <L to="tutorials/advanced-hooks" navigate={nav}>Build an Advanced Hook Stack</L> when you're ready for more</li>
    </ol>
  </>),
},

  'tutorials/advanced-hooks': simplePage('Advanced Hooks', 'PostToolUseFailure RED GREEN Stop session-start guard codex', <>
    <h1>Build an Advanced Hook Stack</h1>
    <p>For teams that already understand hooks. The key Claude-specific difference: <strong>failed tool calls use <code>PostToolUseFailure</code></strong>, not <code>PostToolUse</code>. If you want a failing test to create a RED signal, wire your audit hook to both events.</p>
    <h2>The advanced shape</h2>
    <CodeBlock>{`{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Write|Edit|MultiEdit",
        "hooks": [{ "type": "command",
                     "command": "bash .claude/hooks/pre-tool-use-guard.sh" }] },
      { "matcher": "Bash",
        "hooks": [{ "type": "command",
                     "command": "bash .claude/hooks/pre-tool-use-guard.sh" }] }
    ],
    "PostToolUse": [
      { "matcher": "Write|Edit|MultiEdit|Bash",
        "hooks": [{ "type": "command",
                     "command": "bash .claude/hooks/post-tool-use-audit.sh" }] }
    ],
    "PostToolUseFailure": [
      { "matcher": "Bash",
        "hooks": [{ "type": "command",
                     "command": "bash .claude/hooks/post-tool-use-audit.sh" }] }
    ],
    "Stop": [
      { "hooks": [{ "type": "command",
                     "command": "bash .claude/hooks/stop-guard.sh" }] }
    ]
  }
}`}</CodeBlock>
    <h2>Smoke test</h2>
    <ol>
    <li>Source edit without RED → <strong>Blocked</strong></li>
    <li>Failing test → <code>PostToolUseFailure</code> records RED</li>
    <li>Source edit after RED → <strong>Allowed</strong></li>
    <li>Stop without GREEN → <strong>Blocked</strong></li>
    <li>Passing tests then Stop → <strong>Allowed</strong></li>
    </ol>
  </>),

  'tutorials/vscode': simplePage('VS Code & IDE', 'vscode jetbrains desktop teleport dispatch', <>
    <h1>VS Code & IDE Integration</h1>
    <p className="version-tag">Updated — covers VS Code, JetBrains, and Desktop</p>
    <h2>Install</h2>
    <CodeBlock>{`/ide     # From inside Claude Code`}</CodeBlock>
    <p>Or search "Claude Code" in VS Code Extensions. JetBrains users install from the marketplace.</p>
    <h2>Desktop App</h2>
    <p>Standalone app with visual diff review, multiple sessions, and scheduled tasks. Download from <a href="https://code.claude.com/docs/en/overview">code.claude.com</a>.</p>
    <h2>Hand off between surfaces</h2>
    <CodeBlock>{`/desktop        # Hand terminal session to Desktop app
/rc             # Continue from mobile or web
claude --teleport  # Pull cloud session into terminal`}</CodeBlock>
  </>),

  'workflows/daily': simplePage('Daily Workflow', 'session resume fork explore plan red green review ship interview', <>
    <h1>Daily Workflow</h1>
    <p>The repeatable operating loop. Core idea: Claude Code works best with a calm, explicit loop — not giant one-shot prompts.</p>
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
    <p>Then start a fresh session to execute the spec — clean context focused on implementation.</p>
    <h2>5. Context management as habit</h2>
    <CodeBlock>{`/context       # Check usage regularly
/compact       # Compress at 70-80%
/clear         # Reset between unrelated tasks
/btw           # Side questions, zero context cost`}</CodeBlock>
  </>),

  'configuration': {
  searchText: 'CLAUDE.md settings.json hooks rules skills baseline project setup download install zip',
  render: (nav) => (<>
    <h1>Project Setup</h1>
    <p className="version-tag">The capstone — not the starting point. Complete the tutorials first.</p>

    <p>This page covers the full 4-layer configuration model for a Claude Code repo baseline. You'll build it up incrementally — don't activate all four layers at once.</p>

    <div className="download-card">
      <span className="download-icon">📦</span>
      <div className="download-card-text">
        <h3>Download the Starter Kit</h3>
        <p>Complete <code>.claude/</code> structure with settings, hooks, rules, skill, and agent — ready to unzip into your repo root.</p>
      </div>
      <a href="/downloads/claude-starter-kit.zip" download className="download-btn">
        ⬇ Download ZIP
      </a>
    </div>

    <p>For the full installation walkthrough, go to the <L to="tutorials/project-setup" navigate={nav}>Build the Full Project Setup</L> tutorial. This page documents the configuration model and the intent behind each layer.</p>

    <h2>Layer 1: Minimum viable baseline</h2>
    <p>Start here. Don't add layers 2–4 until the team is comfortable with the daily workflow.</p>
    <CodeBlock>{`# CLAUDE.md — the most important file. Keep it under 200 lines.
# Generated by /init, then pruned to only what matters.

## Project: [Your project name]
## Stack: [e.g., Next.js 14, TypeScript, Vitest, Prisma]

## Verification gate
Run before shipping: pnpm lint && pnpm typecheck && pnpm test

## Key conventions
- [Add only rules that Claude would otherwise get wrong]
- [Remove anything Claude already does correctly by default]`}</CodeBlock>

    <p>The corresponding <code>.claude/settings.json</code> at this layer:</p>
    <CodeBlock>{`{
  "permissions": {
    "allow": ["Bash(git:*)", "Bash(pnpm:*)", "Bash(npm:*)", "Bash(node:*)"],
    "deny":  ["Bash(rm -rf /*)", "Bash(DROP TABLE:*)"]
  }
  // No hooks yet — add them in Layer 3
}`}</CodeBlock>

    <h2>Layer 2: Shared skills</h2>
    <p>Skills are workflow playbooks. Add them when the team repeatedly does a task the same way. The test-forward skill (included in the starter kit) is the right first candidate:</p>
    <CodeBlock>{`# .claude/skills/test-forward/SKILL.md
---
name: test-forward
description: Write the failing test BEFORE implementing. Verification-first.
---
1. Explore without editing
2. Write the failing test (confirm it fails)
3. Implement the minimal code to pass
4. Run full gate: pnpm lint && pnpm typecheck && pnpm test`}</CodeBlock>
    <p>Invoke with <code>/test-forward</code>. The <code>autoInvoke: false</code> default means Claude won't use it automatically — only when you call it.</p>

    <h2>Layer 3: Hooks</h2>
    <p>Add <strong>one hook at a time</strong>. Start with the safety hook (it has no false positives). Then add the formatter. Then the test runner. The Stop gate comes last:</p>
    <table>
      <thead><tr><th>Hook</th><th>Event</th><th>When to add</th></tr></thead>
      <tbody>
        <tr><td><code>block-dangerous.sh</code></td><td>PreToolUse/Bash</td><td>Day 1 — zero friction, pure safety</td></tr>
        <tr><td><code>auto-format.sh</code></td><td>PostToolUse/Write</td><td>Week 1 — after Prettier is configured</td></tr>
        <tr><td><code>run-related-tests.sh</code></td><td>PostToolUse async</td><td>Week 2 — after test suite is healthy</td></tr>
        <tr><td><code>stop-guard.sh</code></td><td>Stop</td><td>Week 3+ — after the team understands the gate</td></tr>
      </tbody>
    </table>

    <h2>Layer 4: MCP, plugins, agents</h2>
    <p>Add external connections only after the baseline is stable. Review what's enabled with <code>/plugin</code>. Start all MCP connections at <strong>user scope</strong> (personal) and graduate to <strong>project scope</strong> only when the team explicitly decides to share them.</p>
    <CodeBlock>{`# Personal MCP (user scope — just you):
claude mcp add --scope user --transport http github https://api.githubcopilot.com/mcp/

# Team MCP (project scope — everyone):
# Add to .mcp.json and commit
{
  "mcpServers": {
    "github": {
      "transport": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}`}</CodeBlock>

    <div className="callout callout-info">
      <strong>📐 Layering principle</strong>
      <p>The mistake most teams make is trying to set up the complete configuration stack before they understand the workflow. That creates mysterious friction — hooks that seem to block things for no reason, skills that never get invoked, MCP connections nobody uses. Build the habit first. Let the config support it.</p>
    </div>
  </>),
},

  'team/team-leads': simplePage('Team Leads', 'rollout team leader account workflow standardize', <>
    <h1>Team Leader Setup</h1>
    <p>Choose defaults the team can live with, then raise the bar gradually.</p>
    <ol className="step-list">
    <li><strong>Minimum baseline</strong> — Team account, short CLAUDE.md, shared settings</li>
    <li><strong>Teach workflow</strong> — Have every dev do Core Commands → First Feature → Daily Workflow</li>
    <li><strong>One shared skill</strong> — Before hooks</li>
    <li><strong>One hook</strong> — Only with clear team agreement</li>
    <li><strong>Plugins & MCP</strong> — Review with /plugin, standardize carefully</li>
    <li><strong>CI/CD & advanced</strong> — Later, after the baseline works</li>
    </ol>
  </>),

  'team/adoption': simplePage('Adoption', 'roadmap week layer foundation scale', <>
    <h1>Adoption Roadmap</h1>
    <h2>Layer 1: Foundation — Day 1</h2><p>Team account, First-Time Setup, short CLAUDE.md</p>
    <h2>Layer 2: Daily Flow — Week 1</h2><p>First Feature, Daily Workflow, /simplify and /debug</p>
    <h2>Layer 3: Shared Baseline — Week 2</h2><p>Commit shared settings, one skill, one hook</p>
    <h2>Layer 4: Scale — Later</h2><p>/batch, Agent Teams, CI/CD, /loop</p>
  </>),

  'reference/commands': simplePage('Commands', 'slash command plan context compact rename btw simplify debug batch loop', <>
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
  </>),

  'reference/best-links': simplePage('Best Links', 'official docs community code.claude.com anthropic', <>
    <h1>Best Links</h1>
    <h2>Official Claude Code docs <span className="tag tag-official">official</span></h2>
    <ul>
    <li><a href="https://code.claude.com/docs/en/overview">Overview</a></li>
    <li><a href="https://code.claude.com/docs/en/quickstart">Quickstart</a></li>
    <li><a href="https://code.claude.com/docs/en/best-practices">Best Practices</a></li>
    <li><a href="https://code.claude.com/docs/en/common-workflows">Common Workflows</a></li>
    <li><a href="https://code.claude.com/docs/en/memory">CLAUDE.md & Memory</a></li>
    <li><a href="https://code.claude.com/docs/en/skills">Skills</a></li>
    <li><a href="https://code.claude.com/docs/en/hooks-guide">Hooks Guide</a></li>
    <li><a href="https://code.claude.com/docs/en/hooks">Hooks Reference</a></li>
    <li><a href="https://code.claude.com/docs/en/mcp">MCP</a></li>
    <li><a href="https://code.claude.com/docs/en/context-window">Context Window</a></li>
    <li><a href="https://code.claude.com/docs/en/permission-modes">Permission Modes</a></li>
    </ul>
    <h2>Community <span className="tag tag-community">community</span></h2>
    <ul>
    <li><a href="https://claudcod.com/">ClaudCod</a></li>
    <li><a href="https://www.claudecodecommunity.org/">Claude Code Community</a></li>
    </ul>
  </>),

  'reference/faq': simplePage('FAQ', 'questions answers init auto mode permissions CLAUDE.md', <>
    <h1>FAQ</h1>
    <h3>Where should a new developer start?</h3>
    <p>First-Time Setup → Core Commands → Your First Feature. Don't start with configuration.</p>
    <h3>How do I stop so many confirmations?</h3>
    <p><strong>Best:</strong> Improve permissions in settings.json. <strong>Session:</strong> --allowedTools. <strong>AI:</strong> --permission-mode auto. <strong>Last resort:</strong> --dangerously-skip-permissions (sandboxes only).</p>
    <h3>What's the difference between skills, hooks, and MCP?</h3>
    <p><strong>Skills</strong> teach workflows. <strong>Hooks</strong> enforce lifecycle events. <strong>MCP</strong> connects external tools.</p>
    <h3>How should I keep CLAUDE.md effective?</h3>
    <p>Under 200 lines. For each line: "Would removing this cause Claude to make mistakes?" If not, cut it.</p>
  </>),

  'reference/glossary': simplePage('Glossary', 'terms definitions plan mode auto accept tasks ratchet', <>
    <h1>Glossary</h1>
    <table><thead><tr><th>Term</th><th>Definition</th></tr></thead><tbody>
    <tr><td>Plan Mode</td><td>Read-only mode. Shift+Tab (2x) or /plan.</td></tr>
    <tr><td>Auto Mode</td><td>AI classifier evaluates permissions. --permission-mode auto.</td></tr>
    <tr><td>Tasks</td><td>Native task management (v2.1.16+). Dependencies, cross-session.</td></tr>
    <tr><td>Ratchet</td><td>Quality-only-forward. Once a gate passes, it must keep passing.</td></tr>
    <tr><td>Skills</td><td>SKILL.md files teaching Claude specific behaviors.</td></tr>
    <tr><td>Hooks</td><td>Commands/prompts triggered at lifecycle points.</td></tr>
    <tr><td>MCP</td><td>Model Context Protocol. External tool connections.</td></tr>
    <tr><td>Subagent</td><td>Focused worker with its own context window.</td></tr>
    <tr><td>/btw</td><td>Side question that never enters conversation history.</td></tr>
    <tr><td>/simplify</td><td>3-agent parallel review: reuse, quality, efficiency.</td></tr>
    <tr><td>defer</td><td>v2.1.89 PreToolUse decision pausing headless sessions.</td></tr>
    </tbody></table>
  </>),

  'reference/troubleshooting': simplePage('Troubleshooting', 'problems issues fix hooks context CLAUDE.md', <>
    <h1>Troubleshooting</h1>
    <h3>Claude ignores my CLAUDE.md rules</h3>
    <p>The file is too long. Prune to under 200 lines. Cut anything Claude already does correctly.</p>
    <h3>Context fills up too fast</h3>
    <p>Use subagents for investigation. /btw for quick questions. /clear between tasks. Compact at 70-80%.</p>
    <h3>Hooks slow down every edit</h3>
    <p>Don't put slow work in PreToolUse. Use "async": true for post-edit hooks. Use the "if" field (v2.1.85+).</p>
    <h3>Hook not firing</h3>
    <p>Run /hooks to verify config. Check matcher matches the tool name. Use claude --debug "hooks".</p>
  </>),

  'reference/changelog': simplePage('Changelog', 'release changes version update new features', <>
    <h1>Release Changes</h1>
    <p className="version-tag">Last verified: April 5, 2026</p>
    <table><thead><tr><th>Date</th><th>Version</th><th>Change</th></tr></thead><tbody>
    <tr><td>Apr 1</td><td>v2.1.89</td><td>defer, PermissionDenied hook, named subagents</td></tr>
    <tr><td>Mar 24</td><td>—</td><td>Auto Mode (AI-classified permissions)</td></tr>
    <tr><td>Mar 13</td><td>v2.1.75</td><td>1M token context window</td></tr>
    <tr><td>Mar 11</td><td>v2.1.76</td><td>/effort, MCP elicitation</td></tr>
    <tr><td>Mar 7</td><td>v2.1.71</td><td>/loop command</td></tr>
    <tr><td>Feb 28</td><td>v2.1.63</td><td>/simplify and /batch</td></tr>
    <tr><td>Feb 25</td><td>—</td><td>Remote Control (/rc)</td></tr>
    <tr><td>Jan 22</td><td>v2.1.16</td><td>Native Tasks system</td></tr>
    </tbody></table>
  </>),

  'advanced/hooks': simplePage('Hooks & Events', 'hook lifecycle PreToolUse PostToolUse Stop events reference', <>
    <h1>Hooks & Events Reference</h1>
    <p>Full lifecycle event reference. Start with the Your First Hook tutorial if you're new.</p>
    <h2>All events</h2>
    <table><thead><tr><th>Event</th><th>When</th></tr></thead><tbody>
    <tr><td>SessionStart</td><td>Session begins/resumes</td></tr>
    <tr><td>PreToolUse</td><td>Before tool executes (can block)</td></tr>
    <tr><td>PostToolUse</td><td>After tool succeeds</td></tr>
    <tr><td>PostToolUseFailure</td><td>After tool fails (RED signals!)</td></tr>
    <tr><td>Stop</td><td>Claude finishes responding</td></tr>
    <tr><td>PermissionDenied</td><td>Auto mode denial</td></tr>
    <tr><td>SubagentStart/Stop</td><td>Subagent lifecycle</td></tr>
    <tr><td>TaskCreated/Completed</td><td>Task system events</td></tr>
    <tr><td>TeammateIdle</td><td>Agent Teams teammate idle</td></tr>
    <tr><td>PreCompact/PostCompact</td><td>Compaction events</td></tr>
    <tr><td>FileChanged</td><td>Filesystem changes</td></tr>
    </tbody></table>
    <h2>Handler types</h2>
    <table><thead><tr><th>Type</th><th>When</th></tr></thead><tbody>
    <tr><td>command</td><td>Start here. Shell scripts, fast and local.</td></tr>
    <tr><td>agent</td><td>When hook needs to read files and make judgments.</td></tr>
    <tr><td>prompt</td><td>Model judgment without tool access.</td></tr>
    <tr><td>http</td><td>External policy servers.</td></tr>
    </tbody></table>
  </>),

  'advanced/scaling': simplePage('Scaling', 'batch agent teams loop simplify parallel worktree', <>
    <h1>Scaling Workflows</h1>
    <h2>/batch — codebase-wide migrations</h2>
    <CodeBlock>{`/batch migrate all API routes from Express to Hono
/batch replace all lodash with native equivalents`}</CodeBlock>
    <p>Decomposes into 5-30 units, spawns workers in isolated worktrees, each implements → reviews → tests → commits → opens PR.</p>
    <h2>Agent Teams</h2>
    <p>Coordinated multi-instance development. 3-5 teammates is optimal.</p>
    <h2>/loop — recurring monitoring</h2>
    <CodeBlock>{`/loop 5m check deploy status
/loop 30m scan for new TODO comments`}</CodeBlock>
  </>),

  'advanced/ci-cd': simplePage('CI/CD', 'headless non-interactive defer pipeline automation', <>
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
    <p>Resume with <code>claude -p --resume</code> after review.</p>
  </>),

  'advanced/superpowers': simplePage('Superpowers', 'superpowers plugin brainstorm write-plan execute-plan', <>
    <h1>Superpowers Plugin</h1>
    <p>Check with <code>/plugin</code> first. Use as reinforcement for a workflow the team already understands.</p>
    <table><thead><tr><th>Command</th><th>Purpose</th></tr></thead><tbody>
    <tr><td>/superpowers:brainstorm</td><td>Requirements exploration</td></tr>
    <tr><td>/superpowers:write-plan</td><td>Plan generation</td></tr>
    <tr><td>/superpowers:execute-plan</td><td>Execution against plan</td></tr>
    </tbody></table>
  </>),
});

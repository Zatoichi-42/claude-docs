/* eslint-disable @typescript-eslint/ban-ts-comment, react-hooks/static-components, @typescript-eslint/no-unused-vars */
// @ts-nocheck

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PHASES = [
  {
    id: "phase0",
    num: 0,
    title: "Environment & Tooling",
    icon: "⚙️",
    color: "#6366f1",
    steps: [
      { title: "Install Claude Code", detail: "Use the native installer (recommended, zero dependencies, auto-updates):\n\ncurl -fsSL https://cli.claude.ai/install.sh | bash\n\nOr via npm:\nnpm install -g @anthropic-ai/claude-code", cmd: "curl -fsSL https://cli.claude.ai/install.sh | bash" },
      { title: "Verify Installation", detail: "Confirm Claude Code is installed and check your environment:\n\nclaude --version   # Should show 2.1.89+\nclaude doctor      # Environment diagnostics", cmd: "claude --version && claude doctor" },
      { title: "Authenticate", detail: "For interactive use, Claude opens a browser for OAuth (Pro/Max/Team/Enterprise).\n\nFor CI/CD, set your API key:\nexport ANTHROPIC_API_KEY=sk-ant-...", cmd: "claude" },
      { title: "Bootstrap Your Project", detail: "Run /init inside Claude Code to generate CLAUDE.md from your codebase. Use /terminal-setup to enable keyboard shortcuts (Alt+T for thinking, Alt+P for model picker).", cmd: "/init && /terminal-setup" },
      { title: "Explore Your Setup", detail: "Inspect what's available:\n/skills — list all skills (built-in + plugins)\n/hooks — inspect active hooks\n/permissions — review allow/ask/deny rules\n/config — configure preferences", cmd: "/skills && /hooks && /permissions" },
      { title: "VS Code Integration", detail: "Install the VS Code extension for inline diffs, @-mention file references, and plan review/editing before acceptance. Install via /ide from within Claude Code or the VS Code marketplace.", cmd: "/ide" },
    ]
  },
  {
    id: "phase1",
    num: 1,
    title: "Project Configuration",
    icon: "📁",
    color: "#8b5cf6",
    steps: [
      { title: "Create CLAUDE.md", detail: "Keep under ~200 lines. Focus on what Claude can't infer: workflow rules, test commands, build commands, architecture notes, naming conventions. Move heavy reference into skills or rules.\n\nKey sections:\n• Default workflow (explore → plan → RED → GREEN → review)\n• Verification policy per code type\n• Scope discipline rules\n• Project commands (test, lint, typecheck, gates)", cmd: "/init" },
      { title: "Configure settings.json", detail: "Team-shared settings in .claude/settings.json. Supports $schema, model, plansDirectory, permissions, and hooks.\n\nUse 'opusplan' model alias: Opus for planning, Sonnet for execution.\n\nSet permissions: allow test/lint/git commands, deny reading .env and secrets.", cmd: "Edit .claude/settings.json" },
      { title: "Set Up Hook Scripts", detail: "Create .claude/hooks/ directory with:\n• block-dangerous.sh — PreToolUse security gate (exit 2 to block rm -rf, DROP TABLE, etc.)\n• require-test-first.sh — PreToolUse TDD enforcement\n• run-related-tests.sh — PostToolUse async feedback\n• auto-format.sh — PostToolUse formatting (Prettier/Black/gofmt)", cmd: "mkdir -p .claude/hooks" },
      { title: "Create Scoped Rules", detail: "Place rules in .claude/rules/ to scope instructions to file types or directories.\n\nExample: frontend-testing.md with globs: [\"apps/web/**\"] enforcing Playwright E2E tests.\nExample: backend-testing.md with globs: [\"services/api/**\"] enforcing integration tests.", cmd: "mkdir -p .claude/rules" },
      { title: "Create Custom Skills", detail: "Skills are SKILL.md files in .claude/skills/. Claude invokes them automatically when relevant or via /skill-name.\n\nCreate a test-forward skill that enforces:\n1. Define behavior change\n2. Create failing verification artifact\n3. Run and confirm RED\n4. Implement production code\n5. Run and confirm GREEN\n6. Review and gate", cmd: "mkdir -p .claude/skills/test-forward" },
      { title: "Create Custom Agents", detail: "Define subagents in .claude/agents/ with frontmatter specifying name, model, tools, and hooks.\n\nExample: code-reviewer.md agent using Sonnet with Read/Grep/Glob/Bash tools that rates issues as CRITICAL/MAJOR/MINOR.", cmd: "mkdir -p .claude/agents" },
    ]
  },
  {
    id: "phase2",
    num: 2,
    title: "Daily Workflow",
    icon: "🔄",
    color: "#a855f7",
    steps: [
      { title: "EXPLORE", detail: "Enter Plan Mode via Shift+Tab or /plan. Claude reads and analyzes but cannot edit files.\n\nAsk Claude to read relevant source files, understand existing patterns, and explain the current architecture before making changes.", cmd: "Shift+Tab → Plan Mode" },
      { title: "PLAN", detail: "Ask Claude to create a detailed implementation plan.\n\nPress Ctrl+G to open the plan in your text editor for direct editing before Claude proceeds.\n\nPlanning is most useful when uncertain about the approach, modifying multiple files, or unfamiliar with the code. Skip for trivial changes.", cmd: "/plan" },
      { title: "RED", detail: "Switch to Normal Mode (Shift+Tab). Write a failing test first.\n\nFor backend: failing unit/integration test.\nFor frontend: failing E2E/screenshot test.\nFor ops/config: failing smoke command.\n\nRun the test and confirm it FAILS. This creates the RED token.", cmd: "Shift+Tab → Normal Mode" },
      { title: "GREEN", detail: "Implement the minimal production code change. PostToolUse hooks automatically run related tests after each edit.\n\nRun the verification again and confirm it PASSES. The test-forward hooks enforce this sequence.", cmd: "Implement and verify" },
      { title: "REVIEW", detail: "Run /simplify for 3-agent parallel code review (code reuse, quality, efficiency).\nRun /security-review for security-sensitive changes.\n\nThe Stop agent hook verifies the full gate passes before Claude can finish.", cmd: "/simplify" },
      { title: "SHIP", detail: "Ask Claude to commit with a descriptive message and open a PR.\n\nThe Stop hook runs final verification. /batch workers automatically run /simplify on their changes before committing.", cmd: "\"commit and open a PR\"" },
    ]
  },
  {
    id: "phase3",
    num: 3,
    title: "Scaling Up",
    icon: "🚀",
    color: "#c084fc",
    steps: [
      { title: "Subagents", detail: "Custom subagents run in isolated context windows. Define in .claude/agents/.\n\nIdeal for writer/reviewer splits: one agent writes code, another reviews it.\nAlso useful for test-writer/implementer splits.\n\nEach subagent gets separate prompts, tools, and permissions.", cmd: ".claude/agents/code-reviewer.md" },
      { title: "Agent Teams", detail: "Coordinate multiple Claude instances with shared task lists and inter-agent messaging.\n\nEnable: CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1\n\n3–5 teammates is the sweet spot. Use delegate mode to prevent the lead from grabbing implementation work. Use TeammateIdle/TaskCompleted hooks for quality gates.", cmd: "\"Create an agent team...\"" },
      { title: "/batch Migrations", detail: "Parallel codebase-wide changes using isolated git worktrees. Decomposes into 5–30 units.\n\nEach worker: implements → runs /simplify → runs tests → commits → opens PR.\n\nExamples: migrate frameworks, add type annotations, replace library imports.", cmd: "/batch migrate from Express to Hono" },
      { title: "Remote Control", detail: "Start a long-running task, then monitor from your phone.\n\nclaude --rc or /rc mid-session.\n\nScan QR code or open session URL. Full local environment stays available. Nothing moves to the cloud.\n\nTip: /rename before /rc for easy identification.", cmd: "/rc" },
      { title: "/loop Monitoring", detail: "Session-level cron for recurring tasks. Define interval and prompt.\n\n/loop 5m check deploy status\n/loop 10m run test suite\n\nStays active as long as the session is open. Disable with CLAUDE_CODE_DISABLE_CRON.", cmd: "/loop 5m check deploy" },
      { title: "Multi-Session Work", detail: "Use /color to distinguish sessions visually.\nUse --worktree for isolated git worktrees per session.\nUse --from-pr to resume sessions linked to a GitHub PR.\nUse claude -c --fork-session to branch off without losing the original.", cmd: "/color blue" },
    ]
  },
  {
    id: "phase4",
    num: 4,
    title: "Plugins",
    icon: "🔌",
    color: "#d946ef",
    steps: [
      { title: "Install Superpowers", detail: "Comprehensive skills framework: Socratic brainstorming → spec → micro-task planning → TDD implementation → code review → verification.\n\nv5.0.6 current. Old slash commands deprecated. Skills auto-invoke via the '1% rule' — Claude checks for relevant skills before every response.", cmd: "/plugin install superpowers@claude-plugins-official" },
      { title: "Use Superpowers Skills", detail: "/superpowers:brainstorm — Socratic requirements exploration\n/superpowers:write-plan — Micro-task plan with TDD steps\n/superpowers:execute-plan — Subagent-driven parallel implementation\n\nSkills activate automatically. The using-superpowers meta-skill bootstraps at session start.", cmd: "/superpowers:brainstorm" },
      { title: "Install Code Review Plugin", detail: "Built-in /review is deprecated. Install the code-review plugin as a replacement.\n\nProvides structured code review with severity ratings and actionable feedback.", cmd: "/plugin install code-review@claude-plugins-official" },
      { title: "Install LSP Plugins", detail: "Language server plugins (typescript-lsp, pyright-lsp) give Claude automatic diagnostics after every file edit.\n\nExcellent fast feedback — not a substitute for tests, but a sharp secondary net.", cmd: "/plugin install typescript-lsp@claude-plugins-official" },
      { title: "Plugin Security", detail: "Plugins execute with your user privileges. They are highly trusted code.\n\nUse project-scope installs only for plugins you genuinely trust.\nAudit plugin source before installing.\nPlugins auto-update at startup — behavior can change between sessions.", cmd: "/plugin" },
      { title: "Reload After Install", detail: "Always run /reload-plugins after installing or updating plugins.\n\nUse /skills to verify what's loaded.\nUse /release-notes to check what changed.", cmd: "/reload-plugins && /skills" },
    ]
  },
  {
    id: "phase5",
    num: 5,
    title: "CI/CD & Automation",
    icon: "🏗️",
    color: "#ec4899",
    steps: [
      { title: "Headless Mode", detail: "The -p flag runs Claude non-interactively. Process prompt, output result, exit.\n\nclaude -p \"review for security vulnerabilities\" < src/auth.ts > report.md\n\nCombine with --allowedTools to restrict tool access.", cmd: "claude -p \"run tests\" --allowedTools Read Bash" },
      { title: "Auto Mode for CI", detail: "--permission-mode auto uses an AI classifier to evaluate each tool call. Blocks dangerous operations, allows safe ones.\n\nFor CI: claude -p \"fix lint errors and commit\" --permission-mode auto\n\nClassifier calls count toward token usage.", cmd: "claude -p \"fix lint\" --permission-mode auto" },
      { title: "defer for Human Gates", detail: "v2.1.89: PreToolUse hooks can return permissionDecision: 'defer' to pause headless sessions.\n\nResume with -p --resume for human review of destructive operations.\n\nIdeal for CI/CD pipelines with human-in-the-loop approval.", cmd: "claude -p --resume" },
      { title: "Structured Output", detail: "Use --json-schema for validated structured output.\n\nclaude -p \"list all TODO comments\" --json-schema todo-schema.json\n\nUseful for feeding Claude output into downstream tools.", cmd: "claude -p \"...\" --json-schema schema.json" },
      { title: "--bare Mode", detail: "Skip hooks, LSP, plugin sync, and skill directory walks for scripted -p calls.\n\nRequires ANTHROPIC_API_KEY or apiKeyHelper via --settings.\n\nFastest possible execution for simple automated tasks.", cmd: "claude -p \"...\" --bare" },
      { title: "Continuous Improvement", detail: "Run /insights monthly to analyze usage patterns and costs.\nCheck /release-notes weekly.\nCodify learnings into new skills.\nShare hooks/rules/skills via settings.json (committed to repo).\nKeep personal overrides in settings.local.json (gitignored).", cmd: "/insights" },
    ]
  }
];

const COMMANDS = [
  { cmd: "/plan", cat: "Mode", desc: "Enter Plan Mode — Claude reads and analyzes but cannot edit files" },
  { cmd: "Shift+Tab", cat: "Mode", desc: "Cycle: Normal → Auto-Accept → Plan Mode → Normal" },
  { cmd: "/fast", cat: "Mode", desc: "Toggle Opus 4.6 at 2.5× speed for rapid interactive iteration" },
  { cmd: "/effort <level>", cat: "Mode", desc: "Set reasoning effort: low, medium, high" },
  { cmd: "/model <name>", cat: "Mode", desc: "Switch model: opus, sonnet, haiku, opusplan" },
  { cmd: "/voice", cat: "Mode", desc: "Push-to-talk voice mode (hold spacebar to speak)" },
  { cmd: "/compact [focus]", cat: "Session", desc: "Compress context window, optionally retaining specific info" },
  { cmd: "/context", cat: "Session", desc: "Check current context window usage" },
  { cmd: "/clear", cat: "Session", desc: "Clear conversation and start fresh" },
  { cmd: "/rewind", cat: "Session", desc: "Selective rollback — conversation-only or code-only" },
  { cmd: "/rename <name>", cat: "Session", desc: "Name the session for easy identification and resumption" },
  { cmd: "/rc", cat: "Session", desc: "Enable Remote Control — continue from phone/browser" },
  { cmd: "/color <color>", cat: "Session", desc: "Color-code the session prompt bar (useful for multi-session)" },
  { cmd: "/stats", cat: "Session", desc: "Usage statistics (Pro/Max users)" },
  { cmd: "/cost", cat: "Session", desc: "Token cost breakdown (API users)" },
  { cmd: "/usage", cat: "Session", desc: "Check rate limit status" },
  { cmd: "/simplify [focus]", cat: "Skills", desc: "3-agent parallel code review: code reuse, quality, efficiency" },
  { cmd: "/batch <desc>", cat: "Skills", desc: "Parallel codebase-wide migration using isolated git worktrees" },
  { cmd: "/debug", cat: "Skills", desc: "Structured debugging skill with root cause investigation" },
  { cmd: "/loop <int> <prompt>", cat: "Skills", desc: "Session-level cron — recurring task on a schedule" },
  { cmd: "/security-review", cat: "Skills", desc: "Security-focused audit of changes on current git branch" },
  { cmd: "/init", cat: "Project", desc: "Bootstrap CLAUDE.md from your codebase" },
  { cmd: "/memory", cat: "Project", desc: "Inspect/edit CLAUDE.md and auto memory" },
  { cmd: "/skills", cat: "Project", desc: "List all loaded skills (built-in + plugin)" },
  { cmd: "/hooks", cat: "Project", desc: "Inspect active hooks interactively" },
  { cmd: "/permissions", cat: "Project", desc: "Review allow/ask/deny permission rules" },
  { cmd: "/config", cat: "Project", desc: "Configure preferences (Remote Control, etc.)" },
  { cmd: "/doctor", cat: "Project", desc: "Environment diagnostics and troubleshooting" },
  { cmd: "/plugin install <n>", cat: "Plugins", desc: "Install a plugin from a marketplace" },
  { cmd: "/reload-plugins", cat: "Plugins", desc: "Reload plugins after install/update" },
  { cmd: "/release-notes", cat: "Plugins", desc: "Check what changed in installed version" },
  { cmd: "/ide", cat: "Plugins", desc: "Install or open IDE extension (VS Code/JetBrains)" },
  { cmd: "Alt+T", cat: "Shortcuts", desc: "Toggle extended thinking (deep reasoning)" },
  { cmd: "Alt+P", cat: "Shortcuts", desc: "Open model picker while preserving input" },
  { cmd: "Ctrl+G", cat: "Shortcuts", desc: "Open current content in external text editor" },
  { cmd: "Ctrl+C", cat: "Shortcuts", desc: "Interrupt Claude — redirect mid-task" },
  { cmd: "Esc+Esc", cat: "Shortcuts", desc: "Open rewind menu for selective rollback" },
  { cmd: "Ctrl+S", cat: "Shortcuts", desc: "Screenshot stats" },
  { cmd: "!<command>", cat: "Shortcuts", desc: "Run bash directly without Claude interpretation" },
  { cmd: "@<filepath>", cat: "Shortcuts", desc: "Smart file reference with autocomplete" },
  { cmd: "claude -p \"...\"", cat: "CLI", desc: "Non-interactive headless mode — process prompt and exit" },
  { cmd: "claude -c", cat: "CLI", desc: "Continue most recent session in current directory" },
  { cmd: "claude -r <name>", cat: "CLI", desc: "Resume specific session by name" },
  { cmd: "claude -w <branch>", cat: "CLI", desc: "Run in isolated git worktree" },
  { cmd: "claude --rc", cat: "CLI", desc: "Start with Remote Control enabled" },
  { cmd: "claude --from-pr <n>", cat: "CLI", desc: "Resume session linked to a GitHub PR" },
  { cmd: "claude --bare", cat: "CLI", desc: "Skip hooks/LSP/plugins for fast scripted calls" },
  { cmd: "--permission-mode auto", cat: "CLI", desc: "AI-classified permission decisions (Auto Mode)" },
  { cmd: "--effort high", cat: "CLI", desc: "Set reasoning effort at launch" },
  { cmd: "--agents", cat: "CLI", desc: "Define custom subagents inline at launch" },
  { cmd: "--max-turns <n>", cat: "CLI", desc: "Circuit breaker for automated pipelines" },
];

const GLOSSARY = [
  { term: "Plan Mode", def: "Read-only mode where Claude researches and analyzes without making edits. Toggle via Shift+Tab or /plan." },
  { term: "Auto-Accept Mode", def: "Claude proceeds without asking for edit/run permission. Use when you trust the current task scope." },
  { term: "Auto Mode", def: "AI classifier evaluates each tool call, blocking dangerous operations and allowing safe ones. Launched March 24, 2026." },
  { term: "RED Token", def: "A state file (.claude/state/test-forward.json) created when a verification command fails, proving a failing test exists before implementation." },
  { term: "RED → GREEN → REFACTOR", def: "TDD cycle: write a failing test (RED), implement minimal code to pass (GREEN), then clean up (REFACTOR)." },
  { term: "PreToolUse Hook", def: "Fires before a tool call executes. Can allow, deny, defer, or modify the action. The primary enforcement mechanism." },
  { term: "PostToolUse Hook", def: "Fires after a tool completes successfully. Used for formatting, test running, and feedback. Cannot undo actions." },
  { term: "Stop Hook", def: "Fires when Claude finishes responding. Agent-type Stop hooks can inspect files, run commands, and block completion." },
  { term: "PermissionDenied Hook", def: "v2.1.89. Fires after auto mode classifier denials. Return {retry: true} to let Claude retry." },
  { term: "Agent Teams", def: "Coordinated multi-instance development (v2.1.32+). Multiple Claude sessions with shared task lists and inter-agent messaging." },
  { term: "Subagent", def: "A focused worker spawned within a session with its own context window. Reports results back to the parent." },
  { term: "Skills", def: "SKILL.md instruction files that teach Claude specific behaviors. Loaded automatically or via /skill-name. Support frontmatter." },
  { term: "Rules", def: "Markdown files in .claude/rules/ that scope instructions to specific file globs or directories." },
  { term: "Hooks", def: "Deterministic commands, prompts, or agents triggered at specific lifecycle points. 21+ events, 4 handler types." },
  { term: "Context Window", def: "The total conversation, files read, and command output Claude holds. Performance degrades as it fills. The most critical resource to manage." },
  { term: "Compaction", def: "Compressing the context window via /compact. Specify what to retain. Act when usage exceeds 70–80%." },
  { term: "Worktree", def: "Isolated git working copy. --worktree flag or /batch uses them for parallel, conflict-free development." },
  { term: "Remote Control", def: "/rc — synchronization layer between local terminal and Claude mobile app/web. Session runs locally; nothing moves to cloud." },
  { term: "Superpowers", def: "v5.0.6 plugin by Jesse Vincent. Skills framework for brainstorming, TDD, debugging, subagent-driven development, and code review." },
  { term: "1% Rule", def: "Superpowers protocol: Claude checks for relevant skills before any response, ensuring structured workflows activate automatically." },
  { term: "opusplan", def: "Model alias using Opus for planning and Sonnet for execution. Best cost/quality balance for structured workflows." },
  { term: "defer", def: "v2.1.89 PreToolUse permission decision. Pauses headless sessions for human review. Resume with -p --resume." },
  { term: "/batch", def: "Bundled skill that decomposes codebase-wide changes into 5–30 parallel units, each in an isolated git worktree." },
  { term: "/simplify", def: "Bundled skill spawning 3 parallel review agents (code reuse, quality, efficiency) on recently changed files." },
  { term: "/loop", def: "Session-level cron. Fires a prompt on a schedule while the session stays open." },
  { term: "MCP", def: "Model Context Protocol. Connects Claude Code to external tools (Figma, Playwright, GitHub, databases, etc.)." },
  { term: "Elicitation", def: "v2.1.76. MCP servers can display interactive forms or open URLs during task execution to collect structured input." },
  { term: "Computer Use", def: "March 2026. Claude can interact with screen UI — open files, run dev tools, point, click, and navigate." },
  { term: "Channels", def: "Research preview. Forward Telegram, Discord, or iMessage into a session so Claude reacts to messages." },
];

const HOOKS_REF = [
  { event: "PreToolUse", when: "Before tool call executes", control: "Allow / Deny / Defer / Modify input", matcher: "Tool name (Bash, Write, Edit, Read, etc.)" },
  { event: "PostToolUse", when: "After tool completes successfully", control: "Add context (cannot undo action)", matcher: "Tool name" },
  { event: "Stop", when: "When Claude finishes responding", control: "Block (force continue) or Allow", matcher: "—" },
  { event: "SubagentStop", when: "When a subagent finishes", control: "Block or Allow", matcher: "—" },
  { event: "SessionStart", when: "Session begins", control: "Add context", matcher: "—" },
  { event: "SessionEnd", when: "Session terminates", control: "Side effects only", matcher: "—" },
  { event: "UserPromptSubmit", when: "User submits a prompt", control: "Add context / Modify", matcher: "—" },
  { event: "Notification", when: "Claude sends notification", control: "Route to Slack, desktop, etc.", matcher: "Notification type" },
  { event: "PermissionRequest", when: "Permission dialog shown", control: "Auto-approve/deny", matcher: "—" },
  { event: "PermissionDenied", when: "Auto mode classifier denies", control: "Return {retry: true}", matcher: "—" },
  { event: "TeammateIdle", when: "Agent Team member goes idle", control: "Reassign work (exit 2)", matcher: "—" },
  { event: "TaskCompleted", when: "Task marked complete", control: "Block completion (exit 2)", matcher: "—" },
  { event: "Elicitation", when: "MCP server requests input", control: "Intercept/modify", matcher: "—" },
  { event: "ElicitationResult", when: "After user MCP input", control: "Override/modify response", matcher: "—" },
  { event: "PreCompact", when: "Before context compaction", control: "Side effects", matcher: "—" },
  { event: "ConfigChange", when: "Configuration changes", control: "Side effects", matcher: "—" },
  { event: "SubagentStart", when: "Subagent spawns", control: "Side effects", matcher: "—" },
];

const ADOPTION = [
  { layer: 1, title: "Foundation", when: "Day 1", color: "#6366f1", items: [
    "Write CLAUDE.md (< 200 lines) with workflow rules and project commands",
    "Configure settings.json with model, permissions, and basic hooks",
    "Learn mode cycling: Shift+Tab between Plan/Normal/Auto-Accept",
    "Learn Ctrl+C (interrupt), @file (reference), !cmd (raw bash)",
    "Run /init, /terminal-setup, /doctor",
  ]},
  { layer: 2, title: "Verification", when: "Week 1", color: "#8b5cf6", items: [
    "Add PreToolUse hook to block source edits without RED token",
    "Add PostToolUse hook to auto-run related tests and format code",
    "Add Stop agent hook to enforce full gate before completion",
    "Write scoped rules in .claude/rules/ for different codebase areas",
    "Create the test-forward custom skill",
  ]},
  { layer: 3, title: "Productivity", when: "Week 2", color: "#a855f7", items: [
    "Install Superpowers for structured brainstorming and TDD",
    "Install LSP plugins for automatic diagnostics",
    "Learn /simplify (post-implementation) and /debug (structured debugging)",
    "Set up Remote Control (/rc) for mobile continuity",
    "Use /fast for rapid interactive iteration",
  ]},
  { layer: 4, title: "Scale", when: "Week 3+", color: "#d946ef", items: [
    "Use /batch for codebase-wide migrations",
    "Use subagents for writer/reviewer splits",
    "Experiment with Agent Teams for complex multi-domain features",
    "Integrate into CI/CD with headless mode and defer",
    "Use /loop for automated monitoring, --worktree for parallel sessions",
  ]},
  { layer: 5, title: "Continuous Improvement", when: "Ongoing", color: "#ec4899", items: [
    "Run /insights monthly to analyze usage patterns and costs",
    "Check /release-notes weekly — platform evolves fast",
    "Codify learnings into new skills from successful sessions",
    "Share hooks/rules/skills via settings.json (committed to repo)",
    "Keep personal overrides in settings.local.json (gitignored)",
  ]},
];

const CHANGELOG = [
  { date: "Apr 1", ver: "v2.1.89", desc: "defer PreToolUse, PermissionDenied hook, named subagents in @-mention, thinking summaries off by default" },
  { date: "Mar 29", ver: "v2.1.88", desc: "Session ID header for proxies, Jujutsu/Sapling VCS support" },
  { date: "Mar 24", ver: "—", desc: "Auto Mode launched (AI-classified permissions)" },
  { date: "Mar 23", ver: "—", desc: "Computer Use added to Claude Code and Cowork" },
  { date: "Mar 13", ver: "v2.1.75", desc: "1M token context window for Opus 4.6 (Max/Team/Enterprise), /color command" },
  { date: "Mar 11", ver: "v2.1.76", desc: "/effort command, MCP elicitation, Elicitation/ElicitationResult hooks" },
  { date: "Mar 7", ver: "v2.1.71", desc: "/loop command for recurring tasks" },
  { date: "Mar 3", ver: "v2.1.69", desc: "/voice push-to-talk mode" },
  { date: "Feb 28", ver: "v2.1.63", desc: "/simplify and /batch bundled skills" },
  { date: "Feb 25", ver: "—", desc: "Remote Control (/rc) research preview" },
  { date: "Feb 5", ver: "v2.1.32", desc: "Agent Teams research preview" },
];

/* ─── tiny helpers ─── */
const cl = (...c) => c.filter(Boolean).join(" ");

/* ─── root component ─── */
export default function App() {
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [expandedStep, setExpandedStep] = useState(null);
  const [cmdFilter, setCmdFilter] = useState("All");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  const filteredCmds = useMemo(() => {
    const q = search.toLowerCase() || "";
    const cat = cmdFilter;
    return COMMANDS.filter(c =>
      (cat === "All" || c.cat === cat) &&
      (c.cmd.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
    );
  }, [search, cmdFilter]);

  const filteredGlossary = useMemo(() => {
    const q = glossarySearch.toLowerCase();
    return GLOSSARY.filter(g => g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
  }, [glossarySearch]);

  const nav = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "tutorial", label: "Tutorial", icon: "📖" },
    { id: "commands", label: "Commands", icon: "⌨️" },
    { id: "hooks", label: "Hooks", icon: "🪝" },
    { id: "adoption", label: "Adoption", icon: "📈" },
    { id: "glossary", label: "Glossary", icon: "📚" },
    { id: "changelog", label: "Changelog", icon: "🕐" },
  ];

  const css = `
    * { box-sizing:border-box; margin:0; padding:0; }
    html { font-size:15px; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0c0a1a; color: #e2e0f0; overflow-x:hidden; }
    ::-webkit-scrollbar { width:6px } ::-webkit-scrollbar-thumb { background:#ffffff18; border-radius:3px }
    .glass { background:rgba(255,255,255,0.04); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.08); border-radius:16px; }
    .glass-strong { background:rgba(255,255,255,0.07); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.12); border-radius:16px; }
    .glow { box-shadow: 0 0 40px -10px rgba(139,92,246,0.3); }
    input, textarea { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#e2e0f0; padding:10px 14px; font-size:0.9rem; outline:none; width:100%; transition:border .2s; font-family:inherit; }
    input:focus { border-color:rgba(139,92,246,0.5); }
    code, .mono { font-family:'JetBrains Mono','Fira Code',monospace; }
    .code-block { background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px 16px; font-size:0.82rem; line-height:1.6; overflow-x:auto; white-space:pre-wrap; word-break:break-all; color:#c4b5fd; }
    .badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:0.72rem; font-weight:600; letter-spacing:0.03em; }
    .fade-in { animation: fadeIn .35s ease-out; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
    .nav-item { cursor:pointer; padding:10px 16px; border-radius:12px; font-size:0.85rem; font-weight:500; transition:all .2s; display:flex; align-items:center; gap:8px; user-select:none; }
    .nav-item:hover { background:rgba(255,255,255,0.06); }
    .nav-item.active { background:rgba(139,92,246,0.2); color:#c084fc; border:1px solid rgba(139,92,246,0.3); }
    .bento { display:grid; gap:16px; }
    .bento-2 { grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); }
    .bento-3 { grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); }
    .step-card { cursor:pointer; transition:all .25s; position:relative; overflow:hidden; }
    .step-card:hover { transform:translateY(-2px); border-color:rgba(139,92,246,0.3); }
    .step-card.expanded { border-color:rgba(139,92,246,0.4); }
    .table-row { display:grid; padding:10px 16px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:center; font-size:0.85rem; }
    .table-row:hover { background:rgba(255,255,255,0.03); }
    .pill-btn { padding:6px 14px; border-radius:20px; font-size:0.78rem; font-weight:600; cursor:pointer; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.04); color:#c4b5fd; transition:all .2s; user-select:none; }
    .pill-btn:hover { background:rgba(139,92,246,0.15); border-color:rgba(139,92,246,0.3); }
    .pill-btn.active { background:rgba(139,92,246,0.25); border-color:rgba(139,92,246,0.5); color:#e9d5ff; }
    .hamburger { display:none; cursor:pointer; padding:8px; border-radius:8px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); }
    @media(max-width:768px) {
      .hamburger { display:flex; align-items:center; justify-content:center; }
      .sidebar { display:none !important; }
      .sidebar.open { display:flex !important; position:fixed; top:0;left:0;right:0;bottom:0;z-index:999; background:rgba(12,10,26,0.97); padding:60px 20px 20px; }
    }
  `;

  const Section = ({ title, sub, children }) => (
    <div className="fade-in" style={{marginBottom:32}}>
      <h2 style={{fontSize:"1.5rem",fontWeight:700,marginBottom:4,background:"linear-gradient(135deg,#c084fc,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{title}</h2>
      {sub && <p style={{fontSize:"0.85rem",color:"#9890b0",marginBottom:20}}>{sub}</p>}
      {children}
    </div>
  );

  /* ─── HOME ─── */
  const Home = () => (
    <div className="fade-in">
      <div className="glass glow" style={{padding:"40px 32px",marginBottom:24,textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"relative"}}>
          <p style={{fontSize:"0.8rem",color:"#a78bfa",fontWeight:600,letterSpacing:"0.1em",marginBottom:8}}>APRIL 2026 · v2.1.89 · OPUS 4.6</p>
          <h1 style={{fontSize:"2.2rem",fontWeight:800,lineHeight:1.15,marginBottom:12,background:"linear-gradient(135deg,#e9d5ff,#818cf8,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Claude Code Vibe Coding</h1>
          <p style={{fontSize:"1.05rem",color:"#c4b5fd",maxWidth:520,margin:"0 auto 16px"}}>The Definitive Team Playbook</p>
          <p style={{fontSize:"0.85rem",color:"#8880a8",maxWidth:560,margin:"0 auto"}}>Explore → Plan → RED → GREEN → Review → Ship</p>
        </div>
      </div>

      <div className="bento bento-3" style={{marginBottom:24}}>
        {[
          { icon:"🎯", title:"Core Principle", body:"No production behavior change until a failing verification artifact exists." },
          { icon:"🧪", title:"Verification First", body:"Give Claude something to verify against — tests, screenshots, expected outputs, smoke commands." },
          { icon:"⚡", title:"Deterministic Hooks", body:"If you want a rule to stick, don't leave it as prose. Hooks are the enforcement layer." },
        ].map((c,i) => (
          <div key={i} className="glass" style={{padding:"20px 18px"}}>
            <div style={{fontSize:"1.5rem",marginBottom:8}}>{c.icon}</div>
            <div style={{fontWeight:700,fontSize:"0.95rem",marginBottom:6}}>{c.title}</div>
            <div style={{fontSize:"0.82rem",color:"#9890b0",lineHeight:1.55}}>{c.body}</div>
          </div>
        ))}
      </div>

      <div className="bento bento-2" style={{marginBottom:24}}>
        {[
          { icon:"📖", t:"Step-by-Step Tutorial", d:"6 phases from setup to CI/CD. Tap to explore.", tab:"tutorial" },
          { icon:"⌨️", t:"Command Reference", d:"50+ commands, shortcuts, CLI flags. Searchable.", tab:"commands" },
          { icon:"🪝", t:"Hooks Reference", d:"21+ lifecycle events with control types.", tab:"hooks" },
          { icon:"📈", t:"Adoption Roadmap", d:"5-layer plan from Day 1 to continuous improvement.", tab:"adoption" },
          { icon:"📚", t:"Glossary", d:"30+ terms explained. Searchable.", tab:"glossary" },
          { icon:"🕐", t:"Changelog", d:"March–April 2026 changes that matter.", tab:"changelog" },
        ].map((c,i) => (
          <div key={i} className="glass step-card" onClick={() => setTab(c.tab)} style={{padding:"18px 18px",cursor:"pointer"}}>
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <span style={{fontSize:"1.4rem"}}>{c.icon}</span>
              <div>
                <div style={{fontWeight:700,fontSize:"0.92rem",marginBottom:4}}>{c.t}</div>
                <div style={{fontSize:"0.8rem",color:"#9890b0"}}>{c.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Section title="Methodology at a Glance" sub="The workflow that aligns Anthropic's best practices with Superpowers TDD">
        <div className="glass" style={{padding:"20px 18px"}}>
          {["EXPLORE — Plan Mode. Read files, understand patterns, ask questions. No edits.",
            "PLAN — Create detailed implementation plan. Ctrl+G to edit in your editor.",
            "RED — Write failing verification artifact. Run it. Confirm failure. Create RED token.",
            "GREEN — Implement minimal production code. PostToolUse hooks run tests after each edit.",
            "REVIEW — /simplify for 3-agent review. Stop hook enforces full gate.",
            "SHIP — Commit with descriptive message. Open PR. Final verification."
          ].map((s,i) => (
            <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"10px 0",borderBottom:i<5?"1px solid rgba(255,255,255,0.05)":"none"}}>
              <div style={{minWidth:28,height:28,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:700,background:`rgba(139,92,246,${0.15+i*0.04})`,color:"#c084fc"}}>{i+1}</div>
              <div style={{fontSize:"0.85rem",lineHeight:1.55,paddingTop:3}}><span style={{fontWeight:700,color:"#c4b5fd"}}>{s.split("—")[0]}—</span>{s.split("—").slice(1).join("—")}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Repository Structure" sub="The recommended project layout for team-shared Claude Code configuration">
        <div className="code-block mono" style={{fontSize:"0.78rem"}}>
{`repo/
├── CLAUDE.md                          # Project rules (< 200 lines)
├── .claude/
│   ├── settings.json                  # Team-shared: hooks, permissions, model
│   ├── settings.local.json            # Personal overrides (gitignored)
│   ├── hooks/
│   │   ├── require-test-first.sh      # PreToolUse TDD gate
│   │   ├── run-related-tests.sh       # PostToolUse async feedback
│   │   ├── auto-format.sh             # PostToolUse formatter
│   │   └── block-dangerous.sh         # PreToolUse security gate
│   ├── rules/
│   │   ├── frontend-testing.md        # Scoped to apps/web/**
│   │   └── backend-testing.md         # Scoped to services/api/**
│   ├── skills/
│   │   └── test-forward/
│   │       └── SKILL.md               # Verification-first skill
│   ├── agents/
│   │   ├── code-reviewer.md           # Custom reviewer subagent
│   │   └── security-auditor.md        # Custom security subagent
│   └── plans/                         # Stored plans
└── tests/`}
        </div>
      </Section>
    </div>
  );

  /* ─── TUTORIAL ─── */
  const Tutorial = () => (
    <div className="fade-in">
      {PHASES.map((phase) => (
        <div key={phase.id} style={{marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{width:40,height:40,borderRadius:12,background:`${phase.color}22`,border:`1px solid ${phase.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>{phase.icon}</div>
            <div>
              <p style={{fontSize:"0.72rem",color:phase.color,fontWeight:700,letterSpacing:"0.08em"}}>PHASE {phase.num}</p>
              <h3 style={{fontSize:"1.15rem",fontWeight:700}}>{phase.title}</h3>
            </div>
          </div>
          <div className="bento bento-2">
            {phase.steps.map((step, si) => {
              const key = `${phase.id}-${si}`;
              const expanded = expandedStep === key;
              return (
                <div key={si} className={cl("glass step-card", expanded && "expanded")} onClick={() => setExpandedStep(expanded ? null : key)} style={{padding:"16px 18px"}}>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <div style={{minWidth:26,height:26,borderRadius:8,background:`${phase.color}22`,border:`1px solid ${phase.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.72rem",fontWeight:700,color:phase.color}}>{si+1}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:"0.9rem",marginBottom:expanded?8:0}}>{step.title}</div>
                      {expanded && (
                        <div className="fade-in">
                          <p style={{fontSize:"0.82rem",color:"#b0a8c8",lineHeight:1.6,whiteSpace:"pre-wrap",marginBottom:10}}>{step.detail}</p>
                          {step.cmd && <div className="code-block mono" style={{fontSize:"0.76rem"}}>{step.cmd}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{position:"absolute",top:16,right:16,fontSize:"0.7rem",color:"#6860a0",transform:expanded?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>▼</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  /* ─── COMMANDS ─── */
  const cats = ["All", ...Array.from(new Set(COMMANDS.map(c => c.cat)))];
  const Commands = () => (
    <div className="fade-in">
      <Section title="Command Reference" sub={`${COMMANDS.length} commands, shortcuts, and CLI flags`}>
        <input placeholder="Search commands..." value={search} onChange={e => setSearch(e.target.value)} style={{marginBottom:12}} />
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
          {cats.map(c => (
            <div key={c} className={cl("pill-btn", cmdFilter===c && "active")} onClick={() => setCmdFilter(c)}>{c}</div>
          ))}
        </div>
        <div className="glass" style={{overflow:"hidden"}}>
          <div className="table-row" style={{gridTemplateColumns:"180px 80px 1fr",fontWeight:700,fontSize:"0.75rem",color:"#8880a8",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
            <div>Command</div><div>Category</div><div>Description</div>
          </div>
          {filteredCmds.map((c,i) => (
            <div key={i} className="table-row" style={{gridTemplateColumns:"180px 80px 1fr"}}>
              <div className="mono" style={{color:"#c084fc",fontSize:"0.82rem",fontWeight:600}}>{c.cmd}</div>
              <div><span className="badge" style={{background:"rgba(139,92,246,0.15)",color:"#a78bfa"}}>{c.cat}</span></div>
              <div style={{color:"#b0a8c8"}}>{c.desc}</div>
            </div>
          ))}
          {filteredCmds.length === 0 && <div style={{padding:20,textAlign:"center",color:"#6860a0",fontSize:"0.85rem"}}>No commands match your search.</div>}
        </div>
      </Section>
    </div>
  );

  /* ─── HOOKS ─── */
  const Hooks = () => (
    <div className="fade-in">
      <Section title="Hooks Reference" sub="21+ lifecycle events across 4 handler types (command, http, prompt, agent)">
        <div className="glass" style={{overflow:"hidden",marginBottom:24}}>
          <div className="table-row" style={{gridTemplateColumns:"150px 1fr 1fr 150px",fontWeight:700,fontSize:"0.75rem",color:"#8880a8",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
            <div>Event</div><div>When</div><div>Control</div><div>Matcher</div>
          </div>
          {HOOKS_REF.map((h,i) => (
            <div key={i} className="table-row" style={{gridTemplateColumns:"150px 1fr 1fr 150px"}}>
              <div className="mono" style={{color:"#c084fc",fontSize:"0.82rem",fontWeight:600}}>{h.event}</div>
              <div style={{color:"#b0a8c8"}}>{h.when}</div>
              <div style={{color:"#9890b0"}}>{h.control}</div>
              <div style={{color:"#6860a0",fontSize:"0.8rem"}}>{h.matcher}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Handler Types" sub="Choose the right handler for each enforcement need">
        <div className="bento bento-2">
          {[
            { t:"command", d:"Shell command. Receives JSON on stdin. Returns exit code (0=allow, 2=block) or JSON on stdout. Fastest. Use for formatting, security gates, simple validation.", c:"bash .claude/hooks/block-dangerous.sh" },
            { t:"http", d:"HTTP POST to an endpoint. Request body is event JSON. Use for external logging, webhooks, and remote validation services.", c:"https://your-server.com/hook" },
            { t:"prompt", d:"Single-turn LLM evaluation using $ARGUMENTS placeholder. Use for context-dependent decisions like production impact assessment.", c:"\"Is this command safe? $ARGUMENTS\"" },
            { t:"agent", d:"Spawns a subagent with access to tools (Read, Grep, Glob, Bash). Use for deep verification like running test suites and inspecting results.", c:"\"Verify all tests pass...\"" },
          ].map((h,i) => (
            <div key={i} className="glass" style={{padding:"18px"}}>
              <div className="mono badge" style={{background:"rgba(139,92,246,0.2)",color:"#c084fc",marginBottom:8}}>{h.t}</div>
              <p style={{fontSize:"0.82rem",color:"#b0a8c8",lineHeight:1.55,marginBottom:10}}>{h.d}</p>
              <div className="code-block mono" style={{fontSize:"0.75rem"}}>{h.c}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Exit Code Semantics" sub="Critical for PreToolUse enforcement">
        <div className="bento bento-3">
          {[
            { code:"0", label:"Allow", color:"#22c55e", desc:"Action proceeds normally." },
            { code:"2", label:"Block", color:"#ef4444", desc:"Action is denied. Stderr sent to Claude as feedback." },
            { code:"1", label:"Warning", color:"#f59e0b", desc:"Non-blocking error. Action proceeds. Error shown to user, NOT sent to Claude." },
          ].map((e,i) => (
            <div key={i} className="glass" style={{padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:"1.8rem",fontWeight:800,color:e.color,marginBottom:4}} className="mono">{e.code}</div>
              <div style={{fontWeight:700,color:e.color,marginBottom:4}}>{e.label}</div>
              <div style={{fontSize:"0.8rem",color:"#9890b0"}}>{e.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Example: settings.json Hooks Configuration">
        <div className="code-block mono" style={{fontSize:"0.73rem"}}>
{`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [{
          "type": "command",
          "command": "bash .claude/hooks/require-test-first.sh",
          "timeout": 5
        }]
      },
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
          { "type": "command", "command": "bash .claude/hooks/auto-format.sh", "timeout": 10 },
          { "type": "command", "command": "bash .claude/hooks/run-related-tests.sh", "async": true, "timeout": 180 }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [{
          "type": "agent",
          "prompt": "Verify all tests pass. Run the full gate. Block if incomplete.",
          "timeout": 180
        }]
      }
    ]
  }
}`}
        </div>
      </Section>
    </div>
  );

  /* ─── ADOPTION ─── */
  const Adoption = () => (
    <div className="fade-in">
      <Section title="Team Adoption Roadmap" sub="5 layers, adopted incrementally from Day 1 to ongoing improvement">
        {ADOPTION.map((a,i) => (
          <div key={i} className="glass" style={{padding:"20px 20px",marginBottom:16,borderLeft:`3px solid ${a.color}`}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <div style={{fontSize:"1.5rem",fontWeight:800,color:a.color}} className="mono">L{a.layer}</div>
              <div>
                <div style={{fontWeight:700,fontSize:"1rem"}}>{a.title}</div>
                <div style={{fontSize:"0.75rem",color:"#8880a8"}}>{a.when}</div>
              </div>
            </div>
            {a.items.map((item,j) => (
              <div key={j} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"5px 0"}}>
                <span style={{color:a.color,fontSize:"0.7rem",marginTop:4}}>●</span>
                <span style={{fontSize:"0.85rem",color:"#b0a8c8",lineHeight:1.5}}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section title="Superpowers Integration Stack" sub="How native Claude Code and Superpowers complement each other">
        <div className="bento bento-2">
          {[
            { src:"Native", cmd:"/plan", for:"Exploration and high-level planning" },
            { src:"Superpowers", cmd:"/superpowers:brainstorm", for:"Deep Socratic requirements elicitation" },
            { src:"Superpowers", cmd:"/superpowers:write-plan", for:"Micro-task decomposition with TDD steps" },
            { src:"Superpowers", cmd:"/superpowers:execute-plan", for:"Subagent-driven parallel implementation" },
            { src:"Native", cmd:"/simplify", for:"Post-implementation 3-agent review" },
            { src:"Native", cmd:"Hooks", for:"Deterministic enforcement of all rules" },
          ].map((s,i) => (
            <div key={i} className="glass" style={{padding:"14px 16px",display:"flex",gap:12,alignItems:"center"}}>
              <span className="badge" style={{background:s.src==="Native"?"rgba(99,102,241,0.2)":"rgba(217,70,239,0.2)",color:s.src==="Native"?"#818cf8":"#d946ef",flexShrink:0}}>{s.src}</span>
              <div>
                <div className="mono" style={{fontSize:"0.82rem",color:"#c084fc",fontWeight:600}}>{s.cmd}</div>
                <div style={{fontSize:"0.8rem",color:"#9890b0"}}>{s.for}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  /* ─── GLOSSARY ─── */
  const GlossaryView = () => (
    <div className="fade-in">
      <Section title="Glossary" sub={`${GLOSSARY.length} terms explained`}>
        <input placeholder="Search glossary..." value={glossarySearch} onChange={e => setGlossarySearch(e.target.value)} style={{marginBottom:16}} />
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filteredGlossary.map((g,i) => (
            <div key={i} className="glass" style={{padding:"14px 18px"}}>
              <div style={{fontWeight:700,fontSize:"0.92rem",color:"#c084fc",marginBottom:4}} className="mono">{g.term}</div>
              <div style={{fontSize:"0.83rem",color:"#b0a8c8",lineHeight:1.55}}>{g.def}</div>
            </div>
          ))}
          {filteredGlossary.length === 0 && <div style={{textAlign:"center",color:"#6860a0",padding:20}}>No terms match.</div>}
        </div>
      </Section>
    </div>
  );

  /* ─── CHANGELOG ─── */
  const ChangelogView = () => (
    <div className="fade-in">
      <Section title="What Changed Recently" sub="March–April 2026 releases most relevant to this workflow">
        <div style={{position:"relative",paddingLeft:24}}>
          <div style={{position:"absolute",left:8,top:0,bottom:0,width:2,background:"linear-gradient(to bottom,#8b5cf6,#ec4899)"}}/>
          {CHANGELOG.map((c,i) => (
            <div key={i} style={{position:"relative",marginBottom:20,paddingLeft:20}}>
              <div style={{position:"absolute",left:-8,top:6,width:14,height:14,borderRadius:7,background:"#0c0a1a",border:"2px solid #8b5cf6"}}/>
              <div style={{display:"flex",gap:10,alignItems:"baseline",marginBottom:4}}>
                <span style={{fontWeight:700,fontSize:"0.85rem",color:"#c084fc"}}>{c.date}</span>
                {c.ver !== "—" && <span className="badge mono" style={{background:"rgba(139,92,246,0.15)",color:"#a78bfa"}}>{c.ver}</span>}
              </div>
              <p style={{fontSize:"0.83rem",color:"#b0a8c8",lineHeight:1.5}}>{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  const pages = { home: Home, tutorial: Tutorial, commands: Commands, hooks: Hooks, adoption: Adoption, glossary: GlossaryView, changelog: ChangelogView };
  const Page = pages[tab] || Home;

  return (
    <>
      <style>{css}</style>
      <div style={{display:"flex",minHeight:"100vh",background:"#0c0a1a"}}>
        {/* Sidebar */}
        <div className={cl("sidebar", mobileNav && "open")} style={{display:"flex",flexDirection:"column",width:220,minWidth:220,padding:"20px 12px",borderRight:"1px solid rgba(255,255,255,0.06)",position:"sticky",top:0,height:"100vh",overflowY:"auto",flexShrink:0}}>
          <div style={{marginBottom:20,paddingLeft:8}}>
            <div style={{fontSize:"0.9rem",fontWeight:800,background:"linear-gradient(135deg,#c084fc,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CC Vibe Guide</div>
            <div style={{fontSize:"0.65rem",color:"#6860a0",marginTop:2}}>v2.1.89 · April 2026</div>
          </div>
          {nav.map(n => (
            <div key={n.id} className={cl("nav-item", tab===n.id && "active")} onClick={() => { setTab(n.id); setMobileNav(false); }}>
              <span>{n.icon}</span>{n.label}
            </div>
          ))}
          <div style={{marginTop:"auto",padding:"12px 8px",fontSize:"0.7rem",color:"#4a4270",lineHeight:1.5}}>
            Based on Claude Code Vibe Coding: The Definitive Team Playbook
          </div>
        </div>

        {/* Main */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{padding:"12px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
            <div className="hamburger" onClick={() => setMobileNav(!mobileNav)}>
              <span style={{fontSize:"1.1rem"}}>{mobileNav ? "✕" : "☰"}</span>
            </div>
            <input placeholder="Search commands and glossary..." value={search} onChange={e => { setSearch(e.target.value); if(e.target.value && tab !== "commands") setTab("commands"); }} style={{maxWidth:400}} />
            <div style={{marginLeft:"auto",display:"flex",gap:6}}>
              <span className="badge" style={{background:"rgba(34,197,94,0.15)",color:"#4ade80",animation:"pulse 2s infinite"}}>LIVE</span>
              <span className="badge mono" style={{background:"rgba(139,92,246,0.15)",color:"#a78bfa"}}>v2.1.89</span>
            </div>
          </div>
          <div style={{padding:"24px 24px 48px",maxWidth:960,margin:"0 auto"}}>
            <Page />
          </div>
        </div>
      </div>
    </>
  );
}

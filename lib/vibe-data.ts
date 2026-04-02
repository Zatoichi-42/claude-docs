export const corePrinciples = [
  {
    icon: "🎯",
    title: "Core Principle",
    body: "No production behavior change until a failing verification artifact exists.",
  },
  {
    icon: "🧪",
    title: "Verification First",
    body: "Give Claude something concrete to verify against: tests, screenshots, expected outputs, or smoke commands.",
  },
  {
    icon: "⚡",
    title: "Deterministic Hooks",
    body: "If you want a team rule to stick, enforce it with hooks instead of relying on prose alone.",
  },
]

export const methodologySteps = [
  "EXPLORE — Plan Mode. Read files, understand patterns, ask questions. No edits.",
  "PLAN — Create a detailed implementation plan. Use Ctrl+G to edit it in your own editor.",
  "RED — Write the smallest failing verification artifact and confirm it fails.",
  "GREEN — Implement the minimal production change and rerun the same verification.",
  "REVIEW — Run /simplify, and /security-review where the change is security-sensitive.",
  "SHIP — Commit with a descriptive message and open the PR after the final gate passes.",
]

export const repositoryStructure = `repo/
├── CLAUDE.md                          # Project rules (< 200 lines)
├── .claude/
│   ├── settings.json                  # Team-shared: hooks, permissions, model
│   ├── settings.local.json            # Personal overrides (gitignored)
│   ├── hooks/
│   │   ├── require-test-first.sh      # PreToolUse TDD gate
│   │   ├── run-related-tests.sh       # PostToolUse async feedback
│   │   ├── auto-format.sh             # PostToolUse formatter
│   │   ├── block-dangerous.sh         # PreToolUse security gate
│   │   └── defer-production-ops.sh    # PreToolUse CI/CD human gate
│   ├── rules/
│   │   ├── frontend-testing.md        # Scoped to apps/web/**
│   │   └── backend-testing.md         # Scoped to services/api/**
│   ├── skills/
│   │   └── test-forward/
│   │       └── SKILL.md               # Verification-first skill
│   ├── agents/
│   │   └── code-reviewer.md           # Custom reviewer subagent
│   └── plans/                         # Stored plans
└── tests/`

export const quickSurfaceLinks = [
  {
    icon: "📖",
    title: "Step-by-Step Tutorial",
    description: "Follow the setup-to-ship flow with concrete prompts and verification checkpoints.",
    href: "/tutorials/six-step-loop",
  },
  {
    icon: "⌨️",
    title: "Command Reference",
    description: "Session commands, mode toggles, CLI flags, and shortcuts in one searchable place.",
    href: "/reference/commands",
  },
  {
    icon: "🪝",
    title: "Hooks Reference",
    description: "Lifecycle events, handler types, exit semantics, and hook design patterns.",
    href: "/configuration/hooks",
  },
  {
    icon: "📈",
    title: "Adoption Roadmap",
    description: "Layer the rollout from foundation to scale instead of trying to switch everything at once.",
    href: "/workflows/adoption",
  },
  {
    icon: "📚",
    title: "Glossary",
    description: "Shared vocabulary for context management, Auto Mode, hooks, subagents, and MCP.",
    href: "/reference/glossary",
  },
  {
    icon: "🕐",
    title: "Release Changes",
    description: "The March-April 2026 changes that materially affect real Claude Code workflows.",
    href: "/reference/changelog",
  },
]

export const adoptionLayers = [
  {
    layer: "Layer 1",
    title: "Foundation",
    when: "Day 1",
    items: [
      "Write a tight CLAUDE.md with workflow rules and project commands.",
      "Configure settings.json with model, permissions, and baseline hooks.",
      "Learn the mode cycle and the session basics: Shift+Tab, Ctrl+C, @file, and !cmd.",
      "Run /init, /terminal-setup, and /doctor.",
    ],
  },
  {
    layer: "Layer 2",
    title: "Verification",
    when: "Week 1",
    items: [
      "Add the PreToolUse gate that blocks source edits without RED.",
      "Add PostToolUse feedback hooks for related tests and formatting.",
      "Add the Stop agent hook for the final repo gate.",
      "Create scoped rules and the test-forward skill.",
    ],
  },
  {
    layer: "Layer 3",
    title: "Productivity",
    when: "Week 2",
    items: [
      "Install Superpowers and LSP plugins.",
      "Teach /simplify, /debug, /rc, and /fast.",
      "Use better review loops before scaling the workflow.",
    ],
  },
  {
    layer: "Layer 4",
    title: "Scale",
    when: "Week 3+",
    items: [
      "Use /batch for broad migrations.",
      "Use subagents or Agent Teams for multi-domain work.",
      "Integrate headless mode and defer into CI/CD.",
      "Use /loop and --worktree where parallelism actually helps.",
    ],
  },
  {
    layer: "Layer 5",
    title: "Continuous Improvement",
    when: "Ongoing",
    items: [
      "Review /insights monthly and /release-notes weekly.",
      "Turn successful patterns into skills, hooks, and rules.",
      "Keep team config committed and personal overrides local.",
    ],
  },
]

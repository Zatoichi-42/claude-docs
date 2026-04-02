export const corePrinciples = [
  {
    icon: "🎯",
    title: "Workflow Before Configuration",
    body: "Learn the session loop first. Add shared repo structure only after the team understands how good Claude Code work feels day to day.",
  },
  {
    icon: "🧪",
    title: "Verification First",
    body: "Give Claude something concrete to verify against: tests, screenshots, expected outputs, or smoke commands.",
  },
  {
    icon: "🧱",
    title: "Progressive Team Baseline",
    body: "Start with a tight CLAUDE.md and shared settings. Add skills, hooks, and plugins only where they remove real friction.",
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
    title: "Core Commands",
    description: "Start with the slash commands you will use constantly before you touch team-wide configuration.",
    href: "/tutorials/core-commands",
  },
  {
    icon: "🚀",
    title: "Your First Feature",
    description: "Get a first win with a concrete explore -> RED -> GREEN -> review flow you can repeat tomorrow.",
    href: "/tutorials/first-feature",
  },
  {
    icon: "🗓️",
    title: "Daily Workflow",
    description: "Turn the tutorial habits into a repeatable day-to-day operating loop once the basics are comfortable.",
    href: "/workflows/daily",
  },
  {
    icon: "🧰",
    title: "Project Setup",
    description: "Build the shared repo baseline only after you understand what each piece is buying you.",
    href: "/configuration",
  },
  {
    icon: "📚",
    title: "Best Links",
    description: "Jump to the official docs, release notes, and the best supplemental community tutorials from one page.",
    href: "/reference/best-links",
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
      "Use a team account, complete first-time setup, and learn the mode cycle and core controls.",
      "Write a tight CLAUDE.md with workflow rules and project commands.",
      "Choose the lightest bootstrap path that still gives the repo a clear baseline.",
      "Teach /plan, /context, /compact, and /rename before you standardize anything else.",
    ],
  },
  {
    layer: "Layer 2",
    title: "Daily Flow",
    when: "Week 1",
    items: [
      "Practice the six-step loop on a few real tasks before adding heavy repo automation.",
      "Teach /simplify and /debug as the default review and recovery tools.",
      "Use /plugin to inspect what is already available before adding anything new.",
      "Introduce skills after the team already recognizes the recurring workflow they help with.",
    ],
  },
  {
    layer: "Layer 3",
    title: "Shared Baseline",
    when: "Week 2",
    items: [
      "Commit shared settings once the team agrees on permissions, model choices, and the repo gate.",
      "Add one convenience hook or one safety hook, not an entire event matrix.",
      "Create scoped rules and one explicit skill that reinforces the workflow the team already uses.",
      "Teach the full project setup only after the team can explain why each piece exists.",
    ],
  },
  {
    layer: "Layer 4",
    title: "Team Rollout",
    when: "Week 3+",
    items: [
      "Standardize only the rules and automation the team is ready to live with.",
      "Add stronger hooks, custom agents, and plugin expectations where they remove real coordination cost.",
      "Use the adoption roadmap and team-lead setup page to stage the rollout instead of flipping everything on at once.",
    ],
  },
  {
    layer: "Layer 5",
    title: "Scale",
    when: "Later",
    items: [
      "Use /batch for broad migrations.",
      "Use subagents or Agent Teams for multi-domain work.",
      "Integrate headless mode and defer into CI/CD.",
      "Use /loop and --worktree where parallelism actually helps.",
    ],
  },
  {
    layer: "Layer 6",
    title: "Continuous Improvement",
    when: "Ongoing",
    items: [
      "Review /insights monthly and /release-notes weekly.",
      "Turn successful patterns into skills, hooks, and rules.",
      "Keep team config committed and personal overrides local.",
    ],
  },
]

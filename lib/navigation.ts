export interface NavItem {
  title: string
  href: string
  description: string
  part: string
  duration?: string
}

export interface NavGroup {
  title: string
  description: string
  items: NavItem[]
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    description:
      "Install Claude Code, sign in with the right account, tune the terminal, and choose a bootstrap path without diving into heavy repo configuration yet.",
    items: [
      {
        title: "First-Time Setup",
        href: "/getting-started",
        description:
          "Install Claude Code, use your team account, set up the terminal workflow, add the VS Code extension, and compare /init with the guided new-init flow.",
        part: "Part 1",
      },
    ],
  },
  {
    title: "Tutorials",
    description:
      "Learn Claude Code through guided sessions that introduce commands, daily work habits, skills, hooks, and project setup in a safe order.",
    items: [
      {
        title: "Core Session Commands",
        href: "/tutorials/core-commands",
        description:
          "Learn the commands you will use constantly: /plan, /context, /compact, /rename, /rc, /ide, and the plugin browser.",
        part: "Tutorial",
        duration: "15 min",
      },
      {
        title: "Your First Feature",
        href: "/tutorials/first-feature",
        description:
          "A first end-to-end walkthrough from naming a session to testing and committing the result.",
        part: "Tutorial",
        duration: "8 steps",
      },
      {
        title: "The Six-Step Loop",
        href: "/tutorials/six-step-loop",
        description:
          "A concrete RED-GREEN workflow walk-through you can mirror in your own repo.",
        part: "Tutorial",
        duration: "6 phases",
      },
      {
        title: "Review and Debug Commands",
        href: "/tutorials/review-debug",
        description:
          "Use /simplify, /debug, /permissions, /hooks, and /security-review when the work gets real.",
        part: "Tutorial",
        duration: "20 min",
      },
      {
        title: "Using Skills",
        href: "/tutorials/skills",
        description:
          "See how skills show up, inspect them, and use them without turning your repo into a framework project on day one.",
        part: "Tutorial",
        duration: "15 min",
      },
      {
        title: "Using MCP Tools",
        href: "/tutorials/mcp",
        description:
          "Connect one external tool safely, learn scopes and /mcp auth, and decide when an MCP server should stay personal versus become shared.",
        part: "Tutorial",
        duration: "20 min",
      },
      {
        title: "Your First Hook",
        href: "/tutorials/first-hook",
        description:
          "Add one small guardrail after the daily workflow already makes sense.",
        part: "Tutorial",
        duration: "15 min",
      },
      {
        title: "Build the Full Project Setup",
        href: "/tutorials/project-setup",
        description:
          "Turn the workflow into a durable repo baseline with CLAUDE.md, shared settings, skills, and optional hooks.",
        part: "Tutorial",
        duration: "40 min",
      },
      {
        title: "Build an Advanced Hook Stack",
        href: "/tutorials/advanced-hooks",
        description:
          "Translate strict Codex-style workflow guardrails into a Claude Code hook stack with stateful RED/GREEN enforcement.",
        part: "Tutorial",
        duration: "Advanced",
      },
      {
        title: "VS Code Integration",
        href: "/tutorials/vscode",
        description:
          "Use the extension for inline diffs, file mentions, and plan review without losing terminal context.",
        part: "Tutorial",
        duration: "10 min",
      },
    ],
  },
  {
    title: "Workflows",
    description:
      "Turn the tutorial habits into a repeatable daily operating loop before you scale or standardize anything.",
    items: [
      {
        title: "Daily Workflow",
        href: "/workflows/daily",
        description:
          "Start sessions, explore first, verify changes, review carefully, and manage context without burning trust.",
        part: "Part 2",
      },
    ],
  },
  {
    title: "Configuration",
    description:
      "Assemble a reusable repo baseline only after the workflow feels familiar.",
    items: [
      {
        title: "Project Setup",
        href: "/configuration",
        description:
          "Choose a bootstrap path, tighten CLAUDE.md, add shared settings, then layer in skills and hooks intentionally.",
        part: "Part 3",
      },
    ],
  },
  {
    title: "Team Rollout",
    description:
      "Standardize only the parts the team is ready to live with, then scale from there.",
    items: [
      {
        title: "Team Leader Setup",
        href: "/configuration/team-leads",
        description:
          "Roll Claude Code out to a team without leading with hooks, policy jargon, or plugin sprawl.",
        part: "Part 4",
      },
      {
        title: "Adoption Roadmap",
        href: "/workflows/adoption",
        description:
          "Layer the rollout from baseline to scale instead of switching every feature on at once.",
        part: "Expanded",
      },
    ],
  },
  {
    title: "Reference",
    description:
      "Keep the command surface, curated links, glossary, troubleshooting notes, and release changes close at hand.",
    items: [
      {
        title: "Command Quick Reference",
        href: "/reference/commands",
        description:
          "The lookup page for session commands, project utilities, plugin management, CLI flags, and shortcuts.",
        part: "Reference",
      },
      {
        title: "Best Links",
        href: "/reference/best-links",
        description:
          "A curated official-first reading list for Claude Code guidance, release tracking, and community tutorials.",
        part: "Reference",
      },
      {
        title: "FAQ",
        href: "/reference/faq",
        description:
          "Short answers to the recurring setup, permissions, skills, MCP, and configuration questions teams keep asking.",
        part: "Reference",
      },
      {
        title: "Glossary",
        href: "/reference/glossary",
        description:
          "A working glossary for Claude Code, hooks, context, Remote Control, Superpowers, and related workflow terms.",
        part: "Reference",
      },
      {
        title: "Troubleshooting",
        href: "/reference/troubleshooting",
        description:
          "Common problems and the documented fixes for hooks, context, permissions, plugins, and performance.",
        part: "Reference",
      },
      {
        title: "Release Changes",
        href: "/reference/changelog",
        description:
          "Recent changes, corrections to older guidance, and the updates that materially affect real Claude Code workflows.",
        part: "Reference",
      },
    ],
  },
  {
    title: "Advanced",
    description:
      "Deep-dive the reference surfaces once the daily flow and the team baseline are already working.",
    items: [
      {
        title: "Hooks & Events",
        href: "/configuration/hooks",
        description:
          "The full lifecycle reference for teams that are ready to go beyond a first safety hook.",
        part: "Advanced",
      },
      {
        title: "Scaling Workflows",
        href: "/workflows/scaling",
        description:
          "Use /batch, subagents, recurring loops, and isolation techniques for larger coordinated work.",
        part: "Advanced",
      },
      {
        title: "CI/CD Integration",
        href: "/advanced/ci-cd",
        description:
          "Headless mode, human-in-the-loop deferrals, PR-linked sessions, and structured automation patterns.",
        part: "Advanced",
      },
      {
        title: "Superpowers Plugin",
        href: "/advanced/superpowers",
        description:
          "Use the Superpowers plugin once the team already understands the core Claude Code workflow.",
        part: "Advanced",
      },
    ],
  },
]

export const flatNav: NavItem[] = navigation.flatMap((group) => group.items)

export const docsHomeSections = navigation.map((group) => ({
  title: group.title,
  description: group.description,
  href: group.items[0]?.href ?? "/",
  count: group.items.length,
}))

export const tutorialCards = navigation
  .find((group) => group.title === "Tutorials")
  ?.items.map((item) => ({
    title: item.title,
    href: item.href,
    description: item.description,
    duration: item.duration ?? "Guide",
  })) ?? []

export function getChapterNav(href: string): {
  prev: NavItem | null
  next: NavItem | null
} {
  const index = flatNav.findIndex((item) => item.href === href)
  return {
    prev: index > 0 ? flatNav[index - 1] : null,
    next: index < flatNav.length - 1 ? flatNav[index + 1] : null,
  }
}

export function getNavItem(href: string) {
  return flatNav.find((item) => item.href === href) ?? null
}

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

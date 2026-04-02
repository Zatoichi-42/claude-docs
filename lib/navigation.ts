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
      "Install Claude Code, authenticate, tune your terminal, and bootstrap your first project session.",
    items: [
      {
        title: "First-Time Setup",
        href: "/getting-started",
        description:
          "Install Claude Code, sign in, set up the terminal workflow, add the VS Code extension, and bootstrap a repo.",
        part: "Part 1",
      },
    ],
  },
  {
    title: "Configuration",
    description:
      "Set repo-level rules, hooks, permissions, and starter files so the team works from the same playbook.",
    items: [
      {
        title: "Project Setup",
        href: "/configuration",
        description:
          "Configure CLAUDE.md, settings, hooks, rules, skills, agents, and plugins exactly as documented.",
        part: "Part 2",
      },
      {
        title: "Hooks & Events",
        href: "/configuration/hooks",
        description:
          "Reference the major hook lifecycle events, handler types, exit semantics, and enforcement patterns.",
        part: "Expanded",
      },
      {
        title: "Team Lead Guide",
        href: "/configuration/team-leads",
        description:
          "A team-lead framing of the same setup work, including rollout checklists and policy guidance.",
        part: "Part 2",
      },
    ],
  },
  {
    title: "Workflows",
    description:
      "Operate Claude Code day to day, then scale up to migration work, agent teams, recurring loops, and review passes.",
    items: [
      {
        title: "Daily Workflow",
        href: "/workflows/daily",
        description:
          "Starting sessions, the six-step loop, quick tasks, debugging, context management, remote control, and effort modes.",
        part: "Part 3",
      },
      {
        title: "Scaling Workflows",
        href: "/workflows/scaling",
        description:
          "Use /batch, Agent Teams, /loop, and /simplify for larger coordinated work.",
        part: "Part 4",
      },
      {
        title: "Adoption Roadmap",
        href: "/workflows/adoption",
        description:
          "Adopt Claude Code in layers: foundation, verification, productivity, scale, and continuous improvement.",
        part: "Expanded",
      },
    ],
  },
  {
    title: "Advanced",
    description:
      "Run Claude headlessly in CI/CD, gate risky operations with defer, and understand the Superpowers plugin workflow.",
    items: [
      {
        title: "CI/CD Integration",
        href: "/advanced/ci-cd",
        description:
          "Headless mode, human-in-the-loop deferrals, PR-linked sessions, and structured automation patterns.",
        part: "Part 5",
      },
      {
        title: "Superpowers Plugin",
        href: "/advanced/superpowers",
        description:
          "Install Superpowers, understand auto-invocation, and learn what it enforces.",
        part: "Part 6",
      },
    ],
  },
  {
    title: "Reference",
    description:
      "Keep the command surface area, keyboard shortcuts, and troubleshooting answers close at hand.",
    items: [
      {
        title: "Command Quick Reference",
        href: "/reference/commands",
        description:
          "Permission modes, session commands, development commands, project utilities, plugins, CLI flags, and shortcuts.",
        part: "Part 7",
      },
      {
        title: "Glossary",
        href: "/reference/glossary",
        description:
          "A working glossary for Claude Code, hooks, context, Remote Control, Superpowers, and related workflow terms.",
        part: "Expanded",
      },
      {
        title: "Release Changes",
        href: "/reference/changelog",
        description:
          "March-April 2026 changes, corrections to the original guide, and the additions that matter most in practice.",
        part: "Expanded",
      },
      {
        title: "Troubleshooting",
        href: "/reference/troubleshooting",
        description:
          "Common problems and the documented fixes for hooks, context, permissions, plugins, and performance.",
        part: "Part 8",
      },
    ],
  },
  {
    title: "Tutorials",
    description:
      "Follow guided walkthroughs that turn the reference material into concrete practice inside real sessions.",
    items: [
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
        title: "VS Code Integration",
        href: "/tutorials/vscode",
        description:
          "Use the extension for inline diffs, file mentions, and plan review without losing terminal context.",
        part: "Tutorial",
        duration: "10 min",
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

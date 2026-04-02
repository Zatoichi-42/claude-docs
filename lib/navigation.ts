export interface NavItem {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "First-Time Setup", href: "/getting-started" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { title: "Project Setup", href: "/configuration" },
      { title: "Team Lead Guide", href: "/configuration/team-leads" },
    ],
  },
  {
    title: "Workflows",
    items: [
      { title: "Daily Workflow", href: "/workflows/daily" },
      { title: "Scaling Workflows", href: "/workflows/scaling" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "CI/CD Integration", href: "/advanced/ci-cd" },
      { title: "Superpowers Plugin", href: "/advanced/superpowers" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Command Quick Reference", href: "/reference/commands" },
      { title: "Troubleshooting", href: "/reference/troubleshooting" },
    ],
  },
  {
    title: "Tutorials",
    items: [
      { title: "Your First Feature", href: "/tutorials/first-feature" },
      { title: "The Six-Step Loop", href: "/tutorials/six-step-loop" },
      { title: "VS Code Integration", href: "/tutorials/vscode" },
    ],
  },
]

export const flatNav: NavItem[] = navigation.flatMap((group) => group.items)

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

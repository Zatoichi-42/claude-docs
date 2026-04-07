export const NAV_SECTIONS = [
  { label: 'Getting Started', items: [
    { slug: 'getting-started', title: 'First-Time Setup' },
  ]},
  { label: 'Tutorials', items: [
    { slug: 'tutorials/core-commands', title: 'Core Session Commands' },
    { slug: 'tutorials/first-feature', title: 'Your First Feature' },
    { slug: 'tutorials/six-step-loop', title: 'The Six-Step Loop' },
    { slug: 'tutorials/todo-and-tasks', title: 'TODO Lists & Tasks', badge: 'new' },
    { slug: 'tutorials/review-debug', title: 'Review & Debug Commands' },
    { slug: 'tutorials/context-mastery', title: 'Context Mastery', badge: 'new' },
    { slug: 'tutorials/skills', title: 'Using Skills' },
    { slug: 'tutorials/first-hook', title: 'Your First Hook' },
    { slug: 'tutorials/vscode', title: 'VS Code & IDE Integration', badge: 'updated' },
    { slug: 'tutorials/mcp', title: 'Using MCP Tools' },
    { slug: 'tutorials/company-mcp', title: 'Company MCP Servers', badge: 'new' },
  ]},
  { label: 'Workflows', items: [
    { slug: 'workflows/daily', title: 'Daily Workflow' },
    { slug: 'workflows/feature', title: 'Feature Workflow', badge: 'new' },
    { slug: 'workflows/ratchet', title: 'The Ratchet Pattern', badge: 'new' },
  ]},
  { label: 'Production Setup', items: [
    { slug: 'tutorials/global-setup', title: 'Production Setup Tutorial', badge: 'new' },
    { slug: 'tutorials/project-setup', title: 'Download & Install', badge: 'updated' },
  ]},
  { label: 'Reference', items: [
    { slug: 'reference/commands', title: 'Command Quick Reference', badge: 'updated' },
    { slug: 'reference/best-links', title: 'Best Links', badge: 'updated' },
    { slug: 'reference/faq', title: 'FAQ', badge: 'updated' },
    { slug: 'reference/glossary', title: 'Glossary', badge: 'updated' },
    { slug: 'reference/troubleshooting', title: 'Troubleshooting' },
    { slug: 'reference/changelog', title: 'Release Changes', badge: 'updated' },
  ]},
  { label: 'Advanced', items: [
    { slug: 'advanced/hooks', title: 'Hooks & Events' },
    { slug: 'advanced/scaling', title: 'Scaling Workflows' },
    { slug: 'advanced/ci-cd', title: 'CI/CD Integration' },
    { slug: 'advanced/superpowers', title: 'Superpowers Plugin' },
  ]},
];

// Flatten for search and lookup
export const ALL_PAGES = NAV_SECTIONS.flatMap(s =>
  s.items.map(i => ({ ...i, section: s.label }))
);

export function getPageBySlug(slug) {
  return ALL_PAGES.find(p => p.slug === slug);
}

export function getAdjacentPages(slug) {
  const idx = ALL_PAGES.findIndex(p => p.slug === slug);
  return {
    prev: idx > 0 ? ALL_PAGES[idx - 1] : null,
    next: idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null,
  };
}

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const docsRoot = path.join(process.cwd(), "app", "(docs)")
const outputPath = path.join(process.cwd(), "public", "search-index.json")

const pages = [
  { title: "First-Time Setup", href: "/getting-started" },
  { title: "Core Session Commands", href: "/tutorials/core-commands" },
  { title: "Your First Feature", href: "/tutorials/first-feature" },
  { title: "The Six-Step Loop", href: "/tutorials/six-step-loop" },
  { title: "Review and Debug Commands", href: "/tutorials/review-debug" },
  { title: "Using Skills", href: "/tutorials/skills" },
  { title: "Using MCP Tools", href: "/tutorials/mcp" },
  { title: "Your First Hook", href: "/tutorials/first-hook" },
  { title: "Build the Full Project Setup", href: "/tutorials/project-setup" },
  { title: "Build an Advanced Hook Stack", href: "/tutorials/advanced-hooks" },
  { title: "VS Code Integration", href: "/tutorials/vscode" },
  { title: "Daily Workflow", href: "/workflows/daily" },
  { title: "Project Setup", href: "/configuration" },
  { title: "Team Leader Setup", href: "/configuration/team-leads" },
  { title: "Adoption Roadmap", href: "/workflows/adoption" },
  { title: "Command Quick Reference", href: "/reference/commands" },
  { title: "Best Links", href: "/reference/best-links" },
  { title: "FAQ", href: "/reference/faq" },
  { title: "Glossary", href: "/reference/glossary" },
  { title: "Troubleshooting", href: "/reference/troubleshooting" },
  { title: "Release Changes", href: "/reference/changelog" },
  { title: "Hooks & Events", href: "/configuration/hooks" },
  { title: "Scaling Workflows", href: "/workflows/scaling" },
  { title: "CI/CD Integration", href: "/advanced/ci-cd" },
  { title: "Superpowers Plugin", href: "/advanced/superpowers" },
]

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function stripMdx(source) {
  return source
    .replace(/^import .*$/gm, "")
    .replace(/export const metadata = \{[\s\S]*?\n\}/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/`{3}[\s\S]*?`{3}/g, (match) =>
      match.replace(/`{3}[^\n]*\n?|\n?`{3}/g, "")
    )
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function buildSectionEntries(href, source, title) {
  const headingPattern = /^(##|###)\s+(.+)$/gm
  const matches = [...source.matchAll(headingPattern)]

  return matches.map((current, index) => {
    const next = matches[index + 1]
    const sectionTitle = current[2].trim()
    const sectionStart = current.index ?? 0
    const sectionEnd = next?.index ?? source.length

    return {
      title,
      href: `${href}#${slugify(sectionTitle)}`,
      section: sectionTitle,
      content: stripMdx(source.slice(sectionStart, sectionEnd)),
      type: "section",
    }
  })
}

async function main() {
  const entries = []

  for (const page of pages) {
    const segments = page.href.replace(/^\//, "").split("/")
    const filePath = path.join(docsRoot, ...segments, "content.mdx")
    const source = await readFile(filePath, "utf8")

    entries.push({
      title: page.title,
      href: page.href,
      content: stripMdx(source),
      type: "page",
    })

    entries.push(...buildSectionEntries(page.href, source, page.title))
  }

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, JSON.stringify(entries, null, 2))
  console.log(`Built search index with ${entries.length} entries`)
}

await main()

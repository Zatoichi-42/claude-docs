import { createWriteStream } from "node:fs"
import { cp, mkdir, rm, stat } from "node:fs/promises"
import path from "node:path"

import archiver from "archiver"

const root = process.cwd()
const sourceRoot = path.join(root, "content", "downloads")
const outputRoot = path.join(root, "public", "downloads")
const filesRoot = path.join(outputRoot, "files")

const zipMappings = [
  { source: "CLAUDE.md.template", target: "CLAUDE.md.template" },
  { source: "CLAUDE.advanced-hooks.md", target: "CLAUDE.advanced-hooks.md" },
  { source: "gitignore.append", target: "gitignore.append" },
  { source: "settings.json", target: ".claude/settings.json" },
  {
    source: "settings.advanced-hooks.json",
    target: ".claude/settings.advanced-hooks.json",
  },
  { source: "hooks/block-dangerous.sh", target: ".claude/hooks/block-dangerous.sh" },
  {
    source: "hooks/require-test-first.sh",
    target: ".claude/hooks/require-test-first.sh",
  },
  { source: "hooks/auto-format.sh", target: ".claude/hooks/auto-format.sh" },
  {
    source: "hooks/run-related-tests.sh",
    target: ".claude/hooks/run-related-tests.sh",
  },
  {
    source: "hooks/defer-production-ops.sh",
    target: ".claude/hooks/defer-production-ops.sh",
  },
  { source: "hooks/hooklib.sh", target: ".claude/hooks/hooklib.sh" },
  { source: "hooks/session-start.sh", target: ".claude/hooks/session-start.sh" },
  {
    source: "hooks/pre-tool-use-guard.sh",
    target: ".claude/hooks/pre-tool-use-guard.sh",
  },
  {
    source: "hooks/post-tool-use-audit.sh",
    target: ".claude/hooks/post-tool-use-audit.sh",
  },
  { source: "hooks/stop-guard.sh", target: ".claude/hooks/stop-guard.sh" },
  { source: "rules/frontend-testing.md", target: ".claude/rules/frontend-testing.md" },
  { source: "rules/backend-testing.md", target: ".claude/rules/backend-testing.md" },
  {
    source: "skills/test-forward/SKILL.md",
    target: ".claude/skills/test-forward/SKILL.md",
  },
  {
    source: "agents/code-reviewer.md",
    target: ".claude/agents/code-reviewer.md",
  },
  { source: "advanced-hooks/README.md", target: "advanced-hooks/README.md" },
  { source: "state/.gitkeep", target: ".claude/state/.gitkeep" },
]

const bundleDefinitions = [
  {
    filename: "starter-kit.zip",
    files: zipMappings,
  },
  {
    filename: "foundation-pack.zip",
    files: [
      { source: "CLAUDE.md.template", target: "CLAUDE.md.template" },
      { source: "gitignore.append", target: "gitignore.append" },
      { source: "settings.json", target: ".claude/settings.json" },
    ],
  },
  {
    filename: "verification-pack.zip",
    files: [
      { source: "CLAUDE.advanced-hooks.md", target: "CLAUDE.advanced-hooks.md" },
      {
        source: "settings.advanced-hooks.json",
        target: ".claude/settings.advanced-hooks.json",
      },
      { source: "hooks/block-dangerous.sh", target: ".claude/hooks/block-dangerous.sh" },
      {
        source: "hooks/require-test-first.sh",
        target: ".claude/hooks/require-test-first.sh",
      },
      { source: "hooks/auto-format.sh", target: ".claude/hooks/auto-format.sh" },
      {
        source: "hooks/run-related-tests.sh",
        target: ".claude/hooks/run-related-tests.sh",
      },
      { source: "hooks/hooklib.sh", target: ".claude/hooks/hooklib.sh" },
      { source: "hooks/session-start.sh", target: ".claude/hooks/session-start.sh" },
      {
        source: "hooks/pre-tool-use-guard.sh",
        target: ".claude/hooks/pre-tool-use-guard.sh",
      },
      {
        source: "hooks/post-tool-use-audit.sh",
        target: ".claude/hooks/post-tool-use-audit.sh",
      },
      { source: "hooks/stop-guard.sh", target: ".claude/hooks/stop-guard.sh" },
      { source: "rules/frontend-testing.md", target: ".claude/rules/frontend-testing.md" },
      { source: "rules/backend-testing.md", target: ".claude/rules/backend-testing.md" },
      {
        source: "skills/test-forward/SKILL.md",
        target: ".claude/skills/test-forward/SKILL.md",
      },
      { source: "advanced-hooks/README.md", target: "advanced-hooks/README.md" },
      { source: "state/.gitkeep", target: ".claude/state/.gitkeep" },
    ],
  },
  {
    filename: "ci-cd-pack.zip",
    files: [
      { source: "settings.json", target: ".claude/settings.json" },
      {
        source: "settings.advanced-hooks.json",
        target: ".claude/settings.advanced-hooks.json",
      },
      { source: "CLAUDE.advanced-hooks.md", target: "CLAUDE.advanced-hooks.md" },
      { source: "hooks/block-dangerous.sh", target: ".claude/hooks/block-dangerous.sh" },
      { source: "hooks/auto-format.sh", target: ".claude/hooks/auto-format.sh" },
      {
        source: "hooks/run-related-tests.sh",
        target: ".claude/hooks/run-related-tests.sh",
      },
      {
        source: "hooks/defer-production-ops.sh",
        target: ".claude/hooks/defer-production-ops.sh",
      },
      { source: "hooks/hooklib.sh", target: ".claude/hooks/hooklib.sh" },
      { source: "hooks/session-start.sh", target: ".claude/hooks/session-start.sh" },
      {
        source: "hooks/pre-tool-use-guard.sh",
        target: ".claude/hooks/pre-tool-use-guard.sh",
      },
      {
        source: "hooks/post-tool-use-audit.sh",
        target: ".claude/hooks/post-tool-use-audit.sh",
      },
      { source: "hooks/stop-guard.sh", target: ".claude/hooks/stop-guard.sh" },
      { source: "advanced-hooks/README.md", target: "advanced-hooks/README.md" },
    ],
  },
  {
    filename: "advanced-hooks-pack.zip",
    files: [
      { source: "CLAUDE.advanced-hooks.md", target: "CLAUDE.advanced-hooks.md" },
      {
        source: "settings.advanced-hooks.json",
        target: ".claude/settings.advanced-hooks.json",
      },
      { source: "hooks/hooklib.sh", target: ".claude/hooks/hooklib.sh" },
      { source: "hooks/session-start.sh", target: ".claude/hooks/session-start.sh" },
      {
        source: "hooks/pre-tool-use-guard.sh",
        target: ".claude/hooks/pre-tool-use-guard.sh",
      },
      {
        source: "hooks/post-tool-use-audit.sh",
        target: ".claude/hooks/post-tool-use-audit.sh",
      },
      { source: "hooks/stop-guard.sh", target: ".claude/hooks/stop-guard.sh" },
      { source: "advanced-hooks/README.md", target: "README.md" },
      { source: "state/.gitkeep", target: ".claude/state/.gitkeep" },
    ],
  },
]

async function buildZip(filename, mappings) {
  const zipPath = path.join(outputRoot, filename)
  const output = createWriteStream(zipPath)
  const archive = archiver("zip", { zlib: { level: 9 } })

  const completion = new Promise((resolve, reject) => {
    output.on("close", () => resolve())
    archive.on("error", reject)
  })

  archive.pipe(output)

  for (const mapping of mappings) {
    const absoluteSource = path.join(sourceRoot, mapping.source)
    const fileStats = await stat(absoluteSource)
    archive.file(absoluteSource, {
      name: mapping.target,
      mode: fileStats.mode,
    })
  }

  await archive.finalize()
  await completion
}

async function main() {
  await rm(outputRoot, { recursive: true, force: true })
  await mkdir(filesRoot, { recursive: true })
  await cp(sourceRoot, filesRoot, { recursive: true })
  for (const bundle of bundleDefinitions) {
    await buildZip(bundle.filename, bundle.files)
  }
  console.log(`Built downloads into ${outputRoot}`)
}

await main()

# Claude Code Docs Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build a C9PG-branded instructional website for Claude Code, deployed on Vercel at claude.c9pg.com

**Architecture:** Next.js 15 App Router with MDX content pages, shadcn/ui components, Tailwind CSS v4 dark/light theme, client-side FlexSearch via Cmd+K palette, downloadable config files with a starter kit zip

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, next/mdx, Shiki, FlexSearch, next-themes, rehype-slug, rehype-autolink-headings, remark-gfm

---

## Phase 1: Project Scaffold + Layout + Navigation

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Create Next.js project**

Run in `/home/zorrik/Projects/client-c9pg/claude-docs`:

```bash
pnpm create next-app@latest . --yes
```

This creates the project with TypeScript, Tailwind CSS, ESLint, App Router, and src/ directory using defaults.

- [ ] **Step 2: Verify the scaffold runs**

```bash
pnpm dev
```

Expected: Dev server starts on localhost:3000, default Next.js page renders.

- [ ] **Step 3: Commit scaffold**

```bash
git add -A
git commit -m "chore: initialize Next.js 15 project with TypeScript and Tailwind"
```

---

### Task 2: Install MDX Support

**Files:**
- Modify: `next.config.mjs`
- Create: `src/mdx-components.tsx`

- [ ] **Step 1: Install MDX packages**

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
pnpm add remark-gfm rehype-slug rehype-autolink-headings
```

- [ ] **Step 2: Configure next.config.mjs for MDX**

Replace the contents of `next.config.mjs`:

```js
import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
  },
})

export default withMDX(nextConfig)
```

- [ ] **Step 3: Create mdx-components.tsx**

Create `src/mdx-components.tsx`:

```tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(): MDXComponents {
  return {}
}
```

- [ ] **Step 4: Verify MDX works**

Create a test file `src/app/test-mdx/page.mdx` with a heading, bold text, list, and fenced code block. Visit localhost:3000/test-mdx. Expected: rendered markdown.

- [ ] **Step 5: Delete test page and commit**

```bash
rm -rf src/app/test-mdx
git add -A
git commit -m "feat: add MDX support with remark-gfm, rehype-slug, rehype-autolink-headings"
```

---

### Task 3: Install and Configure shadcn/ui with Dark Mode

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/components/theme-provider.tsx`, `src/components/theme-toggle.tsx`, `components.json`

- [ ] **Step 1: Initialize shadcn/ui**

```bash
pnpm dlx shadcn@latest init
```

Accept defaults. This creates `components.json` and configures the project.

- [ ] **Step 2: Install next-themes and shadcn button**

```bash
pnpm add next-themes
pnpm dlx shadcn@latest add button
```

- [ ] **Step 3: Create theme provider**

Create `src/components/theme-provider.tsx`:

```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- [ ] **Step 4: Create theme toggle component**

Create `src/components/theme-toggle.tsx`:

```tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

- [ ] **Step 5: Update root layout with theme provider**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Claude Code Docs - C9PG",
    default: "Claude Code Docs - C9PG",
  },
  description: "Learn how to use Claude Code - the AI-powered CLI for software development.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Set C9PG brand colors in globals.css**

Update the `--primary` CSS variable in both `:root` (light) and `.dark` sections to map to indigo #6366f1 (oklch equivalent).

- [ ] **Step 7: Verify dark mode toggle works**

Update `src/app/page.tsx` temporarily with a heading and the ThemeToggle. Run pnpm dev, click toggle. Expected: page switches between dark and light.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add shadcn/ui with dark/light theme toggle and C9PG brand colors"
```

---

### Task 4: Define Navigation Data Structure

**Files:**
- Create: `src/lib/navigation.ts`

- [ ] **Step 1: Create navigation definition**

Create `src/lib/navigation.ts` with:

```ts
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
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/navigation.ts
git commit -m "feat: add navigation data structure with prev/next helpers"
```

---

### Task 5: Build Sidebar Navigation Component

**Files:**
- Create: `src/components/sidebar-nav.tsx`

- [ ] **Step 1: Install shadcn sheet and scroll-area**

```bash
pnpm dlx shadcn@latest add sheet scroll-area
```

- [ ] **Step 2: Create sidebar component**

Create `src/components/sidebar-nav.tsx` with:
- `NavContent` inner component: renders navigation groups with active link highlighting using `usePathname()`
- `SidebarNav` component: desktop sidebar (hidden on mobile), sticky, 64px wide
- `MobileSidebar` component: uses shadcn Sheet, hamburger Menu icon trigger, renders NavContent in slide-out drawer

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add sidebar navigation with mobile drawer"
```

---

### Task 6: Build Site Header

**Files:**
- Create: `src/components/site-header.tsx`
- Copy: C9PG logo to `public/images/logo.png`

- [ ] **Step 1: Copy logo from parent project**

```bash
mkdir -p public/images
cp /home/zorrik/Projects/client-c9pg/public/images/logo.png public/images/logo.png
```

- [ ] **Step 2: Create site header**

Create `src/components/site-header.tsx` with:
- Sticky header with backdrop blur
- C9PG logo (Image component) + "Claude Code Docs" text
- MobileSidebar hamburger (visible on mobile only)
- ThemeToggle on the right

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add site header with C9PG logo and theme toggle"
```

---

### Task 7: Build Chapter Navigation (Prev/Next)

**Files:**
- Create: `src/components/chapter-nav.tsx`

- [ ] **Step 1: Create chapter nav**

Create `src/components/chapter-nav.tsx`:
- Takes `currentPath` prop
- Uses `getChapterNav()` to get prev/next
- Renders links with ChevronLeft/ChevronRight icons
- Border-top separator

- [ ] **Step 2: Commit**

```bash
git add src/components/chapter-nav.tsx
git commit -m "feat: add previous/next chapter navigation component"
```

---

### Task 8: Build Docs Layout with Three-Column Grid

**Files:**
- Create: `src/app/(docs)/layout.tsx`, `src/components/table-of-contents.tsx`

- [ ] **Step 1: Install Tailwind typography plugin**

```bash
pnpm add @tailwindcss/typography
```

Add `@plugin "@tailwindcss/typography";` to `src/app/globals.css`.

- [ ] **Step 2: Create table of contents component**

Create `src/components/table-of-contents.tsx`:
- Client component that reads h2/h3 elements from the article on mount
- Uses IntersectionObserver to highlight current section
- Renders "On this page" heading with anchor links
- h3 entries indented with pl-4

- [ ] **Step 3: Create docs layout**

Create `src/app/(docs)/layout.tsx`:
- SiteHeader at top
- Flex container: SidebarNav (hidden mobile) | main content with prose classes | TableOfContents (hidden below lg)
- Main content wrapped in `<article>` with Tailwind typography prose classes including dark:prose-invert

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add three-column docs layout with table of contents"
```

---

### Task 9: Create Stub MDX Pages for All Routes

**Files:**
- Create: 12 stub page.mdx files + 1 tutorials/page.tsx

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p src/app/'(docs)'/getting-started
mkdir -p src/app/'(docs)'/configuration/team-leads
mkdir -p src/app/'(docs)'/workflows/daily
mkdir -p src/app/'(docs)'/workflows/scaling
mkdir -p src/app/'(docs)'/advanced/ci-cd
mkdir -p src/app/'(docs)'/advanced/superpowers
mkdir -p src/app/'(docs)'/reference/commands
mkdir -p src/app/'(docs)'/reference/troubleshooting
mkdir -p src/app/'(docs)'/tutorials/first-feature
mkdir -p src/app/'(docs)'/tutorials/six-step-loop
mkdir -p src/app/'(docs)'/tutorials/vscode
```

- [ ] **Step 2: Create stub MDX pages**

Each stub exports metadata (title + description) and renders an h1 + "Content coming soon."

| File | Title |
|------|-------|
| `(docs)/getting-started/page.mdx` | First-Time Setup |
| `(docs)/configuration/page.mdx` | Project Configuration |
| `(docs)/configuration/team-leads/page.mdx` | Team Lead Guide |
| `(docs)/workflows/daily/page.mdx` | Daily Workflow |
| `(docs)/workflows/scaling/page.mdx` | Scaling Workflows |
| `(docs)/advanced/ci-cd/page.mdx` | CI/CD Integration |
| `(docs)/advanced/superpowers/page.mdx` | Superpowers Plugin |
| `(docs)/reference/commands/page.mdx` | Command Quick Reference |
| `(docs)/reference/troubleshooting/page.mdx` | Troubleshooting |
| `(docs)/tutorials/first-feature/page.mdx` | Your First Feature |
| `(docs)/tutorials/six-step-loop/page.mdx` | The Six-Step Loop |
| `(docs)/tutorials/vscode/page.mdx` | VS Code Integration |

- [ ] **Step 3: Create tutorials index page**

Create `src/app/(docs)/tutorials/page.tsx` as a card grid linking to the 3 tutorials with title, description, and duration.

- [ ] **Step 4: Verify all routes render**

Run pnpm dev and check every URL renders with sidebar, heading, and ToC.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add all route stubs with docs layout"
```

---

### Task 10: Create Homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create homepage**

Replace `src/app/page.tsx` with:
- SiteHeader
- Hero section: C9PG logo, "Learn Claude Code" h1, tagline, "Get Started" link button, version badge
- 6 section cards in a responsive grid (Getting Started, Configuration, Workflows, Advanced, Reference, Tutorials)
- Footer with link to c9pg.com

- [ ] **Step 2: Verify homepage renders**

Run pnpm dev, visit localhost:3000. Expected: hero, cards, footer, dark theme, toggle works.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add homepage with hero, section cards, and footer"
```

---

### Task 11: Build Verification

- [ ] **Step 1: Run production build**

```bash
pnpm build
```

Expected: Build succeeds, all routes statically generated.

- [ ] **Step 2: Test production server**

```bash
pnpm start
```

Spot-check: homepage, sidebar nav, theme toggle, all stub pages, prev/next.

- [ ] **Step 3: Push**

```bash
git push -u origin main
```

---

## Phase 2: Interactive Components

### Task 12: Build CodeBlock with Copy-to-Clipboard

**Files:**
- Create: `src/components/code-block.tsx`
- Modify: `src/mdx-components.tsx`

- [ ] **Step 1: Install Shiki**

```bash
pnpm add shiki
```

- [ ] **Step 2: Create CodeBlock component**

Create `src/components/code-block.tsx`:
- Client component with copy state
- Extracts language from className (language-bash etc)
- Copy button pinned top-right, visible on hover (group-hover)
- Shows Check icon for 2 seconds after copy
- Horizontal overflow scroll
- Optional filename prop rendered as a tab header

- [ ] **Step 3: Wire into MDX components**

Update `src/mdx-components.tsx` to override `pre` element: extract the inner `code` element's children and className, pass to CodeBlock.

- [ ] **Step 4: Verify**

Add a code block to getting-started/page.mdx. Visit the page, hover code block, click copy. Expected: text copied to clipboard, checkmark shown.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add CodeBlock component with copy-to-clipboard in MDX"
```

---

### Task 13: Build FileDownload Component

**Files:**
- Create: `src/components/file-download.tsx`
- Modify: `src/mdx-components.tsx`

- [ ] **Step 1: Create component**

Create `src/components/file-download.tsx`:
- Props: filename, path, optional label
- Renders anchor tag with download attribute pointing to `/downloads/{path}`
- Download icon + filename text
- Styled as inline button with border

- [ ] **Step 2: Register in mdx-components.tsx**

Add FileDownload to the useMDXComponents return so it's available as `<FileDownload>` in MDX.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add FileDownload component for inline download buttons"
```

---

### Task 14: Build StarterKit Component

**Files:**
- Create: `src/components/starter-kit.tsx`
- Modify: `src/mdx-components.tsx`

- [ ] **Step 1: Create component**

Create `src/components/starter-kit.tsx`:
- Dashed border card with primary accent background
- Package icon, "Claude Code Starter Kit" heading, description
- Download button linking to `/downloads/starter-kit.zip`

- [ ] **Step 2: Register in mdx-components.tsx**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add StarterKit download CTA component"
```

---

### Task 15: Create Downloadable Files and Build Script

**Files:**
- Create: `content/downloads/` with all config files from cc-detailed-instructions.md
- Create: `scripts/build-downloads.ts`
- Modify: `package.json`

- [ ] **Step 1: Create content/downloads directory**

```bash
mkdir -p content/downloads/hooks content/downloads/rules content/downloads/skills/test-forward content/downloads/agents content/downloads/state
```

- [ ] **Step 2: Create all downloadable files**

Copy exact contents from cc-detailed-instructions.md sections 2.1-2.8:
- `content/downloads/settings.json` (section 2.3)
- `content/downloads/hooks/block-dangerous.sh` (section 2.4)
- `content/downloads/hooks/require-test-first.sh` (section 2.4)
- `content/downloads/hooks/auto-format.sh` (section 2.4)
- `content/downloads/hooks/run-related-tests.sh` (section 2.4)
- `content/downloads/rules/frontend-testing.md` (section 2.5)
- `content/downloads/rules/backend-testing.md` (section 2.5)
- `content/downloads/skills/test-forward/SKILL.md` (section 2.6)
- `content/downloads/agents/code-reviewer.md` (section 2.7)
- `content/downloads/CLAUDE.md.template` (section 2.1)
- `content/downloads/gitignore.append` (section 2.8)
- `content/downloads/state/.gitkeep` (empty)

Make hooks executable: `chmod +x content/downloads/hooks/*.sh`

- [ ] **Step 3: Install archiver**

```bash
pnpm add -D archiver @types/archiver
```

- [ ] **Step 4: Create build script**

Create `scripts/build-downloads.ts`:
- Reads `content/downloads/` recursively
- Copies all files to `public/downloads/` for individual downloads
- Creates `public/downloads/starter-kit.zip` with proper `.claude/` directory structure
- Uses archiver package for zip creation

- [ ] **Step 5: Add to package.json**

```json
"build:downloads": "npx tsx scripts/build-downloads.ts",
"prebuild": "npm run build:downloads"
```

- [ ] **Step 6: Add public/downloads to .gitignore**

- [ ] **Step 7: Verify**

```bash
pnpm build:downloads
ls public/downloads/starter-kit.zip
```

Expected: zip exists, individual files present.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add downloadable config files and starter kit zip build script"
```

---

## Phase 3: Content Pages

### Task 16: Getting Started (Part 1)

**Modify:** `src/app/(docs)/getting-started/page.mdx`

- [ ] Convert Part 1 (sections 1.1-1.5) to MDX. Cover: install, authenticate, terminal setup, VS Code extension, bootstrap. Every code block gets copy button automatically. Add ChapterNav at bottom.

- [ ] Verify and commit: `git commit -m "content: add Getting Started page (Part 1)"`

### Task 17: Configuration (Part 2)

**Modify:** `src/app/(docs)/configuration/page.mdx`

- [ ] Convert Part 2 (sections 2.1-2.9) to MDX. Include FileDownload for each config file and StarterKit CTA. Cross-link to Team Lead Guide.

- [ ] Verify and commit: `git commit -m "content: add Configuration page (Part 2)"`

### Task 18: Team Lead Guide

**Modify:** `src/app/(docs)/configuration/team-leads/page.mdx`

- [ ] Reframe Part 2 as team lead best practices: CLAUDE.md writing, hook strategy, permission tuning, scoped rules, plugin recommendations, onboarding checklist. Prominent StarterKit CTA.

- [ ] Verify and commit: `git commit -m "content: add Team Lead Guide"`

### Task 19: Daily Workflow (Part 3)

**Modify:** `src/app/(docs)/workflows/daily/page.mdx`

- [ ] Convert Part 3 (sections 3.1-3.8). Cover: starting features, six-step loop, quick tasks, debugging, context management, multi-session, remote control, speed/effort toggles.

- [ ] Verify and commit: `git commit -m "content: add Daily Workflow page (Part 3)"`

### Task 20: Scaling Workflows (Part 4)

**Modify:** `src/app/(docs)/workflows/scaling/page.mdx`

- [ ] Convert Part 4 (sections 4.1-4.4). Cover: /batch, Agent Teams, /loop, /simplify.

- [ ] Verify and commit: `git commit -m "content: add Scaling Workflows page (Part 4)"`

### Task 21: CI/CD Integration (Part 5)

**Modify:** `src/app/(docs)/advanced/ci-cd/page.mdx`

- [ ] Convert Part 5 (sections 5.1-5.3). Cover: headless mode, defer, PR-linked sessions.

- [ ] Verify and commit: `git commit -m "content: add CI/CD Integration page (Part 5)"`

### Task 22: Superpowers Plugin (Part 6)

**Modify:** `src/app/(docs)/advanced/superpowers/page.mdx`

- [ ] Convert Part 6 (sections 6.1-6.4). Cover: installation, auto-invocation, TDD enforcement, deprecated commands.

- [ ] Verify and commit: `git commit -m "content: add Superpowers Plugin page (Part 6)"`

### Task 23: Command Reference (Part 7)

**Modify:** `src/app/(docs)/reference/commands/page.mdx`

- [ ] Convert Part 7. Render all tables: permission modes, session management, development, project, plugin commands, CLI flags, keyboard shortcuts. Tables should scroll horizontally on mobile.

- [ ] Verify and commit: `git commit -m "content: add Command Quick Reference page (Part 7)"`

### Task 24: Troubleshooting (Part 8)

**Modify:** `src/app/(docs)/reference/troubleshooting/page.mdx`

- [ ] Convert Part 8. Problem/Solution table. Consider collapsible details elements.

- [ ] Verify and commit: `git commit -m "content: add Troubleshooting page (Part 8)"`

---

## Phase 4: Tutorials

### Task 25: "Your First Feature" Tutorial

**Modify:** `src/app/(docs)/tutorials/first-feature/page.mdx`

- [ ] Write 8-step tutorial: prerequisites, start session, explore codebase, make feature request, review diff, test change, commit, next steps. Each step shows exact prompt and "What you should see" callout.

- [ ] Verify and commit: `git commit -m "content: add Your First Feature tutorial"`

### Task 26: "Six-Step Loop" Tutorial

**Modify:** `src/app/(docs)/tutorials/six-step-loop/page.mdx`

- [ ] Walk through EXPLORE to SHIP with concrete task (add input validation). Link back to Daily Workflow at each phase.

- [ ] Verify and commit: `git commit -m "content: add Six-Step Loop tutorial"`

### Task 27: "VS Code Integration" Tutorial

**Modify:** `src/app/(docs)/tutorials/vscode/page.mdx`

- [ ] Cover: install extension, inline diffs, file mentions, plan review. Side-by-side terminal vs VS Code.

- [ ] Verify and commit: `git commit -m "content: add VS Code Integration tutorial"`

---

## Phase 5: Search

### Task 28: Build Search Index Script

**Files:**
- Create: `scripts/build-search-index.ts`
- Modify: `package.json`

- [ ] **Step 1: Install FlexSearch**

```bash
pnpm add flexsearch
pnpm add -D @types/flexsearch
```

- [ ] **Step 2: Create build script**

Create `scripts/build-search-index.ts`:
- Walks `src/app/` recursively, handling route groups (parenthesized dirs)
- Parses each page.mdx: extracts title from metadata export or first h1, extracts h2/h3 headings with slugified anchors, strips MDX/JSX markup for body text
- Produces array of `{ title, href, section, content, type }` entries
- Writes to `public/search-index.json`

- [ ] **Step 3: Update prebuild**

```json
"prebuild": "npm run build:downloads && npx tsx scripts/build-search-index.ts"
```

- [ ] **Step 4: Verify**

```bash
npx tsx scripts/build-search-index.ts
```

Expected: `public/search-index.json` with entries for all pages and headings.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add search index build script"
```

---

### Task 29: Build Command Palette

**Files:**
- Create: `src/components/command-palette.tsx`
- Modify: `src/components/site-header.tsx`

- [ ] **Step 1: Install shadcn dialog**

```bash
pnpm dlx shadcn@latest add dialog
```

- [ ] **Step 2: Create command palette**

Create `src/components/command-palette.tsx`:
- Client component with Dialog
- Cmd+K / Ctrl+K keyboard listener
- Lazy-loads search-index.json on first open
- Text input with debounced filtering
- Results grouped and rendered as buttons
- Arrow key navigation + Enter to select
- Full-screen on mobile, centered modal on desktop
- Search trigger button in header: search icon + "Search docs..." + keyboard shortcut badge

- [ ] **Step 3: Add to site header**

Import CommandPalette in site-header.tsx, render between logo and theme toggle.

- [ ] **Step 4: Verify**

Run the search index build, then pnpm dev. Press Cmd+K, type "install", results appear, click navigates.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Cmd+K command palette with client-side search"
```

---

## Phase 6: Polish and Deploy

### Task 30: Mobile Sticky Chapter Nav

**Files:**
- Create: `src/components/mobile-chapter-nav.tsx`
- Modify: `src/app/(docs)/layout.tsx`

- [ ] **Step 1: Create mobile sticky nav**

Client component using usePathname + getChapterNav. Fixed bottom bar, visible only below md breakpoint. Prev/next links with chevron icons, truncated titles.

- [ ] **Step 2: Add to docs layout**

Add MobileChapterNav to layout. Add bottom padding to main content on mobile.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add mobile sticky prev/next chapter navigation"
```

---

### Task 31: SEO and Sitemap

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create sitemap**

Create `src/app/sitemap.ts` using flatNav to generate entries for all pages under `https://claude.c9pg.com`.

- [ ] **Step 2: Add OpenGraph metadata**

Add openGraph object to root layout metadata.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add sitemap and OpenGraph metadata"
```

---

### Task 32: Final Build and Deploy

- [ ] **Step 1: Full build**

```bash
pnpm build
```

Expected: success, all routes rendered.

- [ ] **Step 2: Production test**

```bash
pnpm start
```

Verify: homepage, sidebar, theme, code blocks, downloads, search, mobile layout, cross-links, prev/next.

- [ ] **Step 3: Deploy to Vercel**

```bash
vercel --prod
```

- [ ] **Step 4: Configure claude.c9pg.com domain in Vercel dashboard**

- [ ] **Step 5: Final push**

```bash
git add -A
git commit -m "chore: production build verified"
git push
```

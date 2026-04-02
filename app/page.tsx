import Link from "next/link"
import { ArrowRight, BookOpen, ExternalLink, Sparkles } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { buttonVariants } from "@/components/ui/button-variants"
import { docsHomeSections } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import {
  corePrinciples,
  methodologySteps,
  quickSurfaceLinks,
  repositoryStructure,
} from "@/lib/vibe-data"

export default function Home() {
  return (
    <div className="page-bg min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <section className="glass glow-panel grid gap-10 overflow-hidden rounded-[2rem] px-8 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="max-w-4xl">
            <div className="vibe-badge">
              <Sparkles className="size-3.5" />
              April 2026 · v2.1.89 · Opus 4.6
            </div>
            <h1 className="text-gradient-brand mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Claude Code Vibe Coding for real teams, not just demos.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              This site is organized for real adoption: first-time setup,
              command tutorials, daily workflow, gradual project configuration,
              team rollout, and then the deeper reference material. It is meant
              to teach Claude Code in the order a team can actually absorb it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/getting-started"
                className={cn(buttonVariants({ size: "lg" }), "justify-center")}
              >
                Start with first-time setup
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/tutorials/core-commands"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "justify-center"
                )}
              >
                Follow the guided tutorials
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://docs.anthropic.com/en/release-notes/claude-code"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-center border border-primary/18 bg-primary/8 text-primary hover:bg-primary/12"
                )}
              >
                Latest Claude Code Updates
                <ExternalLink className="size-4" />
              </a>
              <a
                href="https://claudcod.com/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-center border border-border/70 bg-card/60 hover:bg-card"
                )}
              >
                Community News
                <ExternalLink className="size-4" />
              </a>
              <Link
                href="/reference/best-links"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-center border border-border/70 bg-card/60 hover:bg-card"
                )}
              >
                Best Links
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="glass-strong rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                  What this site does
                </p>
                <p className="text-lg font-semibold">Learn first, configure later</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>Beginners start with setup, commands, and daily workflow instead of heavy repo policy.</p>
              <p>Project setup is treated as a capstone that builds on skills, hooks, and workflow habits you already understand.</p>
              <p>Team rollout, reference, and advanced chapters stay available without becoming the on-ramp.</p>
              <p>Starter files and download packs are still here once you are ready to standardize the repo.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {corePrinciples.map((card) => (
            <div key={card.title} className="glass rounded-[1.75rem] p-6">
              <div className="text-2xl">{card.icon}</div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {card.body}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {docsHomeSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="glass group rounded-[1.75rem] p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {section.count} page{section.count > 1 ? "s" : ""}
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {section.description}
              </p>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickSurfaceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass group rounded-[1.75rem] p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{link.icon}</span>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {link.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {link.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Open
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="glass rounded-[2rem] p-8">
          <div className="max-w-3xl">
            <p className="vibe-badge">Methodology</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Explore → Plan → RED → GREEN → Review → Ship
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The site uses Anthropic&apos;s verification-first guidance and the
              Superpowers framing together: no production behavior change until
              a failing verification artifact exists.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            {methodologySteps.map((step, index) => {
              const [phase, ...rest] = step.split("—")

              return (
                <div
                  key={step}
                  className="flex gap-4 border-b border-white/6 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="text-sm leading-7">
                    <span className="font-semibold text-primary">{phase.trim()} — </span>
                    <span className="text-muted-foreground">{rest.join("—").trim()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="glass rounded-[2rem] p-8">
          <p className="vibe-badge">Repository Structure</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            The recommended repo layout is part of the product.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            The downloadable files on this site mirror this structure so teams
            can unpack the code into the right filenames instead of manually
            reconstructing the tree from prose.
          </p>
          <pre className="vibe-code mt-6 overflow-x-auto whitespace-pre-wrap">
            <code>{repositoryStructure}</code>
          </pre>
        </section>

        <footer className="border-t border-border/60 pt-6 text-sm text-muted-foreground">
          Built for deployment on Vercel at{" "}
          <span className="font-medium text-foreground">claude.c9pg.com</span>.
        </footer>
      </main>
    </div>
  )
}

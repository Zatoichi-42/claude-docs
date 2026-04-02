import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { tutorialCards } from "@/lib/navigation"

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Hands-on walkthroughs for core commands, daily workflow, skills, hooks, project setup, and VS Code integration.",
}

export default function TutorialsPage() {
  return (
    <>
      <h1>Tutorials</h1>
      <p>
        These guides are the intended path into the rest of the site. Start
        with commands, practice the daily flow, add skills and a first hook,
        and only then build the shared project setup.
      </p>
      <div className="not-prose mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tutorialCards.map((tutorial) => (
          <Link
            key={tutorial.href}
            href={tutorial.href}
            className="group rounded-[1.75rem] border border-border/60 bg-card/70 p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {tutorial.duration}
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {tutorial.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {tutorial.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Open tutorial
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}

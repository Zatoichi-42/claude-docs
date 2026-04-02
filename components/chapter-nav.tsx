"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

import { getChapterNav } from "@/lib/navigation"

function ChapterLink({
  direction,
  href,
  title,
}: {
  direction: "prev" | "next"
  href: string
  title: string
}) {
  const isPrev = direction === "prev"

  return (
    <Link
      href={href}
      className="glass group flex min-h-24 flex-1 flex-col justify-center rounded-2xl px-4 py-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <span className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {isPrev ? <ChevronLeft className="size-4" /> : null}
        {isPrev ? "Previous" : "Next"}
        {!isPrev ? <ChevronRight className="size-4" /> : null}
      </span>
      <span className="text-sm font-medium leading-6 text-foreground">
        {title}
      </span>
    </Link>
  )
}

export function ChapterNav() {
  const pathname = usePathname()
  const { prev, next } = getChapterNav(pathname)

  if (!prev && !next) {
    return null
  }

  return (
    <nav className="mt-12 border-t border-border/60 pt-8">
      <div className="flex flex-col gap-4 md:flex-row">
        {prev ? (
          <ChapterLink direction="prev" href={prev.href} title={prev.title} />
        ) : (
          <div className="hidden flex-1 md:block" />
        )}
        {next ? (
          <ChapterLink direction="next" href={next.href} title={next.title} />
        ) : (
          <div className="hidden flex-1 md:block" />
        )}
      </div>
    </nav>
  )
}

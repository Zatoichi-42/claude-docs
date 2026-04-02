"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

import { getChapterNav } from "@/lib/navigation"

export function MobileChapterNav() {
  const pathname = usePathname()
  const { prev, next } = getChapterNav(pathname)

  if (!prev && !next) {
    return null
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/8 bg-background/92 px-3 py-3 backdrop-blur xl:hidden">
      <div className="mx-auto flex max-w-5xl gap-2">
        {prev ? (
          <Link
            href={prev.href}
            className="glass flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-3 text-sm"
          >
            <ChevronLeft className="size-4 shrink-0" />
            <span className="truncate">{prev.title}</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={next.href}
            className="glass flex min-w-0 flex-1 items-center justify-end gap-2 rounded-xl px-3 py-3 text-right text-sm"
          >
            <span className="truncate">{next.title}</span>
            <ChevronRight className="size-4 shrink-0" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  )
}

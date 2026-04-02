import Image from "next/image"
import Link from "next/link"

import { CommandPalette } from "@/components/command-palette"
import { MobileSidebar } from "@/components/sidebar-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-background/72 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileSidebar />
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-xl transition-opacity hover:opacity-90"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 shadow-sm">
            <Image
              src="/images/logo.png"
              alt="C9PG"
              width={28}
              height={28}
              className="size-7 object-contain"
              priority
            />
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-tight text-gradient-brand">
              Claude Code Docs
            </div>
            <div className="hidden truncate text-xs text-muted-foreground sm:block">
              C9PG field guide for teams shipping with Claude Code
            </div>
          </div>
        </Link>
        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2">
          <CommandPalette />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

import Link from "next/link"
import { Archive, ArrowDownToLine } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function StarterKit() {
  return (
    <section className="not-prose my-8 rounded-[1.75rem] border border-dashed border-primary/40 bg-primary/8 p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-2xl gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <Archive className="size-6" />
          </span>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Claude Code Starter Kit
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Download the exact settings, hooks, rules, skill, and agent files
              described in the onboarding guide. The zip preserves the expected
              `.claude/` folder layout so the files land in the right place.
            </p>
          </div>
        </div>
        <Link
          href="/downloads/starter-kit.zip"
          className={cn(buttonVariants({ size: "lg" }), "shrink-0")}
        >
          Download starter kit
          <ArrowDownToLine className="size-4" />
        </Link>
      </div>
    </section>
  )
}

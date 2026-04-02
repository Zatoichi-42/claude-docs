import { ArrowDownToLine, FileCode2 } from "lucide-react"

import { cn } from "@/lib/utils"

export function FileDownload({
  filename,
  path,
  label,
  destination,
  className,
}: {
  filename: string
  path: string
  label?: string
  destination?: string
  className?: string
}) {
  const href = path.startsWith("/") ? path : `/downloads/${path}`

  return (
    <a
      href={href}
      download={filename}
      className={cn(
        "not-prose my-4 flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 no-underline transition-colors hover:border-primary/35 hover:bg-primary/5",
        className
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <FileCode2 className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground">
          {label ?? filename}
        </span>
        <span className="block truncate font-mono text-xs text-muted-foreground">
          {destination ?? filename}
        </span>
      </span>
      <ArrowDownToLine className="size-4 shrink-0 text-muted-foreground" />
    </a>
  )
}

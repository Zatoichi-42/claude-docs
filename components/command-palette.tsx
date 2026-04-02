"use client"

import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  startTransition,
} from "react"
import { Search, Sparkles } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Index } from "flexsearch"

import { buttonVariants } from "@/components/ui/button-variants"
import type { SearchEntry } from "@/lib/search"
import { cn } from "@/lib/utils"

const EMPTY_RESULTS: SearchEntry[] = []
const INITIAL_RESULTS = 8
const SEARCH_LIMIT = 12

export function CommandPalette() {
  const pathname = usePathname()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const indexRef = useRef<Index | null>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [entries, setEntries] = useState<SearchEntry[]>([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const deferredQuery = useDeferredValue(query.trim())

  const keyboardHandler = useEffectEvent((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault()
      setOpen((current) => !current)
      return
    }

    if (event.key === "Escape") {
      setOpen(false)
    }
  })

  useEffect(() => {
    window.addEventListener("keydown", keyboardHandler)
    return () => window.removeEventListener("keydown", keyboardHandler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open || loaded || loading) {
      return
    }

    let cancelled = false

    async function loadIndex() {
      setLoading(true)

      try {
        const response = await fetch("/search-index.json")
        const data = response.ok
          ? ((await response.json()) as SearchEntry[])
          : EMPTY_RESULTS

        if (cancelled) {
          return
        }

        const index = new Index({
          tokenize: "forward",
          resolution: 9,
        })

        data.forEach((entry, indexId) => {
          index.add(
            indexId,
            [entry.title, entry.section, entry.content].filter(Boolean).join(" ")
          )
        })

        indexRef.current = index
        setEntries(data)
        setLoaded(true)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadIndex()

    return () => {
      cancelled = true
    }
  }, [loaded, loading, open])

  useEffect(() => {
    if (!open) {
      return
    }

    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [deferredQuery, open])

  const results =
    deferredQuery && indexRef.current
      ? (indexRef.current
          .search(deferredQuery, SEARCH_LIMIT)
          .map((value) => entries[Number(value)])
          .filter(Boolean) as SearchEntry[])
      : entries.slice(0, INITIAL_RESULTS)

  function handleSelect(entry: SearchEntry) {
    setOpen(false)
    setQuery("")
    router.push(entry.href)
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) {
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % results.length)
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + results.length) % results.length)
    }

    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault()
      handleSelect(results[activeIndex])
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "hidden h-10 min-w-0 flex-1 items-center justify-between rounded-2xl px-4 text-sm text-muted-foreground md:flex md:max-w-xl"
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Search className="size-4 shrink-0" />
          <span className="truncate">Search docs, commands, hooks, and workflows...</span>
        </span>
        <kbd className="rounded-md border border-border/70 bg-muted px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Cmd K
        </kbd>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "md:hidden"
        )}
      >
        <Search className="size-4" />
        <span className="sr-only">Search docs</span>
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 py-12 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setOpen(false)}
            aria-label="Close search"
          />
          <div className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl shadow-primary/10">
            <div className="border-b border-border/60 px-4 py-4">
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3">
                <Search className="size-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) =>
                    startTransition(() => setQuery(event.target.value))
                  }
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search commands, hooks, files, and workflow steps..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-3">
              {loading ? (
                <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-6 text-sm text-muted-foreground">
                  Loading search index...
                </div>
              ) : results.length ? (
                <div className="space-y-2">
                  {results.map((entry, index) => (
                    <button
                      key={entry.href}
                      type="button"
                      onClick={() => handleSelect(entry)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                        index === activeIndex
                          ? "border-primary/35 bg-primary/8"
                          : "border-transparent hover:border-border hover:bg-muted/50"
                      )}
                    >
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Sparkles className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground">
                          {entry.title}
                        </span>
                        {entry.section ? (
                          <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            {entry.section}
                          </span>
                        ) : null}
                        <span className="mt-2 block line-clamp-2 text-sm text-muted-foreground">
                          {entry.content}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-6 text-sm text-muted-foreground">
                  No matches yet. Try a command name, a hook filename, or a
                  workflow concept like &quot;compact&quot; or &quot;Plan Mode&quot;.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

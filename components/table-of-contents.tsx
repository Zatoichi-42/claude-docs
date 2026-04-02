"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type Heading = {
  id: string
  text: string
  level: 2 | 3
}

export function TableOfContents() {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const article = document.querySelector("[data-docs-article]")

    if (!article) {
      const clearFrame = window.requestAnimationFrame(() => {
        setHeadings([])
        setActiveId("")
      })
      return () => window.cancelAnimationFrame(clearFrame)
    }

    const elements = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]")
    )

    const nextHeadings = elements.map((element) => ({
      id: element.id,
      text: element.textContent ?? "",
      level: Number(element.tagName.slice(1)) as 2 | 3,
    }))

    const syncFrame = window.requestAnimationFrame(() => {
      setHeadings(nextHeadings)
      setActiveId(nextHeadings[0]?.id ?? "")
    })

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              left.boundingClientRect.top - right.boundingClientRect.top
          )

        if (visibleHeadings[0]?.target.id) {
          setActiveId(visibleHeadings[0].target.id)
        }
      },
      {
        rootMargin: "-96px 0px -65% 0px",
        threshold: [0, 1],
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(syncFrame)
    }
  }, [pathname])

  if (!headings.length) {
    return <aside className="hidden w-64 shrink-0 xl:block" />
  }

  return (
    <aside className="hidden w-64 shrink-0 xl:block">
      <div className="glass sticky top-24 rounded-3xl p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
          On this page
        </p>
        <nav className="mt-4 space-y-1">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm leading-5 transition-colors",
                heading.level === 3 ? "ml-4" : "",
                activeId === heading.id
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

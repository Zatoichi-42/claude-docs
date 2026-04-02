import { ChapterNav } from "@/components/chapter-nav"
import { MobileChapterNav } from "@/components/mobile-chapter-nav"
import { SidebarNav } from "@/components/sidebar-nav"
import { SiteHeader } from "@/components/site-header"
import { TableOfContents } from "@/components/table-of-contents"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="page-bg min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-[1600px] gap-8 px-4 sm:px-6 lg:px-8">
        <SidebarNav />
        <main className="min-w-0 flex-1 pb-28 pt-8 md:pb-16">
          <article
            data-docs-article
            className="glass prose prose-slate max-w-none rounded-[2rem] px-6 py-8 dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-h1:text-4xl prose-h1:tracking-tight prose-h2:mt-12 prose-h2:border-t prose-h2:border-border/60 prose-h2:pt-8 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 prose-strong:text-foreground prose-pre:bg-transparent prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none md:px-8"
          >
            {children}
          </article>
          <ChapterNav />
        </main>
        <TableOfContents />
      </div>
      <MobileChapterNav />
    </div>
  )
}

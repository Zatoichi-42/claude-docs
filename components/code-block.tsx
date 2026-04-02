import { CodeCopyButton } from "@/components/code-copy-button"
import { highlightCode } from "@/lib/shiki"

export async function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string
  language?: string
  filename?: string
}) {
  const html = await highlightCode(code, language)

  return (
    <div className="not-prose my-6 overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/60 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
            {language ?? "text"}
          </span>
          {filename ? (
            <span className="truncate font-mono text-xs text-muted-foreground">
              {filename}
            </span>
          ) : null}
        </div>
        <CodeCopyButton code={code} />
      </div>
      <div className="overflow-x-auto bg-white dark:bg-slate-950">
        <div
          className="[&_.shiki]:!m-0 [&_.shiki]:!rounded-none [&_.shiki]:!bg-transparent [&_.shiki]:px-4 [&_.shiki]:py-4 [&_.shiki]:text-sm [&_.shiki]:leading-7"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

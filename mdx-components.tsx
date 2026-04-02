import type { ComponentPropsWithoutRef, ReactNode } from "react"
import type { MDXComponents } from "mdx/types"
import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { FileDownload } from "@/components/file-download"
import { StarterKit } from "@/components/starter-kit"

function toPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map((child) => toPlainText(child)).join("")
  }

  if (node && typeof node === "object" && "props" in node) {
    return toPlainText((node as { props: { children?: ReactNode } }).props.children)
  }

  return ""
}

const components = {
  a: ({
    href = "",
    ...props
  }: ComponentPropsWithoutRef<"a"> & { href?: string }) => {
    if (href.startsWith("/")) {
      return <Link href={href} {...props} />
    }

    return <a href={href} target="_blank" rel="noreferrer" {...props} />
  },
  code: (props: ComponentPropsWithoutRef<"code">) =>
    props.className ? (
      <code {...props} />
    ) : (
      <code
        className="rounded-md border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
        {...props}
      />
    ),
  pre: ({ children }: ComponentPropsWithoutRef<"pre">) => {
    if (
      children &&
      typeof children === "object" &&
      "props" in children &&
      typeof children.props === "object" &&
      children.props !== null &&
      "children" in children.props
    ) {
      const codeProps = children.props as ComponentPropsWithoutRef<"code">
      const language = codeProps.className?.replace(/^language-/, "")
      const code = toPlainText(codeProps.children).replace(/\n$/, "")
      return <CodeBlock code={code} language={language} />
    }

    return <CodeBlock code={toPlainText(children).replace(/\n$/, "")} />
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-border/60 bg-card/60">
      <table className="m-0 min-w-full text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-border/60 bg-muted/60 px-4 py-3 text-left" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-t border-border/50 px-4 py-3 align-top" {...props} />
  ),
  details: (props: ComponentPropsWithoutRef<"details">) => (
    <details
      className="my-6 rounded-2xl border border-border/70 bg-card/60 p-4"
      {...props}
    />
  ),
  summary: (props: ComponentPropsWithoutRef<"summary">) => (
    <summary className="cursor-pointer text-sm font-semibold" {...props} />
  ),
  FileDownload,
  StarterKit,
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}

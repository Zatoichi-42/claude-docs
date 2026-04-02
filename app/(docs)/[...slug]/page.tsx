import type { ComponentType } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type DocModule = {
  default: ComponentType
  metadata?: Metadata
}

const docPages: Record<string, () => Promise<DocModule>> = {
  "advanced/ci-cd": () => import("../advanced/ci-cd/content.mdx"),
  "advanced/superpowers": () => import("../advanced/superpowers/content.mdx"),
  configuration: () => import("../configuration/content.mdx"),
  "configuration/hooks": () => import("../configuration/hooks/content.mdx"),
  "configuration/team-leads": () => import("../configuration/team-leads/content.mdx"),
  "getting-started": () => import("../getting-started/content.mdx"),
  "reference/changelog": () => import("../reference/changelog/content.mdx"),
  "reference/commands": () => import("../reference/commands/content.mdx"),
  "reference/glossary": () => import("../reference/glossary/content.mdx"),
  "reference/troubleshooting": () => import("../reference/troubleshooting/content.mdx"),
  "tutorials/first-feature": () => import("../tutorials/first-feature/content.mdx"),
  "tutorials/six-step-loop": () => import("../tutorials/six-step-loop/content.mdx"),
  "tutorials/vscode": () => import("../tutorials/vscode/content.mdx"),
  "workflows/adoption": () => import("../workflows/adoption/content.mdx"),
  "workflows/daily": () => import("../workflows/daily/content.mdx"),
  "workflows/scaling": () => import("../workflows/scaling/content.mdx"),
}

function getDocLoader(slug: string[]) {
  return docPages[slug.join("/")]
}

export function generateStaticParams() {
  return Object.keys(docPages).map((key) => ({
    slug: key.split("/"),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const loadDoc = getDocLoader(slug)

  if (!loadDoc) {
    return {}
  }

  const { metadata } = await loadDoc()
  return metadata ?? {}
}

export default async function DocsContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const loadDoc = getDocLoader(slug)

  if (!loadDoc) {
    notFound()
  }

  const { default: Content } = await loadDoc()

  return <Content />
}

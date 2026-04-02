import path from "node:path"
import { fileURLToPath } from "node:url"
import createMDX from '@next/mdx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    root: __dirname,
  },
}

const withMDX = createMDX({
  options: {
    providerImportSource: "@/mdx-components",
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
  },
})

export default withMDX(nextConfig)

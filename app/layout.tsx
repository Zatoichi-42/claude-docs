import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://claude.c9pg.com"),
  title: {
    template: "%s | Claude Code Docs - C9PG",
    default: "Claude Code Docs - C9PG",
  },
  description:
    "Learn how to use Claude Code - the AI-powered CLI for software development.",
  openGraph: {
    title: "Claude Code Docs - C9PG",
    description:
      "The complete onboarding and workflow guide for Claude Code, packaged as a Vercel docs site.",
    siteName: "Claude Code Docs - C9PG",
    type: "website",
    url: "https://claude.c9pg.com",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

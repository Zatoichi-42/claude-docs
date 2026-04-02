import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 px-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Claude Code Docs
        </h1>
        <p className="text-lg text-muted-foreground text-center">
          Learn how to use Claude Code — the AI-powered CLI for software
          development.
        </p>
        <ThemeToggle />
      </main>
    </div>
  )
}

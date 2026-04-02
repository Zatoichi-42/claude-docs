"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { isActivePath, navigation } from "@/lib/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-full">
      <nav className="space-y-6 p-4">
        {navigation.map((group) => (
          <div key={group.title} className="glass rounded-2xl p-3">
            <h4 className="px-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
              {group.title}
            </h4>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm transition-colors",
                    isActivePath(pathname, item.href)
                      ? "bg-primary/18 font-medium text-primary"
                      : "text-muted-foreground hover:bg-white/6 hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </ScrollArea>
  )
}

export function SidebarNav() {
  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)] pt-6">
        <NavContent />
      </div>
    </aside>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" />
        }
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-white/8 bg-background/96 p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <NavContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

import type { MetadataRoute } from "next"

import { flatNav } from "@/lib/navigation"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: "https://claude.c9pg.com",
      lastModified: now,
    },
    {
      url: "https://claude.c9pg.com/tutorials",
      lastModified: now,
    },
    ...flatNav.map((item) => ({
      url: `https://claude.c9pg.com${item.href}`,
      lastModified: now,
    })),
  ]
}

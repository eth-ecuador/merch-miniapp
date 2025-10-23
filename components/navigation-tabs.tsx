"use client"

import { Bookmark, Award } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavigationTabs() {
  const pathname = usePathname()

  return (
    <div className="flex gap-8 mb-6">
      <Link
        href="/colection"
        className={`flex items-center gap-2 font-semibold text-lg transition-colors ${
          pathname === "/colection" ? "text-[#c8ff00]" : "text-white/60"
        }`}
      >
        <Bookmark className="w-6 h-6" fill={pathname === "/colection" ? "#c8ff00" : "none"} />
        <span>My collection</span>
      </Link>
      <Link
        href="/premium"
        className={`flex items-center gap-2 font-semibold text-lg transition-colors ${
          pathname === "/premium" ? "text-[#00d4ff]" : "text-white/60"
        }`}
      >
        <Award className="w-6 h-6" />
        <span>Premium</span>
      </Link>
    </div>
  )
}

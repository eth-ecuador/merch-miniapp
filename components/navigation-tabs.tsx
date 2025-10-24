"use client"

import { Bookmark, Award, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavigationTabs() {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 mb-6">
      <Link
        href="/rango"
        className={`flex items-center gap-2 font-semibold text-lg transition-colors ${
          pathname === "/rango" ? "text-[#ff6b00]" : "text-white/60"
        }`}
      >
        <Award className="w-6 h-6" fill={pathname === "/rango" ? "#ff6b00" : "none"} />
        <span>Rank</span>
      </Link>
      <Link
        href="/premium"
        className={`flex items-center gap-2 font-semibold text-lg transition-colors ${
          pathname === "/premium" ? "text-[#00d4ff]" : "text-white/60"
        }`}
      >
        <Bookmark className="w-6 h-6" fill={pathname === "/premium" ? "#00d4ff" : "none"} />
        <span>Treasury</span>
      </Link>
      <Link
        href="/profile"
        className={`flex items-center gap-2 font-semibold text-lg transition-colors ${
          pathname === "/profile" ? "text-[#c8ff00]" : "text-white/60"
        }`}
      >
        <User className="w-6 h-6" fill={pathname === "/profile" ? "#c8ff00" : "none"} />
        <span>Profile</span>
      </Link>
    </div>
  )
}

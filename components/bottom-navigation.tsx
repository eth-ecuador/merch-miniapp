"use client"

import { Diamond, Store, Square } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface BottomNavigationProps {
  currentPath?: string
}

export function BottomNavigation({ currentPath }: BottomNavigationProps) {
  const pathname = usePathname()
  const activePath = currentPath || pathname

  const isRangoActive = activePath === "/rango"
  const isTiendaActive = activePath === "/tienda"
  const isMerchActive =
    activePath === "/" || activePath === "/colection" || activePath === "/premium" || activePath === "/profile"

  return (
    <div className="flex justify-around items-center pt-4">
      <Link
        href="/rango"
        className={`flex flex-col items-center gap-2 transition-colors ${
          isRangoActive ? "text-white" : "text-[#c8ff00]"
        }`}
      >
        <Diamond className="w-10 h-10" />
        <span className="text-lg font-semibold">Rank</span>
      </Link>

      <Link
        href="/tienda"
        className={`flex flex-col items-center gap-2 transition-colors ${
          isTiendaActive ? "text-white" : "text-[#c8ff00]"
        }`}
      >
        <Store className="w-10 h-10" />
        <span className="text-lg font-semibold">Claim</span>
      </Link>

      <Link
        href="/colection"
        className={`flex flex-col items-center gap-2 transition-colors ${
          isMerchActive ? "text-white" : "text-[#c8ff00]"
        }`}
      >
        <Square className="w-10 h-10" />
        <span className="text-lg font-semibold">Merch</span>
      </Link>
    </div>
  )
}

"use client"

import Link from "next/link"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"

export function ProfileHeader() {
  const { displayName, username, pfpUrl, address, isLoading } = useBaseAccountUser()
  
  const resolvedName = displayName || (username ? `@${username}` : "Anon User")
  const initial = resolvedName.charAt(0).toUpperCase() || "A"

  return (
    <div className="flex items-center gap-4 mb-8">
      <Link href="/profile" className="block">
        <div className="w-24 h-24 bg-[#0000ff] rounded-lg border-4 border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform overflow-hidden">
          {isLoading ? (
            <div className="animate-spin w-10 h-10 border-4 border-white border-t-transparent rounded-full" aria-label="Cargando avatar" />
          ) : pfpUrl ? (
            <img
              src={pfpUrl}
              alt={resolvedName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl font-bold text-white">{initial}</span>
          )}
        </div>
      </Link>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
          {isLoading ? "Cargando..." : resolvedName}
        </h1>
        <p className="text-lg text-white/90 uppercase tracking-wide">
          Merch Newbie
        </p>
        {address && (
          <div className="mt-2 bg-black/30 rounded-md px-2 py-1 border border-[#c8ff00]/30">
            <p className="text-xs text-[#c8ff00] uppercase tracking-wide">Base Account</p>
            <p className="text-xs text-white/90 font-mono">{address.slice(0, 6)}...{address.slice(-4)}</p>
          </div>
        )}
      </div>
    </div>
  )
}

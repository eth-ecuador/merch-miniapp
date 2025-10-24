"use client"

import Link from "next/link"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export function ProfileHeader() {
  const { displayName, username, pfpUrl, address, isLoading } = useBaseAccountUser()
  
  const resolvedName = displayName || (username ? `@${username}` : "Anon User")
  const initial = resolvedName.charAt(0).toUpperCase() || "A"

  return (
    <div className="flex items-center gap-3 mb-6">
      <Link href="/profile" className="block">
        <div className="w-16 h-16 bg-[#0000ff] rounded-lg border-[3px] border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform overflow-hidden sm:w-20 sm:h-20">
          {isLoading ? (
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" aria-label="Cargando avatar" />
          ) : pfpUrl ? (
            <img
              src={pfpUrl}
              alt={resolvedName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-white sm:text-4xl">{initial}</span>
          )}
        </div>
      </Link>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-white uppercase tracking-wider sm:text-xl">
            {isLoading ? "Cargando..." : resolvedName}
          </h1>
          <Link 
            href="/create_events" 
            className="p-1 hover:bg-white/10 rounded-md transition-colors group"
            title="Crear eventos"
          >
            <Cog6ToothIcon className="w-5 h-5 text-white/70 group-hover:text-[#c8ff00] transition-colors" />
          </Link>
        </div>
        <p className="text-xs text-white/80 uppercase tracking-[0.25em] sm:text-sm">
          Merch Newbie
        </p>
        {address && (
          <div className="mt-2 bg-black/30 rounded-md px-2 py-[6px] border border-[#c8ff00]/30">
            <p className="text-[10px] text-[#c8ff00] uppercase tracking-[0.3em]">Base Account</p>
            <p className="text-[11px] text-white/90 font-mono">{address.slice(0, 6)}...{address.slice(-4)}</p>
          </div>
        )}
      </div>
    </div>
  )
}

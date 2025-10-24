"use client"

import Link from "next/link"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"

export function ProfileHeader() {
  const { displayName, username, pfpUrl, address, isLoading } = useBaseAccountUser()
  
  const resolvedName = displayName || (username ? `@${username}` : "Anon User")
  const initial = resolvedName.charAt(0).toUpperCase() || "A"

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Avatar */}
      <Link href="/profile" className="block">
        <div className="w-16 h-16 bg-[#0000ff] rounded-lg border-[3px] border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform overflow-hidden sm:w-20 sm:h-20">
          {isLoading ? (
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" aria-label="Loading avatar" />
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

      {/* User info */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white uppercase tracking-wider sm:text-xl">
              {isLoading ? "Loading..." : resolvedName}
            </h1>
            <p className="text-xs text-white/80 uppercase tracking-[0.25em] sm:text-sm">
              Merch Newbie
            </p>
          </div>

          {/* Wallet info - moved to top right */}
          {address && (
            <div className="ml-3 bg-black/30 rounded-md px-2 py-1 border border-[#c8ff00]/30 max-w-[120px]">
              <p className="text-[10px] text-white/90 font-mono truncate">{username ? `${username}` : `${address.slice(0, 6)}...${address.slice(-4)}`}</p>
            </div>
          )}
        </div>

        {/* Buttons container - moved to bottom */}
        <div className="flex gap-2 mt-2">
          {/* Create Event button - smaller */}
          <Link 
            href="/create_events"
            className="bg-[#c8ff00] text-black font-bold text-[10px] px-2 py-1 rounded-md uppercase tracking-wider hover:bg-[#b3e600] transition-colors shadow-md border border-[#c8ff00]/70"
          >
            Create Event!
          </Link>
          
          {/* Claim Now button */}
          <Link 
            href="/tienda"
            className="bg-[#0000ff] text-white font-bold text-[10px] px-2 py-1 rounded-md uppercase tracking-wider hover:bg-[#0033cc] transition-colors shadow-md border border-[#0000ff]/70"
          >
            Claim Now!
          </Link>
        </div>
      </div>
    </div>
  )
}

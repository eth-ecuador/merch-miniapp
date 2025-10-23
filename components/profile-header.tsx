"use client"

import Link from "next/link"

export function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link href="/profile">
        <div className="w-24 h-24 bg-[#0000ff] rounded-lg border-4 border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
          <span className="text-5xl font-bold text-white">P</span>
        </div>
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-wide">Pepito Pérez</h1>
        <p className="text-lg text-white/90 uppercase tracking-wide">Novato del Merch</p>
      </div>
    </div>
  )
}

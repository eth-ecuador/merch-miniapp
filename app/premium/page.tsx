"use client"

import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { FuturisticCard } from "@/components/futuristic-card"
import { Treasury } from "@/components/treasury"

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
      <CircuitBackground />

      <div className="relative z-10 flex flex-col min-h-screen px-5 py-6 max-w-md mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <ProfileHeader />
          <NavigationTabs />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-5">
          <FuturisticCard accentColor="#00d4ff" className="mb-4" contentClassName="p-6 sm:p-8">
            {/* Premium Title box with stepped border */}
            <div className="relative border-[3px] border-[#4169e1] bg-[#0000ff]/60 p-4 mt-4 mb-6">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#4169e1] border border-[#00d4ff]" />
              <h2 className="text-3xl font-bold text-[#00d4ff] text-center uppercase tracking-widest leading-snug">
                Treasury
              </h2>
            </div>

            {/* Treasury dinámico - colección personal del usuario */}
            <Treasury />
            
            {/* Línea separadora */}
            <div className="my-6 border-t border-white/20"></div>
            
            {/* Catálogo completo disponible */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-3 text-center">
                📖 Catálogo completo
              </h3>
              <p className="text-xs text-white/50 text-center mb-4">
                Todos los items disponibles para reclamar
              </p>
            </div>

            {/* Scrollable grid container - vertical only */}
            <div className="max-h-80 overflow-y-auto pr-2">
              <div className="grid grid-cols-3 gap-4">
                {/* Basic Items (formerly Collection) */}
                {[
                  { src: "/basic_merch/tshirt.png", alt: "T-shirt", type: "basic" },
                  { src: "/basic_merch/cup.png", alt: "Coffee mug", type: "basic" },
                  { src: "/basic_merch/glass_cup.png", alt: "Glass cup", type: "basic" },
                  { src: "/basic_merch/tote_bag.png", alt: "Tote bag", type: "basic" },
                  { src: "/basic_merch/glass_carryon.png", alt: "Glass carry-on", type: "basic" },
                  { src: "/basic_merch/hat_merch.png", alt: "Hat", type: "basic" },
                  /* Premium Items */
                  { src: "/hat.png", alt: "Premium Hat", type: "premium" },
                  { src: "/keyyy.png", alt: "Key", type: "premium" },
                  { src: "/box.png", alt: "Box", type: "premium" },
                  { src: "/backpack-leather.png", alt: "Backpack", type: "premium" },
                  { src: "/headphones.png", alt: "Headphones", type: "premium" },
                  { src: "/thermo.png", alt: "Thermo", type: "premium" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center opacity-60">
                    <div className="w-28 h-28 bg-[#0000ff]/20 rounded-lg border border-white/10 flex items-center justify-center shadow-lg sm:w-32 sm:h-32 mb-2">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-20 h-20 object-contain drop-shadow-2xl sm:w-24 sm:h-24"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.jpg'
                        }}
                      />
                    </div>
                    <div className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md ${
                      item.type === 'premium' 
                        ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30' 
                        : 'bg-[#c8ff00]/20 text-[#c8ff00] border border-[#c8ff00]/30'
                    }`}>
                      {item.type === 'premium' ? 'Premium' : 'Basic'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="text-center mt-4">
              <p className="text-xs text-white/50 uppercase tracking-widest">↑ Scroll to see all items ↓</p>
            </div>
          </FuturisticCard>
        </div>
      </div>
    </div>
  )
}

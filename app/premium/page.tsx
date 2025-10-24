import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { FuturisticCard } from "@/components/futuristic-card"

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

            {/* Progress Bar with neon styling */}
            <div className="relative border-2 border-[#00d4ff] h-5 mb-6 overflow-hidden bg-[#0a0a3d]">
              <div className="h-full w-[60%] bg-[#00d4ff] shadow-[0_0_16px_rgba(0,212,255,0.8)]"></div>
              <div className="absolute inset-0 border border-[#4169e1]"></div>
            </div>

            {/* Scrollable grid container - vertical only */}
            <div className="max-h-80 overflow-y-auto pr-2">
              <div className="grid grid-cols-3 gap-4">
                {/* Basic Items (formerly Collection) */}
                {[
                  { src: "/tshirt.png", alt: "T-shirt", type: "basic" },
                  { src: "/cup.png", alt: "Coffee mug", type: "basic" },
                  { src: "/glass_cup.png", alt: "Glass cup", type: "basic" },
                  { src: "/tote_bag.png", alt: "Tote bag", type: "basic" },
                  { src: "/glass_carryon.png", alt: "Glass carry-on", type: "basic" },
                  { src: "/hat_merch.png", alt: "Hat", type: "basic" },
                  /* Premium Items */
                  { src: "/hat.png", alt: "Premium Hat", type: "premium" },
                  { src: "/keyyy.png", alt: "Key", type: "premium" },
                  { src: "/box.png", alt: "Box", type: "premium" },
                  { src: "/backpack-leather.png", alt: "Backpack", type: "premium" },
                  { src: "/headphones.png", alt: "Headphones", type: "premium" },
                  { src: "/thermo.png", alt: "Thermo", type: "premium" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-28 h-28 bg-[#0000ff]/20 rounded-lg border border-white/10 flex items-center justify-center shadow-lg sm:w-32 sm:h-32 mb-2">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-20 h-20 object-contain drop-shadow-2xl sm:w-24 sm:h-24"
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

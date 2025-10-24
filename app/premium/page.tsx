import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
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
          <FuturisticCard accentColor="#00d4ff" className="mb-4" contentClassName="p-4 sm:p-6">
            {/* Premium Title box with stepped border */}
            <div className="relative border-[3px] border-[#4169e1] bg-[#0000ff]/60 p-4 mt-4 mb-4">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#4169e1] border border-[#00d4ff]" />
              <h2 className="text-2xl font-bold text-[#00d4ff] text-center uppercase tracking-widest leading-snug">
                Merch Premium
              </h2>
            </div>

            {/* Grid of premium items */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: "/hat.png", alt: "Hat" },
                { src: "/keyyy.png", alt: "Key" },
                { src: "/box.png", alt: "Box" },
                { src: "/backpack-leather.png", alt: "Backpack" },
                { src: "/headphones.png", alt: "Headphones" },
                { src: "/thermo.png", alt: "Thermo" },
              ].map((item, i) => (
                <div key={i} className="flex justify-center">
                  <div className="w-28 h-28 bg-[#0000ff]/20 rounded-lg border border-white/10 flex items-center justify-center shadow-lg sm:w-32 sm:h-32">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-20 h-20 object-contain drop-shadow-2xl sm:w-24 sm:h-24"
                    />
                  </div>
                </div>
              ))}
            </div>
          </FuturisticCard>
        </div>

        {/* Bottom nav */}
        <div className="pt-2">
          <BottomNavigation currentPath="/premium" />
        </div>
      </div>
    </div>
  )
}

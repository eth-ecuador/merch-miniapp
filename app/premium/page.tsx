import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FuturisticCard } from "@/components/futuristic-card"

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
      <CircuitBackground />

      <div className="relative z-10 p-6 max-w-md mx-auto">
        <ProfileHeader />
        <NavigationTabs />

        <FuturisticCard accentColor="#00d4ff">
          {/* Premium Title box with stepped border */}
          <div className="relative border-4 border-[#4169e1] bg-[#0000ff]/60 p-6 mb-8 mt-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#4169e1] border-2 border-[#00d4ff]"></div>
            <h2 className="text-4xl font-bold text-[#00d4ff] text-center uppercase tracking-wider leading-tight">
              Merch
              <br />
              Premium
            </h2>
          </div>

          {/* Grid of premium items (6 individual boxes) */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { src: '/hat.png', alt: 'Hat' },
              { src: '/keyyy.png', alt: 'Key' },
              { src: '/box.png', alt: 'Box' },
            ].map((item, i) => (
              <div key={i} className="flex justify-center">
                <div className="w-32 h-32 bg-[#0000ff]/20 rounded-lg border border-white/10 flex items-center justify-center shadow-lg">
                  <img src={item.src} alt={item.alt} className="w-24 h-24 object-contain drop-shadow-2xl" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { src: '/backpack-leather.png', alt: 'Backpack' },
              { src: '/headphones.png', alt: 'Headphones' },
              { src: '/thermo.png', alt: 'Thermo' },
            ].map((item, i) => (
              <div key={i} className="flex justify-center">
                <div className="w-32 h-32 bg-[#0000ff]/20 rounded-lg border border-white/10 flex items-center justify-center shadow-lg">
                  <img src={item.src} alt={item.alt} className="w-24 h-24 object-contain drop-shadow-2xl" />
                </div>
              </div>
            ))}
          </div>
        </FuturisticCard>

        <BottomNavigation currentPath="/premium" />
      </div>
    </div>
  )
}

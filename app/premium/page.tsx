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

          {/* Call to action text */}
          <p className="text-center text-[#00d4ff] text-xl font-bold mb-8 uppercase tracking-wide">
            ¡ Tus modelos más exclusivos aquí !
          </p>

          {/* Empty space for premium items */}
          <div className="min-h-[200px]"></div>
        </FuturisticCard>

        <BottomNavigation currentPath="/premium" />
      </div>
    </div>
  )
}

import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FuturisticCard } from "@/components/futuristic-card"

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
      <CircuitBackground />

      <div className="relative z-10 flex flex-col min-h-screen p-6">
        <ProfileHeader />
        <NavigationTabs />

        <div className="flex-1 flex flex-col items-center justify-start pt-8">
          <div className="w-full max-w-md">
            <FuturisticCard>
              <div className="text-center space-y-6 py-8 px-4">
                <h2 className="text-4xl font-bold text-[#c8ff00] tracking-wider">LA MEJOR MERCH</h2>

                <div className="w-full">
                  <div className="h-3 bg-blue-900/50 border-2 border-cyan-400 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c8ff00] to-[#a8df00] w-1/2" />
                  </div>
                </div>

                <p className="text-cyan-300 text-xl font-semibold">
                  Aumenta tu colección con
                  <br />
                  increíbles diseños
                </p>
              </div>
            </FuturisticCard>
          </div>

          {/* Empty space for store items */}
          <div className="flex-1 w-full" />
        </div>

        <BottomNavigation currentPath="/tienda" />
      </div>
    </div>
  )
}

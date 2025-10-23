import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
      <CircuitBackground />

      <div className="relative z-10 p-6 max-w-md mx-auto">
        <ProfileHeader />
        <NavigationTabs />

        {/* Profile Content with decorative corners */}
        <div className="relative mt-12 mb-8">
          {/* Top left corner bracket */}
          <div className="absolute -top-8 -left-4 w-16 h-16 border-l-4 border-t-4 border-[#c8ff00]"></div>

          {/* Top right corner bracket */}
          <div className="absolute -top-8 -right-4 w-16 h-16 border-r-4 border-t-4 border-[#c8ff00]"></div>

          {/* Large Profile Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Decorative corners around avatar */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#c8ff00]"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-[#c8ff00]"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-[#c8ff00]"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#c8ff00]"></div>

              <div className="w-64 h-64 bg-[#0000ff] rounded-2xl border-4 border-white flex items-center justify-center shadow-2xl">
                <span className="text-[160px] font-bold text-white">P</span>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white uppercase tracking-wide mb-2">Pepito Pérez</h2>
            <p className="text-xl text-white/90 uppercase tracking-wide">Novato del Merch</p>
          </div>

          {/* Progress Bar */}
          <div className="relative border-2 border-[#c8ff00] h-6 mb-6 overflow-hidden bg-[#0a0a3d] mx-4">
            <div className="h-full w-[35%] bg-[#c8ff00] shadow-[0_0_20px_rgba(200,255,0,0.8)]"></div>
          </div>

          {/* Level up text */}
          <p className="text-center text-[#00d4ff] text-lg font-bold uppercase tracking-wide px-4">
            Consigue más items y llega a:
            <br />
            <span className="text-xl">Coleccionista Iniciado</span>
          </p>

          {/* Bottom left corner bracket */}
          <div className="absolute -bottom-8 -left-4 w-16 h-16 border-l-4 border-b-4 border-[#c8ff00]"></div>

          {/* Bottom right corner bracket */}
          <div className="absolute -bottom-8 -right-4 w-16 h-16 border-r-4 border-b-4 border-[#c8ff00]"></div>
        </div>

        <BottomNavigation currentPath="/profile" />
      </div>
    </div>
  )
}

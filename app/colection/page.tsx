import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FuturisticCard } from "@/components/futuristic-card"
import Link from "next/link"


export default function ColectionPage() {
  return (
    <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
      <CircuitBackground />

      <div className="relative z-10 p-6 max-w-md mx-auto">
        <ProfileHeader />
        <NavigationTabs />

        <FuturisticCard accentColor="#c8ff00">
          {/* Title box with stepped border */}
          <div className="relative border-4 border-[#4169e1] bg-[#0000ff]/40 p-4 mb-6 mt-8">
            <div className="absolute -top-2 left-1/4 right-1/4 h-1 bg-[#c8ff00]"></div>
            <h2 className="text-4xl font-bold text-[#c8ff00] text-center uppercase tracking-wider">Collection</h2>
          </div>

          {/* Progress Bar with neon styling */}
          <div className="relative border-2 border-[#c8ff00] h-6 mb-6 overflow-hidden bg-[#0a0a3d]">
            <div className="h-full w-[40%] bg-[#c8ff00] shadow-[0_0_20px_rgba(200,255,0,0.8)]"></div>
            <div className="absolute inset-0 border-2 border-[#4169e1]"></div>
          </div>

          {/* Call to action text */}
          <p className="text-center text-[#00d4ff] text-xl font-bold mb-6 uppercase tracking-wide">
            Get more merch
            <br />and level up!
          </p>

          {/* Mugs Grid */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-center">
                <img
                  src="/cup.png"
                  alt="Coffee mug"
                  className="w-28 h-28 object-contain drop-shadow-2xl"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <img
                  src="/tshirt.png"
                  alt="Coffee mug"
                  className="w-28 h-28 object-contain drop-shadow-2xl"
                />
              </div>
            ))}
          </div>
        </FuturisticCard>

        {/* Welcome Merch Timer as a button */}
        <Link href="/tienda" className="block group relative mb-8 mt-12 cursor-pointer transition-transform hover:scale-[1.03]">
          <div className="absolute -top-2 left-0 right-0 h-1 bg-[#c8ff00] transition-all group-hover:h-1.5"></div>
          <div className="border-4 border-[#0000ff] rounded-lg p-4 bg-[#0000ff]/80 transition-colors group-hover:bg-[#0000ff]/90">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-[#00d4ff] text-sm uppercase tracking-wider font-semibold">Get your merch</p>
                <p className="text-[#00d4ff] text-sm uppercase tracking-wider font-semibold">welcome</p>
              </div>
              <div className="text-[#00d4ff] text-3xl font-bold tracking-wider">NOW!</div>
            </div>
          </div>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#c8ff00] transition-all group-hover:h-1.5"></div>
        </Link>

        <BottomNavigation currentPath="/colection" />
      </div>
    </div>
  )
}

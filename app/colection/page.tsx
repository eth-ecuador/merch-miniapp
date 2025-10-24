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

      <div className="relative z-10 flex flex-col h-screen px-5 py-4 max-w-md mx-auto">
        <div className="space-y-3">
          <ProfileHeader />
          <NavigationTabs />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <FuturisticCard accentColor="#c8ff00" className="h-fit" contentClassName="p-4 sm:p-5">
            {/* Title box with stepped border */}
            <div className="relative border-[3px] border-[#4169e1] bg-[#0000ff]/40 p-3 mt-2 mb-4">
              <div className="absolute -top-1.5 left-1/4 right-1/4 h-[3px] bg-[#c8ff00]"></div>
              <h2 className="text-3xl font-bold text-[#c8ff00] text-center uppercase tracking-widest">Collection</h2>
            </div>

            {/* Progress Bar with neon styling */}
            <div className="relative border-2 border-[#c8ff00] h-4 mb-4 overflow-hidden bg-[#0a0a3d]">
              <div className="h-full w-[40%] bg-[#c8ff00] shadow-[0_0_16px_rgba(200,255,0,0.8)]"></div>
              <div className="absolute inset-0 border border-[#4169e1]"></div>
            </div>

            {/* Empty state message */}
            <div className="text-center py-8">
              <p className="text-[#00d4ff] text-lg font-semibold uppercase tracking-widest leading-tight">
                Items moved to Treasury
                <br />
                <span className="text-base text-white/70">Check Treasury tab for all merch</span>
              </p>
            </div>
          </FuturisticCard>

          {/* Welcome Merch Timer as a button */}
          <Link
            href="/tienda"
            className="block group relative mt-4 cursor-pointer transition-transform hover:scale-[1.03]"
          >
            <div className="absolute -top-1.5 left-0 right-0 h-[3px] bg-[#c8ff00] transition-all group-hover:h-1"></div>
            <div className="border-[3px] border-[#0000ff] rounded-lg p-3 bg-[#0000ff]/80 transition-colors group-hover:bg-[#0000ff]/90">
              <div className="flex items-center justify-between gap-3">
                <div className="text-left">
                  <p className="text-[#00d4ff] text-xs uppercase tracking-widest font-semibold">Get your merch</p>
                  <p className="text-[#00d4ff] text-xs uppercase tracking-widest font-semibold">welcome</p>
                </div>
                <div className="text-[#00d4ff] text-2xl font-bold tracking-widest">NOW!</div>
              </div>
            </div>
            <div className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#c8ff00] transition-all group-hover:h-1"></div>
          </Link>
        </div>
      </div>
    </div>
  )
}

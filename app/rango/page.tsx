import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import Link from "next/link"

export default function RangoPage() {
  return (
    <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
      <CircuitBackground />

      <div className="relative z-10 flex flex-col min-h-screen p-6">
        <ProfileHeader />
        <NavigationTabs />

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Decorative corner brackets */}
          <div className="relative w-full max-w-md">
            {/* Top left corner */}
            <div className="absolute -top-8 -left-4 w-16 h-16 border-l-4 border-t-4 border-[#c8ff00]" />

            {/* Top right corner */}
            <div className="absolute -top-8 -right-4 w-16 h-16 border-r-4 border-t-4 border-[#c8ff00]" />

            {/* Bottom left corner */}
            <div className="absolute -bottom-8 -left-4 w-16 h-16 border-l-4 border-b-4 border-[#c8ff00]" />

            {/* Bottom right corner */}
            <div className="absolute -bottom-8 -right-4 w-16 h-16 border-r-4 border-b-4 border-[#c8ff00]" />

            <div className="space-y-8 py-12">
              {/* Progress bar */}
              <div className="w-full">
                <div className="h-4 bg-blue-900/50 border-2 border-cyan-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c8ff00] to-[#a8df00] w-1/2" />
                </div>
              </div>

              {/* Text content */}
              <div className="text-center space-y-4">
                <p className="text-cyan-300 text-2xl font-bold">Keep collecting merch!</p>

                <p className="text-cyan-300 text-xl font-semibold">
                  Get more items and reach:
                  <br />
                  <span className="text-2xl">COLLECTOR</span>
                  <br />
                  <span className="text-2xl">BEGINNER</span>
                </p>
              </div>

              {/* Call to action button */}
              <div className="flex justify-center pt-4">
                <Link
                  href="/tienda"
                  className="relative px-8 py-4 bg-gradient-to-r from-[#c8ff00] to-[#a8df00] text-[#1a1a4d] font-bold text-lg tracking-wide hover:brightness-110 transition-all"
                  style={{
                    clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                  }}
                >
                  Get more merch now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

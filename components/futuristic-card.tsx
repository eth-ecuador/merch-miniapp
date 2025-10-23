import type { ReactNode } from "react"

interface FuturisticCardProps {
  children: ReactNode
  accentColor?: string
}

export function FuturisticCard({ children, accentColor = "#00d4ff" }: FuturisticCardProps) {
  return (
    <div className="relative mb-6">
      {/* Top decorative stepped border */}
      <div className="absolute -top-8 left-0 right-0 flex items-end">
        <div className="w-12 h-8 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
        <div className="w-8 h-6 bg-[#4169e1] border-2 border-l-0" style={{ borderColor: accentColor }}></div>
        <div className="w-8 h-4 bg-[#4169e1] border-2 border-l-0" style={{ borderColor: accentColor }}></div>
        <div className="flex-1 h-2 bg-transparent"></div>
      </div>

      {/* Main card container with stepped corners */}
      <div
        className="relative bg-[#0a0a3d] border-4 border-[#4169e1] p-6"
        style={{
          clipPath:
            "polygon(0 20px, 20px 20px, 20px 0, calc(100% - 40px) 0, calc(100% - 40px) 8px, calc(100% - 20px) 8px, calc(100% - 20px) 20px, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 20px calc(100% - 20px), 0 calc(100% - 20px))",
        }}
      >
        {/* Left top corner decoration */}
        <div className="absolute top-0 left-0">
          <div className="relative">
            <div className="w-4 h-4 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
            <div className="w-8 h-4 bg-[#4169e1] border-2 border-t-0" style={{ borderColor: accentColor }}></div>
            <div className="w-12 h-4 bg-[#4169e1] border-2 border-t-0" style={{ borderColor: accentColor }}></div>
          </div>
        </div>

        {/* Right top corner decoration */}
        <div className="absolute top-0 right-0">
          <div className="flex flex-col items-end">
            <div className="w-16 h-4 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
            <div className="w-20 h-4 bg-[#4169e1] border-2 border-t-0" style={{ borderColor: accentColor }}></div>
            <div className="w-24 h-4 bg-[#4169e1] border-2 border-t-0" style={{ borderColor: accentColor }}></div>
          </div>
        </div>

        {children}

        {/* Bottom left corner decoration */}
        <div className="absolute bottom-0 left-0">
          <div className="flex flex-col">
            <div className="w-12 h-4 bg-[#4169e1] border-2 border-b-0" style={{ borderColor: accentColor }}></div>
            <div className="w-8 h-4 bg-[#4169e1] border-2 border-b-0" style={{ borderColor: accentColor }}></div>
            <div className="w-4 h-4 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
          </div>
        </div>

        {/* Bottom right corner decoration */}
        <div className="absolute bottom-0 right-0">
          <div className="flex flex-col items-end">
            <div className="w-24 h-4 bg-[#4169e1] border-2 border-b-0" style={{ borderColor: accentColor }}></div>
            <div className="w-20 h-4 bg-[#4169e1] border-2 border-b-0" style={{ borderColor: accentColor }}></div>
            <div className="w-16 h-4 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative stepped border */}
      <div className="absolute -bottom-6 left-0 right-0 flex items-start">
        <div className="w-12 h-4 border-2" style={{ backgroundColor: accentColor, borderColor: accentColor }}></div>
        <div
          className="w-16 h-4 bg-transparent border-2 border-l-0 border-t-0"
          style={{ borderColor: accentColor, clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        ></div>
        <div className="flex-1 h-2 bg-transparent"></div>
      </div>
    </div>
  )
}

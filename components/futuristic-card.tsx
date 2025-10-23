import type { ReactNode } from "react"

interface FuturisticCardProps {
  children: ReactNode
  accentColor?: string
}

export function FuturisticCard({ children, accentColor = "#00d4ff" }: FuturisticCardProps) {
  return (
    <div className="relative mb-6">
      {/* Top decorative stepped border (smaller) */}
      <div className="absolute -top-4 left-0 right-0 flex items-end">
        <div className="w-8 h-4 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
        <div className="w-6 h-3 bg-[#4169e1] border-2 border-l-0" style={{ borderColor: accentColor }}></div>
        <div className="w-4 h-2 bg-[#4169e1] border-2 border-l-0" style={{ borderColor: accentColor }}></div>
        <div className="flex-1 h-2 bg-transparent"></div>
      </div>

      {/* Main card container with smaller stepped corners */}
      <div
        className="relative bg-[#0a0a3d] border-4 border-[#4169e1] p-6"
        style={{
          clipPath:
            "polygon(0 10px, 10px 10px, 10px 0, calc(100% - 20px) 0, calc(100% - 20px) 6px, calc(100% - 10px) 6px, calc(100% - 10px) 10px, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 10px calc(100% - 10px), 0 calc(100% - 10px))",
        }}
      >
        {/* Top left corner */}
        <div className="absolute top-0 left-0">
          <div className="relative">
            <div className="w-3 h-3 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
            <div className="w-6 h-3 bg-[#4169e1] border-2 border-t-0" style={{ borderColor: accentColor }}></div>
            <div className="w-9 h-3 bg-[#4169e1] border-2 border-t-0" style={{ borderColor: accentColor }}></div>
          </div>
        </div>

        {/* Top right corner */}
        <div className="absolute top-0 right-0">
          <div className="flex flex-col items-end">
            <div className="w-10 h-3 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
            <div className="w-12 h-3 bg-[#4169e1] border-2 border-t-0" style={{ borderColor: accentColor }}></div>
            <div className="w-14 h-3 bg-[#4169e1] border-2 border-t-0" style={{ borderColor: accentColor }}></div>
          </div>
        </div>

        {children}

        {/* Bottom left corner */}
        <div className="absolute bottom-0 left-0">
          <div className="flex flex-col">
            <div className="w-9 h-3 bg-[#4169e1] border-2 border-b-0" style={{ borderColor: accentColor }}></div>
            <div className="w-6 h-3 bg-[#4169e1] border-2 border-b-0" style={{ borderColor: accentColor }}></div>
            <div className="w-3 h-3 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
          </div>
        </div>

        {/* Bottom right corner */}
        <div className="absolute bottom-0 right-0">
          <div className="flex flex-col items-end">
            <div className="w-14 h-3 bg-[#4169e1] border-2 border-b-0" style={{ borderColor: accentColor }}></div>
            <div className="w-12 h-3 bg-[#4169e1] border-2 border-b-0" style={{ borderColor: accentColor }}></div>
            <div className="w-10 h-3 bg-[#4169e1] border-2" style={{ borderColor: accentColor }}></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative stepped border (smaller) */}
      <div className="absolute -bottom-4 left-0 right-0 flex items-start">
        <div className="w-8 h-3 border-2" style={{ backgroundColor: accentColor, borderColor: accentColor }}></div>
        <div
          className="w-10 h-3 bg-transparent border-2 border-l-0 border-t-0"
          style={{ borderColor: accentColor, clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        ></div>
        <div className="flex-1 h-2 bg-transparent"></div>
      </div>
    </div>
  )
}

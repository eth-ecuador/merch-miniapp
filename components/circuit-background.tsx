export function CircuitBackground() {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M50 0 L50 50 L100 50" stroke="#4169e1" strokeWidth="2" fill="none" />
            <path d="M150 50 L150 100 L100 100" stroke="#4169e1" strokeWidth="2" fill="none" />
            <path d="M0 100 L50 100 L50 150" stroke="#4169e1" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="4" fill="#4169e1" />
            <circle cx="100" cy="50" r="4" fill="#4169e1" />
            <circle cx="150" cy="50" r="4" fill="#4169e1" />
            <circle cx="100" cy="100" r="4" fill="#4169e1" />
            <circle cx="50" cy="100" r="4" fill="#4169e1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  )
}

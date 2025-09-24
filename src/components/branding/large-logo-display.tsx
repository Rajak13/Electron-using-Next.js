'use client'

interface LargeLogoDisplayProps {
  width?: number
  height?: number
  className?: string
}

export function LargeLogoDisplay({ width = 120, height = 120, className = "" }: LargeLogoDisplayProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-2xl"
        style={{ width, height }}
      >
        SC
      </div>
    </div>
  )
}
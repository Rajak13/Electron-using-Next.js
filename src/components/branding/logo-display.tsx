'use client'

interface LogoDisplayProps {
  width?: number
  height?: number
  className?: string
}

export function LogoDisplay({ width = 40, height = 40, className = "" }: LogoDisplayProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold"
        style={{ width, height }}
      >
        SC
      </div>
    </div>
  )
}
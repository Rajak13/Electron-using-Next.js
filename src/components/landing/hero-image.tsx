'use client'

import { LargeLogoDisplay } from '@/components/branding/large-logo-display'
import { useEffect, useState } from 'react'

interface HeroImageProps {
  width?: number
  height?: number
  className?: string
}

export function HeroImage({ width = 120, height = 120, className = '' }: HeroImageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by showing consistent content until mounted
  if (!mounted) {
    return (
      <div className={`animate-float ${className}`}>
        <LargeLogoDisplay width={width} height={height} />
      </div>
    )
  }

  // Fallback to the default logo display
  return (
    <div className={`animate-float ${className}`}>
      <LargeLogoDisplay width={width} height={height} />
    </div>
  )
}
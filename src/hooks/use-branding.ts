'use client'

import { useState, useEffect } from 'react'

interface BrandingConfig {
  appName: string
  primaryColor: string
  logoUrl?: string
  tagline: string
}

const defaultBranding: BrandingConfig = {
  appName: 'StudyCollab',
  primaryColor: '#3b82f6',
  tagline: 'Study Smarter, Together'
}

export function useBranding() {
  const [branding, setBranding] = useState<BrandingConfig>(defaultBranding)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API or config
    const loadBranding = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100))
        setBranding(defaultBranding)
      } catch (error) {
        console.error('Failed to load branding:', error)
        setBranding(defaultBranding)
      } finally {
        setIsLoading(false)
      }
    }

    loadBranding()
  }, [])

  return {
    branding,
    isLoading,
    updateBranding: setBranding
  }
}
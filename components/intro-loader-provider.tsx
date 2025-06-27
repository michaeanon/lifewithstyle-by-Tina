"use client"

import { useState, useEffect, type ReactNode } from "react"
import IntroLoader from "./intro-loader"

// Add this hook for external components to use
export function useIntroLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const checkIntroStatus = () => {
      try {
        const hasSeenIntro = localStorage.getItem("hasSeenIntro")
        const introLastShown = localStorage.getItem("introLastShown")
        const currentTime = Date.now()

        const shouldShow =
          !hasSeenIntro || !introLastShown || currentTime - Number.parseInt(introLastShown, 10) > 24 * 60 * 60 * 1000

        setIsLoading(shouldShow)
        setIntroComplete(!shouldShow)
      } catch (error) {
        console.warn("Error checking intro status:", error)
        setIsLoading(false)
        setIntroComplete(true)
      }
    }

    checkIntroStatus()
  }, [])

  return { isLoading, introComplete }
}

interface IntroLoaderProviderProps {
  children: ReactNode
}

export default function IntroLoaderProvider({ children }: IntroLoaderProviderProps) {
  const [showIntro, setShowIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check if we should show the intro
    const checkIntroStatus = () => {
      try {
        const hasSeenIntro = localStorage.getItem("hasSeenIntro")
        const introLastShown = localStorage.getItem("introLastShown")
        const currentTime = Date.now()

        // Show intro if never seen or if it's been more than 24 hours
        const shouldShow =
          !hasSeenIntro || !introLastShown || currentTime - Number.parseInt(introLastShown, 10) > 24 * 60 * 60 * 1000

        if (shouldShow) {
          // Small delay to ensure smooth loading
          setTimeout(() => {
            setShowIntro(true)
          }, 100)
        } else {
          setIntroComplete(true)
        }
      } catch (error) {
        console.warn("Error checking intro status:", error)
        setIntroComplete(true)
      }
    }

    checkIntroStatus()
  }, [])

  const handleIntroComplete = () => {
    try {
      localStorage.setItem("hasSeenIntro", "true")
      localStorage.setItem("introLastShown", Date.now().toString())
    } catch (error) {
      console.warn("Error saving intro status:", error)
    }

    setShowIntro(false)
    setIntroComplete(true)

    // Dispatch event for other components
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("introLoaderFinished"))
    }
  }

  // Don't render anything until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {showIntro && <IntroLoader onComplete={handleIntroComplete} />}
      <div className={showIntro ? "hidden" : "block"}>{children}</div>
    </>
  )
}

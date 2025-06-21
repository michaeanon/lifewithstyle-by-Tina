"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    try {
      if (typeof window !== "undefined") {
        const consent = localStorage.getItem("cookieConsent")
        if (!consent) {
          // Show consent banner after a delay
          const timer = setTimeout(() => {
            setShowConsent(true)
          }, 1000)
          return () => clearTimeout(timer)
        }
      }
    } catch (error) {
      console.warn("Error accessing localStorage:", error)
    }
  }, [])

  const acceptCookies = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cookieConsent", "accepted")
      }
    } catch (error) {
      console.warn("Error setting localStorage:", error)
    }
    setShowConsent(false)
  }

  const declineCookies = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cookieConsent", "declined")
      }
    } catch (error) {
      console.warn("Error setting localStorage:", error)
    }
    setShowConsent(false)
  }

  // Don't render anything until mounted
  if (!isMounted || !showConsent) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl border-2 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">We use cookies</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                By clicking "Accept All", you consent to our use of cookies.{" "}
                <Link href="/cookies" className="underline hover:no-underline">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" onClick={declineCookies} size="sm">
                Decline
              </Button>
              <Button onClick={acceptCookies} size="sm" className="bg-pink-600 hover:bg-pink-700">
                Accept All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

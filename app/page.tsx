"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ActionButtons } from "@/components/action-buttons"
import { CapsuleGuide } from "@/components/capsule-guide"
import { OutfitCard } from "@/components/outfit-card"
import { ArrowRight, Sparkles } from "lucide-react"
import { SectionLoader } from "@/components/section-loader"
import { CircleLoader } from "@/components/circle-loader"
import ClientOnly from "@/components/client-only-wrapper"
import IntroLoaderProvider from "@/components/intro-loader-provider"
import WelcomeBanner from "@/components/welcome-banner"

function HomePageContent() {
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const guideRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleImageError = (imageSrc: string) => {
    setImageErrors((prev) => ({ ...prev, [imageSrc]: true }))
  }

  // Featured outfits with real images and fallbacks
  const featuredOutfits = [
    {
      title: "Summer Casual Elegance",
      description: "Light fabrics with neutral tones for warm days",
      imageSrc: "/images/summer-casual.jpg",
      fallbackSrc: "/placeholder.svg?height=400&width=300&text=Summer+Casual",
      category: "Summer",
      slug: "summer-casual-elegance",
    },
    {
      title: "Office Power Look",
      description: "Professional and confident for important meetings",
      imageSrc: "/images/office-power.jpg",
      fallbackSrc: "/placeholder.svg?height=400&width=300&text=Office+Power",
      category: "Work",
      slug: "office-power-look",
    },
    {
      title: "Weekend Getaway",
      description: "Comfortable yet stylish for travel and exploration",
      imageSrc: "/images/weekend-style.jpg",
      fallbackSrc: "/placeholder.svg?height=400&width=300&text=Weekend+Style",
      category: "Casual",
      slug: "weekend-getaway",
    },
  ]

  // Services with real images and fallbacks
  const services = [
    {
      title: "Personal Styling",
      description:
        "One-on-one consultations to help you discover your unique style and build a wardrobe that reflects your personality and lifestyle.",
      image: "/images/personal-styling.jpg",
      fallback: "/placeholder.svg?height=300&width=400&text=Personal+Styling",
      href: "/services/personal-styling",
    },
    {
      title: "Wardrobe Audit",
      description:
        "A comprehensive review of your current wardrobe to identify gaps, remove items that no longer serve you, and optimize what you already own.",
      image: "/images/wardrobe-audit.jpg",
      fallback: "/placeholder.svg?height=300&width=400&text=Wardrobe+Audit",
      href: "/services/wardrobe-audit",
    },
    {
      title: "Shopping Assistance",
      description:
        "Guided shopping experiences to help you select quality pieces that complement your existing wardrobe and align with your style goals.",
      image: "/images/shopping-assistance.jpg",
      fallback: "/placeholder.svg?height=300&width=400&text=Shopping+Help",
      href: "/services/shopping-assistance",
    },
  ]

  // Testimonials with real profile images and fallbacks
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Executive",
      image: "/images/testimonial-sarah.jpg",
      fallback: "/placeholder.svg?height=100&width=100&text=SJ",
      quote:
        "The capsule wardrobe guidance completely transformed how I approach getting dressed each morning. I've never felt more confident in my style choices.",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image: "/images/testimonial-michael.jpg",
      fallback: "/placeholder.svg?height=100&width=100&text=MC",
      quote:
        "I never thought I could care about fashion until I discovered these outfit combinations. Now I actually enjoy putting together looks that feel like me.",
    },
    {
      name: "Amara Wilson",
      role: "Small Business Owner",
      image: "/images/testimonial-amara.jpg",
      fallback: "/placeholder.svg?height=100&width=100&text=AW",
      quote:
        "The personal styling session was worth every penny. I now have a wardrobe that works for my busy lifestyle while still feeling polished and put-together.",
    },
  ]

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <CircleLoader />
  }

  return (
    <>
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Hero Section with Smart Video Background - Mobile Optimized */}
      <section className="relative h-screen sm:h-screen md:h-screen lg:h-screen xl:h-screen min-h-[100vh] max-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Video Background - Full Coverage with Mobile Fix */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Fallback gradient - full coverage */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-rose-100 via-purple-100 to-indigo-100" />

          <ClientOnly fallback={<div className="w-full h-full bg-gradient-to-br from-rose-100 to-purple-100" />}>
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe
                src="https://streamable.com/e/lpwy52?autoplay=1&muted=1"
                className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 scale-110 sm:scale-105 hover:scale-105 transition-transform duration-[10s] ease-out"
                style={{
                  border: "none",
                  width: "100vw",
                  height: "100vh",
                }}
                allow="autoplay; fullscreen"
                allowFullScreen
                onError={(e) => {
                  console.warn("Video failed to load, using fallback")
                  const target = e.currentTarget as HTMLIFrameElement
                  target.style.display = "none"
                }}
              />
            </div>
          </ClientOnly>
        </div>

        {/* Dynamic Overlay with Gradient Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-20"></div>

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10 z-25"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        ></div>

        {/* Content with Enhanced Animations - Mobile Optimized */}
        <div className="container relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-30">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wide text-white mb-4 sm:mb-6 drop-shadow-2xl animate-fade-in-up">
              Don't know what to wear?
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 drop-shadow-lg animate-fade-in-up animation-delay-300 px-2">
              Discover your personal style with curated outfit combinations and expert styling advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up animation-delay-600 px-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-400 to-orange-300 text-black font-medium hover:from-orange-300 hover:to-rose-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-sm sm:text-base"
                onClick={() => guideRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Explore Capsule Guide
              </Button>

              <Link href="/outfit-combinations">
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-sm bg-black/30 border-orange-300/70 text-white hover:bg-black/50 hover:border-orange-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto"
                >
                  View Outfit Combinations
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on small screens */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden sm:block">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Outfits Section */}
      <SectionLoader className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Featured Outfits</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore our curated selection of versatile outfits designed to inspire your personal style journey.
              </p>
            </div>
            <Link
              href="/outfits"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium hover:underline underline-offset-4"
            >
              View All Outfits
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredOutfits.map((outfit, i) => (
              <OutfitCard
                key={i}
                title={outfit.title}
                description={outfit.description}
                imageSrc={imageErrors[outfit.imageSrc] ? outfit.fallbackSrc : outfit.imageSrc}
                category={outfit.category}
                slug={outfit.slug}
              />
            ))}
          </div>
        </div>
      </SectionLoader>

      {/* Style Philosophy Section */}
      <section className="py-16 md:py-24 bg-rose-50">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Our Style Philosophy</h2>
              <p className="text-lg mb-6">
                We believe that style is a form of self-expression that should be accessible to everyone. Our approach
                focuses on versatility, quality, and timeless design rather than fleeting trends.
              </p>
              <p className="text-lg mb-8">
                By building a thoughtful wardrobe of well-chosen pieces, you can create countless outfits that make you
                feel confident and authentic every day.
              </p>
              <Link href="/about">
                <Button className="bg-rose-500 text-white hover:bg-rose-600 transform hover:scale-105 transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src={
                  imageErrors["/images/style-philosophy.jpg"]
                    ? "/placeholder.svg?height=600&width=500&text=Style+Philosophy"
                    : "/images/style-philosophy.jpg"
                }
                alt="Style philosophy illustration"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                onError={() => handleImageError("/images/style-philosophy.jpg")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how we can help you refine your personal style and build a wardrobe that works for your
              lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Card
                key={i}
                className="border shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={imageErrors[service.image] ? service.fallback : service.image}
                    alt={service.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    onError={() => handleImageError(service.image)}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href}>
                    <Button variant="outline" className="w-full hover:bg-rose-50 transition-colors duration-300">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-rose-50">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Client Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from clients who have transformed their style and confidence with our guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="border shadow-sm bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-rose-200">
                      <Image
                        src={imageErrors[testimonial.image] ? testimonial.fallback : testimonial.image}
                        alt={`${testimonial.name} portrait`}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(testimonial.image)}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Action Buttons Section */}
      <ActionButtons guideRef={guideRef} />

      {/* Capsule Guide Section */}
      <section ref={guideRef}>
        <CapsuleGuide />
      </section>
    </>
  )
}

export default function HomePage() {
  return (
    <IntroLoaderProvider>
      <HomePageContent />
    </IntroLoaderProvider>
  )
}

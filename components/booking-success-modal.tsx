"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Calendar, Clock, Mail, Sparkles, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookingSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails: {
    serviceName: string
    selectedDate: string
    selectedTime: string
    selectedFormat: string
    duration: string
    price: string
    bookingId: string
  }
  clientInfo: {
    name: string
    email: string
    phone: string
    notes: string
  }
}

export function BookingSuccessModal({ isOpen, onClose, bookingDetails, clientInfo }: BookingSuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen || !bookingDetails) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    y: -100,
                    x: Math.random() * window.innerWidth,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: 0,
                    y: window.innerHeight + 100,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    ease: "easeOut",
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ["#ff6b9d", "#c44569", "#f8b500", "#40739e", "#487eb0"][
                      Math.floor(Math.random() * 5)
                    ],
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-rose-400 p-8 text-white">
              {/* Floating Elements */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute top-4 right-4 opacity-20"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute bottom-4 left-4 opacity-20"
              >
                <Heart className="w-6 h-6" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360, y: [-10, 10, -10] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10"
              >
                <Star className="w-16 h-16" />
              </motion.div>

              {/* Close Button */}
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full z-10"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", damping: 15 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", damping: 10 }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                  Booking Confirmed! 🎉
                </h1>
                <p className="text-xl opacity-90">Your style journey begins now</p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Booking Reference */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">Your Booking Reference</p>
                  <p className="text-2xl font-bold font-mono text-purple-600">{bookingDetails.bookingId}</p>
                </div>
              </motion.div>

              {/* Appointment Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Appointment Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium text-gray-800">{bookingDetails.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-800">{formatDate(bookingDetails.selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium text-gray-800">{bookingDetails.selectedTime}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-medium text-gray-800 capitalize">{bookingDetails.selectedFormat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-800">{bookingDetails.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment:</span>
                      <span className="font-medium text-gray-800">{bookingDetails.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Email Confirmations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-500" />
                  Confirmation Emails Sent
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-800">To You:</span>
                    </div>
                    <p className="text-sm text-gray-600 font-mono">{clientInfo.email}</p>
                    <p className="text-xs text-gray-500 mt-1">Complete booking confirmation with all details</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-gray-800">To Our Team:</span>
                    </div>
                    <p className="text-sm text-gray-600 font-mono">lifewithstyleinfo1@gmail.com</p>
                    <p className="text-xs text-gray-500 mt-1">New booking notification for immediate processing</p>
                  </div>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  What Happens Next
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Confirmation Call (Within 24 hours)</p>
                      <p className="text-gray-600">We'll contact you to confirm details and answer any questions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Preparation Guide</p>
                      <p className="text-gray-600">Receive specific instructions tailored to your service</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Calendar Invitation</p>
                      <p className="text-gray-600">Detailed session information and meeting details</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Payment Instructions</p>
                      <p className="text-gray-600">Secure payment details provided during confirmation</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Questions or Changes?</h3>
                <p className="text-gray-600 mb-4">
                  If you need to make any changes or have questions about your appointment:
                </p>
                <div className="flex items-center justify-center gap-2 text-purple-600 font-medium">
                  <Mail className="w-4 h-4" />
                  <span>lifewithstyleinfo1@gmail.com</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Response time: Within 24 hours</p>
              </motion.div>

              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-center pt-4"
              >
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Perfect! Let's Get Started ✨
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

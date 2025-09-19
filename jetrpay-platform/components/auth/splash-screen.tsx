"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500) // Allow fade out animation
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center space-y-6"
      >
        <div className="relative">
          <Image src="/jetrpay_logo_yellow.jpg" alt="JetrPay" width={200} height={60} className="h-16 w-auto mx-auto" />
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mt-3 mx-auto w-fit">
            BETA
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-bold jetrpay-gold">JetrPay</h1>
          <p className="text-muted-foreground text-lg">Powering Borderless Payments</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"
        />
      </motion.div>
    </motion.div>
  )
}

"use client"

import { ArrowLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

interface JetrPayHeaderProps {
  showBack?: boolean
  title?: string
  onBack?: () => void
  onProfile?: () => void
}

export function JetrPayHeader({ showBack = false, title, onBack, onProfile }: JetrPayHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border safe-area-top">
      <div className="h-safe-area-inset-top bg-background" />
      <div className="flex items-center justify-between h-16 px-4 max-w-md mx-auto">
        {/* Left side */}
        <div className="flex items-center min-w-0">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mr-2 touch-manipulation active:scale-95 transition-transform"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Center - Logo or Title */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          {title ? (
            <h1 className="text-lg font-semibold truncate">{title}</h1>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="relative w-24 h-6 sm:w-28 sm:h-7">
                  <Image src="/jetrpay-logo-yellow-text.jpg" alt="JetrPay" fill className="object-contain" priority />
                </div>
              </div>
              <div className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-medium mt-1">
                BETA
              </div>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onProfile}
            className="rounded-full touch-manipulation active:scale-95 transition-transform"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  )
}

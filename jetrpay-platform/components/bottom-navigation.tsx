"use client"

import { Home, Wallet, TrendingUp, CreditCard, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "wallets", label: "Wallets", icon: Wallet },
  { id: "trade", label: "Trade", icon: TrendingUp },
  { id: "spend", label: "Spend", icon: CreditCard },
  { id: "earn", label: "Earn", icon: Star },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all duration-200",
                "hover:bg-muted/50 rounded-lg mx-1 relative",
                "active:scale-95 touch-manipulation",
                isActive && "text-primary",
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5 mb-1 transition-colors", isActive && "text-primary")} />
                {isActive && <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full transition-all duration-200" />
              )}
            </button>
          )
        })}
      </div>
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  )
}

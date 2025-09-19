"use client"

import { useState } from "react"
import { JetrPayHeader } from "@/components/jetrpay-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SplashScreen } from "@/components/auth/splash-screen"
import { LoginModal } from "@/components/auth/login-modal"
import { SignupFlow } from "@/components/auth/signup-flow"
import { KYCModal } from "@/components/auth/kyc-modal"
import { WalletLinkModal } from "@/components/auth/wallet-link-modal"

// Import screen components
import { HomeScreen } from "@/components/screens/home-screen"
import { WalletsScreen } from "@/components/screens/wallets-screen"
import { TradeScreen } from "@/components/screens/trade-screen"
import { SpendScreen } from "@/components/screens/spend-screen"
import { EarnScreen } from "@/components/screens/earn-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { SettingsScreen } from "@/components/screens/settings-screen"

type AuthStep = "splash" | "login" | "signup" | "wallet-link" | "kyc" | "complete"
type Screen = "home" | "wallets" | "trade" | "spend" | "earn" | "profile" | "settings"

export default function JetrPayApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [userMode, setUserMode] = useState<"personal" | "merchant">("personal")
  const [authStep, setAuthStep] = useState<AuthStep>("splash")
  const [userEmail, setUserEmail] = useState("")
  const [userData, setUserData] = useState<any>(null)

  const handleSplashComplete = () => {
    setAuthStep("login")
  }

  const handleLogin = (email: string, mode: "personal" | "merchant") => {
    setUserEmail(email)
    setUserMode(mode)
    setAuthStep("complete")
  }

  const handleShowSignup = () => {
    setAuthStep("signup")
  }

  const handleSignupComplete = (data: any) => {
    setUserData(data)
    setUserEmail(data.email)
    setUserMode(data.accountType === "business" ? "merchant" : "personal")
    setAuthStep("complete")
  }

  const handleWalletLinkComplete = () => {
    setAuthStep("kyc")
  }

  const handleWalletLinkSkip = () => {
    setAuthStep("kyc")
  }

  const handleKYCComplete = () => {
    setAuthStep("complete")
  }

  const handleKYCSkip = () => {
    setAuthStep("complete")
  }

  const handleLoginClose = () => {
    setAuthStep("splash")
  }

  const handleBackToLogin = () => {
    setAuthStep("login")
  }

  const handleProfileClick = () => {
    setCurrentScreen("profile")
  }

  const handleNavigateToSettings = () => {
    setCurrentScreen("settings")
  }

  const handleBackToProfile = () => {
    setCurrentScreen("profile")
  }

  const handleLogout = () => {
    setAuthStep("splash")
    setCurrentScreen("home")
    setActiveTab("home")
    setUserData(null)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentScreen(tab as Screen)
  }

  const handleModeSwitch = (newMode: "personal" | "merchant") => {
    setUserMode(newMode)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen userMode={userMode} />
      case "wallets":
        return <WalletsScreen />
      case "trade":
        return <TradeScreen />
      case "spend":
        return <SpendScreen />
      case "earn":
        return <EarnScreen />
      case "profile":
        return (
          <ProfileScreen
            userMode={userMode}
            userData={userData}
            onNavigateToSettings={handleNavigateToSettings}
            onLogout={handleLogout}
          />
        )
      case "settings":
        return <SettingsScreen userMode={userMode} onBack={handleBackToProfile} onModeSwitch={handleModeSwitch} />
      default:
        return <HomeScreen userMode={userMode} />
    }
  }

  if (authStep !== "complete") {
    return (
      <div className="min-h-screen bg-background">
        {authStep === "splash" && <SplashScreen onComplete={handleSplashComplete} />}

        {authStep === "login" && (
          <LoginModal onLogin={handleLogin} onClose={handleLoginClose} onShowSignup={handleShowSignup} />
        )}

        {authStep === "signup" && <SignupFlow onComplete={handleSignupComplete} onBack={handleBackToLogin} />}

        {authStep === "wallet-link" && (
          <WalletLinkModal onComplete={handleWalletLinkComplete} onSkip={handleWalletLinkSkip} />
        )}

        {authStep === "kyc" && <KYCModal userMode={userMode} onComplete={handleKYCComplete} onSkip={handleKYCSkip} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <JetrPayHeader onProfile={handleProfileClick} />

      <main className="pt-16 pb-16 min-h-screen max-w-md mx-auto scroll-smooth">
        <div className="px-safe-area-inset-left pr-safe-area-inset-right">{renderScreen()}</div>
      </main>

      {!["profile", "settings"].includes(currentScreen) && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  )
}

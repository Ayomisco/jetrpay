"use client"

import {
  Moon,
  Sun,
  Globe,
  Shield,
  Bell,
  Smartphone,
  CreditCard,
  Eye,
  Lock,
  ChevronRight,
  ArrowLeft,
  User,
  Briefcase,
  FileText,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface SettingsScreenProps {
  userMode: "personal" | "merchant"
  onBack?: () => void
  onModeSwitch?: (mode: "personal" | "merchant") => void
}

export function SettingsScreen({ userMode, onBack, onModeSwitch }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [biometrics, setBiometrics] = useState(false)
  const [autoLock, setAutoLock] = useState(true)
  const [kycStatus] = useState<"pending" | "verified" | "not_started">("verified")

  const handleModeToggle = () => {
    const newMode = userMode === "personal" ? "merchant" : "personal"
    onModeSwitch?.(newMode)
  }

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "not_started":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const settingsGroups = [
    {
      title: "Account",
      items: [
        {
          icon: userMode === "personal" ? User : Briefcase,
          label: "Account Mode",
          description: userMode === "personal" ? "Personal Account" : "Business Account",
          type: "toggle" as const,
          value: userMode === "merchant",
          onChange: handleModeToggle,
        },
        {
          icon: FileText,
          label: "Identity Verification",
          description: kycStatus === "verified" ? "Verified" : kycStatus === "pending" ? "Under Review" : "Not Started",
          type: "navigation" as const,
          action: () => console.log("KYC settings"),
          badge: kycStatus,
        },
        {
          icon: Camera,
          label: "Update Profile Photo",
          description: "Change your profile picture",
          type: "navigation" as const,
          action: () => console.log("Update photo"),
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: "Dark Mode",
          description: "Switch between light and dark themes",
          type: "toggle" as const,
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          icon: Globe,
          label: "Language",
          description: "English (US)",
          type: "navigation" as const,
          action: () => console.log("Language settings"),
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: Lock,
          label: "Change PIN",
          description: "Update your security PIN",
          type: "navigation" as const,
          action: () => console.log("Change PIN"),
        },
        {
          icon: Smartphone,
          label: "Biometric Login",
          description: "Use fingerprint or face ID",
          type: "toggle" as const,
          value: biometrics,
          onChange: setBiometrics,
        },
        {
          icon: Shield,
          label: "Auto Lock",
          description: "Lock app when inactive",
          type: "toggle" as const,
          value: autoLock,
          onChange: setAutoLock,
        },
        {
          icon: Eye,
          label: "Privacy Settings",
          description: "Manage data and privacy",
          type: "navigation" as const,
          action: () => console.log("Privacy settings"),
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: Bell,
          label: "Push Notifications",
          description: "Receive transaction alerts",
          type: "toggle" as const,
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Bell,
          label: "Email Notifications",
          description: "Get updates via email",
          type: "navigation" as const,
          action: () => console.log("Email notifications"),
        },
      ],
    },
    {
      title: "Payment",
      items: [
        {
          icon: CreditCard,
          label: "Default Currency",
          description: "USD (United States Dollar)",
          type: "navigation" as const,
          action: () => console.log("Currency settings"),
        },
        {
          icon: CreditCard,
          label: "Payment Methods",
          description: "Manage linked accounts",
          type: "navigation" as const,
          action: () => console.log("Payment methods"),
        },
      ],
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold jetrpay-gold">Settings</h1>
      </div>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{group.title}</h2>

          <div className="space-y-2">
            {group.items.map((item, itemIndex) => (
              <Card key={itemIndex} className="bg-card border-border hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{item.label}</p>
                          {item.badge && (
                            <Badge className={getKycStatusColor(item.badge)}>
                              {item.badge === "verified"
                                ? "Verified"
                                : item.badge === "pending"
                                  ? "Pending"
                                  : "Not Started"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>

                    {item.type === "toggle" ? (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    ) : (
                      <Button variant="ghost" size="icon" onClick={item.action} className="cursor-pointer">
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* App Info */}
      <Card className="bg-card border-border">
        <CardContent className="p-4 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold jetrpay-gold">JetrPay</h3>
            <p className="text-sm text-muted-foreground">Version 1.0.0 (Beta)</p>
            <p className="text-xs text-muted-foreground">© 2024 JetrPay. All rights reserved.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

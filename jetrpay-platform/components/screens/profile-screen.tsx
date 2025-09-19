"use client"

import { User, Settings, Shield, Bell, HelpCircle, LogOut, ChevronRight, Edit3, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ProfileScreenProps {
  userMode: "personal" | "merchant"
  onNavigateToSettings?: () => void
  onLogout?: () => void
}

export function ProfileScreen({ userMode, onNavigateToSettings, onLogout }: ProfileScreenProps) {
  const profileMenuItems = [
    {
      icon: Edit3,
      label: "Edit Profile",
      description: "Update your personal information",
      action: () => console.log("Edit profile"),
    },
    {
      icon: Settings,
      label: "Settings",
      description: "App preferences and configurations",
      action: onNavigateToSettings,
    },
    {
      icon: Shield,
      label: "Security",
      description: "Password, 2FA, and security settings",
      action: () => console.log("Security settings"),
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage your notification preferences",
      action: () => console.log("Notification settings"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support",
      action: () => console.log("Help & Support"),
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-xl">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full jetrpay-button-primary">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold jetrpay-gold">John Doe</h2>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {userMode === "merchant" ? "Merchant" : "Personal"}
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      {userMode === "merchant" ? (
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground text-sm">Total Sales</p>
              <p className="jetrpay-balance text-2xl jetrpay-gold">$12,456</p>
              <p className="text-green-500 text-xs">+15.2% this month</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground text-sm">Customers</p>
              <p className="jetrpay-balance text-2xl jetrpay-gold">247</p>
              <p className="text-green-500 text-xs">+12 new</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground text-sm">Portfolio Value</p>
              <p className="jetrpay-balance text-2xl jetrpay-gold">$3,721</p>
              <p className="text-green-500 text-xs">+8.5% this week</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground text-sm">Transactions</p>
              <p className="jetrpay-balance text-2xl jetrpay-gold">156</p>
              <p className="text-muted-foreground text-xs">This month</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Menu Items */}
      <div className="space-y-3">
        {profileMenuItems.map((item, index) => (
          <Card key={index} className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4" onClick={item.action}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Logout Button */}
      <Card className="bg-card border-border hover:bg-destructive/10 transition-colors cursor-pointer">
        <CardContent className="p-4" onClick={onLogout}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <LogOut className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-destructive">Logout</p>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* App Version */}
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">JetrPay v1.0.0 (Beta)</p>
      </div>
    </div>
  )
}

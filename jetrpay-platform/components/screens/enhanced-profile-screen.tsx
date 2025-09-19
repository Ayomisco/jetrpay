"use client"

import { useState } from "react"
import { ArrowLeft, Camera, Copy, Share, QrCode, Star, Users, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EnhancedProfileScreenProps {
  onBack: () => void
  onEditProfile: () => void
  onInviteFriends: () => void
}

export function EnhancedProfileScreen({ onBack, onEditProfile, onInviteFriends }: EnhancedProfileScreenProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const userProfile = {
    name: "AYOMIDE FRANCIS-AKINLOLU",
    username: "@ayomisco3",
    avatar: "/placeholder.svg?height=80&width=80",
    isVerified: true,
    joinDate: "January 2024",
    totalTransactions: 1247,
    totalVolume: "₦12,450,000",
    referralCode: "AYOM123",
    level: "Gold",
    achievements: ["Early Adopter", "High Volume Trader", "Referral Master"],
  }

  const stats = [
    { label: "Total Sent", value: "₦8.2M", change: "+12%" },
    { label: "Total Received", value: "₦4.3M", change: "+8%" },
    { label: "Transactions", value: "1,247", change: "+15%" },
    { label: "Referrals", value: "23", change: "+5%" },
  ]

  const recentActivity = [
    { type: "sent", amount: "₦50,000", to: "John Doe", date: "2 hours ago" },
    { type: "received", amount: "₦25,000", from: "Sarah Wilson", date: "1 day ago" },
    { type: "traded", amount: "₦100,000", asset: "BTC", date: "2 days ago" },
  ]

  const handleCopyReferralCode = async () => {
    await navigator.clipboard.writeText(userProfile.referralCode)
  }

  const handleShareProfile = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${userProfile.name} on JetrPay`,
        text: `Check out my JetrPay profile!`,
        url: `https://jetrpay.com/profile/${userProfile.username}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShareProfile}>
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <QrCode className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="p-6 text-center border-b">
        <div className="relative inline-block mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg">AF</AvatarFallback>
          </Avatar>
          <Button size="icon" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full" onClick={onEditProfile}>
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl font-bold">{userProfile.name}</h1>
            {userProfile.isVerified && <Badge className="bg-blue-100 text-blue-800">Verified</Badge>}
          </div>
          <p className="text-green-600 font-medium">{userProfile.username}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Joined {userProfile.joinDate}</span>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
              {userProfile.level} Member
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="text-center">
            <Button size="sm" className="mb-1">
              <Users className="h-4 w-4 mr-1" />
              Chat
            </Button>
            <p className="text-xs text-muted-foreground">Need help?</p>
          </div>
          <div className="text-center">
            <Button size="sm" variant="outline" className="mb-1 bg-transparent" onClick={onInviteFriends}>
              <Gift className="h-4 w-4 mr-1" />
              Tribe
            </Button>
            <p className="text-xs text-muted-foreground">Join our community</p>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="p-4 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Referral Section */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Referral Code</h3>
              <Button size="sm" variant="outline" onClick={handleCopyReferralCode}>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
            <div className="bg-muted p-3 rounded-lg text-center">
              <p className="font-mono text-lg font-bold">{userProfile.referralCode}</p>
              <p className="text-sm text-muted-foreground mt-1">Share this code and earn rewards when friends join!</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="p-4 space-y-3">
          {recentActivity.map((activity, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.type === "sent"
                        ? "bg-red-100"
                        : activity.type === "received"
                          ? "bg-green-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "sent" ? "↗️" : activity.type === "received" ? "↙️" : "🔄"}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === "sent"
                        ? `to ${activity.to}`
                        : activity.type === "received"
                          ? `from ${activity.from}`
                          : `${activity.asset} trade`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{activity.amount}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="p-4 space-y-4">
          {/* Achievements */}
          <div className="space-y-3">
            {userProfile.achievements.map((achievement, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement}</p>
                    <p className="text-sm text-muted-foreground">Achievement unlocked</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Referral Program */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center">
              <Gift className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-medium mb-2">Invite Friends & Earn</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get ₦1,000 for every friend who joins and completes verification
              </p>
              <Button onClick={onInviteFriends}>Invite Friends</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

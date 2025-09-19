"use client"

import { useState } from "react"
import { X, Copy, Share, MessageCircle, Mail, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InviteFriendsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InviteFriendsModal({ isOpen, onClose }: InviteFriendsModalProps) {
  const [referralCode] = useState("AYOM123")
  const [inviteLink] = useState("https://jetrpay.com/invite/AYOM123")
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async (platform: string) => {
    const message = `Join me on JetrPay! Use my referral code ${referralCode} and get ₦1,000 bonus. Download: ${inviteLink}`

    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`)
    } else if (platform === "sms") {
      window.open(`sms:?body=${encodeURIComponent(message)}`)
    } else if (platform === "email") {
      window.open(`mailto:?subject=Join JetrPay&body=${encodeURIComponent(message)}`)
    } else if (navigator.share) {
      await navigator.share({
        title: "Join JetrPay",
        text: message,
        url: inviteLink,
      })
    }
  }

  const referralStats = {
    totalInvites: 23,
    successfulSignups: 18,
    totalEarned: "₦18,000",
    pendingRewards: "₦5,000",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Invite Friends</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <Tabs defaultValue="invite" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="invite">Invite</TabsTrigger>
            <TabsTrigger value="stats">My Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="invite" className="space-y-4">
            {/* Reward Info */}
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">₦1,000</div>
                <p className="text-sm text-green-700">For each friend who joins and verifies their account</p>
              </div>
            </Card>

            {/* Referral Code */}
            <div>
              <label className="text-sm font-medium">Your Referral Code</label>
              <div className="flex gap-2 mt-1">
                <Input value={referralCode} readOnly className="font-mono" />
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Invite Link */}
            <div>
              <label className="text-sm font-medium">Invite Link</label>
              <div className="flex gap-2 mt-1">
                <Input value={inviteLink} readOnly className="text-xs" />
                <Button variant="outline" onClick={handleCopyLink}>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Share Options */}
            <div>
              <label className="text-sm font-medium mb-3 block">Share via</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => handleShare("whatsapp")}
                >
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => handleShare("sms")}
                >
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  SMS
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => handleShare("email")}
                >
                  <Mail className="h-4 w-4 text-red-600" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => handleShare("other")}
                >
                  <Share className="h-4 w-4" />
                  More
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 text-center">
                <div className="text-lg font-bold">{referralStats.totalInvites}</div>
                <div className="text-xs text-muted-foreground">Total Invites</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-lg font-bold">{referralStats.successfulSignups}</div>
                <div className="text-xs text-muted-foreground">Successful</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-lg font-bold text-green-600">{referralStats.totalEarned}</div>
                <div className="text-xs text-muted-foreground">Total Earned</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-lg font-bold text-orange-600">{referralStats.pendingRewards}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </Card>
            </div>

            <Card className="p-4 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-medium mb-2">Keep Inviting!</h3>
              <p className="text-sm text-muted-foreground">
                The more friends you invite, the more you earn. There's no limit!
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

import { Gift, Users, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EarnScreen() {
  const opportunities = [
    {
      id: 1,
      title: "Refer Friends",
      description: "Earn $5 USDC for each friend you refer",
      reward: "$5 USDC",
      icon: Users,
      action: "Share Link",
    },
    {
      id: 2,
      title: "Airtime Cashback",
      description: "Get 2% cashback on all airtime purchases",
      reward: "2% Cashback",
      icon: Zap,
      action: "Buy Airtime",
    },
    {
      id: 3,
      title: "Daily Check-in",
      description: "Check in daily to earn bonus rewards",
      reward: "Up to $1",
      icon: Gift,
      action: "Check In",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold jetrpay-gold">Earn Rewards</h1>
        <p className="text-muted-foreground">Multiple ways to earn with JetrPay</p>
      </div>

      {/* Total Earned */}
      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Total Earned This Month</p>
            <div className="jetrpay-balance text-3xl jetrpay-gold">$47.50</div>
            <p className="text-muted-foreground text-sm">USDC</p>
          </div>
        </CardContent>
      </Card>

      {/* Earning Opportunities */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold jetrpay-gold">Earning Opportunities</h2>

        <div className="space-y-3">
          {opportunities.map((opportunity) => {
            const Icon = opportunity.icon
            return (
              <Card key={opportunity.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{opportunity.title}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                        <p className="text-sm jetrpay-gold font-medium mt-1">{opportunity.reward}</p>
                      </div>
                    </div>
                    <Button size="sm" className="jetrpay-button-primary">
                      {opportunity.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Referral Section */}
      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 jetrpay-gold">
            <Star className="h-5 w-5" />
            Refer & Earn Program
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm">Share JetrPay with friends and family</p>
            <p className="text-xs text-muted-foreground">
              Both you and your friend get $5 USDC when they complete their first transaction
            </p>
          </div>

          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <div>
              <p className="text-sm font-medium">Your Referral Code</p>
              <p className="font-mono text-primary">JETR-FISAYO-2024</p>
            </div>
            <Button size="sm" variant="outline" className="border-primary text-primary bg-transparent">
              Copy
            </Button>
          </div>

          <Button className="w-full jetrpay-button-primary">
            <Users className="h-4 w-4 mr-2" />
            Share Referral Link
          </Button>
        </CardContent>
      </Card>

      {/* Recent Earnings */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold jetrpay-gold">Recent Earnings</h2>

        <div className="space-y-3">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Referral Bonus</p>
                    <p className="text-sm text-muted-foreground">Friend joined JetrPay</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="jetrpay-balance text-green-500">+$5.00</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Airtime Cashback</p>
                    <p className="text-sm text-muted-foreground">MTN ₦1,000 purchase</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="jetrpay-balance text-green-500">+$0.30</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

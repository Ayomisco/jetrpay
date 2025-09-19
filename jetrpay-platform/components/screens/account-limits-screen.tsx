"use client"

import { ArrowLeft, Shield, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface AccountLimitsScreenProps {
  onBack: () => void
  onVerifyAccount: () => void
}

export function AccountLimitsScreen({ onBack, onVerifyAccount }: AccountLimitsScreenProps) {
  const isVerified = false
  const monthlyWithdrawLimit = 29892800 // NGN
  const usedThisMonth = 28984821.15 // NGN
  const remainingLimit = monthlyWithdrawLimit - usedThisMonth
  const usagePercentage = (usedThisMonth / monthlyWithdrawLimit) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-4">Account Limits</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Verification Status */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Your account is</span>
            <Badge variant={isVerified ? "default" : "secondary"} className="bg-gray-100 text-gray-700">
              {isVerified ? "Verified" : "Unverified"}
            </Badge>
          </div>
        </Card>

        {/* Crypto Limits */}
        <div>
          <h2 className="text-lg font-medium mb-4 text-muted-foreground">CRYPTO LIMITS</h2>

          <Card className="p-4 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Send</span>
              </div>
              <span className="font-medium">Unlimited</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Receive</span>
              </div>
              <span className="font-medium">Unlimited</span>
            </div>
          </Card>
        </div>

        {/* Fiat Limits */}
        <div>
          <h2 className="text-lg font-medium mb-4 text-muted-foreground">FIAT LIMITS</h2>

          <Card className="p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <span className="font-medium">Withdraw</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{monthlyWithdrawLimit.toLocaleString()} NGN per month</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={usagePercentage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {usedThisMonth.toLocaleString()} NGN of {monthlyWithdrawLimit.toLocaleString()} NGN left this month
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Deposit</span>
              </div>
              <span className="font-medium">Unlimited</span>
            </div>
          </Card>
        </div>

        {/* Verification CTA */}
        {!isVerified && (
          <Card className="p-6 text-center bg-blue-50 border-blue-200">
            <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-medium mb-2">Protect your account and access all features</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Protect your account and access all features by verifying your identity with a valid government ID.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={onVerifyAccount}>
              Verify your account
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

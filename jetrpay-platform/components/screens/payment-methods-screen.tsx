"use client"

import { ArrowLeft, Building2, Smartphone, CreditCard, Wallet, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PaymentMethodsScreenProps {
  onBack: () => void
  onBankAccounts: () => void
  onOtherAccounts: () => void
  onJetrPay: () => void
  onWalletAddress: () => void
}

export function PaymentMethodsScreen({
  onBack,
  onBankAccounts,
  onOtherAccounts,
  onJetrPay,
  onWalletAddress,
}: PaymentMethodsScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-4">Payment methods</h1>
      </div>

      {/* Payment Methods List */}
      <div className="p-4 space-y-4">
        <Card className="p-4">
          <button className="w-full flex items-center justify-between" onClick={onBankAccounts}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Bank Accounts</h3>
                <p className="text-sm text-muted-foreground">Receive and make payment with your Bank accounts</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </Card>

        <Card className="p-4">
          <button className="w-full flex items-center justify-between" onClick={onOtherAccounts}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Other Accounts</h3>
                <p className="text-sm text-muted-foreground">
                  Receive payments directly with your other accounts such as Pocket, M-PESA e.t.c
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </Card>

        <Card className="p-4">
          <button className="w-full flex items-center justify-between" onClick={onJetrPay}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">JetrPay</h3>
                <p className="text-sm text-muted-foreground">
                  Manage how you Pay with JetrPay on third party platforms.
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </Card>

        <Card className="p-4">
          <button className="w-full flex items-center justify-between" onClick={onWalletAddress}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Wallet Address</h3>
                <p className="text-sm text-muted-foreground">Manage your saved wallet addresses.</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </Card>
      </div>
    </div>
  )
}

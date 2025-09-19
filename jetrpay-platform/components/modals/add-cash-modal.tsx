"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Smartphone, Building, X } from "lucide-react"

interface AddCashModalProps {
  onClose: () => void
  onSuccess: (amount: number, method: string) => void
}

export function AddCashModal({ onClose, onSuccess }: AddCashModalProps) {
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const paymentMethods = [
    { id: "card", name: "Debit Card", icon: CreditCard, fee: "2.5%" },
    { id: "bank", name: "Bank Transfer", icon: Building, fee: "Free" },
    { id: "mobile", name: "Mobile Money", icon: Smartphone, fee: "1.5%" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      onSuccess(Number.parseFloat(amount), selectedMethod)
      setIsProcessing(false)
    }, 2000)
  }

  const calculateFee = () => {
    const amountNum = Number.parseFloat(amount) || 0
    const method = paymentMethods.find((m) => m.id === selectedMethod)
    if (method?.fee === "Free") return 0
    const feePercent = Number.parseFloat(method?.fee.replace("%", "") || "0") / 100
    return amountNum * feePercent
  }

  const totalAmount = (Number.parseFloat(amount) || 0) + calculateFee()

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl jetrpay-gold">Add Cash</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-lg jetrpay-balance bg-input border-border"
                  min="10"
                  max="10000"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">Minimum: $10, Maximum: $10,000</p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <div className="space-y-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={method.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMethod === method.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{method.name}</span>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-sm ${method.fee === "Free" ? "text-green-500" : "text-muted-foreground"}`}
                          >
                            {method.fee}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Fee Breakdown */}
            {amount && (
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Amount</span>
                  <span>${amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fee</span>
                  <span>${calculateFee().toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span className="jetrpay-gold">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            <Button type="submit" disabled={!amount || isProcessing} className="w-full jetrpay-button-primary h-12">
              {isProcessing ? "Processing..." : `Buy $${amount || "0"} USDC`}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">Funds will be available instantly after confirmation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Building2, Smartphone, Shield, Zap, Info } from "lucide-react"
import Link from "next/link"

type PaymentMethod = "card" | "bank" | "mobile_money"

export default function BuyUSDCPage() {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [currency, setCurrency] = useState("NGN")

  // Mock exchange rates
  const exchangeRates = {
    NGN: 1650,
    GHS: 12.5,
    KES: 150,
    ZAR: 18.5,
  }

  const usdcAmount = amount
    ? (Number.parseFloat(amount) / exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2)
    : "0"
  const fees = amount ? (Number.parseFloat(amount) * 0.015).toFixed(2) : "0" // 1.5% fee
  const total = amount ? (Number.parseFloat(amount) + Number.parseFloat(fees)).toFixed(2) : "0"

  const paymentMethods = [
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      description: "Instant processing",
      fee: "1.5%",
      time: "Instant",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building2,
      description: "Lower fees",
      fee: "0.5%",
      time: "1-3 business days",
    },
    {
      id: "mobile_money",
      name: "Mobile Money",
      icon: Smartphone,
      description: "MTN, Airtel, etc.",
      fee: "1.0%",
      time: "5-10 minutes",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-foreground">JetrPay</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Buy USDC</h1>
            <p className="text-muted-foreground">Purchase USDC with your local currency</p>
          </div>

          {/* Amount Input */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Enter Amount</CardTitle>
              <CardDescription>How much USDC would you like to buy?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to spend</Label>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pr-16"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {currency}
                    </div>
                  </div>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">NGN</SelectItem>
                      <SelectItem value="GHS">GHS</SelectItem>
                      <SelectItem value="KES">KES</SelectItem>
                      <SelectItem value="ZAR">ZAR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You will receive:</span>
                  <span className="font-medium text-foreground">{usdcAmount} USDC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Exchange rate:</span>
                  <span className="text-foreground">
                    1 USD = {exchangeRates[currency as keyof typeof exchangeRates]} {currency}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
              <CardDescription>Choose how you'd like to pay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={method.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            {method.fee}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{method.time}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-foreground">
                    {amount || "0"} {currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing fee:</span>
                  <span className="text-foreground">
                    {fees} {currency}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Total:</span>
                  <span className="text-foreground">
                    {total} {currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You receive:</span>
                  <span className="font-medium text-primary">{usdcAmount} USDC</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Processing Time</p>
                    <p>
                      {paymentMethod === "card" && "Your USDC will be delivered instantly after payment confirmation."}
                      {paymentMethod === "bank" && "Bank transfers take 1-3 business days to process."}
                      {paymentMethod === "mobile_money" && "Mobile money payments are processed within 5-10 minutes."}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" disabled={!amount || Number.parseFloat(amount) <= 0}>
                <Shield className="h-4 w-4 mr-2" />
                Continue to Payment
              </Button>

              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3" />
                  <span>Instant Delivery</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

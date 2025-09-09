"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, QrCode, User, Wallet, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SendUSDCPage() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")
  const [recipientType, setRecipientType] = useState<"address" | "email" | "phone">("address")

  // Mock user balance
  const balance = 1250.75
  const networkFee = 0.01 // Flow network fee
  const total = amount ? Number.parseFloat(amount) + networkFee : 0

  const isValidAmount = amount && Number.parseFloat(amount) > 0 && Number.parseFloat(amount) <= balance
  const isValidRecipient = recipient.length > 0

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
            <h1 className="text-2xl font-bold text-foreground">Send USDC</h1>
            <p className="text-muted-foreground">Send USDC to anyone, anywhere in the world</p>
          </div>

          {/* Balance Display */}
          <Card className="border-border bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Available Balance:</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{balance.toLocaleString()} USDC</p>
                  <p className="text-xs text-muted-foreground">≈ ${balance.toLocaleString()} USD</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipient */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Recipient</span>
              </CardTitle>
              <CardDescription>Enter the recipient's wallet address, email, or phone number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button
                  variant={recipientType === "address" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRecipientType("address")}
                  className={recipientType !== "address" ? "bg-transparent" : ""}
                >
                  Wallet Address
                </Button>
                <Button
                  variant={recipientType === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRecipientType("email")}
                  className={recipientType !== "email" ? "bg-transparent" : ""}
                >
                  Email
                </Button>
                <Button
                  variant={recipientType === "phone" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRecipientType("phone")}
                  className={recipientType !== "phone" ? "bg-transparent" : ""}
                >
                  Phone
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">
                  {recipientType === "address" && "Wallet Address"}
                  {recipientType === "email" && "Email Address"}
                  {recipientType === "phone" && "Phone Number"}
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="recipient"
                    placeholder={
                      recipientType === "address"
                        ? "0x1234...5678"
                        : recipientType === "email"
                          ? "recipient@example.com"
                          : "+234 800 000 0000"
                    }
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon" className="bg-transparent">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {recipientType === "address" && recipient && (
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">Valid Flow wallet address</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Amount */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Amount</CardTitle>
              <CardDescription>How much USDC would you like to send?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USDC)</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pr-16"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDC</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount((balance * 0.25).toFixed(2))}
                  className="bg-transparent"
                >
                  25%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount((balance * 0.5).toFixed(2))}
                  className="bg-transparent"
                >
                  50%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount((balance * 0.75).toFixed(2))}
                  className="bg-transparent"
                >
                  75%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount((balance - networkFee).toFixed(2))}
                  className="bg-transparent"
                >
                  Max
                </Button>
              </div>

              {amount && Number.parseFloat(amount) > balance && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">Insufficient balance</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Memo */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Memo (Optional)</CardTitle>
              <CardDescription>Add a note for this transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Payment for services, gift, etc."
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Transaction Summary */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-foreground">{amount || "0"} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network fee:</span>
                  <span className="text-foreground">{networkFee} USDC</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Total:</span>
                  <span className="text-foreground">{total.toFixed(2)} USDC</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Send className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Fast & Secure</p>
                    <p>Your transaction will be processed on the Flow blockchain and confirmed within seconds.</p>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" disabled={!isValidAmount || !isValidRecipient}>
                <Send className="h-4 w-4 mr-2" />
                Send {amount || "0"} USDC
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

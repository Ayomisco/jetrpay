"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { QrCode, X, Copy, Share, Mail } from "lucide-react"

interface NewPaymentModalProps {
  onClose: () => void
  onSuccess: (amount: number, description: string) => void
}

export function NewPaymentModal({ onClose, onSuccess }: NewPaymentModalProps) {
  const [step, setStep] = useState<"create" | "generated">("create")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [paymentLink, setPaymentLink] = useState("")
  const [qrCode, setQrCode] = useState("")

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate payment link and QR code
    const link = `https://jetrpay.app/pay/${Math.random().toString(36).substr(2, 9)}`
    setPaymentLink(link)
    setQrCode(link) // In real app, this would be a QR code
    setStep("generated")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink)
    // Show toast notification
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "JetrPay Payment Request",
        text: `Payment request for $${amount} - ${description}`,
        url: paymentLink,
      })
    }
  }

  if (step === "generated") {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl jetrpay-gold">Payment Created</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Payment Summary */}
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-sm">Payment Request</p>
              <div className="jetrpay-balance text-3xl jetrpay-gold">${amount}</div>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                ))}
              </div>
            </div>

            {/* Payment Link */}
            <div className="space-y-2">
              <Label>Payment Link</Label>
              <div className="flex gap-2">
                <Input value={paymentLink} readOnly className="bg-muted text-sm font-mono" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleShare}
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>

            <Button
              onClick={() => onSuccess(Number.parseFloat(amount), description)}
              className="w-full jetrpay-button-primary"
            >
              Done
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl jetrpay-gold">New Payment Request</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Amount */}
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
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What is this payment for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-input border-border resize-none"
                rows={3}
                required
              />
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <Label>Payment Options</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Auto-convert to fiat</span>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    On
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Payment expiry</span>
                  <span className="text-sm text-muted-foreground">24 hours</span>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={!amount || !description} className="w-full jetrpay-button-primary h-12">
              <QrCode className="h-4 w-4 mr-2" />
              Generate Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

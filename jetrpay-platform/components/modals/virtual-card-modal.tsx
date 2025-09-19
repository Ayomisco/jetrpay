"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, CreditCard, Eye, EyeOff, Copy, RotateCcw } from "lucide-react"

interface VirtualCardModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function VirtualCardModal({ onClose, onSuccess }: VirtualCardModalProps) {
  const [step, setStep] = useState<"create" | "details">("create")
  const [cardName, setCardName] = useState("")
  const [fundAmount, setFundAmount] = useState("")
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const cardDetails = {
    number: "4532 1234 5678 9012",
    cvv: "123",
    expiry: "12/28",
    name: "FISAYO NNAMDI",
  }

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    setTimeout(() => {
      setIsCreating(false)
      setStep("details")
    }, 2000)
  }

  const handleCopyDetail = (detail: string) => {
    navigator.clipboard.writeText(detail)
    // Show toast notification
  }

  if (step === "details") {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl jetrpay-gold">Virtual Card Created</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Virtual Card Display */}
            <div className="relative">
              <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20 overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Balance</p>
                        <p className="jetrpay-balance text-2xl jetrpay-gold">${fundAmount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Mastercard</p>
                        <div className="w-8 h-6 bg-primary rounded-sm mt-1"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Card Number</p>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-lg">
                          {showCardDetails ? cardDetails.number : "**** **** **** 9012"}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowCardDetails(!showCardDetails)}
                          className="h-6 w-6"
                        >
                          {showCardDetails ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Cardholder</p>
                        <p className="font-medium">{cardDetails.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Expires</p>
                        <p className="font-medium">{cardDetails.expiry}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Card Details */}
            {showCardDetails && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Card Number</p>
                    <p className="font-mono text-sm">{cardDetails.number}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyDetail(cardDetails.number.replace(/\s/g, ""))}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">CVV</p>
                      <p className="font-mono text-sm">{cardDetails.cvv}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleCopyDetail(cardDetails.cvv)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Expiry</p>
                      <p className="font-mono text-sm">{cardDetails.expiry}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleCopyDetail(cardDetails.expiry)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500/10 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Freeze Card
              </Button>
              <Button
                onClick={() => {
                  onSuccess()
                  onClose()
                }}
                className="jetrpay-button-primary"
              >
                Done
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">Use this card for online purchases and subscriptions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl jetrpay-gold">Create Virtual Card</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleCreateCard} className="space-y-4">
            {/* Card Name */}
            <div className="space-y-2">
              <Label htmlFor="cardName">Card Name</Label>
              <Input
                id="cardName"
                placeholder="e.g., Netflix Card, Shopping Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="bg-input border-border"
                required
              />
            </div>

            {/* Initial Funding */}
            <div className="space-y-2">
              <Label htmlFor="fundAmount">Initial Funding (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="fundAmount"
                  type="number"
                  placeholder="0.00"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="pl-8 text-lg jetrpay-balance bg-input border-border"
                  min="10"
                  max="5000"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">Minimum: $10, Maximum: $5,000</p>
            </div>

            {/* Card Features */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h3 className="font-medium text-sm">Card Features</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Instant creation and funding</li>
                <li>• Works with all online merchants</li>
                <li>• Real-time transaction notifications</li>
                <li>• Freeze/unfreeze anytime</li>
                <li>• No monthly fees</li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={!cardName || !fundAmount || isCreating}
              className="w-full jetrpay-button-primary h-12"
            >
              {isCreating ? (
                <>
                  <CreditCard className="h-4 w-4 mr-2 animate-pulse" />
                  Creating Card...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Create Virtual Card
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

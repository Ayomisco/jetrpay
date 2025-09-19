"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, X, Scan, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SendModalProps {
  onClose: () => void
  onSuccess: (amount: number, recipient: string) => void
}

export function SendModal({ onClose, onSuccess }: SendModalProps) {
  const [step, setStep] = useState<"recipient" | "amount" | "confirm">("recipient")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const recentContacts = [
    { id: 1, name: "John Doe", address: "0x1234...5678", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Sarah Wilson", address: "0x9876...4321", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Mike Johnson", address: "0x5555...9999", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  const handleSubmit = () => {
    setIsProcessing(true)
    setTimeout(() => {
      onSuccess(Number.parseFloat(amount), recipient)
      setIsProcessing(false)
    }, 2000)
  }

  const renderRecipientStep = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address or Username</Label>
        <Input
          id="recipient"
          placeholder="0x... or @username"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="bg-input border-border"
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 bg-transparent">
          <QrCode className="h-4 w-4 mr-2" />
          Scan QR
        </Button>
        <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 bg-transparent">
          <Scan className="h-4 w-4 mr-2" />
          Paste
        </Button>
      </div>

      <div className="space-y-3">
        <Label>Recent Contacts</Label>
        <div className="space-y-2">
          {recentContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => {
                setRecipient(contact.address)
                setStep("amount")
              }}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground font-mono">{contact.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={() => setStep("amount")} disabled={!recipient} className="w-full jetrpay-button-primary h-12">
        Continue
      </Button>
    </div>
  )

  const renderAmountStep = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (USDC)</Label>
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
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Available: $3,721.87</span>
          <Button variant="link" className="p-0 h-auto text-primary text-sm">
            Max
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Input
          id="note"
          placeholder="What's this for?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="bg-input border-border"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep("recipient")} className="flex-1">
          Back
        </Button>
        <Button onClick={() => setStep("confirm")} disabled={!amount} className="flex-1 jetrpay-button-primary">
          Review
        </Button>
      </div>
    </div>
  )

  const renderConfirmStep = () => (
    <div className="space-y-4">
      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Sending</p>
          <p className="text-2xl jetrpay-balance jetrpay-gold">${amount}</p>
          <p className="text-sm text-muted-foreground">USDC</p>
        </div>

        <div className="border-t border-border pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>To</span>
            <span className="font-mono">
              {recipient.slice(0, 6)}...{recipient.slice(-4)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Network Fee</span>
            <span>$0.01</span>
          </div>
          {note && (
            <div className="flex justify-between text-sm">
              <span>Note</span>
              <span>{note}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep("amount")} className="flex-1">
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isProcessing} className="flex-1 jetrpay-button-primary">
          {isProcessing ? "Sending..." : "Send Now"}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl jetrpay-gold">
            {step === "recipient" ? "Send To" : step === "amount" ? "Enter Amount" : "Confirm Send"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {step === "recipient" && renderRecipientStep()}
          {step === "amount" && renderAmountStep()}
          {step === "confirm" && renderConfirmStep()}
        </CardContent>
      </Card>
    </div>
  )
}

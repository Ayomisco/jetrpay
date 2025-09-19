"use client"

import { useState } from "react"
import { X, QrCode, Users, Clock, Scan, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EnhancedSendModalProps {
  isOpen: boolean
  onClose: () => void
  asset: {
    symbol: string
    name: string
    balance: string
    balanceUSD: string
  }
}

export function EnhancedSendModal({ isOpen, onClose, asset }: EnhancedSendModalProps) {
  const [activeTab, setActiveTab] = useState("single")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const recentContacts = [
    { name: "John Doe", address: "0x742d35...D4C0532925", avatar: "👤" },
    { name: "Sarah Wilson", address: "0x8f3b21...A9E7F2B1C3", avatar: "👩" },
    { name: "Mike Johnson", address: "0x1a2b3c...F8E9D0A1B2", avatar: "👨" },
  ]

  const handleSend = () => {
    setShowConfirmation(true)
  }

  const confirmSend = () => {
    // Handle send logic here
    setShowConfirmation(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Send {asset.symbol}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {!showConfirmation ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="single">Single</TabsTrigger>
              <TabsTrigger value="multiple">Multiple</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4">
              {/* Recipient */}
              <div>
                <Label>Recipient</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    placeholder="Enter wallet address or username"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Scan className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Recent Contacts */}
              <div>
                <Label className="text-sm text-muted-foreground">Recent</Label>
                <div className="flex gap-2 mt-2">
                  {recentContacts.map((contact, index) => (
                    <button
                      key={index}
                      className="flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setRecipient(contact.address)}
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm mb-1">
                        {contact.avatar}
                      </div>
                      <span className="text-xs">{contact.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <Label>Amount</Label>
                <div className="relative mt-1">
                  <Input
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-right pr-16"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    {asset.symbol}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Available: {asset.balance} {asset.symbol}
                </div>
              </div>

              {/* Note */}
              <div>
                <Label>Note (Optional)</Label>
                <Input
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button className="w-full" onClick={handleSend}>
                Continue
              </Button>
            </TabsContent>

            <TabsContent value="multiple" className="space-y-4">
              <Card className="p-4 text-center">
                <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-medium mb-2">Send to Multiple Recipients</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send {asset.symbol} to multiple wallet addresses at once
                </p>
                <Button>Add Recipients</Button>
              </Card>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              <Card className="p-4 text-center">
                <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-medium mb-2">Schedule Transaction</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule your {asset.symbol} transaction for a later time
                </p>
                <Button>Set Schedule</Button>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          /* Confirmation Screen */
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="text-2xl font-bold mb-2">
                {amount} {asset.symbol}
              </div>
              <div className="text-muted-foreground">≈ ${(Number.parseFloat(amount) * 0.018908).toFixed(2)}</div>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To</span>
                  <span className="font-mono text-sm">
                    {recipient.slice(0, 10)}...{recipient.slice(-6)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span>0.001 {asset.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">
                    {(Number.parseFloat(amount) + 0.001).toFixed(3)} {asset.symbol}
                  </span>
                </div>
              </div>
            </Card>

            {note && (
              <Card className="p-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Note: </span>
                  {note}
                </div>
              </Card>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Double-check the recipient address. Transactions cannot be reversed.</AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                Back
              </Button>
              <Button className="flex-1" onClick={confirmSend}>
                Confirm Send
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

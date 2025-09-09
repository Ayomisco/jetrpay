"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, QrCode, Copy, Share, LinkIcon, Download } from "lucide-react"
import Link from "next/link"

export default function ReceivePage() {
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")
  const [copied, setCopied] = useState(false)

  // Mock wallet address
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678"
  const paymentLink = `https://jetrpay.com/pay/${walletAddress}${amount ? `?amount=${amount}` : ""}`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <h1 className="text-2xl font-bold text-foreground">Receive USDC</h1>
            <p className="text-muted-foreground">Share your wallet address or create a payment request</p>
          </div>

          {/* QR Code */}
          <Card className="border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Your Wallet QR Code</CardTitle>
              <CardDescription>Scan to send USDC to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="mx-auto w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center space-y-2">
                  <QrCode className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">QR Code</p>
                </div>
              </div>
              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </CardContent>
          </Card>

          {/* Wallet Address */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Your Wallet Address</CardTitle>
              <CardDescription>Share this address to receive USDC payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Flow Wallet Address</Label>
                <div className="flex space-x-2">
                  <Input id="address" value={walletAddress} readOnly className="font-mono text-sm bg-muted/30" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(walletAddress)}
                    className="bg-transparent"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {copied && (
                <div className="text-sm text-green-600 flex items-center space-x-1">
                  <span>✓ Copied to clipboard</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Request */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Create Payment Request</CardTitle>
              <CardDescription>Generate a payment link with a specific amount</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="requestAmount">Amount (USDC) - Optional</Label>
                <Input
                  id="requestAmount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestMemo">Description - Optional</Label>
                <Textarea
                  id="requestMemo"
                  placeholder="Payment for services, invoice #123, etc."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>

              {amount && (
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Requesting:</span>
                    <Badge variant="secondary" className="text-sm">
                      {amount} USDC
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Link */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Payment Link</CardTitle>
              <CardDescription>Share this link to request payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentLink">Payment URL</Label>
                <div className="flex space-x-2">
                  <Input id="paymentLink" value={paymentLink} readOnly className="font-mono text-sm bg-muted/30" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(paymentLink)}
                    className="bg-transparent"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <QrCode className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Security Tips</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Only share your wallet address with trusted parties</li>
                  <li>• Verify the sender before confirming large transactions</li>
                  <li>• Payment links expire after 30 days for security</li>
                  <li>• Always double-check the amount before sharing payment requests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

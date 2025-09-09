"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, QrCode, Download, Printer, Share, Store, Smartphone } from "lucide-react"
import Link from "next/link"

export default function QRCodePage() {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [allowCustomAmount, setAllowCustomAmount] = useState(false)
  const [businessName, setBusinessName] = useState("Tokunbo's Electronics")
  const [qrSize, setQrSize] = useState("medium")

  const qrSizes = {
    small: { size: "200x200", label: "Small (200x200)" },
    medium: { size: "300x300", label: "Medium (300x300)" },
    large: { size: "400x400", label: "Large (400x400)" },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/merchant" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-foreground">JetrPay</span>
              <Badge variant="outline">Merchant</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-foreground">Generate QR Code</h1>
            <p className="text-muted-foreground">Create QR codes for in-person payments and point-of-sale</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">QR Code Settings</CardTitle>
                  <CardDescription>Configure your payment QR code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (Optional)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={allowCustomAmount}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="USDC">USDC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="customAmount">Allow custom amount</Label>
                      <p className="text-sm text-muted-foreground">Let customers enter their own amount</p>
                    </div>
                    <Switch id="customAmount" checked={allowCustomAmount} onCheckedChange={setAllowCustomAmount} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qrSize">QR Code Size</Label>
                    <Select value={qrSize} onValueChange={setQrSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">{qrSizes.small.label}</SelectItem>
                        <SelectItem value="medium">{qrSizes.medium.label}</SelectItem>
                        <SelectItem value="large">{qrSizes.large.label}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Use Cases</CardTitle>
                  <CardDescription>How to use your QR codes effectively</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Store className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Point of Sale</h4>
                      <p className="text-sm text-muted-foreground">
                        Display at your checkout counter for quick payments
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Mobile Payments</h4>
                      <p className="text-sm text-muted-foreground">Show on your phone screen for instant payments</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Printer className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Print & Display</h4>
                      <p className="text-sm text-muted-foreground">Print on receipts, flyers, or business cards</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* QR Code Preview */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">QR Code Preview</CardTitle>
                  <CardDescription>Your generated QR code</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="mx-auto bg-white p-6 rounded-lg border-2 border-dashed border-border inline-block">
                    <div
                      className={`mx-auto bg-muted rounded-lg flex items-center justify-center ${
                        qrSize === "small" ? "w-48 h-48" : qrSize === "medium" ? "w-64 h-64" : "w-80 h-80"
                      }`}
                    >
                      <div className="text-center space-y-2">
                        <QrCode className="h-16 w-16 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">QR Code</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <p className="font-medium text-foreground">{businessName}</p>
                      {!allowCustomAmount && amount && (
                        <p className="text-sm text-muted-foreground">
                          ${amount} {currency}
                        </p>
                      )}
                      {allowCustomAmount && <p className="text-sm text-muted-foreground">Customer enters amount</p>}
                      <p className="text-xs text-muted-foreground">Scan to pay with USDC</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Download & Share</CardTitle>
                  <CardDescription>Get your QR code in different formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download SVG
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Printer className="h-4 w-4 mr-2" />
                    Print QR Code
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Share className="h-4 w-4 mr-2" />
                    Share QR Code
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <QrCode className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800 mb-1">QR Code Benefits</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Instant payments without typing wallet addresses</li>
                      <li>• Works with any USDC-compatible wallet</li>
                      <li>• Perfect for in-person transactions</li>
                      <li>• No internet required for display</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

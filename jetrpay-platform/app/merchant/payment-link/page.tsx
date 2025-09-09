"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, LinkIcon, Copy, Share, Eye, Settings, QrCode } from "lucide-react"
import Link from "next/link"

export default function PaymentLinkPage() {
  const [amount, setAmount] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [allowCustomAmount, setAllowCustomAmount] = useState(false)
  const [expiryDays, setExpiryDays] = useState("30")
  const [copied, setCopied] = useState(false)

  const paymentLink = `https://pay.jetrpay.com/${title.toLowerCase().replace(/\s+/g, "-") || "payment"}${
    amount ? `?amount=${amount}` : ""
  }`

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            <h1 className="text-2xl font-bold text-foreground">Create Payment Link</h1>
            <p className="text-muted-foreground">Generate a secure payment link to share with customers</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Payment Details</CardTitle>
                  <CardDescription>Configure your payment request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Payment Title *</Label>
                    <Input
                      id="title"
                      placeholder="Product name or service description"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Additional details about the payment"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
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
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Advanced Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Link Expiry</Label>
                    <Select value={expiryDays} onValueChange={setExpiryDays}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="never">Never expires</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Success URL (Optional)</Label>
                    <Input placeholder="https://yoursite.com/success" />
                  </div>

                  <div className="space-y-2">
                    <Label>Cancel URL (Optional)</Label>
                    <Input placeholder="https://yoursite.com/cancel" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <span>Preview</span>
                  </CardTitle>
                  <CardDescription>How your payment page will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg p-6 bg-muted/30">
                    <div className="text-center space-y-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                        <LinkIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{title || "Payment Title"}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {description || "Payment description will appear here"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {!allowCustomAmount && amount && (
                          <div className="text-2xl font-bold text-foreground">
                            ${amount} {currency}
                          </div>
                        )}
                        {allowCustomAmount && (
                          <div className="space-y-2">
                            <Input placeholder="Enter amount" className="text-center" />
                            <p className="text-xs text-muted-foreground">Customer can enter amount</p>
                          </div>
                        )}
                      </div>
                      <Button className="w-full">Pay with USDC</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Generated Link</CardTitle>
                  <CardDescription>Share this link with your customers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Payment URL</Label>
                    <div className="flex space-x-2">
                      <Input value={paymentLink} readOnly className="font-mono text-sm bg-muted/30" />
                      <Button variant="outline" size="icon" onClick={handleCopy} className="bg-transparent">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    {copied && (
                      <p className="text-sm text-green-600 flex items-center space-x-1">
                        <span>✓ Copied to clipboard</span>
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Create Link
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Share className="h-4 w-4 mr-2" />
                    Share Link
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <LinkIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Payment Link Benefits</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• No coding required - share via email, SMS, or social media</li>
                      <li>• Secure USDC payments with instant settlement</li>
                      <li>• Mobile-optimized checkout experience</li>
                      <li>• Real-time payment notifications</li>
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

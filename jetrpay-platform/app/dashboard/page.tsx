"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Copy,
  QrCode,
  Send,
  Download,
  TrendingUp,
  Wallet,
  CreditCard,
  History,
} from "lucide-react"
import Link from "next/link"
import { KYCStatusBadge } from "@/components/kyc-status-badge"

export default function DashboardPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)

  // Mock data - would come from your backend
  const user = {
    name: "John Doe",
    email: "john@example.com",
    kycStatus: "approved" as const,
    walletAddress: "0x1234...5678",
  }

  const balance = {
    usdc: 1250.75,
    usd: 1250.75, // 1:1 with USDC
  }

  const recentTransactions = [
    {
      id: "1",
      type: "receive",
      amount: 500,
      currency: "USDC",
      from: "Client Payment",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "2",
      type: "send",
      amount: 150,
      currency: "USDC",
      to: "Supplier Payment",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: "3",
      type: "buy",
      amount: 1000,
      currency: "USDC",
      from: "Bank Transfer",
      date: "2024-01-13",
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-foreground">JetrPay</span>
            </div>
            <div className="flex items-center space-x-4">
              <KYCStatusBadge status={user.kycStatus} />
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Balance Card */}
          <Card className="border-border bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">Total Balance</CardTitle>
                  <CardDescription>Your USDC wallet balance</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-foreground">
                    {balanceVisible ? `$${balance.usd.toLocaleString()}` : "••••••"}
                  </span>
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{balanceVisible ? `${balance.usdc.toLocaleString()} USDC` : "•••••• USDC"}</span>
                  <Badge variant="secondary" className="text-xs">
                    Flow Network
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" />
                <span className="font-mono">{user.walletAddress}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1" asChild>
                  <Link href="/buy">
                    <Plus className="h-4 w-4 mr-2" />
                    Buy USDC
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/sell">
                    <Minus className="h-4 w-4 mr-2" />
                    Sell USDC
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/send">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border hover:bg-muted/30 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Receive Payment</p>
                <p className="text-xs text-muted-foreground">Generate QR code</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:bg-muted/30 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Payment Link</p>
                <p className="text-xs text-muted-foreground">Create payment link</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:bg-muted/30 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Withdraw</p>
                <p className="text-xs text-muted-foreground">To bank account</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:bg-muted/30 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">History</p>
                <p className="text-xs text-muted-foreground">View all transactions</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                    <Button variant="outline" size="sm" className="bg-transparent" asChild>
                      <Link href="/transactions">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              transaction.type === "receive"
                                ? "bg-green-100 text-green-600"
                                : transaction.type === "send"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {transaction.type === "receive" ? (
                              <ArrowDownLeft className="h-5 w-5" />
                            ) : transaction.type === "send" ? (
                              <ArrowUpRight className="h-5 w-5" />
                            ) : (
                              <Plus className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {transaction.type === "receive"
                                ? `Received from ${transaction.from}`
                                : transaction.type === "send"
                                  ? `Sent to ${transaction.to}`
                                  : `Bought USDC via ${transaction.from}`}
                            </p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              transaction.type === "receive" ? "text-green-600" : "text-foreground"
                            }`}
                          >
                            {transaction.type === "receive" ? "+" : transaction.type === "send" ? "-" : "+"}$
                            {transaction.amount.toLocaleString()} {transaction.currency}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Monthly Volume</span>
                    </CardTitle>
                    <CardDescription>Your transaction volume this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">$12,450</div>
                      <div className="text-sm text-green-600">+15% from last month</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction Count</CardTitle>
                    <CardDescription>Number of transactions this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">47</div>
                      <div className="text-sm text-green-600">+8 from last month</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive transaction alerts</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">API Keys</p>
                      <p className="text-sm text-muted-foreground">Manage your API access</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

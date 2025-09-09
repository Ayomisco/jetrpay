"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Plus,
  QrCode,
  LinkIcon,
  Download,
  Settings,
  BarChart3,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"
import { KYCStatusBadge } from "@/components/kyc-status-badge"

export default function MerchantDashboardPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)

  // Mock merchant data
  const merchant = {
    name: "Tokunbo's Electronics",
    email: "tokunbo@electronics.ng",
    kycStatus: "approved" as const,
    businessType: "Electronics Retail",
  }

  const stats = {
    totalRevenue: 45750.25,
    monthlyRevenue: 12450.75,
    totalTransactions: 342,
    monthlyTransactions: 89,
    averageTransaction: 139.85,
    pendingSettlement: 2340.5,
  }

  const recentTransactions = [
    {
      id: "1",
      customer: "John Doe",
      amount: 299.99,
      product: "Wireless Headphones",
      date: "2024-01-15",
      status: "completed",
      paymentMethod: "USDC",
    },
    {
      id: "2",
      customer: "Sarah Wilson",
      amount: 89.5,
      product: "Phone Case",
      date: "2024-01-15",
      status: "completed",
      paymentMethod: "USDC",
    },
    {
      id: "3",
      customer: "Mike Johnson",
      amount: 1299.0,
      product: "Laptop",
      date: "2024-01-14",
      status: "pending",
      paymentMethod: "USDC",
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
              <Badge variant="outline" className="ml-2">
                Merchant
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <KYCStatusBadge status={merchant.kycStatus} />
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{merchant.name}</p>
                <p className="text-xs text-muted-foreground">{merchant.businessType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {balanceVisible ? `$${stats.totalRevenue.toLocaleString()}` : "••••••"}
                </div>
                <p className="text-xs text-muted-foreground">All time earnings</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {balanceVisible ? `$${stats.monthlyRevenue.toLocaleString()}` : "••••••"}
                </div>
                <p className="text-xs text-green-600">+15% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalTransactions}</div>
                <p className="text-xs text-muted-foreground">{stats.monthlyTransactions} this month</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {balanceVisible ? `$${stats.averageTransaction}` : "••••"}
                </div>
                <p className="text-xs text-green-600">+8% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Balance & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-border bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">Available Balance</CardTitle>
                    <CardDescription>Ready for settlement</CardDescription>
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
                      {balanceVisible ? `$${stats.pendingSettlement.toLocaleString()}` : "••••••"}
                    </span>
                    <span className="text-sm text-muted-foreground">USDC</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Pending settlement from recent sales</p>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Withdraw to Bank
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Payout
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Create payment tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/merchant/payment-link">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Create Payment Link
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/merchant/qr-code">
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Code
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/merchant/invoice">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/merchant/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                    <Button variant="outline" size="sm" className="bg-transparent" asChild>
                      <Link href="/merchant/transactions">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{transaction.customer}</p>
                            <p className="text-sm text-muted-foreground">{transaction.product}</p>
                            <p className="text-xs text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">${transaction.amount.toLocaleString()}</p>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={transaction.status === "completed" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {transaction.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{transaction.paymentMethod}</span>
                          </div>
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
                    <CardTitle className="text-lg">Revenue Trend</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Revenue Chart</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Products</CardTitle>
                    <CardDescription>Best selling items</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground">Wireless Headphones</span>
                      <span className="text-sm font-medium text-foreground">$2,999</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground">Smartphones</span>
                      <span className="text-sm font-medium text-foreground">$8,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground">Laptops</span>
                      <span className="text-sm font-medium text-foreground">$15,600</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Customer Overview</CardTitle>
                  <CardDescription>Your customer base insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">156</div>
                      <p className="text-sm text-muted-foreground">Total Customers</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">23</div>
                      <p className="text-sm text-muted-foreground">New This Month</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">89%</div>
                      <p className="text-sm text-muted-foreground">Repeat Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Tools</CardTitle>
                    <CardDescription>Create payment solutions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" asChild>
                      <Link href="/merchant/payment-link">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Payment Links
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/merchant/qr-code">
                        <QrCode className="h-4 w-4 mr-2" />
                        QR Codes
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/merchant/invoice">
                        <Plus className="h-4 w-4 mr-2" />
                        Invoices
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Integration</CardTitle>
                    <CardDescription>Connect with your systems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      API Keys
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Webhooks
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

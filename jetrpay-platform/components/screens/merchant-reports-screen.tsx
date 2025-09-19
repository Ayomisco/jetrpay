"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, Users, CreditCard } from "lucide-react"

export function MerchantReportsScreen() {
  const [dateRange, setDateRange] = useState("7d")

  const salesData = [
    { name: "Mon", sales: 1200, transactions: 45 },
    { name: "Tue", sales: 1900, transactions: 67 },
    { name: "Wed", sales: 800, transactions: 32 },
    { name: "Thu", sales: 2400, transactions: 89 },
    { name: "Fri", sales: 3200, transactions: 112 },
    { name: "Sat", sales: 2800, transactions: 98 },
    { name: "Sun", sales: 1600, transactions: 56 },
  ]

  const paymentMethodData = [
    { name: "USDC", value: 65, color: "#FFD600" },
    { name: "Card", value: 25, color: "#10B981" },
    { name: "Bank", value: 10, color: "#8B5CF6" },
  ]

  const topCustomers = [
    { id: 1, name: "John Doe", email: "john@example.com", spent: "$2,450.00", orders: 12 },
    { id: 2, name: "Sarah Wilson", email: "sarah@example.com", spent: "$1,890.00", orders: 8 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", spent: "$1,650.00", orders: 15 },
    { id: 4, name: "Emma Davis", email: "emma@example.com", spent: "$1,200.00", orders: 6 },
  ]

  const recentTransactions = [
    { id: 1, customer: "John Doe", amount: "$125.50", method: "USDC", time: "2 hours ago", status: "completed" },
    { id: 2, customer: "Sarah Wilson", amount: "$89.99", method: "Card", time: "4 hours ago", status: "completed" },
    { id: 3, customer: "Mike Johnson", amount: "$234.00", method: "USDC", time: "6 hours ago", status: "completed" },
    { id: 4, customer: "Emma Davis", amount: "$67.50", method: "Bank", time: "8 hours ago", status: "pending" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold jetrpay-gold">Sales Reports</h1>
          <p className="text-muted-foreground text-sm">Track your business performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total Sales</span>
            </div>
            <p className="jetrpay-balance text-xl jetrpay-gold">$14,200</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Transactions</span>
            </div>
            <p className="jetrpay-balance text-xl jetrpay-gold">499</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+8.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Customers</span>
            </div>
            <p className="jetrpay-balance text-xl jetrpay-gold">247</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+15 new</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Avg. Order</span>
            </div>
            <p className="jetrpay-balance text-xl jetrpay-gold">$28.46</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-xs text-red-500">-2.1%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Sales Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg jetrpay-gold">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#D1D5DB" />
                    <YAxis stroke="#D1D5DB" />
                    <Bar dataKey="sales" fill="#FFD600" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg jetrpay-gold">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={paymentMethodData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {paymentMethodData.map((method) => (
                    <div key={method.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                        <span className="text-sm">{method.name}</span>
                      </div>
                      <span className="text-sm font-medium">{method.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg jetrpay-gold">Transaction Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#D1D5DB" />
                      <YAxis stroke="#D1D5DB" />
                      <Line type="monotone" dataKey="transactions" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg jetrpay-gold">Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="jetrpay-balance jetrpay-gold">{customer.spent}</p>
                      <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg jetrpay-gold">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{tx.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {tx.time} • {tx.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="jetrpay-balance jetrpay-gold">{tx.amount}</p>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${tx.status === "completed" ? "bg-green-500" : "bg-orange-500"}`}
                        />
                        <span className="text-xs text-muted-foreground capitalize">{tx.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

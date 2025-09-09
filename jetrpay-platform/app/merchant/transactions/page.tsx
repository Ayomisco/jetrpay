"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Download,
  Eye,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"
import Link from "next/link"

export default function MerchantTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("30")

  // Mock transaction data
  const transactions = [
    {
      id: "TXN-001",
      customer: "John Doe",
      email: "john@example.com",
      amount: 299.99,
      product: "Wireless Headphones",
      date: "2024-01-15",
      time: "14:30",
      status: "completed",
      paymentMethod: "USDC",
      txHash: "0xabc123...",
    },
    {
      id: "TXN-002",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      amount: 89.5,
      product: "Phone Case",
      date: "2024-01-15",
      time: "12:15",
      status: "completed",
      paymentMethod: "USDC",
      txHash: "0xdef456...",
    },
    {
      id: "TXN-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      amount: 1299.0,
      product: "Laptop",
      date: "2024-01-14",
      time: "16:45",
      status: "pending",
      paymentMethod: "USDC",
      txHash: "0xghi789...",
    },
    {
      id: "TXN-004",
      customer: "Emma Davis",
      email: "emma@example.com",
      amount: 45.99,
      product: "USB Cable",
      date: "2024-01-14",
      time: "10:20",
      status: "completed",
      paymentMethod: "USDC",
      txHash: "0xjkl012...",
    },
    {
      id: "TXN-005",
      customer: "David Brown",
      email: "david@example.com",
      amount: 199.99,
      product: "Bluetooth Speaker",
      date: "2024-01-13",
      time: "18:30",
      status: "failed",
      paymentMethod: "USDC",
      txHash: null,
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    totalTransactions: transactions.length,
    completedTransactions: transactions.filter((t) => t.status === "completed").length,
    totalRevenue: transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0),
    pendingTransactions: transactions.filter((t) => t.status === "pending").length,
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
              <p className="text-muted-foreground">View and manage all your payment transactions</p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">${stats.totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Completed</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">{stats.completedTransactions}</div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Pending</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">{stats.pendingTransactions}</div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Total</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">{stats.totalTransactions}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Transaction History</CardTitle>
              <CardDescription>
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.status === "completed" ? (
                          <ArrowDownLeft className="h-5 w-5" />
                        ) : transaction.status === "pending" ? (
                          <Calendar className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{transaction.customer}</p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.product}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date} at {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">${transaction.amount.toLocaleString()}</p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "secondary"
                              : transaction.status === "pending"
                                ? "outline"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{transaction.paymentMethod}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-1 h-6 px-2">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No transactions found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

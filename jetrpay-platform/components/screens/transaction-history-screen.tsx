"use client"

import { useState } from "react"
import { ArrowLeft, Filter, Search, Download, ArrowUpRight, ArrowDownLeft, RefreshCw, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: string
  type: "sent" | "received" | "bought" | "sold" | "swapped" | "deposited" | "withdrawn"
  asset: string
  amount: string
  amountUSD: string
  status: "completed" | "pending" | "failed"
  date: string
  time: string
  to?: string
  from?: string
  fee?: string
  hash?: string
  network?: string
}

interface TransactionHistoryScreenProps {
  onBack: () => void
  onTransactionSelect: (transaction: Transaction) => void
}

export function TransactionHistoryScreen({ onBack, onTransactionSelect }: TransactionHistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("all")

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "received",
      asset: "BTC",
      amount: "0.00234",
      amountUSD: "$152.30",
      status: "completed",
      date: "Dec 20, 2024",
      time: "2:30 PM",
      from: "John Doe",
      hash: "0x1234...5678",
      network: "Bitcoin",
    },
    {
      id: "2",
      type: "sent",
      asset: "ETH",
      amount: "0.5",
      amountUSD: "$1,234.50",
      status: "completed",
      date: "Dec 19, 2024",
      time: "10:15 AM",
      to: "Sarah Wilson",
      fee: "0.002 ETH",
      hash: "0xabcd...efgh",
      network: "Ethereum",
    },
    {
      id: "3",
      type: "bought",
      asset: "SHIB",
      amount: "1,000,000",
      amountUSD: "$18.90",
      status: "completed",
      date: "Dec 18, 2024",
      time: "4:45 PM",
      fee: "₦50.00",
    },
    {
      id: "4",
      type: "swapped",
      asset: "BNB → USDT",
      amount: "2.5 → 625",
      amountUSD: "$625.00",
      status: "pending",
      date: "Dec 18, 2024",
      time: "1:20 PM",
      fee: "0.1 BNB",
    },
    {
      id: "5",
      type: "withdrawn",
      asset: "NGN",
      amount: "50,000",
      amountUSD: "$32.50",
      status: "failed",
      date: "Dec 17, 2024",
      time: "9:30 AM",
      to: "First Bank ****1234",
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sent":
        return <ArrowUpRight className="h-5 w-5 text-red-500" />
      case "received":
        return <ArrowDownLeft className="h-5 w-5 text-green-500" />
      case "bought":
      case "sold":
        return <RefreshCw className="h-5 w-5 text-blue-500" />
      case "swapped":
        return <RefreshCw className="h-5 w-5 text-purple-500" />
      case "deposited":
        return <ArrowDownLeft className="h-5 w-5 text-green-500" />
      case "withdrawn":
        return <ArrowUpRight className="h-5 w-5 text-orange-500" />
      default:
        return <RefreshCw className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.to && transaction.to.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.from && transaction.from.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = selectedFilter === "all" || transaction.type === selectedFilter

    return matchesSearch && matchesFilter
  })

  const groupedTransactions = filteredTransactions.reduce(
    (groups, transaction) => {
      const date = transaction.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
      return groups
    },
    {} as Record<string, Transaction[]>,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-4">Transaction History</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 space-y-4 border-b">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {["all", "sent", "received", "bought", "sold", "swapped"].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap capitalize"
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Period Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="p-4">
        {Object.keys(groupedTransactions).length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground mb-4">No transactions found</div>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">{date}</h3>
                <div className="space-y-2">
                  {dayTransactions.map((transaction) => (
                    <Card key={transaction.id} className="p-4">
                      <button
                        className="w-full flex items-center justify-between"
                        onClick={() => onTransactionSelect(transaction)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium capitalize">{transaction.type}</span>
                              <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.type === "sent" && transaction.to && `to ${transaction.to}`}
                              {transaction.type === "received" && transaction.from && `from ${transaction.from}`}
                              {transaction.type === "bought" && `${transaction.asset}`}
                              {transaction.type === "sold" && `${transaction.asset}`}
                              {transaction.type === "swapped" && transaction.asset}
                              {transaction.type === "withdrawn" && transaction.to && `to ${transaction.to}`}
                            </div>
                            <div className="text-xs text-muted-foreground">{transaction.time}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-medium ${
                              transaction.type === "received" ||
                              transaction.type === "bought" ||
                              transaction.type === "deposited"
                                ? "text-green-600"
                                : transaction.type === "sent" ||
                                    transaction.type === "sold" ||
                                    transaction.type === "withdrawn"
                                  ? "text-red-600"
                                  : "text-blue-600"
                            }`}
                          >
                            {(transaction.type === "received" ||
                              transaction.type === "bought" ||
                              transaction.type === "deposited") &&
                              "+"}
                            {(transaction.type === "sent" ||
                              transaction.type === "sold" ||
                              transaction.type === "withdrawn") &&
                              "-"}
                            {transaction.amount} {transaction.asset.includes("→") ? "" : transaction.asset}
                          </div>
                          <div className="text-sm text-muted-foreground">{transaction.amountUSD}</div>
                        </div>
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

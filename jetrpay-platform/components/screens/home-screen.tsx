"use client"

import { ArrowUp, ArrowDown, QrCode, Send, Bell, Eye, EyeOff, RefreshCw, BarChart3, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { TransactionDetailModal } from "@/components/modals/transaction-detail-modal"

interface HomeScreenProps {
  userMode: "personal" | "merchant"
}

interface Transaction {
  id: string
  type: "send" | "receive" | "trade" | "airtime" | "bills"
  amount: string
  currency: string
  usdValue?: string
  status: "completed" | "pending" | "failed"
  timestamp: string
  recipient?: string
  sender?: string
  hash?: string
  network?: string
  fee?: string
  description?: string
}

export function HomeScreen({ userMode }: HomeScreenProps) {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const personalTransactions: Transaction[] = [
    {
      id: "tx_001",
      type: "receive",
      amount: "250.00",
      currency: "USDC",
      usdValue: "250.00",
      status: "completed",
      timestamp: "Dec 18, 2024 at 2:30 PM",
      sender: "0x1234567890abcdef1234567890abcdef12345678",
      hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      network: "Flow",
      fee: "0.001 FLOW",
      description: "From John Doe",
    },
    {
      id: "tx_002",
      type: "send",
      amount: "45.99",
      currency: "USDC",
      usdValue: "45.99",
      status: "completed",
      timestamp: "Dec 17, 2024 at 8:15 AM",
      recipient: "0x9876543210fedcba9876543210fedcba98765432",
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      network: "Flow",
      fee: "0.001 FLOW",
      description: "To Netflix",
    },
    {
      id: "tx_003",
      type: "trade",
      amount: "500.00",
      currency: "USDC",
      usdValue: "500.00",
      status: "completed",
      timestamp: "Dec 16, 2024 at 11:45 AM",
      hash: "0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321",
      network: "Flow",
      fee: "0.002 FLOW",
      description: "Bought USDC",
    },
  ]

  const merchantTransactions: Transaction[] = [
    {
      id: "tx_m001",
      type: "receive",
      amount: "125.50",
      currency: "USDC",
      usdValue: "125.50",
      status: "completed",
      timestamp: "Dec 18, 2024 at 3:00 PM",
      sender: "0x5555666677778888999900001111222233334444",
      hash: "0x4444333322221111000099998888777766665555444433332222111100009999",
      network: "Flow",
      fee: "0.001 FLOW",
      description: "Payment from Customer #1234",
    },
    {
      id: "tx_m002",
      type: "receive",
      amount: "89.99",
      currency: "USDC",
      usdValue: "89.99",
      status: "completed",
      timestamp: "Dec 18, 2024 at 12:30 PM",
      sender: "0x7777888899990000111122223333444455556666",
      hash: "0x6666555544443333222211110000999988887777666655554444333322221111",
      network: "Flow",
      fee: "0.001 FLOW",
      description: "Online Store Purchase",
    },
    {
      id: "tx_m003",
      type: "send",
      amount: "500.00",
      currency: "USDC",
      usdValue: "500.00",
      status: "pending",
      timestamp: "Dec 17, 2024 at 4:20 PM",
      recipient: "Bank Account ****1234",
      description: "Withdraw to Bank Account",
    },
  ]

  const recentTransactions = userMode === "merchant" ? merchantTransactions : personalTransactions

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowTransactionModal(true)
  }

  const handleAssetClick = (asset: string) => {
    console.log(`Clicked on ${asset} asset`)
  }

  if (userMode === "merchant") {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold jetrpay-gold">Merchant Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage your business payments</p>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <p className="text-muted-foreground text-sm">Today's Sales</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                >
                  {balanceVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
              </div>
              <div className="jetrpay-balance text-4xl jetrpay-gold">{balanceVisible ? "$1,247.89" : "****.**"}</div>
              <p className="text-muted-foreground text-sm">USDC</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-muted-foreground hover:text-primary"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Updating..." : "Refresh"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button className="h-16 flex-col gap-2 jetrpay-button-primary">
            <QrCode className="h-6 w-6" />
            <span className="text-sm">New Payment</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col gap-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            <ArrowDown className="h-6 w-6" />
            <span className="text-sm">Withdraw Earnings</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex-col gap-2 border-border hover:bg-muted/50 bg-transparent">
            <BarChart3 className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm">Reports</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2 border-border hover:bg-muted/50 bg-transparent">
            <Users className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm">Customers</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground text-xs">This Week</p>
              <p className="jetrpay-balance text-xl jetrpay-gold">{balanceVisible ? "$3,456.78" : "****.**"}</p>
              <p className="text-green-500 text-xs">+12.5%</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground text-xs">Total Customers</p>
              <p className="jetrpay-balance text-xl jetrpay-gold">247</p>
              <p className="text-green-500 text-xs">+8 new</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold jetrpay-gold">Recent Payments</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <Card
                key={tx.id}
                className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleTransactionClick(tx)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === "receive"
                            ? "bg-green-500/20"
                            : tx.type === "send"
                              ? "bg-orange-500/20"
                              : "bg-blue-500/20"
                        }`}
                      >
                        {tx.type === "receive" ? (
                          <ArrowDown className="h-4 w-4 text-green-500" />
                        ) : tx.type === "send" ? (
                          <ArrowUp className="h-4 w-4 text-orange-500" />
                        ) : (
                          <ArrowUp className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-sm text-muted-foreground">{tx.timestamp.split(" at ")[0]}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`jetrpay-balance ${
                          tx.type === "receive"
                            ? "text-green-500"
                            : tx.type === "send"
                              ? "text-orange-500"
                              : "jetrpay-gold"
                        }`}
                      >
                        {balanceVisible
                          ? `${tx.type === "receive" ? "+" : "-"}$${tx.amount}`
                          : tx.type === "receive"
                            ? "+****"
                            : "-****"}
                      </p>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${tx.status === "completed" ? "bg-green-500" : "bg-orange-500"}`}
                        ></div>
                        <span className="text-xs text-muted-foreground capitalize">{tx.status}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <TransactionDetailModal
          transaction={selectedTransaction}
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
        />
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3">
        <Bell className="h-4 w-4 text-red-500" />
        <p className="text-sm text-red-500">Add funds to continue trading</p>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent"
        >
          Add Cash
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <p className="text-muted-foreground text-sm">Available Balance</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                >
                  {balanceVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
              </div>
              <div className="jetrpay-balance text-4xl jetrpay-gold">{balanceVisible ? "$3,721.87" : "****.**"}</div>
              <p className="text-muted-foreground text-sm">USDC</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-muted-foreground hover:text-primary"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Updating..." : "Refresh"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="h-12 flex-col gap-1 border-primary/20 hover:bg-primary/10 bg-transparent"
          >
            <ArrowUp className="h-4 w-4 text-primary" />
            <span className="text-xs">Add Cash</span>
          </Button>
          <Button
            variant="outline"
            className="h-12 flex-col gap-1 border-primary/20 hover:bg-primary/10 bg-transparent"
          >
            <ArrowDown className="h-4 w-4 text-primary" />
            <span className="text-xs">Cash Out</span>
          </Button>
          <Button
            variant="outline"
            className="h-12 flex-col gap-1 border-primary/20 hover:bg-primary/10 bg-transparent"
          >
            <QrCode className="h-4 w-4 text-primary" />
            <span className="text-xs">Receive</span>
          </Button>
          <Button
            variant="outline"
            className="h-12 flex-col gap-1 border-primary/20 hover:bg-primary/10 bg-transparent"
          >
            <Send className="h-4 w-4 text-primary" />
            <span className="text-xs">Send</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold jetrpay-gold">Crypto</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Show Zero Balance
          </Button>
        </div>

        <div className="space-y-3">
          <Card
            className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleAssetClick("USDC")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">USDC</span>
                  </div>
                  <div>
                    <p className="font-medium">USD Coin</p>
                    <p className="text-sm text-muted-foreground">USDC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="jetrpay-balance jetrpay-gold">{balanceVisible ? "3,721.87" : "****.**"}</p>
                  <p className="text-sm text-muted-foreground">{balanceVisible ? "₦5,582,805" : "₦****,***"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleAssetClick("FLOW")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">FLOW</span>
                  </div>
                  <div>
                    <p className="font-medium">Flow</p>
                    <p className="text-sm text-muted-foreground">FLOW</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="jetrpay-balance jetrpay-gold">{balanceVisible ? "125.50" : "***.**"}</p>
                  <p className="text-sm text-muted-foreground">{balanceVisible ? "₦94,125" : "₦**,***"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold jetrpay-gold">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <Card
              key={tx.id}
              className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleTransactionClick(tx)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === "receive"
                          ? "bg-green-500/20"
                          : tx.type === "send"
                            ? "bg-red-500/20"
                            : "bg-blue-500/20"
                      }`}
                    >
                      {tx.type === "receive" ? (
                        <ArrowDown className="h-4 w-4 text-green-500" />
                      ) : tx.type === "send" ? (
                        <ArrowUp className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowUp className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{tx.description}</p>
                      <p className="text-sm text-muted-foreground">{tx.timestamp.split(" at ")[0]}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`jetrpay-balance ${
                        tx.type === "receive" ? "text-green-500" : tx.type === "send" ? "text-red-500" : "jetrpay-gold"
                      }`}
                    >
                      {balanceVisible
                        ? `${tx.type === "receive" ? "+" : "-"}$${tx.amount}`
                        : tx.type === "receive"
                          ? "+****"
                          : "-****"}
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-muted-foreground capitalize">{tx.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      />
    </div>
  )
}

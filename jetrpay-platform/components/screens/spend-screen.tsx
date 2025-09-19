"use client"

import { useState } from "react"
import { Plus, Download, MoreVertical, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { VirtualCardModal } from "@/components/modals/virtual-card-modal"

export function SpendScreen() {
  const [showCreateCardModal, setShowCreateCardModal] = useState(false)
  const [balanceVisible, setBalanceVisible] = useState(true)

  const virtualCards = [
    {
      id: 1,
      name: "Main Card",
      balance: "$3,721.87",
      lastFour: "3667",
      status: "active",
      isDefault: true,
    },
    {
      id: 2,
      name: "Netflix Card",
      balance: "$50.00",
      lastFour: "9012",
      status: "active",
      isDefault: false,
    },
  ]

  const transactions = [
    {
      id: 1,
      merchant: "Apple Music",
      amount: "$9.99",
      date: "Today",
      status: "completed",
      icon: "🎵",
      card: "3667",
    },
    {
      id: 2,
      merchant: "Netflix",
      amount: "$15.99",
      date: "Yesterday",
      status: "completed",
      icon: "📺",
      card: "9012",
    },
    {
      id: 3,
      merchant: "Card Funded",
      amount: "+$500.00",
      date: "2 days ago",
      status: "completed",
      icon: "💳",
      card: "3667",
    },
    {
      id: 4,
      merchant: "Spotify",
      amount: "$12.99",
      date: "3 days ago",
      status: "completed",
      icon: "🎶",
      card: "3667",
    },
  ]

  const handleCreateCardSuccess = () => {
    // Refresh cards list
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold jetrpay-gold">Virtual Cards</h1>
        <p className="text-muted-foreground text-sm">Pay for subscriptions with virtual dollars</p>
      </div>

      {/* Virtual Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold jetrpay-gold">My Cards</h2>
          <Button onClick={() => setShowCreateCardModal(true)} size="sm" className="jetrpay-button-primary">
            <Plus className="h-4 w-4 mr-1" />
            New Card
          </Button>
        </div>

        <div className="space-y-3">
          {virtualCards.map((card) => (
            <Card key={card.id} className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{card.name}</p>
                        {card.isDefault && (
                          <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <div className="flex items-center gap-2">
                        <p className="jetrpay-balance text-2xl jetrpay-gold">
                          {balanceVisible ? card.balance : "****.**"}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setBalanceVisible(!balanceVisible)}
                          className="h-6 w-6"
                        >
                          {balanceVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">Mastercard</p>
                        <div className="w-8 h-6 bg-primary rounded-sm mt-1"></div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Fund Card</DropdownMenuItem>
                          <DropdownMenuItem>Freeze Card</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Delete Card</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Card Number</p>
                      <p className="font-mono">**** **** **** {card.lastFour}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm capitalize">{card.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => setShowCreateCardModal(true)} className="h-12 jetrpay-button-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Card
        </Button>
        <Button variant="outline" className="h-12 border-primary text-primary hover:bg-primary/10 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Fund Cards
        </Button>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold jetrpay-gold">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                      {tx.icon}
                    </div>
                    <div>
                      <p className="font-medium">{tx.merchant}</p>
                      <p className="text-sm text-muted-foreground">
                        {tx.date} • Card ****{tx.card}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`jetrpay-balance ${tx.amount.startsWith("+") ? "text-green-500" : "jetrpay-gold"}`}>
                      {balanceVisible ? tx.amount : tx.amount.startsWith("+") ? "+****" : "-****"}
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

      {/* Card Benefits */}
      <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/20">
        <CardContent className="p-4 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold text-green-500">Virtual Card Benefits</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Instant card creation</li>
              <li>• No monthly fees</li>
              <li>• Real-time spending controls</li>
              <li>• Perfect for subscriptions</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {showCreateCardModal && (
        <VirtualCardModal onClose={() => setShowCreateCardModal(false)} onSuccess={handleCreateCardSuccess} />
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { ArrowLeft, Star, Bell, TrendingUp, TrendingDown, Plus, Minus, ArrowDown, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AssetDetailScreenProps {
  asset: {
    symbol: string
    name: string
    balance: string
    balanceUSD: string
    price: string
    change24h: string
    changePercent: string
    icon: string
  }
  onBack: () => void
  onBuy: () => void
  onSell: () => void
  onDeposit: () => void
  onSend: () => void
}

export function AssetDetailScreen({ asset, onBack, onBuy, onSell, onDeposit, onSend }: AssetDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const isPositive = !asset.changePercent.startsWith("-")

  // Mock chart data points for demonstration
  const chartPoints = [
    { x: 0, y: 80 },
    { x: 20, y: 85 },
    { x: 40, y: 75 },
    { x: 60, y: 90 },
    { x: 80, y: 70 },
    { x: 100, y: 65 },
    { x: 120, y: 85 },
    { x: 140, y: 60 },
    { x: 160, y: 55 },
    { x: 180, y: 45 },
  ]

  const pathData = chartPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
            <Star className={`h-5 w-5 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Asset Info */}
      <div className="p-4 text-center">
        <div className="text-2xl font-bold mb-1">
          {asset.balance} {asset.symbol}
        </div>
        <div className="text-muted-foreground mb-4">{asset.balanceUSD}</div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex flex-col items-center">
            <Button size="icon" className="h-12 w-12 rounded-full mb-2" onClick={onBuy}>
              <Plus className="h-5 w-5" />
            </Button>
            <span className="text-sm">Buy</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full mb-2 bg-transparent"
              onClick={onSell}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="text-sm">Sell</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full mb-2 bg-transparent"
              onClick={onDeposit}
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
            <span className="text-sm">Deposit</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full mb-2 bg-transparent"
              onClick={onSend}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
            <span className="text-sm">Send</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recurring">Recurring buys</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          {/* Price Info */}
          <Card className="p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{asset.symbol}</span>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mb-1">{asset.price}</div>
            <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {asset.change24h} ({asset.changePercent}) Today
            </div>
          </Card>

          {/* Chart */}
          <Card className="p-4 mb-4">
            <div className="h-48 w-full">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <path
                  d={pathData}
                  fill="none"
                  stroke={isPositive ? "#22c55e" : "#ef4444"}
                  strokeWidth="2"
                  className="drop-shadow-sm"
                />
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${pathData} L 180 100 L 0 100 Z`} fill="url(#chartGradient)" />
              </svg>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1H</span>
              <span>1D</span>
              <span>1W</span>
              <span>1M</span>
            </div>
          </Card>

          {/* Market Stats */}
          <Card className="p-4">
            <h3 className="font-medium mb-3">Market Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span>$5.2B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Volume</span>
                <span>$234M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Circulating Supply</span>
                <span>589T {asset.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">All Time High</span>
                <span>$0.000088</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="recurring" className="mt-4">
          <Card className="p-6 text-center">
            <div className="text-muted-foreground mb-4">No recurring buys set up yet</div>
            <Button>Set up recurring buy</Button>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ArrowDown className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Received {asset.symbol}</div>
                      <div className="text-sm text-muted-foreground">Dec {20 + i}, 2024</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">+1,000 {asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">$18.90</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

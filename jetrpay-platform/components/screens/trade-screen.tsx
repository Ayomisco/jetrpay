"use client"

import { useState } from "react"
import { Search, TrendingUp, TrendingDown, ArrowUpDown, Star, StarOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SwapModal } from "@/components/modals/swap-modal"

export function TradeScreen() {
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState(["ETH", "BTC", "FLOW"])

  const topMovers = [
    { symbol: "ETH", name: "Ethereum", change: "+5.2%", positive: true, price: "$3,456" },
    { symbol: "BTC", name: "Bitcoin", change: "+2.1%", positive: true, price: "$67,234" },
    { symbol: "SOL", name: "Solana", change: "-1.8%", positive: false, price: "$98.45" },
    { symbol: "FLOW", name: "Flow", change: "+8.5%", positive: true, price: "$0.75" },
  ]

  const allAssets = [
    { symbol: "BTC", name: "Bitcoin", price: "$67,234", change: "+2.1%", positive: true, volume: "$28.5B" },
    { symbol: "ETH", name: "Ethereum", price: "$3,456", change: "+5.2%", positive: true, volume: "$15.2B" },
    { symbol: "USDC", name: "USD Coin", price: "$1.00", change: "+0.01%", positive: true, volume: "$4.8B" },
    { symbol: "FLOW", name: "Flow", price: "$0.75", change: "+8.5%", positive: true, volume: "$125M" },
    { symbol: "SOL", name: "Solana", price: "$98.45", change: "-1.8%", positive: false, volume: "$2.1B" },
    { symbol: "ADA", name: "Cardano", price: "$0.45", change: "+3.2%", positive: true, volume: "$890M" },
  ]

  const filteredAssets = allAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const favoriteAssets = allAssets.filter((asset) => favorites.includes(asset.symbol))

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  const handleSwapSuccess = (fromAmount: number, fromAsset: string, toAsset: string) => {
    setShowSwapModal(false)
    // Show success toast
  }

  return (
    <div className="p-4 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search cryptocurrencies..."
          className="pl-10 bg-input border-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Top Movers */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold jetrpay-gold">Top Movers</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {topMovers.map((asset) => (
            <Card
              key={asset.symbol}
              className="bg-card border-border min-w-[140px] cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setShowSwapModal(true)}
            >
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold text-xs">{asset.symbol}</span>
                </div>
                <p className="text-xs font-medium mb-1">{asset.symbol}</p>
                <p className="text-xs jetrpay-balance jetrpay-gold mb-1">{asset.price}</p>
                <div
                  className={`flex items-center justify-center gap-1 text-xs ${
                    asset.positive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {asset.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {asset.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trade Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Button className="jetrpay-button-primary h-12 text-base">Buy</Button>
        <Button
          variant="outline"
          className="h-12 text-base border-primary text-primary hover:bg-primary/10 bg-transparent"
        >
          Sell
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowSwapModal(true)}
          className="h-12 text-base border-border hover:bg-muted/50 bg-transparent"
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Swap
        </Button>
      </div>

      {/* Asset Lists */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="all">All Assets</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favorites.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {filteredAssets.map((asset) => (
            <Card
              key={asset.symbol}
              className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => setShowSwapModal(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        asset.symbol === "BTC"
                          ? "bg-orange-500"
                          : asset.symbol === "ETH"
                            ? "bg-blue-600"
                            : asset.symbol === "USDC"
                              ? "bg-blue-500"
                              : asset.symbol === "FLOW"
                                ? "bg-green-500"
                                : asset.symbol === "SOL"
                                  ? "bg-purple-500"
                                  : "bg-gray-500"
                      }`}
                    >
                      <span className="text-white font-bold text-sm">{asset.symbol}</span>
                    </div>
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-muted-foreground">Vol: {asset.volume}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="jetrpay-balance jetrpay-gold">{asset.price}</p>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          asset.positive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {asset.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {asset.change}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(asset.symbol)
                      }}
                      className="h-8 w-8"
                    >
                      {favorites.includes(asset.symbol) ? (
                        <Star className="h-4 w-4 text-primary fill-primary" />
                      ) : (
                        <StarOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-3 mt-4">
          {favoriteAssets.length > 0 ? (
            favoriteAssets.map((asset) => (
              <Card
                key={asset.symbol}
                className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setShowSwapModal(true)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          asset.symbol === "BTC"
                            ? "bg-orange-500"
                            : asset.symbol === "ETH"
                              ? "bg-blue-600"
                              : asset.symbol === "FLOW"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                      >
                        <span className="text-white font-bold text-sm">{asset.symbol}</span>
                      </div>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">Vol: {asset.volume}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="jetrpay-balance jetrpay-gold">{asset.price}</p>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            asset.positive ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {asset.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {asset.change}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(asset.symbol)
                        }}
                        className="h-8 w-8"
                      >
                        <Star className="h-4 w-4 text-primary fill-primary" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No favorite assets yet</p>
              <p className="text-sm text-muted-foreground">Tap the star icon to add assets to favorites</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {showSwapModal && <SwapModal onClose={() => setShowSwapModal(false)} onSuccess={handleSwapSuccess} />}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Asset {
  symbol: string
  name: string
  price: string
  change24h: string
  changePercent: string
  marketCap: string
  volume: string
  icon: string
  category: string
}

interface DiscoverScreenProps {
  onAssetSelect: (asset: Asset) => void
}

export function DiscoverScreen({ onAssetSelect }: DiscoverScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const trendingAssets: Asset[] = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "₦65,432,100",
      change24h: "+2.5%",
      changePercent: "+2.5%",
      marketCap: "₦1.2T",
      volume: "₦45B",
      icon: "₿",
      category: "layer1",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "₦4,123,450",
      change24h: "+1.8%",
      changePercent: "+1.8%",
      marketCap: "₦495B",
      volume: "₦23B",
      icon: "⟠",
      category: "layer1",
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: "�N234,567",
      change24h: "+5.2%",
      changePercent: "+5.2%",
      marketCap: "₦110B",
      volume: "₦8.5B",
      icon: "◎",
      category: "layer1",
    },
  ]

  const topGainers: Asset[] = [
    {
      symbol: "SHIB",
      name: "Shiba Inu",
      price: "₦0.018908",
      change24h: "+25.4%",
      changePercent: "+25.4%",
      marketCap: "₦11.2B",
      volume: "₦2.1B",
      icon: "🐕",
      category: "meme",
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      price: "₦392.15",
      change24h: "+18.7%",
      changePercent: "+18.7%",
      marketCap: "₦57B",
      volume: "₦4.2B",
      icon: "🐕",
      category: "meme",
    },
  ]

  const topLosers: Asset[] = [
    {
      symbol: "LUNA",
      name: "Terra Luna",
      price: "₦1,234.56",
      change24h: "-12.3%",
      changePercent: "-12.3%",
      marketCap: "₦8.9B",
      volume: "₦1.2B",
      icon: "🌙",
      category: "layer1",
    },
  ]

  const categories = [
    { id: "all", name: "All", count: 150 },
    { id: "layer1", name: "Layer 1", count: 25 },
    { id: "defi", name: "DeFi", count: 45 },
    { id: "meme", name: "Meme", count: 30 },
    { id: "nft", name: "NFT", count: 20 },
    { id: "gaming", name: "Gaming", count: 15 },
  ]

  const filteredAssets = [...trendingAssets, ...topGainers, ...topLosers].filter(
    (asset) =>
      (activeCategory === "all" || asset.category === activeCategory) &&
      (asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold mb-4">Discover</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="gainers">Gainers</TabsTrigger>
            <TabsTrigger value="losers">Losers</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-3 mt-4">
            {trendingAssets.map((asset) => (
              <Card key={asset.symbol} className="p-4">
                <button className="w-full flex items-center justify-between" onClick={() => onAssetSelect(asset)}>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-lg">
                      {asset.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        {asset.symbol}
                        <Badge variant="secondary" className="text-xs">
                          {asset.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{asset.price}</div>
                    <div
                      className={`text-sm flex items-center gap-1 ${
                        asset.changePercent.startsWith("+") ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {asset.changePercent.startsWith("+") ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {asset.changePercent}
                    </div>
                  </div>
                </button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="gainers" className="space-y-3 mt-4">
            {topGainers.map((asset) => (
              <Card key={asset.symbol} className="p-4">
                <button className="w-full flex items-center justify-between" onClick={() => onAssetSelect(asset)}>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-lg">
                      {asset.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{asset.price}</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {asset.changePercent}
                    </div>
                  </div>
                </button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="losers" className="space-y-3 mt-4">
            {topLosers.map((asset) => (
              <Card key={asset.symbol} className="p-4">
                <button className="w-full flex items-center justify-between" onClick={() => onAssetSelect(asset)}>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-lg">
                      {asset.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{asset.price}</div>
                    <div className="text-sm text-red-600 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {asset.changePercent}
                    </div>
                  </div>
                </button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="watchlist" className="mt-4">
            <Card className="p-8 text-center">
              <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Your Watchlist is Empty</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add cryptocurrencies to your watchlist to track their performance
              </p>
              <Button>Browse Assets</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

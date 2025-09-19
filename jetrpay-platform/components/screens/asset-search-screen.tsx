"use client"

import { useState } from "react"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Asset {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  icon: string
}

interface AssetSearchScreenProps {
  onClose: () => void
  onAssetSelect: (asset: Asset) => void
}

export function AssetSearchScreen({ onClose, onAssetSelect }: AssetSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState(["ETH", "SOL"])

  const topAssets: Asset[] = [
    {
      symbol: "TWT",
      name: "Trust Wallet Token",
      price: "₦1,673.4",
      change: "↗25.0%",
      changePercent: "+25.0%",
      icon: "🛡️",
    },
    {
      symbol: "ACT",
      name: "Act I: The AI Prophecy",
      price: "₦56.41",
      change: "↘8.41%",
      changePercent: "-8.41%",
      icon: "🎭",
    },
    {
      symbol: "PNUT",
      name: "Peanut The Squirrel",
      price: "₦352.51",
      change: "↘7.82%",
      changePercent: "-7.82%",
      icon: "🐿️",
    },
    {
      symbol: "SUI",
      name: "Sui",
      price: "₦5,373.98",
      change: "↘7.45%",
      changePercent: "-7.45%",
      icon: "💧",
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      price: "₦392.15",
      change: "↘7.06%",
      changePercent: "-7.06%",
      icon: "🐕",
    },
  ]

  const filteredAssets = topAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for assets e.g BTC, ETH"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <div className="p-4">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Recent</h3>
              <Button variant="ghost" size="sm" className="text-green-600" onClick={clearRecentSearches}>
                Clear
              </Button>
            </div>
            <div className="flex gap-2">
              {recentSearches.map((search) => (
                <Badge
                  key={search}
                  variant="secondary"
                  className="px-4 py-2 cursor-pointer hover:bg-muted"
                  onClick={() => setSearchQuery(search)}
                >
                  <span className="mr-2">🔷</span>
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Top Assets */}
        <div>
          <h3 className="font-medium mb-4">Top assets</h3>
          <div className="space-y-3">
            {filteredAssets.map((asset) => (
              <button
                key={asset.symbol}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => onAssetSelect(asset)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
                    {asset.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-muted-foreground">{asset.symbol}</div>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

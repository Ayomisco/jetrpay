"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, X, Info, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface SwapModalProps {
  onClose: () => void
  onSuccess: (fromAmount: number, fromAsset: string, toAsset: string) => void
}

export function SwapModal({ onClose, onSuccess }: SwapModalProps) {
  const [fromAsset, setFromAsset] = useState("USDC")
  const [toAsset, setToAsset] = useState("FLOW")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isSwapping, setIsSwapping] = useState(false)

  const assets = [
    { symbol: "USDC", name: "USD Coin", balance: "3,721.87", price: 1.0 },
    { symbol: "FLOW", name: "Flow", balance: "125.50", price: 0.75 },
    { symbol: "BTC", name: "Bitcoin", balance: "0.00", price: 67234.0 },
    { symbol: "ETH", name: "Ethereum", balance: "0.00", price: 3456.0 },
  ]

  const priceData = [
    { time: "00:00", price: 0.75 },
    { time: "04:00", price: 0.73 },
    { time: "08:00", price: 0.76 },
    { time: "12:00", price: 0.74 },
    { time: "16:00", price: 0.75 },
    { time: "20:00", price: 0.77 },
    { time: "24:00", price: 0.75 },
  ]

  const fromAssetData = assets.find((a) => a.symbol === fromAsset)
  const toAssetData = assets.find((a) => a.symbol === toAsset)

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    if (value && fromAssetData && toAssetData) {
      const fromValue = Number.parseFloat(value) * fromAssetData.price
      const toValue = fromValue / toAssetData.price
      setToAmount(toValue.toFixed(6))
    } else {
      setToAmount("")
    }
  }

  const handleSwapAssets = () => {
    const tempAsset = fromAsset
    setFromAsset(toAsset)
    setToAsset(tempAsset)
    setFromAmount("")
    setToAmount("")
  }

  const handleSwap = () => {
    setIsSwapping(true)
    setTimeout(() => {
      onSuccess(Number.parseFloat(fromAmount), fromAsset, toAsset)
      setIsSwapping(false)
    }, 2000)
  }

  const slippage = 0.5
  const networkFee = 0.01
  const rate = toAssetData && fromAssetData ? toAssetData.price / fromAssetData.price : 0

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl jetrpay-gold">Swap Assets</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Price Chart */}
          <div className="h-32 bg-muted/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{toAsset}/USD</span>
              <span className="text-sm text-green-500">+2.7%</span>
            </div>
            <ResponsiveContainer width="100%" height="80">
              <LineChart data={priceData}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Line type="monotone" dataKey="price" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* From Asset */}
          <div className="space-y-2">
            <Label>From</Label>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Select value={fromAsset} onValueChange={setFromAsset}>
                  <SelectTrigger className="w-32 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        {asset.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  className="text-right bg-transparent border-none text-lg jetrpay-balance"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{fromAssetData?.name}</span>
                <span>Balance: {fromAssetData?.balance}</span>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapAssets}
              className="rounded-full border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* To Asset */}
          <div className="space-y-2">
            <Label>To</Label>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Select value={toAsset} onValueChange={setToAsset}>
                  <SelectTrigger className="w-32 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        {asset.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-right text-lg jetrpay-balance jetrpay-gold">{toAmount || "0.00"}</div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{toAssetData?.name}</span>
                <span>Balance: {toAssetData?.balance}</span>
              </div>
            </div>
          </div>

          {/* Swap Details */}
          {fromAmount && toAmount && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Rate</span>
                <span>
                  1 {fromAsset} = {rate.toFixed(6)} {toAsset}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span>Slippage</span>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </div>
                <span>{slippage}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Network Fee</span>
                <span>${networkFee}</span>
              </div>
              <div className="border-t border-border pt-2 flex items-center justify-between font-medium">
                <span>You'll receive</span>
                <span className="jetrpay-gold">
                  {toAmount} {toAsset}
                </span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount || isSwapping}
            className="w-full jetrpay-button-primary h-12"
          >
            {isSwapping ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-pulse" />
                Swapping...
              </>
            ) : (
              `Swap ${fromAsset} for ${toAsset}`
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">Powered by Chainlink Price Feeds</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

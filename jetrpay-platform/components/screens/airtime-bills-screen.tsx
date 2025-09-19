"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Zap, Wifi, Tv, Plus, Star } from "lucide-react"

export function AirtimeBillsScreen() {
  const [selectedProvider, setSelectedProvider] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")

  const providers = [
    { id: "mtn", name: "MTN", color: "bg-yellow-500", cashback: "2%" },
    { id: "glo", name: "Glo", color: "bg-green-500", cashback: "2%" },
    { id: "airtel", name: "Airtel", color: "bg-red-500", cashback: "2%" },
    { id: "9mobile", name: "9Mobile", color: "bg-green-600", cashback: "2%" },
  ]

  const quickAmounts = ["₦100", "₦200", "₦500", "₦1,000", "₦2,000", "₦5,000"]

  const beneficiaries = [
    { id: 1, name: "My Number", number: "+234 803 123 4567", provider: "MTN" },
    { id: 2, name: "Mom", number: "+234 805 987 6543", provider: "Glo" },
    { id: 3, name: "Brother", number: "+234 701 456 7890", provider: "Airtel" },
  ]

  const billCategories = [
    { id: "electricity", name: "Electricity", icon: Zap, providers: ["EKEDC", "IKEDC", "AEDC"] },
    { id: "internet", name: "Internet", icon: Wifi, providers: ["Spectranet", "Smile", "Swift"] },
    { id: "cable", name: "Cable TV", icon: Tv, providers: ["DSTV", "GOtv", "Startimes"] },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold jetrpay-gold">Airtime & Bills</h1>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Nigeria</span>
          <Select defaultValue="ng">
            <SelectTrigger className="w-20 h-6 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ng">🇳🇬 NG</SelectItem>
              <SelectItem value="ke">🇰🇪 KE</SelectItem>
              <SelectItem value="gh">🇬🇭 GH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cashback Banner */}
      <Card className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/20">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">Instant Cashback!</span>
          </div>
          <p className="text-sm text-muted-foreground">Get 2% cashback on all airtime and bill payments</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="airtime" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="airtime">Airtime & Data</TabsTrigger>
          <TabsTrigger value="bills">Bills</TabsTrigger>
        </TabsList>

        <TabsContent value="airtime" className="space-y-6 mt-6">
          {/* Network Providers */}
          <div className="space-y-3">
            <Label>Select Network</Label>
            <div className="grid grid-cols-2 gap-3">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors relative ${
                    selectedProvider === provider.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${provider.color} flex items-center justify-center`}>
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-xs text-green-500">{provider.cashback} cashback</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* Quick Amounts */}
          <div className="space-y-3">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.replace("₦", ""))}
                  className="border-border hover:bg-primary/10 hover:border-primary"
                >
                  {quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₦)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₦</span>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 bg-input border-border"
                min="50"
                max="50000"
              />
            </div>
          </div>

          <Button
            disabled={!selectedProvider || !phoneNumber || !amount}
            className="w-full jetrpay-button-primary h-12"
          >
            Buy Airtime
          </Button>

          {/* Beneficiaries */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Recent Beneficiaries</Label>
              <Button variant="ghost" size="sm" className="text-primary">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {beneficiaries.map((beneficiary) => (
                <Card
                  key={beneficiary.id}
                  className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{beneficiary.name}</p>
                        <p className="text-sm text-muted-foreground">{beneficiary.number}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-muted px-2 py-1 rounded">{beneficiary.provider}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bills" className="space-y-6 mt-6">
          <div className="space-y-4">
            {billCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.id}
                  className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.providers.join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">2% cashback</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

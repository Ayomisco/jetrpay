import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WalletsScreen() {
  return (
    <div className="p-4 space-y-6">
      {/* Balance Summary */}
      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Total Balance</p>
            <div className="jetrpay-balance text-3xl jetrpay-gold">₦5,676,930</div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="jetrpay-button-primary h-12">
          <Plus className="h-4 w-4 mr-2" />
          Add Cash
        </Button>
        <Button
          variant="outline"
          className="h-12 border-orange-500 text-orange-500 hover:bg-orange-500/10 bg-transparent"
        >
          Cash Out
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search assets..." className="pl-10 bg-input border-border" />
      </div>

      {/* Wallets Tabs */}
      <Tabs defaultValue="crypto" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="cash">Cash</TabsTrigger>
        </TabsList>

        <TabsContent value="crypto" className="space-y-3 mt-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">USDC</span>
                  </div>
                  <div>
                    <p className="font-medium">USD Coin</p>
                    <p className="text-sm text-muted-foreground">Stablecoin</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="jetrpay-balance jetrpay-gold">3,721.87</p>
                  <p className="text-sm text-muted-foreground">₦5,582,805</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">FLOW</span>
                  </div>
                  <div>
                    <p className="font-medium">Flow</p>
                    <p className="text-sm text-muted-foreground">Blockchain</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="jetrpay-balance jetrpay-gold">125.50</p>
                  <p className="text-sm text-muted-foreground">₦94,125</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash" className="space-y-3 mt-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">₦</span>
                  </div>
                  <div>
                    <p className="font-medium">Nigerian Naira</p>
                    <p className="text-sm text-muted-foreground">Fiat Currency</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="jetrpay-balance jetrpay-gold">0.00</p>
                  <p className="text-sm text-muted-foreground">₦0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Explore More */}
      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent">
        Explore More Assets
      </Button>
    </div>
  )
}

"use client"

import { useState } from "react"
import { X, Copy, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ReceiveModalProps {
  isOpen: boolean
  onClose: () => void
  asset: {
    symbol: string
    name: string
    address: string
    network: string
    minAmount?: string
  }
}

export function ReceiveModal({ isOpen, onClose, asset }: ReceiveModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState("BEP20")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(asset.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Receive ${asset.symbol}`,
        text: `Send ${asset.symbol} to this address: ${asset.address}`,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Receive {asset.symbol}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          {/* Network Selection */}
          <Tabs value={selectedNetwork} onValueChange={setSelectedNetwork}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="BEP20" className="rounded-full">
                BEP20
              </TabsTrigger>
              <TabsTrigger value="ERC20" className="rounded-full">
                ERC20
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* QR Code */}
          <div className="flex justify-center py-6">
            <div className="h-48 w-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">{asset.symbol} Address</label>
            <div className="mt-1 p-3 bg-muted rounded-lg">
              <div className="text-sm font-mono break-all">{asset.address}</div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          {/* Warning */}
          {asset.minAmount && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertDescription className="text-orange-800">
                This wallet only accepts{" "}
                <strong>
                  {asset.symbol}-{selectedNetwork}
                </strong>{" "}
                and a minimum amount of{" "}
                <strong>
                  {asset.minAmount} {asset.symbol}
                </strong>
                . Failure to comply will result in loss of your deposit.
              </AlertDescription>
            </Alert>
          )}

          {/* Share Button */}
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleShare}>
            <Share className="h-4 w-4 mr-2" />
            Share Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

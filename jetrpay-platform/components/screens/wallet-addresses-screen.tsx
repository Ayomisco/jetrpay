"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Wallet, Copy, Trash2, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WalletAddress {
  id: string
  label: string
  address: string
  network: string
  asset: string
}

interface WalletAddressesScreenProps {
  onBack: () => void
}

export function WalletAddressesScreen({ onBack }: WalletAddressesScreenProps) {
  const [addresses, setAddresses] = useState<WalletAddress[]>([
    {
      id: "1",
      label: "My BTC Wallet",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      network: "Bitcoin",
      asset: "BTC",
    },
    {
      id: "2",
      label: "ETH Main Wallet",
      address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      network: "Ethereum",
      asset: "ETH",
    },
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    network: "",
    asset: "",
  })

  const networks = [
    { name: "Bitcoin", asset: "BTC" },
    { name: "Ethereum", asset: "ETH" },
    { name: "Binance Smart Chain", asset: "BNB" },
    { name: "Polygon", asset: "MATIC" },
    { name: "Solana", asset: "SOL" },
  ]

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.address && newAddress.network) {
      const address: WalletAddress = {
        id: Date.now().toString(),
        ...newAddress,
      }
      setAddresses([...addresses, address])
      setNewAddress({ label: "", address: "", network: "", asset: "" })
      setShowAddModal(false)
    }
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-4">Wallet Addresses</h1>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {/* Wallet Addresses List */}
      <div className="p-4 space-y-3">
        {addresses.length === 0 ? (
          <Card className="p-8 text-center">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No wallet addresses saved</h3>
            <p className="text-muted-foreground mb-4">Save frequently used wallet addresses for quick access</p>
            <Button onClick={() => setShowAddModal(true)}>Add Wallet Address</Button>
          </Card>
        ) : (
          addresses.map((address) => (
            <Card key={address.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{address.label}</div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {address.network} • {address.asset}
                    </div>
                    <div className="text-xs font-mono bg-muted p-2 rounded break-all">{address.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopyAddress(address.address)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Address Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Wallet Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="e.g. My BTC Wallet"
                value={newAddress.label}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    label: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="network">Network</Label>
              <Select
                value={newAddress.network}
                onValueChange={(value) => {
                  const network = networks.find((n) => n.name === value)
                  setNewAddress({
                    ...newAddress,
                    network: value,
                    asset: network?.asset || "",
                  })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  {networks.map((network) => (
                    <SelectItem key={network.name} value={network.name}>
                      {network.name} ({network.asset})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="address">Wallet Address</Label>
              <Input
                id="address"
                placeholder="Enter wallet address"
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAddress}>Add Address</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

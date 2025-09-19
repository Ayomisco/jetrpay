"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface AssetFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: any) => void
}

export function AssetFilterModal({ isOpen, onClose, onApplyFilters }: AssetFilterModalProps) {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 1000000],
    marketCapRange: [0, 1000000000],
    volumeRange: [0, 100000000],
  })

  const categories = ["Layer 1", "Layer 2", "DeFi", "Meme Coins", "NFT", "Gaming", "Metaverse", "AI", "Privacy"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        categories: [...filters.categories, category],
      })
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      })
    }
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000000],
      marketCapRange: [0, 1000000000],
      volumeRange: [0, 100000000],
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Filter Assets</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <Label className="text-base font-medium">Categories</Label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-base font-medium">Price Range (NGN)</Label>
            <div className="mt-3">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                max={1000000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>₦{filters.priceRange[0].toLocaleString()}</span>
                <span>₦{filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Market Cap Range */}
          <div>
            <Label className="text-base font-medium">Market Cap Range</Label>
            <div className="mt-3">
              <Slider
                value={filters.marketCapRange}
                onValueChange={(value) => setFilters({ ...filters, marketCapRange: value })}
                max={1000000000}
                step={1000000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>₦{(filters.marketCapRange[0] / 1000000).toFixed(0)}M</span>
                <span>₦{(filters.marketCapRange[1] / 1000000).toFixed(0)}M</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button className="flex-1" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

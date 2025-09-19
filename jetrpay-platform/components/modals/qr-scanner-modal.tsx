"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Flashlight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

interface QRScannerModalProps {
  isOpen: boolean
  onClose: () => void
  onScan: (result: string) => void
}

export function QRScannerModal({ isOpen, onClose, onScan }: QRScannerModalProps) {
  const [flashOn, setFlashOn] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd use a QR code library to decode the image
      // For demo purposes, we'll simulate a scan result
      onScan("0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Scan QR Code</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          {/* Camera View */}
          <div className="aspect-square bg-black rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-500 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-500 rounded-br-lg"></div>
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              Position QR code within the frame
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setFlashOn(!flashOn)}>
              <Flashlight className={`h-4 w-4 ${flashOn ? "text-yellow-500" : ""}`} />
            </Button>
            <label htmlFor="qr-upload">
              <Button variant="outline" size="icon" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                </span>
              </Button>
              <input id="qr-upload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Scan a QR code to automatically fill the wallet address
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

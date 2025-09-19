"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Smartphone, CheckCircle, Wallet } from "lucide-react"

interface WalletLinkModalProps {
  onComplete: () => void
  onSkip: () => void
}

export function WalletLinkModal({ onComplete, onSkip }: WalletLinkModalProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [isLinked, setIsLinked] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    // Simulate wallet linking process
    setTimeout(() => {
      setIsScanning(false)
      setIsLinked(true)
      setTimeout(onComplete, 2000)
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-xl jetrpay-gold">Link Your Wallet</CardTitle>
          <p className="text-muted-foreground text-sm">Connect your Blocto wallet to get started</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isLinked ? (
            <>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  {isScanning ? (
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <QrCode className="h-10 w-10 text-primary" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold">{isScanning ? "Connecting..." : "Scan QR Code"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isScanning
                      ? "Please wait while we connect your wallet"
                      : "Use your Blocto wallet app to scan the QR code"}
                  </p>
                </div>
              </div>

              {/* Mock QR Code */}
              {!isScanning && (
                <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button onClick={handleScan} disabled={isScanning} className="w-full jetrpay-button-primary h-12">
                  <Smartphone className="h-4 w-4 mr-2" />
                  {isScanning ? "Connecting..." : "Open Camera to Scan"}
                </Button>

                <Button
                  variant="outline"
                  onClick={onSkip}
                  className="w-full border-border bg-transparent"
                  disabled={isScanning}
                >
                  Skip for Now
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Don't have Blocto wallet?{" "}
                  <Button variant="link" className="p-0 h-auto text-primary text-xs">
                    Download here
                  </Button>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>

              <div>
                <h3 className="font-semibold text-green-500">Wallet Connected!</h3>
                <p className="text-sm text-muted-foreground">Your Blocto wallet has been successfully linked</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Blocto Wallet</p>
                    <p className="text-sm text-muted-foreground font-mono">0x1234...5678</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

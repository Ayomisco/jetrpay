"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, Share2, MoreHorizontal, TrendingUp } from "lucide-react"

interface Transaction {
  id: string
  type: "send" | "receive" | "trade" | "airtime" | "bills"
  amount: string
  currency: string
  usdValue?: string
  status: "completed" | "pending" | "failed"
  timestamp: string
  recipient?: string
  sender?: string
  hash?: string
  network?: string
  fee?: string
  description?: string
}

interface TransactionDetailModalProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
}

export function TransactionDetailModal({ transaction, isOpen, onClose }: TransactionDetailModalProps) {
  const [copied, setCopied] = useState(false)

  if (!transaction) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="h-5 w-5 text-red-400" />
      case "receive":
        return <ArrowDownLeft className="h-5 w-5 text-green-400" />
      case "trade":
        return <TrendingUp className="h-5 w-5 text-blue-400" />
      default:
        return <MoreHorizontal className="h-5 w-5 text-gray-400" />
    }
  }

  const getAvailableActions = () => {
    const actions = []

    if (transaction.type === "send" || transaction.type === "receive") {
      actions.push(
        <Button key="repeat" variant="outline" className="flex-1 border-gray-700 text-white bg-transparent">
          Repeat Transaction
        </Button>,
      )
    }

    if (transaction.type === "trade") {
      actions.push(
        <Button key="trade-again" variant="outline" className="flex-1 border-gray-700 text-white bg-transparent">
          Trade Again
        </Button>,
      )
    }

    actions.push(
      <Button key="share" variant="outline" className="flex-1 border-gray-700 text-white bg-transparent">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>,
    )

    return actions
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            {getTypeIcon(transaction.type)}
            <span className="capitalize">{transaction.type} Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Section */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-white">
              {transaction.type === "send" ? "-" : "+"}
              {transaction.amount} {transaction.currency}
            </div>
            {transaction.usdValue && <div className="text-gray-400">≈ ${transaction.usdValue} USD</div>}
            <Badge className={getStatusColor(transaction.status)}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </Badge>
          </div>

          <Separator className="bg-gray-800" />

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Date & Time</span>
              <span className="text-white">{transaction.timestamp}</span>
            </div>

            {transaction.recipient && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">To</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-mono text-sm">
                    {transaction.recipient.slice(0, 6)}...{transaction.recipient.slice(-4)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(transaction.recipient!)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {transaction.sender && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">From</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-mono text-sm">
                    {transaction.sender.slice(0, 6)}...{transaction.sender.slice(-4)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(transaction.sender!)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {transaction.network && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Network</span>
                <span className="text-white">{transaction.network}</span>
              </div>
            )}

            {transaction.fee && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Network Fee</span>
                <span className="text-white">{transaction.fee}</span>
              </div>
            )}

            {transaction.hash && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transaction Hash</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-mono text-sm">
                    {transaction.hash.slice(0, 6)}...{transaction.hash.slice(-4)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(transaction.hash!)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {getAvailableActions().length > 0 && (
            <>
              <Separator className="bg-gray-800" />
              <div className="flex space-x-3">{getAvailableActions()}</div>
            </>
          )}

          {copied && <div className="text-center text-green-400 text-sm">Copied to clipboard!</div>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

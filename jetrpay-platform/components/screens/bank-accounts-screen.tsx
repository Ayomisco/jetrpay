"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Building2, ChevronRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountName: string
  bankCode: string
}

interface BankAccountsScreenProps {
  onBack: () => void
}

export function BankAccountsScreen({ onBack }: BankAccountsScreenProps) {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "First Bank of Nigeria",
      accountNumber: "3012345678",
      accountName: "John Doe",
      bankCode: "011",
    },
    {
      id: "2",
      bankName: "Guaranty Trust Bank",
      accountNumber: "0123456789",
      accountName: "John Doe",
      bankCode: "058",
    },
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    bankCode: "",
  })

  const banks = [
    { name: "Access Bank", code: "044" },
    { name: "First Bank of Nigeria", code: "011" },
    { name: "Guaranty Trust Bank", code: "058" },
    { name: "United Bank for Africa", code: "033" },
    { name: "Zenith Bank", code: "057" },
    { name: "Fidelity Bank", code: "070" },
    { name: "Sterling Bank", code: "232" },
    { name: "Stanbic IBTC Bank", code: "221" },
  ]

  const handleAddAccount = () => {
    if (newAccount.bankName && newAccount.accountNumber && newAccount.accountName) {
      const account: BankAccount = {
        id: Date.now().toString(),
        ...newAccount,
      }
      setAccounts([...accounts, account])
      setNewAccount({ bankName: "", accountNumber: "", accountName: "", bankCode: "" })
      setShowAddModal(false)
    }
  }

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-4">Bank Accounts</h1>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      {/* Bank Accounts List */}
      <div className="p-4 space-y-3">
        {accounts.length === 0 ? (
          <Card className="p-8 text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No bank accounts added</h3>
            <p className="text-muted-foreground mb-4">Add your bank accounts to receive payments and withdraw funds</p>
            <Button onClick={() => setShowAddModal(true)}>Add Bank Account</Button>
          </Card>
        ) : (
          accounts.map((account) => (
            <Card key={account.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{account.bankName}</div>
                    <div className="text-sm text-muted-foreground">
                      {account.accountNumber} • {account.accountName}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteAccount(account.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Account Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Bank Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bank">Select Bank</Label>
              <Select
                value={newAccount.bankName}
                onValueChange={(value) => {
                  const bank = banks.find((b) => b.name === value)
                  setNewAccount({
                    ...newAccount,
                    bankName: value,
                    bankCode: bank?.code || "",
                  })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.code} value={bank.name}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="Enter your account number"
                value={newAccount.accountNumber}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    accountNumber: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="Account holder name"
                value={newAccount.accountName}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    accountName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAccount}>Add Account</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

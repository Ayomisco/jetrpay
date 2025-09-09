import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MoreHorizontal, Copy, Edit, ExternalLink, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"

const paymentLinks = [
  {
    id: "PL-001",
    title: "Premium Package",
    description: "Complete premium service package",
    amount: "$299.00",
    clicks: 145,
    conversions: 32,
    revenue: "$9,568.00",
    status: "active",
    created: "2024-01-15",
    url: "https://pay.jetrpay.com/premium-package",
  },
  {
    id: "PL-002",
    title: "Basic Service",
    description: "Essential service offering",
    amount: "$99.00",
    clicks: 328,
    conversions: 84,
    revenue: "$8,316.00",
    status: "active",
    created: "2024-01-10",
    url: "https://pay.jetrpay.com/basic-service",
  },
  {
    id: "PL-003",
    title: "Consultation Fee",
    description: "One-hour consultation session",
    amount: "$150.00",
    clicks: 67,
    conversions: 18,
    revenue: "$2,700.00",
    status: "paused",
    created: "2024-01-08",
    url: "https://pay.jetrpay.com/consultation",
  },
  {
    id: "PL-004",
    title: "Workshop Ticket",
    description: "Digital marketing workshop",
    amount: "$75.00",
    clicks: 234,
    conversions: 56,
    revenue: "$4,200.00",
    status: "active",
    created: "2024-01-05",
    url: "https://pay.jetrpay.com/workshop",
  },
  {
    id: "PL-005",
    title: "E-book Download",
    description: "Complete guide to stablecoin payments",
    amount: "$29.99",
    clicks: 892,
    conversions: 178,
    revenue: "$5,338.22",
    status: "active",
    created: "2024-01-01",
    url: "https://pay.jetrpay.com/ebook",
  },
]

export default function PaymentLinksPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl">Payment Links</h1>
            <p className="text-muted-foreground">Create and manage payment links for your products and services.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/payment-links/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Link
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Links</p>
                <p className="font-heading font-bold text-2xl">5</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="font-heading font-bold text-2xl">1,666</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Conversions</p>
                <p className="font-heading font-bold text-2xl">368</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="font-heading font-bold text-2xl">$30,122</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search payment links..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Links Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl">All Payment Links</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-4 font-medium text-muted-foreground">Link</th>
                    <th className="p-4 font-medium text-muted-foreground">Amount</th>
                    <th className="p-4 font-medium text-muted-foreground">Performance</th>
                    <th className="p-4 font-medium text-muted-foreground">Revenue</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                    <th className="p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paymentLinks.map((link, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="p-4">
                        <div className="space-y-1">
                          <h4 className="font-medium">{link.title}</h4>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                          <p className="text-xs text-muted-foreground">Created {link.created}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-primary">{link.amount}</span>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Eye className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{link.clicks} clicks</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{link.conversions} conversions</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{link.revenue}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant={link.status === "active" ? "default" : "secondary"} className="text-xs">
                          {link.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

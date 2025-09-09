import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  Download,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total Revenue",
    value: "$12,426.50",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Transactions",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
  },
  {
    title: "Customers",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
  },
]

const recentTransactions = [
  {
    id: "TXN-001",
    customer: "John Doe",
    amount: "$125.00",
    status: "completed",
    date: "2 hours ago",
    method: "Card",
  },
  {
    id: "TXN-002",
    customer: "Sarah Chen",
    amount: "$89.50",
    status: "completed",
    date: "4 hours ago",
    method: "USDC",
  },
  {
    id: "TXN-003",
    customer: "Mike Johnson",
    amount: "$234.75",
    status: "pending",
    date: "6 hours ago",
    method: "Bank",
  },
  {
    id: "TXN-004",
    customer: "Emma Wilson",
    amount: "$67.25",
    status: "completed",
    date: "8 hours ago",
    method: "Mobile Money",
  },
  {
    id: "TXN-005",
    customer: "David Kim",
    amount: "$156.00",
    status: "failed",
    date: "1 day ago",
    method: "Card",
  },
]

const paymentLinks = [
  {
    id: "PL-001",
    title: "Premium Package",
    amount: "$299.00",
    clicks: 45,
    conversions: 12,
    status: "active",
  },
  {
    id: "PL-002",
    title: "Basic Service",
    amount: "$99.00",
    clicks: 128,
    conversions: 34,
    status: "active",
  },
  {
    id: "PL-003",
    title: "Consultation Fee",
    amount: "$150.00",
    clicks: 23,
    conversions: 8,
    status: "paused",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard/payment-links/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Link
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="font-heading font-bold text-2xl">{stat.value}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-secondary" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-destructive" />
                  )}
                  <span
                    className={`text-sm font-medium ${stat.trend === "up" ? "text-secondary" : "text-destructive"}`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transactions */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-xl">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/transactions">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{transaction.customer}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{transaction.method}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{transaction.amount}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment Links */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-xl">Payment Links</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/payment-links">Manage</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentLinks.map((link, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{link.title}</h4>
                      <Badge variant={link.status === "active" ? "default" : "secondary"} className="text-xs">
                        {link.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-primary">{link.amount}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="block">Clicks</span>
                        <span className="font-medium text-foreground">{link.clicks}</span>
                      </div>
                      <div>
                        <span className="block">Conversions</span>
                        <span className="font-medium text-foreground">{link.conversions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="revenue" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                </TabsList>
                <TabsContent value="revenue" className="mt-6">
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Revenue chart would be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="transactions" className="mt-6">
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Transaction chart would be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="customers" className="mt-6">
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Customer chart would be displayed here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

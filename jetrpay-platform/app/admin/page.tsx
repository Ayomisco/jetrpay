import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Shield, Building2, AlertTriangle, DollarSign, Activity, CheckCircle, XCircle, Eye } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600">Manage JetrPay platform operations</p>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <Activity className="w-3 h-3 mr-1" />
              System Healthy
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-slate-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-slate-600">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
              <Shield className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-slate-600">Requires review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
              <Building2 className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-slate-600">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="kyc" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="kyc">KYC Review</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="kyc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending KYC Reviews</CardTitle>
                <CardDescription>Users awaiting identity verification approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "KYC-001", name: "John Doe", country: "Nigeria", submitted: "2 hours ago", risk: "Low" },
                    {
                      id: "KYC-002",
                      name: "Sarah Johnson",
                      country: "Kenya",
                      submitted: "4 hours ago",
                      risk: "Medium",
                    },
                    { id: "KYC-003", name: "Michael Chen", country: "Ghana", submitted: "1 day ago", risk: "Low" },
                    { id: "KYC-004", name: "Amara Okafor", country: "Nigeria", submitted: "2 days ago", risk: "High" },
                  ].map((kyc) => (
                    <div key={kyc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{kyc.name}</p>
                          <p className="text-sm text-slate-600">
                            {kyc.id} • {kyc.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            kyc.risk === "High" ? "destructive" : kyc.risk === "Medium" ? "secondary" : "outline"
                          }
                        >
                          {kyc.risk} Risk
                        </Badge>
                        <span className="text-sm text-slate-600">{kyc.submitted}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-emerald-600 hover:text-emerald-700 bg-transparent"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Monitor platform transaction activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "TXN-001",
                      user: "john.doe@email.com",
                      type: "Buy USDC",
                      amount: "$500.00",
                      status: "Completed",
                      time: "5 min ago",
                    },
                    {
                      id: "TXN-002",
                      user: "sarah.j@email.com",
                      type: "Send USDC",
                      amount: "$250.00",
                      status: "Pending",
                      time: "12 min ago",
                    },
                    {
                      id: "TXN-003",
                      user: "merchant@store.com",
                      type: "Payment Link",
                      amount: "$1,200.00",
                      status: "Completed",
                      time: "1 hour ago",
                    },
                    {
                      id: "TXN-004",
                      user: "mike.chen@email.com",
                      type: "Sell USDC",
                      amount: "$800.00",
                      status: "Failed",
                      time: "2 hours ago",
                    },
                  ].map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{txn.id}</p>
                          <p className="text-sm text-slate-600">{txn.user}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">{txn.type}</span>
                        <span className="font-medium">{txn.amount}</span>
                        <Badge
                          variant={
                            txn.status === "Completed"
                              ? "default"
                              : txn.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {txn.status}
                        </Badge>
                        <span className="text-sm text-slate-600">{txn.time}</span>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Merchant Applications</CardTitle>
                <CardDescription>Review and approve merchant account requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "MERCH-001",
                      business: "TechStore Lagos",
                      owner: "Adebayo Ogundimu",
                      type: "Electronics",
                      status: "Pending",
                      applied: "1 day ago",
                    },
                    {
                      id: "MERCH-002",
                      business: "Nairobi Coffee Co",
                      owner: "Grace Wanjiku",
                      type: "Food & Beverage",
                      status: "Under Review",
                      applied: "3 days ago",
                    },
                    {
                      id: "MERCH-003",
                      business: "Ghana Fashion Hub",
                      owner: "Kwame Asante",
                      type: "Fashion",
                      status: "Approved",
                      applied: "1 week ago",
                    },
                  ].map((merchant) => (
                    <div key={merchant.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{merchant.business}</p>
                          <p className="text-sm text-slate-600">
                            {merchant.owner} • {merchant.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            merchant.status === "Approved"
                              ? "default"
                              : merchant.status === "Under Review"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {merchant.status}
                        </Badge>
                        <span className="text-sm text-slate-600">{merchant.applied}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          {merchant.status !== "Approved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-emerald-600 hover:text-emerald-700 bg-transparent"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Monitor and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "USR-001",
                      email: "john.doe@email.com",
                      name: "John Doe",
                      country: "Nigeria",
                      status: "Active",
                      joined: "2 months ago",
                      kyc: "Verified",
                    },
                    {
                      id: "USR-002",
                      email: "sarah.j@email.com",
                      name: "Sarah Johnson",
                      country: "Kenya",
                      status: "Active",
                      joined: "1 month ago",
                      kyc: "Pending",
                    },
                    {
                      id: "USR-003",
                      email: "mike.chen@email.com",
                      name: "Michael Chen",
                      country: "Ghana",
                      status: "Suspended",
                      joined: "3 months ago",
                      kyc: "Verified",
                    },
                  ].map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-slate-600">
                            {user.email} • {user.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={user.kyc === "Verified" ? "default" : "secondary"}>KYC: {user.kyc}</Badge>
                        <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                        <span className="text-sm text-slate-600">{user.joined}</span>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Monitor platform performance and uptime</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>API Response Time</span>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      142ms
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Database Performance</span>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Flow Blockchain Status</span>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Processors</span>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      All Online
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Monitor security events and threats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium">Unusual Login Pattern</p>
                      <p className="text-xs text-slate-600">Multiple failed attempts from IP 192.168.1.1</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">High Transaction Volume</p>
                      <p className="text-xs text-slate-600">User exceeded daily limit - flagged for review</p>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <Button variant="outline" size="sm">
                      View All Alerts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

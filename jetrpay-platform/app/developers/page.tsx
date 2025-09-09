"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  Key,
  Webhook,
  Book,
  Download,
  Play,
  Copy,
  ExternalLink,
  Zap,
  Shield,
  Globe,
  Terminal,
  FileText,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function DeveloperPortalPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock developer data
  const developer = {
    name: "Alex Johnson",
    email: "alex@techstartup.com",
    company: "TechStartup Inc.",
    apiKeys: 2,
    requests: 15420,
    webhooks: 3,
  }

  const quickStats = {
    totalRequests: 15420,
    successRate: 99.8,
    avgResponseTime: 120,
    activeWebhooks: 3,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-foreground">JetrPay</span>
              <Badge variant="outline" className="ml-2">
                Developer Portal
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="bg-transparent" asChild>
                <Link href="/developers/docs">
                  <Book className="h-4 w-4 mr-2" />
                  Documentation
                </Link>
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{developer.name}</p>
                <p className="text-xs text-muted-foreground">{developer.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Welcome to JetrPay Developer Portal</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build the future of payments with our powerful APIs. Integrate USDC payments into your applications with
              just a few lines of code.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" asChild>
                <Link href="/developers/quickstart">
                  <Play className="h-5 w-5 mr-2" />
                  Quick Start
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/developers/docs">
                  <Book className="h-5 w-5 mr-2" />
                  API Docs
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                <Terminal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{quickStats.totalRequests.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{quickStats.successRate}%</div>
                <p className="text-xs text-green-600">Excellent performance</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{quickStats.avgResponseTime}ms</div>
                <p className="text-xs text-muted-foreground">Lightning fast</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Webhooks</CardTitle>
                <Webhook className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{quickStats.activeWebhooks}</div>
                <p className="text-xs text-muted-foreground">Active endpoints</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Getting Started */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Play className="h-5 w-5 text-primary" />
                    <span>Getting Started</span>
                  </CardTitle>
                  <CardDescription>Everything you need to start integrating JetrPay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-border hover:bg-muted/30 transition-colors cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Key className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground mb-1">1. Get API Keys</h3>
                        <p className="text-sm text-muted-foreground">Generate your API keys to authenticate requests</p>
                      </CardContent>
                    </Card>

                    <Card className="border-border hover:bg-muted/30 transition-colors cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Code className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground mb-1">2. Make API Calls</h3>
                        <p className="text-sm text-muted-foreground">Start processing payments with our REST API</p>
                      </CardContent>
                    </Card>

                    <Card className="border-border hover:bg-muted/30 transition-colors cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Webhook className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground mb-1">3. Setup Webhooks</h3>
                        <p className="text-sm text-muted-foreground">Receive real-time payment notifications</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Resources */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Resources</CardTitle>
                    <CardDescription>Most accessed documentation and guides</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link
                      href="/developers/docs/payments"
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">Payment API</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/developers/docs/webhooks"
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Webhook className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">Webhooks Guide</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/developers/docs/authentication"
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">Authentication</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/developers/docs/errors"
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Terminal className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">Error Handling</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">SDKs & Libraries</CardTitle>
                    <CardDescription>Official SDKs for popular programming languages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded bg-yellow-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-yellow-700">JS</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">JavaScript/Node.js</p>
                          <p className="text-xs text-muted-foreground">v2.1.0</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Install
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-700">PY</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Python</p>
                          <p className="text-xs text-muted-foreground">v1.8.0</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Install
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded bg-red-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-red-700">RB</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Ruby</p>
                          <p className="text-xs text-muted-foreground">v1.5.0</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Install
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-green-700">GO</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Go</p>
                          <p className="text-xs text-muted-foreground">v1.3.0</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Install
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="api-keys" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">API Keys</CardTitle>
                      <CardDescription>Manage your API keys for authentication</CardDescription>
                    </div>
                    <Button>
                      <Key className="h-4 w-4 mr-2" />
                      Create New Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">Production Key</p>
                        <p className="text-sm text-muted-foreground font-mono">pk_live_••••••••••••••••••••••••</p>
                        <p className="text-xs text-muted-foreground">Created on Jan 10, 2024</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Live</Badge>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">Test Key</p>
                        <p className="text-sm text-muted-foreground font-mono">pk_test_••••••••••••••••••••••••</p>
                        <p className="text-xs text-muted-foreground">Created on Jan 5, 2024</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Test</Badge>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Webhooks</CardTitle>
                      <CardDescription>Configure endpoints to receive real-time notifications</CardDescription>
                    </div>
                    <Button>
                      <Webhook className="h-4 w-4 mr-2" />
                      Add Endpoint
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">https://api.myapp.com/webhooks/jetrpay</p>
                        <p className="text-sm text-muted-foreground">payment.completed, payment.failed</p>
                        <p className="text-xs text-muted-foreground">Last delivery: 2 minutes ago</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Active</Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">https://staging.myapp.com/webhooks</p>
                        <p className="text-sm text-muted-foreground">payment.completed</p>
                        <p className="text-xs text-muted-foreground">Last delivery: 1 hour ago</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Test</Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Create Payment</CardTitle>
                    <CardDescription>Process a USDC payment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      <pre className="text-foreground">
                        {`curl -X POST https://api.jetrpay.com/v1/payments \\
  -H "Authorization: Bearer pk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100.00,
    "currency": "USDC",
    "customer_email": "customer@example.com",
    "description": "Payment for order #123"
  }'`}
                      </pre>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Retrieve Payment</CardTitle>
                    <CardDescription>Get payment status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      <pre className="text-foreground">
                        {`curl https://api.jetrpay.com/v1/payments/pay_123 \\
  -H "Authorization: Bearer pk_live_..."

{
  "id": "pay_123",
  "amount": 100.00,
  "currency": "USDC",
  "status": "completed",
  "created": 1642694400
}`}
                      </pre>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">API Explorer</CardTitle>
                    <CardDescription>Test API endpoints interactively</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <Terminal className="h-4 w-4 mr-2" />
                      Open API Explorer
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Webhook Tester</CardTitle>
                    <CardDescription>Test webhook endpoints</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline" className="bg-transparent">
                      <Webhook className="h-4 w-4 mr-2" />
                      Test Webhooks
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

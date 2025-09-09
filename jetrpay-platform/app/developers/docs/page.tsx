"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Book,
  Code,
  Key,
  Shield,
  Zap,
  Globe,
  FileText,
  ExternalLink,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function APIDocsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const docSections = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of integrating with JetrPay",
      items: [
        { title: "Quick Start Guide", href: "/developers/docs/quickstart" },
        { title: "Authentication", href: "/developers/docs/authentication" },
        { title: "Making Your First Request", href: "/developers/docs/first-request" },
        { title: "Testing with Sandbox", href: "/developers/docs/sandbox" },
      ],
    },
    {
      title: "API Reference",
      icon: Code,
      description: "Complete API documentation with examples",
      items: [
        { title: "Payments API", href: "/developers/docs/payments" },
        { title: "Customers API", href: "/developers/docs/customers" },
        { title: "Transactions API", href: "/developers/docs/transactions" },
        { title: "Webhooks API", href: "/developers/docs/webhooks" },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      description: "Security best practices and compliance",
      items: [
        { title: "API Keys Management", href: "/developers/docs/api-keys" },
        { title: "Webhook Signatures", href: "/developers/docs/webhook-signatures" },
        { title: "Rate Limiting", href: "/developers/docs/rate-limits" },
        { title: "Error Handling", href: "/developers/docs/errors" },
      ],
    },
    {
      title: "Integration Guides",
      icon: Zap,
      description: "Step-by-step integration tutorials",
      items: [
        { title: "E-commerce Integration", href: "/developers/docs/ecommerce" },
        { title: "Mobile App Integration", href: "/developers/docs/mobile" },
        { title: "Subscription Payments", href: "/developers/docs/subscriptions" },
        { title: "Multi-party Payments", href: "/developers/docs/multiparty" },
      ],
    },
  ]

  const popularEndpoints = [
    {
      method: "POST",
      endpoint: "/v1/payments",
      description: "Create a new payment",
      badge: "Most Popular",
    },
    {
      method: "GET",
      endpoint: "/v1/payments/{id}",
      description: "Retrieve a payment",
      badge: "Essential",
    },
    {
      method: "POST",
      endpoint: "/v1/customers",
      description: "Create a customer",
      badge: "Common",
    },
    {
      method: "GET",
      endpoint: "/v1/transactions",
      description: "List transactions",
      badge: "Useful",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/developers"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portal</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-foreground">JetrPay</span>
              <Badge variant="outline">API Documentation</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">API Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate JetrPay's payment infrastructure into your applications
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Access */}
          <Card className="border-border bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Quick Access</CardTitle>
              <CardDescription>Jump to the most commonly used endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {popularEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={endpoint.method === "POST" ? "default" : "secondary"}
                        className="font-mono text-xs"
                      >
                        {endpoint.method}
                      </Badge>
                      <div>
                        <p className="font-mono text-sm text-foreground">{endpoint.endpoint}</p>
                        <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {endpoint.badge}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documentation Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {docSections.map((section, index) => {
              const Icon = section.icon
              return (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span>{section.title}</span>
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors group"
                        >
                          <span className="text-sm font-medium text-foreground group-hover:text-primary">
                            {item.title}
                          </span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* API Status */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>API Status</span>
              </CardTitle>
              <CardDescription>Current status of JetrPay API services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-foreground">Payments API</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Operational
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-foreground">Webhooks</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Operational
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-foreground">Flow Network</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Operational
                  </Badge>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uptime (30 days)</span>
                    <span className="font-medium text-foreground">99.98%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
              <CardDescription>Get support from our developer community and team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/developers/support">
                    <FileText className="h-4 w-4 mr-2" />
                    Support Center
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/developers/community">
                    <Globe className="h-4 w-4 mr-2" />
                    Community Forum
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="mailto:developers@jetrpay.com">
                    <Key className="h-4 w-4 mr-2" />
                    Contact Team
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

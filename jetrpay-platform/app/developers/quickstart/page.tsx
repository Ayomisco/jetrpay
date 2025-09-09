"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Play, CheckCircle, Code, Terminal, Key, Webhook } from "lucide-react"
import Link from "next/link"

export default function QuickStartPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step])
    }
  }

  const codeExamples = {
    curl: `curl -X POST https://api.jetrpay.com/v1/payments \\
  -H "Authorization: Bearer pk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100.00,
    "currency": "USDC",
    "customer_email": "customer@example.com",
    "description": "Test payment"
  }'`,
    javascript: `const jetrpay = require('jetrpay')('pk_test_...');

const payment = await jetrpay.payments.create({
  amount: 100.00,
  currency: 'USDC',
  customer_email: 'customer@example.com',
  description: 'Test payment'
});

console.log(payment.id);`,
    python: `import jetrpay
jetrpay.api_key = "pk_test_..."

payment = jetrpay.Payment.create(
    amount=100.00,
    currency='USDC',
    customer_email='customer@example.com',
    description='Test payment'
)

print(payment.id)`,
  }

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
              <Badge variant="outline">Quick Start</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Quick Start Guide</h1>
            <p className="text-xl text-muted-foreground">Get up and running with JetrPay in under 10 minutes</p>
            <div className="flex items-center justify-center space-x-2">
              <Badge variant="secondary">Estimated time: 5-10 minutes</Badge>
            </div>
          </div>

          {/* Progress */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
              <CardDescription>Complete these steps to make your first payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        completedSteps.includes(step) ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {completedSteps.includes(step) ? <CheckCircle className="h-4 w-4" /> : step}
                    </div>
                    {step < 4 && <div className="w-8 h-0.5 bg-border mx-2" />}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{completedSteps.length}/4 steps completed</p>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Get API Keys */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  1
                </div>
                <span>Get Your API Keys</span>
              </CardTitle>
              <CardDescription>First, you'll need to get your API keys from the dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Test API Key</span>
                  <Badge variant="outline">Test Mode</Badge>
                </div>
                <div className="font-mono text-sm text-muted-foreground bg-background rounded p-2 border">
                  pk_test_1234567890abcdef1234567890abcdef
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => markStepComplete(1)}>
                  <Key className="h-4 w-4 mr-2" />
                  Get My API Keys
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Test Key
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Install SDK */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  2
                </div>
                <span>Install the SDK</span>
              </CardTitle>
              <CardDescription>Choose your preferred programming language</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>

                <TabsContent value="javascript" className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Install via npm</span>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy("npm install jetrpay", "npm")}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <pre className="font-mono text-sm text-foreground">npm install jetrpay</pre>
                  </div>
                </TabsContent>

                <TabsContent value="python" className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Install via pip</span>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy("pip install jetrpay", "pip")}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <pre className="font-mono text-sm text-foreground">pip install jetrpay</pre>
                  </div>
                </TabsContent>

                <TabsContent value="curl" className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      No installation required - use cURL directly from your terminal
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={() => markStepComplete(2)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Installed
              </Button>
            </CardContent>
          </Card>

          {/* Step 3: Make Your First Request */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  3
                </div>
                <span>Make Your First Payment</span>
              </CardTitle>
              <CardDescription>Create a test payment to see how it works</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>

                {Object.entries(codeExamples).map(([lang, code]) => (
                  <TabsContent key={lang} value={lang} className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Create Payment</span>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(code, `code-${lang}`)}>
                          <Copy className="h-3 w-3" />
                          {copied === `code-${lang}` ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                      <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">{code}</pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <Button onClick={() => markStepComplete(3)}>
                <Play className="h-4 w-4 mr-2" />
                Test This Code
              </Button>
            </CardContent>
          </Card>

          {/* Step 4: Setup Webhooks */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  4
                </div>
                <span>Setup Webhooks (Optional)</span>
              </CardTitle>
              <CardDescription>Receive real-time notifications about payment events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Webhook className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Why use webhooks?</h4>
                    <p className="text-sm text-blue-700">
                      Webhooks notify your application immediately when payments are completed, failed, or require
                      action. This ensures your system stays in sync with JetrPay.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => markStepComplete(4)}>
                  <Webhook className="h-4 w-4 mr-2" />
                  Setup Webhooks
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Skip for Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-border bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">🎉 You're Ready!</CardTitle>
              <CardDescription className="text-green-700">
                You've completed the quick start guide. Here's what to do next:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="justify-start" asChild>
                  <Link href="/developers/docs">
                    <Code className="h-4 w-4 mr-2" />
                    Explore Full API Docs
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/developers">
                    <Terminal className="h-4 w-4 mr-2" />
                    Go to Developer Portal
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

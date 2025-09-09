import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  Book,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Copy,
  ExternalLink,
  CheckCircle,
  Webhook,
  Key,
  Database,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Code,
    title: "RESTful APIs",
    description: "Simple HTTP endpoints with JSON responses for all payment operations.",
  },
  {
    icon: Zap,
    title: "Real-time Webhooks",
    description: "Instant notifications for payment events with automatic retry logic.",
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description: "API keys with scoped permissions and request signing for security.",
  },
  {
    icon: Globe,
    title: "Multi-language SDKs",
    description: "Native libraries for JavaScript, Python, PHP, Go, and more.",
  },
]

const quickStartSteps = [
  {
    step: "1",
    title: "Get API Keys",
    description: "Sign up and generate your test API keys from the dashboard.",
  },
  {
    step: "2",
    title: "Make First Call",
    description: "Test the API with a simple payment link creation request.",
  },
  {
    step: "3",
    title: "Handle Webhooks",
    description: "Set up webhook endpoints to receive payment notifications.",
  },
  {
    step: "4",
    title: "Go Live",
    description: "Switch to production keys and start accepting real payments.",
  },
]

const codeExamples = {
  curl: `curl -X POST https://api.jetrpay.com/v1/payment-links \\
  -H "Authorization: Bearer sk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "description": "Product Purchase",
    "success_url": "https://yoursite.com/success",
    "cancel_url": "https://yoursite.com/cancel"
  }'`,

  javascript: `const jetrpay = require('jetrpay')('sk_test_...');

const paymentLink = await jetrpay.paymentLinks.create({
  amount: 100.00,
  currency: 'USD',
  description: 'Product Purchase',
  success_url: 'https://yoursite.com/success',
  cancel_url: 'https://yoursite.com/cancel'
});

console.log(paymentLink.url);`,

  python: `import jetrpay
jetrpay.api_key = "sk_test_..."

payment_link = jetrpay.PaymentLink.create(
    amount=100.00,
    currency="USD",
    description="Product Purchase",
    success_url="https://yoursite.com/success",
    cancel_url="https://yoursite.com/cancel"
)

print(payment_link.url)`,

  php: `<?php
require_once('vendor/autoload.php');

\\JetrPay\\JetrPay::setApiKey('sk_test_...');

$payment_link = \\JetrPay\\PaymentLink::create([
    'amount' => 100.00,
    'currency' => 'USD',
    'description' => 'Product Purchase',
    'success_url' => 'https://yoursite.com/success',
    'cancel_url' => 'https://yoursite.com/cancel'
]);

echo $payment_link->url;
?>`,
}

export default function DevelopersPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Developer Platform
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                Build with <span className="text-primary">JetrPay APIs</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Integrate stablecoin payments into your applications with our developer-friendly APIs, comprehensive
                SDKs, and detailed documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/docs/quickstart">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/docs/api">
                    <Book className="mr-2 h-4 w-4" />
                    API Reference
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Everything You Need to Build</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Our platform provides all the tools and resources you need to integrate stablecoin payments seamlessly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Quick Start Guide</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Get up and running with JetrPay in just a few minutes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {quickStartSteps.map((step, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm">
                        {step.step}
                      </div>
                      <h3 className="font-heading font-semibold text-lg">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Code Examples</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                See how easy it is to create a payment link with our APIs.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                </TabsList>

                {Object.entries(codeExamples).map(([language, code]) => (
                  <TabsContent key={language} value={language}>
                    <Card className="border-0 shadow-lg">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-mono">{language.toUpperCase()} Example</CardTitle>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* API Resources */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">API Resources</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Comprehensive documentation and tools to help you integrate successfully.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Book className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">API Reference</h3>
                  <p className="text-muted-foreground">
                    Complete API documentation with request/response examples and error codes.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/docs/api">
                      View Docs
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Webhook className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Webhooks Guide</h3>
                  <p className="text-muted-foreground">
                    Learn how to handle real-time payment notifications and events.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/docs/webhooks">
                      Learn More
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Key className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Authentication</h3>
                  <p className="text-muted-foreground">
                    Secure your API calls with proper authentication and key management.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/docs/auth">
                      View Guide
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Database className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">SDKs & Libraries</h3>
                  <p className="text-muted-foreground">
                    Download official SDKs for your favorite programming language.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/docs/sdks">
                      Download
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Sandbox Testing</h3>
                  <p className="text-muted-foreground">Test your integration safely with our sandbox environment.</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/sandbox">
                      Try Sandbox
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Status Page</h3>
                  <p className="text-muted-foreground">Monitor API uptime and get notified of any service issues.</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/status">
                      Check Status
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">
                  Join Our Developer Community
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Connect with other developers building on JetrPay. Get help, share ideas, and stay updated on new
                  features.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>24/7 developer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>Community Discord server</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>Regular developer meetups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>Open source contributions</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/community">
                      Join Community
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/support">Get Support</Link>
                  </Button>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-0">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <Code className="h-12 w-12 text-primary" />
                    <h3 className="font-heading font-bold text-2xl">Developer First</h3>
                    <p className="text-muted-foreground">
                      We're built by developers, for developers. Our APIs are designed to be intuitive, well-documented,
                      and easy to integrate.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="font-heading font-bold text-xl text-primary">99.9%</div>
                      <div className="text-sm text-muted-foreground">API Uptime</div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xl text-primary">&lt;200ms</div>
                      <div className="text-sm text-muted-foreground">Response Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground">
              <CardContent className="p-8 md:p-12 text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Ready to Start Building?</h2>
                  <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto">
                    Get your API keys and start integrating stablecoin payments into your application today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-base" asChild>
                    <Link href="/signup">
                      Get API Keys
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    asChild
                  >
                    <Link href="/docs">View Documentation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

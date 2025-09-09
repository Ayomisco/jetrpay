import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Zap,
  Globe,
  Code,
  CreditCard,
  Users,
  Lock,
  TrendingUp,
  Smartphone,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Clock,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mainFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with multi-signature wallets, KYC/AML compliance, and SOC 2 Type II certification.",
    benefits: [
      "Multi-signature protection",
      "Real-time fraud detection",
      "Regulatory compliance",
      "Insurance coverage",
    ],
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-second transaction confirmations on Flow blockchain with 99.9% uptime guarantee.",
    benefits: ["<1 second settlements", "99.9% uptime SLA", "Instant notifications", "Real-time tracking"],
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Send and receive payments across 15+ countries with local currency support and competitive rates.",
    benefits: ["15+ supported countries", "Local currency pairs", "Competitive FX rates", "24/7 availability"],
  },
  {
    icon: Code,
    title: "Developer First",
    description: "Comprehensive APIs, SDKs, and webhooks with sandbox environment for seamless integration.",
    benefits: ["RESTful APIs", "Multiple SDKs", "Webhook support", "Sandbox testing"],
  },
]

const paymentMethods = [
  { name: "Credit/Debit Cards", icon: CreditCard, description: "Visa, Mastercard, and local cards" },
  { name: "Bank Transfers", icon: DollarSign, description: "Direct bank account transfers" },
  { name: "Mobile Money", icon: Smartphone, description: "M-Pesa, MTN, and other providers" },
  { name: "USDC Wallets", icon: Lock, description: "Flow-based stablecoin wallets" },
]

const businessBenefits = [
  {
    icon: TrendingUp,
    title: "Reduce Costs",
    description: "Save up to 80% on cross-border transaction fees compared to traditional banking.",
    stat: "80% savings",
  },
  {
    icon: Clock,
    title: "Faster Settlements",
    description: "Receive payments instantly instead of waiting 3-5 business days.",
    stat: "Instant",
  },
  {
    icon: BarChart3,
    title: "Better Analytics",
    description: "Real-time dashboard with detailed transaction analytics and reporting.",
    stat: "Real-time",
  },
  {
    icon: Users,
    title: "Global Reach",
    description: "Accept payments from customers worldwide without geographic restrictions.",
    stat: "15+ countries",
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Platform Features
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                Everything You Need for <span className="text-primary">Modern Payments</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                JetrPay combines the power of blockchain technology with user-friendly interfaces to deliver the most
                comprehensive stablecoin payment platform.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {mainFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-heading font-bold text-2xl">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Multiple Payment Methods</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Accept payments through various channels to maximize your reach and customer convenience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentMethods.map((method, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <method.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Benefits */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">
                    Transform Your <span className="text-primary">Business Operations</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Join thousands of businesses already using JetrPay to streamline their payment processes and expand
                    globally.
                  </p>
                </div>

                <div className="space-y-6">
                  {businessBenefits.map((benefit, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-heading font-semibold text-lg">{benefit.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {benefit.stat}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button size="lg" asChild>
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <Image
                  src="/images/payment-flow.jpg"
                  alt="JetrPay payment flow dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Easy Integration</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Get up and running in minutes with our comprehensive developer tools and documentation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Code className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">REST API</h3>
                  <p className="text-muted-foreground">
                    Simple HTTP endpoints for all payment operations with comprehensive documentation.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/docs/api">View Docs</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">SDKs</h3>
                  <p className="text-muted-foreground">
                    Native SDKs for JavaScript, Python, PHP, and more with code examples.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/docs/sdks">Download SDKs</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Webhooks</h3>
                  <p className="text-muted-foreground">
                    Real-time notifications for payment events with retry logic and security.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/docs/webhooks">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground">
              <CardContent className="p-8 md:p-12 text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Ready to Get Started?</h2>
                  <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto">
                    Join thousands of businesses already using JetrPay for their stablecoin payment needs.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-base" asChild>
                    <Link href="/signup">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    asChild
                  >
                    <Link href="/contact">Contact Sales</Link>
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

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  BarChart3,
  Globe,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  QrCode,
  Smartphone,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const merchantFeatures = [
  {
    icon: QrCode,
    title: "Payment Links & QR Codes",
    description: "Generate instant payment links and QR codes for in-person or online sales.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track sales, revenue, and customer insights with comprehensive dashboards.",
  },
  {
    icon: Globe,
    title: "Multi-currency Support",
    description: "Accept payments in local currencies and receive USDC automatically.",
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "Advanced security measures to protect your business from fraudulent transactions.",
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Revenue",
    description: "Accept payments from global customers without geographic restrictions.",
    stat: "25% average increase",
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description: "Receive payments immediately instead of waiting days for bank transfers.",
    stat: "Instant access",
  },
  {
    icon: CreditCard,
    title: "Lower Fees",
    description: "Save up to 60% on transaction fees compared to traditional processors.",
    stat: "60% savings",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Manage your business on-the-go with our mobile-friendly dashboard.",
    stat: "100% mobile",
  },
]

const useCases = [
  {
    title: "E-commerce Store",
    description: "Online retailer accepting global payments",
    example: "Fashion boutique in Lagos accepts payments from customers worldwide",
    image: "/placeholder.svg?key=ecommerce",
  },
  {
    title: "Freelance Services",
    description: "Service providers getting paid internationally",
    example: "Graphic designer receives project payments from US and European clients",
    image: "/placeholder.svg?key=freelance",
  },
  {
    title: "Local Business",
    description: "Brick-and-mortar stores going digital",
    example: "Restaurant offers QR code payments for dine-in and delivery orders",
    image: "/placeholder.svg?key=local",
  },
]

export default function MerchantsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    For Merchants
                  </Badge>
                  <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                    Accept <span className="text-primary">Stablecoin Payments</span> Globally
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                    Expand your business worldwide with JetrPay's merchant tools. Accept USDC payments from anywhere,
                    get instant settlements, and grow your revenue.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/signup?type=merchant">
                      Start Accepting Payments
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/demo">View Demo</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span>No setup fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span>Instant settlements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span>Global reach</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/payment-flow.jpg"
                  alt="JetrPay merchant dashboard interface"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Powerful merchant tools designed to help you accept payments, track performance, and grow your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {merchantFeatures.map((feature, index) => (
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

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Why Merchants Choose JetrPay</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Join thousands of businesses already growing their revenue with stablecoin payments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-secondary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {benefit.stat}
                      </Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Perfect for Any Business</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                From online stores to local businesses, JetrPay works for merchants of all sizes.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={useCase.image || "/placeholder.svg"}
                        alt={useCase.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="font-heading font-semibold text-xl">{useCase.title}</h3>
                      <p className="text-muted-foreground">{useCase.description}</p>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm italic">"{useCase.example}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">How It Works</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Start accepting stablecoin payments in just a few simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-heading font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Sign Up & Verify</h3>
                  <p className="text-muted-foreground">
                    Create your merchant account and complete our quick KYC verification process.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-heading font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Create Payment Links</h3>
                  <p className="text-muted-foreground">
                    Generate payment links or QR codes for your products and services in seconds.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-8 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-heading font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Get Paid Instantly</h3>
                  <p className="text-muted-foreground">
                    Receive USDC payments instantly and convert to local currency when needed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                No hidden fees, no monthly charges. Pay only when you get paid.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="font-heading text-2xl">Transaction Fees</CardTitle>
                  <p className="text-muted-foreground">Competitive rates with volume discounts available</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-heading font-semibold text-lg">Payment Methods</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Card Payments</span>
                          <span className="font-medium">2.9% + $0.30</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Bank Transfers</span>
                          <span className="font-medium">1.5%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Mobile Money</span>
                          <span className="font-medium">2.5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-heading font-semibold text-lg">Additional Services</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>USDC Conversion</span>
                          <span className="font-medium">0.5%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Fiat Withdrawal</span>
                          <span className="font-medium">1.0%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Monthly Fee</span>
                          <span className="font-medium text-secondary">Free</span>
                        </div>
                      </div>
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
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">
                    Ready to Start Accepting Stablecoin Payments?
                  </h2>
                  <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto">
                    Join thousands of merchants already growing their business with JetrPay. No setup fees, instant
                    settlements.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-base" asChild>
                    <Link href="/signup?type=merchant">
                      Create Merchant Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    asChild
                  >
                    <Link href="/contact">Talk to Sales</Link>
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

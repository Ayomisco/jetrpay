import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users,
  CreditCard,
  Smartphone,
  TrendingUp,
  DollarSign,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center animate-glow">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-foreground">JetrPay</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="#developers"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Developers
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Pricing
              </Link>
              <Button
                variant="outline"
                className="glow-border hover:bg-primary/10 transition-all duration-200 bg-transparent"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="animate-glow" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge variant="secondary" className="mb-6 animate-slide-up glow-border">
            <Zap className="w-3 h-3 mr-1" />
            Built on Flow Blockchain
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance animate-slide-up">
            NO COMPLEXITY. JUST SECURE <span className="text-primary animate-pulse-slow">WALLET INFRASTRUCTURE</span>{" "}
            FOR FINTECHS
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto animate-fade-in">
            Our Wallet as a Service product provides fintechs with secure, scalable wallet infrastructure to power
            stablecoin transactions. Whether abstracted or fully integrated, empower your customers while delivering
            enterprise-grade security and flexibility.
          </p>

          <div className="grid grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="text-2xl md:text-3xl font-bold text-primary">$97M</div>
              <div className="text-sm text-muted-foreground">TOTAL TRANSACTION VOLUME</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-2xl md:text-3xl font-bold text-primary">55K</div>
              <div className="text-sm text-muted-foreground">WALLETS CREATED</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-2xl md:text-3xl font-bold text-primary">188K</div>
              <div className="text-sm text-muted-foreground">TOTAL TRANSACTIONS</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" className="text-lg px-8 animate-glow" asChild>
              <Link href="/register">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 glow-border hover:bg-primary/10 transition-all duration-200 bg-transparent"
              asChild
            >
              <Link href="/demo">Book demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">OUR CORE FEATURES</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plug-and-play APIs, non-custodial wallets, and seamless service integrations and tools to complement —
              completely blockchain transparent so you can focus on your customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="gradient-card glow-border hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:animate-glow">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Treasury</Badge>
                </div>
                <CardTitle className="text-xl">TREASURY MANAGEMENT</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your treasury with enterprise-grade security and compliance. Multi-signature wallets, automated
                  settlements, and real-time reporting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <img src="/treasury-management-dashboard-dark-theme.jpg" alt="Treasury Management" className="rounded opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card glow-border hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:animate-glow">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Gasless</Badge>
                </div>
                <CardTitle className="text-xl">GASLESS TRANSACTIONS</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enable seamless user experiences with gasless transactions. Your users never need to worry about gas
                  fees or blockchain complexity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <img src="/gasless-transaction-interface-dark-theme.jpg" alt="Gasless Transactions" className="rounded opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card glow-border hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:animate-glow">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Real-time</Badge>
                </div>
                <CardTitle className="text-xl">REAL TIME AML SCREENING</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Advanced AML screening with real-time transaction monitoring. Stay compliant with automated risk
                  assessment and reporting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <img src="/aml-screening-dashboard-dark-theme.jpg" alt="AML Screening" className="rounded opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card glow-border hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:animate-glow">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Omni-chain</Badge>
                </div>
                <CardTitle className="text-xl">OMNI-CHAIN & MULTI ASSET</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Support multiple blockchains and assets from a single integration. Flow, Ethereum, and more with
                  unified API endpoints.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <img src="/multi-chain-wallet-interface-dark-theme.jpg" alt="Multi-chain Support" className="rounded opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card glow-border hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:animate-glow">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Checkout</Badge>
                </div>
                <CardTitle className="text-xl">CHECKOUT INFRASTRUCTURE</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Complete checkout solution with payment links, QR codes, and embeddable widgets. Accept crypto
                  payments with fiat settlement options.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <img src="/crypto-checkout-interface-dark-theme.jpg" alt="Checkout Infrastructure" className="rounded opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card glow-border hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:animate-glow">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Swap & Bridge</Badge>
                </div>
                <CardTitle className="text-xl">SWAP AND BRIDGE</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Seamless asset swapping and cross-chain bridging. Enable users to move assets between chains with
                  optimal routing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <img src="/swap-and-bridge-interface-dark-theme.jpg" alt="Swap and Bridge" className="rounded opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Built for the Future of Finance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bridge Web2 and Web3 finance with compliant, developer-friendly tools that unlock access to stable digital
              dollars for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Instant Settlements</CardTitle>
                <CardDescription>
                  Lightning-fast transactions powered by Flow blockchain with sub-second finality
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Bank-Grade Security</CardTitle>
                <CardDescription>
                  KYC/AML compliance with enterprise-level security and regulatory adherence
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Global Reach</CardTitle>
                <CardDescription>
                  Starting in Africa and scaling globally with local payment method support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Developer-First</CardTitle>
                <CardDescription>
                  RESTful APIs, webhooks, and SDKs for seamless integration into any application
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multiple Payment Methods</CardTitle>
                <CardDescription>
                  Support for cards, bank transfers, and mobile money across emerging markets
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mobile-First Design</CardTitle>
                <CardDescription>
                  Optimized for mobile users with intuitive interfaces and offline capabilities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Built for Real-World Use Cases</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From freelancers receiving global payments to merchants accepting crypto, JetrPay powers the next
              generation of digital commerce.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-primary">For Freelancers</CardTitle>
                <CardDescription>
                  Receive payments from global clients in stable USD and withdraw to local currency instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "Mary in Nigeria receives $500 USDC from her client and withdraws to Naira within minutes, avoiding
                  traditional banking delays and high fees."
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-primary">For Merchants</CardTitle>
                <CardDescription>
                  Accept crypto payments with automatic conversion and settlement in your preferred currency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "Tokunbo generates a USDC payment link, shares it with customers worldwide, and receives stable
                  payments for his e-commerce business."
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-primary">For Developers</CardTitle>
                <CardDescription>
                  Integrate stablecoin payments into your apps with simple APIs and comprehensive documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "A developer integrates JetrPay API to enable in-app purchases using Flow-based USDC in their NFT
                  marketplace, creating seamless user experiences."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Transform Your Payments?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Built from enterprise markets to serve the world, we're trusted by customers and partners at every size —
            from emerging platforms to cross border providers and exchanges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 animate-glow" asChild>
              <Link href="/register">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 glow-border hover:bg-primary/10 transition-all duration-200 bg-transparent"
              asChild
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">J</span>
                </div>
                <span className="text-xl font-bold text-foreground">JetrPay</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Powering the next generation of borderless payments with blockchain technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Developers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/sdks" className="hover:text-foreground transition-colors">
                    SDKs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; 2024 JetrPay. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                99.9% Uptime
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                SOC 2 Compliant
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

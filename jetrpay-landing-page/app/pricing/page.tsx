import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, ArrowRight, Zap, Users, Building } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "Free",
    description: "Perfect for individuals and small businesses getting started",
    features: [
      "Up to $1,000/month volume",
      "Basic payment links",
      "Standard support",
      "Flow blockchain access",
      "Basic analytics",
      "Email notifications",
    ],
    limitations: ["Limited API calls", "No custom branding", "Basic reporting only"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Professional",
    icon: Users,
    price: "$49",
    period: "/month",
    description: "Ideal for growing businesses with higher volume needs",
    features: [
      "Up to $50,000/month volume",
      "Advanced payment tools",
      "Priority support",
      "Custom payment pages",
      "Advanced analytics",
      "Webhook notifications",
      "Multi-user access",
      "API access",
    ],
    limitations: [],
    cta: "Start 14-Day Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building,
    price: "Custom",
    description: "For large organizations with complex requirements",
    features: [
      "Unlimited volume",
      "White-label solution",
      "Dedicated support",
      "Custom integrations",
      "Advanced reporting",
      "SLA guarantees",
      "Multi-region support",
      "Custom contracts",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
]

const transactionFees = [
  { type: "Card Payments", fee: "2.9% + $0.30", description: "Credit and debit card transactions" },
  { type: "Bank Transfers", fee: "1.5%", description: "Direct bank account transfers" },
  { type: "Mobile Money", fee: "2.5%", description: "M-Pesa, MTN Money, and others" },
  { type: "USDC Transfers", fee: "0.5%", description: "Stablecoin to stablecoin transfers" },
  { type: "Withdrawals", fee: "1.0%", description: "Convert USDC back to fiat currency" },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Simple Pricing
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                Choose the Right Plan for <span className="text-primary">Your Business</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Transparent pricing with no hidden fees. Start free and scale as you grow.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative border-0 shadow-lg hover:shadow-xl transition-shadow ${
                    plan.popular ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center space-y-4 pb-8">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                      <plan.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-2xl">{plan.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="font-heading font-bold text-4xl">{plan.price}</span>
                        {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-center gap-3 opacity-60">
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg" asChild>
                      <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Transaction Fees */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Transaction Fees</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Competitive rates with no hidden fees. Pay only for what you use.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {transactionFees.map((fee, index) => (
                      <div key={index} className="p-6 flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-heading font-semibold">{fee.type}</h3>
                          <p className="text-sm text-muted-foreground">{fee.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-heading font-bold text-lg text-primary">{fee.fee}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                * All fees are calculated per transaction. Volume discounts available for Enterprise plans.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">Can I change plans anytime?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                    prorate any billing differences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">Are there any setup fees?</h3>
                  <p className="text-muted-foreground">
                    No setup fees for Starter and Professional plans. Enterprise plans may have custom setup fees
                    depending on integration complexity.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">What happens if I exceed my volume limit?</h3>
                  <p className="text-muted-foreground">
                    We'll automatically suggest an upgrade to the next plan. You won't lose any functionality, but
                    additional volume may incur overage fees.
                  </p>
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
                    Join thousands of businesses using JetrPay. Start with our free plan and scale as you grow.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-base" asChild>
                    <Link href="/signup">
                      Start Free Today
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

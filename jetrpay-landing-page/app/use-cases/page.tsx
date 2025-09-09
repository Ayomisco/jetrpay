import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  ShoppingCart,
  Briefcase,
  Users,
  Smartphone,
  Building,
  ArrowRight,
  DollarSign,
  Clock,
  Shield,
} from "lucide-react"

export default function UseCasesPage() {
  const useCases = [
    {
      title: "Freelancer Payments",
      description: "Global freelancers receiving payments in stable digital currency",
      icon: <Briefcase className="h-8 w-8" />,
      category: "Individual",
      benefits: ["Instant global payments", "No bank delays", "Stable USD value", "Low transaction fees"],
      example: {
        name: "Mary - Graphic Designer",
        location: "Lagos, Nigeria",
        scenario: "Receives $500 USDC from US client, converts to Naira instantly",
        savings: "Saves 5-7 days vs traditional banking",
      },
      metrics: {
        timeReduction: "95%",
        costSaving: "60%",
        reliability: "99.9%",
      },
    },
    {
      title: "E-commerce Merchants",
      description: "Online sellers accepting crypto payments with automatic conversion",
      icon: <ShoppingCart className="h-8 w-8" />,
      category: "Business",
      benefits: ["Global customer reach", "Instant settlement", "Fraud protection", "Multi-currency support"],
      example: {
        name: "Tokunbo - Fashion Store",
        location: "Accra, Ghana",
        scenario: "Accepts USDC payments via QR codes, auto-converts to local currency",
        savings: "Expands to 50+ countries overnight",
      },
      metrics: {
        revenueIncrease: "40%",
        settlementTime: "Instant",
        chargebackRate: "0.1%",
      },
    },
    {
      title: "Remittances",
      description: "Cross-border money transfers for families and communities",
      icon: <Globe className="h-8 w-8" />,
      category: "Personal",
      benefits: ["24/7 availability", "Real-time transfers", "Transparent fees", "Mobile-first experience"],
      example: {
        name: "James - Diaspora Worker",
        location: "London, UK → Nairobi, Kenya",
        scenario: "Sends $200 monthly to family, they receive in local currency",
        savings: "Saves $15 per transfer vs Western Union",
      },
      metrics: {
        costReduction: "75%",
        speed: "Minutes",
        accessibility: "24/7",
      },
    },
    {
      title: "Developer Integrations",
      description: "Apps and platforms embedding stablecoin payment rails",
      icon: <Smartphone className="h-8 w-8" />,
      category: "Developer",
      benefits: ["Simple API integration", "Webhook support", "Sandbox testing", "Comprehensive docs"],
      example: {
        name: "GameFi Platform",
        location: "Global",
        scenario: "NFT game enables in-app purchases with USDC on Flow blockchain",
        savings: "Reduces payment integration time by 80%",
      },
      metrics: {
        integrationTime: "2 hours",
        uptime: "99.99%",
        apiCalls: "1M+/day",
      },
    },
    {
      title: "B2B Payments",
      description: "Business-to-business transactions and supplier payments",
      icon: <Building className="h-8 w-8" />,
      category: "Enterprise",
      benefits: ["Bulk payment processing", "Smart contract automation", "Audit trails", "Multi-signature security"],
      example: {
        name: "Supply Chain Company",
        location: "Pan-African Operations",
        scenario: "Pays 100+ suppliers across 10 countries in USDC monthly",
        savings: "Reduces payment processing time from weeks to hours",
      },
      metrics: {
        efficiency: "90%",
        costSaving: "45%",
        transparency: "100%",
      },
    },
    {
      title: "Payroll & Salaries",
      description: "Companies paying employees in stable digital currency",
      icon: <Users className="h-8 w-8" />,
      category: "Business",
      benefits: ["Automated payroll", "Global workforce support", "Instant payments", "Compliance tracking"],
      example: {
        name: "Remote-First Startup",
        location: "Distributed Team",
        scenario: "Pays 50 employees across Africa in USDC, they convert locally",
        savings: "Eliminates banking delays and high transfer fees",
      },
      metrics: {
        payrollTime: "1 hour",
        employeeSatisfaction: "95%",
        costReduction: "70%",
      },
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Individual":
        return "bg-primary/10 text-primary"
      case "Business":
        return "bg-secondary/10 text-secondary"
      case "Personal":
        return "bg-accent/10 text-accent-foreground"
      case "Developer":
        return "bg-chart-3/10 text-chart-3"
      case "Enterprise":
        return "bg-chart-4/10 text-chart-4"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 gradient-text">Real-World Use Cases</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how individuals, businesses, and developers are using JetrPay to revolutionize their payment
            workflows and unlock new opportunities in the digital economy.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 curved-border bg-primary/10 text-primary">
              <Clock className="h-4 w-4" />
              <span>95% Faster Payments</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 curved-border bg-secondary/10 text-secondary">
              <DollarSign className="h-4 w-4" />
              <span>60% Lower Costs</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 curved-border bg-accent/10 text-accent-foreground">
              <Shield className="h-4 w-4" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="glass-effect curved-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 curved-border bg-primary/10 text-primary">{useCase.icon}</div>
                    <div>
                      <CardTitle className="text-xl font-heading">{useCase.title}</CardTitle>
                      <CardDescription className="text-base mt-1">{useCase.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(useCase.category)}>{useCase.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Benefits */}
                <div>
                  <h4 className="font-semibold mb-3">Key Benefits</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 curved-border bg-primary"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Example */}
                <div className="p-4 curved-border bg-muted/20">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Real Example
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>{useCase.example.name}</strong> • {useCase.example.location}
                    </div>
                    <div className="text-muted-foreground">{useCase.example.scenario}</div>
                    <div className="text-primary font-medium">{useCase.example.savings}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  {Object.entries(useCase.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-lg font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry Focus */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 gradient-text">Industries We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Fintech", description: "Payment processors and financial services", growth: "+150%" },
              { name: "E-commerce", description: "Online marketplaces and retail platforms", growth: "+200%" },
              { name: "Gaming", description: "NFT games and virtual economies", growth: "+300%" },
              { name: "Freelancing", description: "Remote work and gig economy platforms", growth: "+180%" },
            ].map((industry, index) => (
              <Card
                key={index}
                className="glass-effect curved-border text-center p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-heading font-semibold text-lg mb-2">{industry.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>
                <Badge className="bg-secondary/10 text-secondary">{industry.growth} Growth</Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <Card className="glass-effect curved-border p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold mb-4 gradient-text">Success Stories</h2>
              <p className="text-lg text-muted-foreground">
                Real results from businesses and individuals using JetrPay
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">$2.5M+</div>
                <div className="text-sm text-muted-foreground">Monthly Volume Processed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-foreground mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Ready to Transform Your Payments?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and individuals who are already using JetrPay to unlock the power of borderless
            stablecoin payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="curved-border bg-gradient-to-r from-primary to-secondary">
              Start Your Use Case
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="curved-border bg-transparent">
              Schedule Demo
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

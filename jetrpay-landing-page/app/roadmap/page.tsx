import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Target, Zap, Globe, Smartphone, Shield, Users } from "lucide-react"

export default function RoadmapPage() {
  const roadmapPhases = [
    {
      phase: "Phase 1",
      timeline: "Q4 2025",
      status: "in-progress",
      title: "MVP Launch",
      description: "Core platform with essential payment features",
      features: [
        "USDC onramp/offramp on Flow blockchain",
        "REST API and webhook support",
        "Merchant payment link generator",
        "KYC and AML compliance integration",
        "Admin dashboard and user management",
        "Blocto wallet integration",
      ],
      icon: <Zap className="h-6 w-6" />,
    },
    {
      phase: "Phase 2",
      timeline: "Q1 2026",
      status: "planned",
      title: "Enhanced Features",
      description: "Advanced payment capabilities and multi-chain support",
      features: [
        "NFT checkout and minting integration",
        "Recurring payments and subscriptions",
        "Ethereum and Solana blockchain support",
        "Advanced merchant dashboard analytics",
        "Multi-currency stablecoin support",
        "Enhanced security features",
      ],
      icon: <Target className="h-6 w-6" />,
    },
    {
      phase: "Phase 3",
      timeline: "Q2 2026",
      status: "planned",
      title: "Mobile & P2P",
      description: "Mobile applications and peer-to-peer functionality",
      features: [
        "Native mobile apps for iOS and Android",
        "P2P stablecoin transfers and swaps",
        "Payroll and mass payout features",
        "QR code payment processing",
        "Offline payment capabilities",
        "Social payment features",
      ],
      icon: <Smartphone className="h-6 w-6" />,
    },
    {
      phase: "Phase 4",
      timeline: "Q3 2026",
      status: "planned",
      title: "Global Expansion",
      description: "Enterprise features and worldwide market expansion",
      features: [
        "Enterprise API and white-label solutions",
        "Global regulatory compliance",
        "Local payment method integrations",
        "Multi-language platform support",
        "Partner network and agent system",
        "Advanced treasury management",
      ],
      icon: <Globe className="h-6 w-6" />,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-secondary text-secondary-foreground"
      case "in-progress":
        return "bg-primary text-primary-foreground"
      case "planned":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "planned":
        return <Target className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 gradient-text">Product Roadmap</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our journey to revolutionize stablecoin payments across Africa and beyond. Track our progress and see what's
            coming next.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span>Planned</span>
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-8">
          {roadmapPhases.map((phase, index) => (
            <Card key={phase.phase} className="glass-effect curved-border overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 curved-border bg-primary/10 text-primary">{phase.icon}</div>
                    <div>
                      <CardTitle className="text-2xl font-heading">{phase.title}</CardTitle>
                      <CardDescription className="text-base">{phase.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(phase.status)} mb-2`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(phase.status)}
                        <span className="capitalize">{phase.status.replace("-", " ")}</span>
                      </div>
                    </Badge>
                    <div className="text-sm text-muted-foreground">{phase.timeline}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {phase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3 p-3 curved-border bg-muted/20">
                      <CheckCircle
                        className={`h-4 w-4 mt-0.5 ${
                          phase.status === "completed"
                            ? "text-secondary"
                            : phase.status === "in-progress"
                              ? "text-primary"
                              : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vision Section */}
        <div className="mt-20 text-center">
          <Card className="glass-effect curved-border p-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">Our Long-term Vision</h2>
              <p className="text-lg text-muted-foreground mb-8">
                By 2027, JetrPay will be the leading stablecoin payment infrastructure across emerging markets,
                processing billions in cross-border transactions and empowering millions of users with seamless access
                to stable digital currencies.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-4 curved-border bg-primary/10 text-primary w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">10M+ Users</h3>
                  <p className="text-sm text-muted-foreground">Active users across Africa and beyond</p>
                </div>
                <div className="text-center">
                  <div className="p-4 curved-border bg-secondary/10 text-secondary w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">50+ Countries</h3>
                  <p className="text-sm text-muted-foreground">Global presence with local partnerships</p>
                </div>
                <div className="text-center">
                  <div className="p-4 curved-border bg-accent/10 text-accent-foreground w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">$10B+ Volume</h3>
                  <p className="text-sm text-muted-foreground">Annual transaction volume processed</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Ready to Join Our Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of the future of borderless payments. Start building with JetrPay today and help shape the next
            generation of financial infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="curved-border bg-gradient-to-r from-primary to-secondary">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="curved-border bg-transparent">
              View Documentation
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Globe, Code, CreditCard, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "KYC/AML compliant with enterprise-level security protocols and multi-signature wallet protection.",
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description: "Lightning-fast transactions on Flow blockchain with sub-second confirmation times.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Send and receive payments across 15+ countries with local fiat currency support.",
  },
  {
    icon: Code,
    title: "Developer APIs",
    description: "Comprehensive REST APIs and SDKs for seamless integration into your applications.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Methods",
    description: "Support for cards, bank transfers, and mobile money across African markets.",
  },
  {
    icon: Users,
    title: "Business Solutions",
    description: "Merchant tools, payment links, and dashboard analytics for growing businesses.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Why Choose JetrPay?</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Built for the next generation of digital payments with cutting-edge blockchain technology and user-friendly
            interfaces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

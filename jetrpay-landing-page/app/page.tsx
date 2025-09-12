export {}
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustSection } from "@/components/trust-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

// Placeholder components for new sections
function CardWidget() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-end">
      {/* TODO: Card widget UI matching Finpay style, with JetrPay content */}
      <div className="bg-card rounded-xl shadow-lg p-6 w-[320px]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-lg">JetrPay Balance</span>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">USDC</span>
        </div>
        <div className="text-3xl font-bold mb-4">$1,275.00</div>
        <div className="w-full h-2 bg-primary/20 rounded mb-4">
          <div className="h-2 bg-primary rounded" style={{ width: '70%' }} />
        </div>
        <button className="w-full bg-primary text-primary-foreground py-2 rounded font-medium">Withdraw</button>
      </div>
    </div>
  )
}

function StatsSection() {
  return (
    <section className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* TODO: Replace with real stats and icons */}
      <div className="bg-card rounded-xl p-6 text-center shadow">
        <div className="text-4xl font-bold">3k+</div>
        <div className="text-muted-foreground mt-2">Customers already running on JetrPay</div>
      </div>
      <div className="bg-card rounded-xl p-6 text-center shadow">
        <div className="text-4xl font-bold">Instant</div>
        <div className="text-muted-foreground mt-2">Withdraw your funds at any time</div>
      </div>
      <div className="bg-card rounded-xl p-6 text-center shadow">
        <div className="text-4xl font-bold">No asset volatility</div>
        <div className="text-muted-foreground mt-2">Stablecoin payments, always 1:1</div>
      </div>
    </section>
  )
}

function ChartSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* TODO: Add chart UI, use JetrPay stats */}
      <div className="bg-card rounded-xl p-6 shadow">
        <div className="font-semibold mb-2">Total Payments Processed</div>
        <div className="h-32 bg-muted rounded flex items-center justify-center text-muted-foreground">[Chart Placeholder]</div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* TODO: Pricing cards styled like Finpay, with JetrPay plans */}
      <div className="bg-card rounded-xl p-6 shadow flex flex-col items-center">
        <div className="font-bold text-2xl mb-2">Plus</div>
        <div className="text-muted-foreground mb-4">All essentials</div>
        <div className="text-3xl font-bold mb-4">$29/month</div>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium">Get Started</button>
      </div>
      <div className="bg-primary rounded-xl p-6 shadow flex flex-col items-center text-primary-foreground">
        <div className="font-bold text-2xl mb-2">Premium</div>
        <div className="mb-4">All advanced features</div>
        <div className="text-3xl font-bold mb-4">$59/month</div>
        <button className="bg-card text-primary px-6 py-2 rounded font-medium">Get Started</button>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <CardWidget />
        <StatsSection />
        <TrustSection />
        <FeaturesSection />
        <ChartSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PoweringSection } from "@/components/powering-section"
import { TickerSection } from "@/components/ticker-section"
import { MoneyTransferSection } from "@/components/money-transfer-section"
import { FeaturesGrid } from "@/components/features-grid"
import { CreditBuildingSection } from "@/components/credit-building-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PoweringSection />
      <TickerSection />
      <MoneyTransferSection />
      <FeaturesGrid />
      <CreditBuildingSection />
      <Footer />
    </main>
  )
}

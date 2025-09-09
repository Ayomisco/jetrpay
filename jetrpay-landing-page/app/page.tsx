import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustSection } from "@/components/trust-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
                <span className="font-medium">Powering Borderless Payments</span>
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance leading-tight">
                Empowering Your <span className="text-primary">Financial Future</span> with Stablecoins
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                JetrPay bridges Web2 and Web3 finance with seamless fiat-to-stablecoin payments. Send, receive, and
                manage cross-border payments instantly, securely, and affordably on the Flow blockchain.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary"></div>
                <span>Built on Flow Blockchain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary"></div>
                <span>USDC Compatible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary"></div>
                <span>KYC Compliant</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" asChild>
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                <Link href="/demo">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div>
                <div className="font-heading font-bold text-2xl md:text-3xl text-primary">$2M+</div>
                <div className="text-sm text-muted-foreground">Processed</div>
              </div>
              <div>
                <div className="font-heading font-bold text-2xl md:text-3xl text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="font-heading font-bold text-2xl md:text-3xl text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/jetrpay-hero.jpg"
                alt="JetrPay mobile app interface showing stablecoin payment dashboard"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">
                Join the Future of Borderless Payments
              </h2>
              <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto">
                Start accepting stablecoin payments today and unlock global markets for your business. Join thousands of
                merchants already using JetrPay.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base" asChild>
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                asChild
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Sales
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

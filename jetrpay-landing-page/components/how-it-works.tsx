import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Sign Up & Verify",
    description: "Create your account and complete our streamlined KYC process in minutes.",
    image: "/placeholder-wm7c4.png",
  },
  {
    step: "02",
    title: "Connect Your Wallet",
    description: "Link your Flow wallet or let us create one for you with our custodial solution.",
    image: "/placeholder-3co4q.png",
  },
  {
    step: "03",
    title: "Buy USDC Instantly",
    description: "Purchase stablecoins using your local currency via cards, bank, or mobile money.",
    image: "/placeholder-6em24.png",
  },
  {
    step: "04",
    title: "Send & Receive Globally",
    description: "Transfer payments instantly across borders or convert back to local fiat.",
    image: "/placeholder-lq6oj.png",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">
            Take Control of Your <span className="text-primary">Financial Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get started with JetrPay in four simple steps and unlock the power of borderless payments.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold">
                    {step.step}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      width={400}
                      height={300}
                      className="w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

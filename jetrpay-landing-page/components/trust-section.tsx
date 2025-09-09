import Image from "next/image"

const partners = [
  { name: "Flow", logo: "/flow-blockchain-logo.jpg" },
  { name: "USDC", logo: "/usdc-stablecoin-logo.png" },
  { name: "Blocto", logo: "/blocto-wallet-logo.jpg" },
  { name: "Flutterwave", logo: "/flutterwave-payment-logo.jpg" },
  { name: "Paystack", logo: "/paystack-payment-logo.jpg" },
  { name: "Sumsub", logo: "/sumsub-kyc-logo.jpg" },
]

export function TrustSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by leading organizations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Button } from "@/components/ui/button"

export function MoneyTransferSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Money Transfers</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Move your money. Fast. <br />
                Reliably. <span className="text-green-400">Across borders</span>
              </h2>

              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Stay connected with your loved ones in Africa through fast transfers to over 15 currencies. Easy,
                competitive rates, transparent fees, and the security of global reach for every transaction.
              </p>

              <Button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-medium">
                Explore Payments <span className="ml-2">→</span>
              </Button>
            </div>

            <div className="relative">
              <img
                src="/3d-illustration-of-money-transfer-with-coins-and-g.jpg"
                alt="Money Transfer Illustration"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

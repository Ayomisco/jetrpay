export function FeaturesGrid() {
  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-2 bg-gradient-to-br from-red-900 to-red-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
              <span className="font-medium text-sm">Money Transfers</span>
            </div>

            <h3 className="text-4xl font-bold mb-4">
              Move your crypto. Fast.
              <br />
              Reliably. <span className="text-orange-400">Across borders</span>
            </h3>

            <p className="text-red-100 mb-8 max-w-lg">
              Stay connected with your loved ones globally through fast transfers in over 15 cryptocurrencies. Enjoy
              competitive rates, transparent fees, and the security of stable coins for every transaction.
            </p>

            <button className="flex items-center text-white hover:text-orange-200 transition-colors">
              <span className="mr-2">Explore Payments</span>
              <span>→</span>
            </button>

            <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
              <div className="w-48 h-48 relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full absolute top-4 right-4 opacity-80"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full absolute bottom-8 left-8 opacity-80"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full absolute top-12 left-12 opacity-60"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-400 rounded-full absolute bottom-16 right-16 opacity-60"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold text-sm">@</span>
              </div>
              <span className="text-orange-600 font-medium">JetrPay Tag</span>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">Pay Instantly With Your Tag</h3>

            <p className="text-gray-600 mb-8">
              Pay friends and family using your JetrPay tag. Simply search or enable contact access, all no cost.
            </p>

            <div className="space-y-3">
              <div className="bg-yellow-600 text-white px-4 py-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/30 rounded-full mr-3"></div>
                  <span>You sent @thechuks $179.99</span>
                </div>
              </div>

              <div className="bg-red-800 text-white px-4 py-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/30 rounded-full mr-3"></div>
                  <span>You sent @raijinbabs $340</span>
                </div>
              </div>

              <div className="bg-green-700 text-white px-4 py-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/30 rounded-full mr-3"></div>
                  <span>You sent @purplequeen $250</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold text-sm">💱</span>
              </div>
              <span className="font-medium">Multi Currency Conversion</span>
            </div>

            <h3 className="text-3xl font-bold mb-4">Swap currencies with one-click</h3>

            <p className="text-blue-100 mb-8">
              Convert from one currency to another at zero fees, across 20+ currencies
            </p>

            <div className="grid grid-cols-6 gap-3">
              {[
                "🇳🇬",
                "🇿🇦",
                "🇰🇪",
                "🇬🇭",
                "🇺🇬",
                "🇹🇿",
                "🇷🇼",
                "🇪🇹",
                "🇲🇦",
                "🇪🇬",
                "🇩🇿",
                "🇹🇳",
                "🇸🇳",
                "🇲🇱",
                "🇧🇫",
                "🇳🇪",
                "🇹🇩",
                "🇨🇲",
                "🇨🇮",
                "🇬🇳",
                "🇸🇱",
                "🇱🇷",
                "🇬🇲",
                "🇨🇻",
              ].map((flag, i) => (
                <div key={i} className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center relative">
                  <span className="text-lg">{flag}</span>
                  {i % 4 === 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 text-xs">★</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PoweringSection() {
  return (
    <section className="py-20 bg-orange-50 relative overflow-hidden">
      {/* Decorative circles pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-300 rounded-full"></div>
        <div className="absolute top-60 right-1/3 w-28 h-28 bg-blue-300 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-36 h-36 bg-green-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Powering your finances in a <span className="block">better way</span>
        </h2>

        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Explore multiple transfer options. Do more with one app
        </p>

        <div className="relative max-w-5xl mx-auto">
          <div className="flex justify-center items-center space-x-8">
            {/* Left phone mockup */}
            <div className="relative">
              <img
                src="/iphone-showing-send-money-interface-with-currency-.jpg"
                alt="Send Money Interface"
                className="rounded-3xl shadow-xl max-w-xs"
              />

              {/* Floating annotations for left phone */}
              <div className="absolute -top-4 -left-8 bg-yellow-400 text-black px-3 py-2 rounded-full text-xs font-medium shadow-lg">
                💰 Receive in different currencies
              </div>

              <div className="absolute bottom-32 -left-12 bg-yellow-400 text-black px-3 py-2 rounded-full text-xs font-medium shadow-lg">
                📱 Mobile Money Transfer
              </div>
            </div>

            {/* Right phone mockup */}
            <div className="relative">
              <img
                src="/iphone-mockup-with-kredete-app-interface-showing-b.jpg"
                alt="JetrPay App Interface"
                className="rounded-3xl shadow-xl max-w-xs"
              />

              {/* Floating annotations for right phone */}
              <div className="absolute -top-4 -right-8 bg-yellow-400 text-black px-3 py-2 rounded-full text-xs font-medium shadow-lg">
                🌍 Send money to multiple countries
              </div>

              <div className="absolute bottom-20 -right-12 bg-yellow-400 text-black px-3 py-2 rounded-full text-xs font-medium shadow-lg">
                💳 Pay with JetrPay Tag
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

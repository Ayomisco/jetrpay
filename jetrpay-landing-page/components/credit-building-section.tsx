export function CreditBuildingSection() {
  return (
    <section className="bg-amber-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            No Credit Score?
            <br />
            <span className="text-orange-500">Build</span> your freedom.
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Looking to secure better loan terms, ace your rental application, or lower utility costs? Building financial
            credibility without a credit score can be tough. Get started in seconds with the JetrPay app.
          </p>
        </div>

        {/* Credit building cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1 - Credit building without cards */}
          <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
                🔓 Unlock your score
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Credit building
                <br />
                without cards
              </h3>
              <p className="text-gray-300 mb-8">
                Send money to loved ones and watch your credit score grow. No credit card required - just signup to
                secure your financial future.
              </p>
            </div>

            {/* Illustration placeholder */}
            <div className="absolute bottom-0 right-0 w-64 h-64">
              <div className="relative w-full h-full">
                {/* Purple character illustration */}
                <div className="absolute bottom-8 right-8 w-32 h-40 bg-purple-600 rounded-full"></div>
                {/* Orange key/unlock symbol */}
                <div className="absolute bottom-16 right-16 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-sm"></div>
                </div>
                {/* Orange accent lines */}
                <div className="absolute top-8 right-12 w-8 h-1 bg-orange-500 rotate-45"></div>
                <div className="absolute top-12 right-8 w-8 h-1 bg-orange-500 rotate-45"></div>
                <div className="absolute top-16 right-4 w-8 h-1 bg-orange-500 rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Card 2 - Build good credit history */}
          <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
                ✅ Boost your score
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Build good credit
                <br />
                history
              </h3>
              <p className="text-gray-300 mb-8">
                Every time you send money, you improve your records. Retain connections and build a strong credit
                history simultaneously.
              </p>
            </div>

            {/* Illustration placeholder */}
            <div className="absolute bottom-0 right-0 w-64 h-64">
              <div className="relative w-full h-full">
                {/* Purple hand holding cards */}
                <div className="absolute bottom-8 right-8 w-32 h-32 bg-purple-600 rounded-full"></div>
                {/* Credit cards */}
                <div className="absolute bottom-16 right-12 w-20 h-12 bg-teal-400 rounded-lg transform rotate-12"></div>
                <div className="absolute bottom-12 right-16 w-20 h-12 bg-orange-500 rounded-lg transform -rotate-6"></div>
                {/* Orange accent lines */}
                <div className="absolute top-8 right-12 w-8 h-1 bg-orange-500 rotate-45"></div>
                <div className="absolute top-12 right-8 w-8 h-1 bg-orange-500 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

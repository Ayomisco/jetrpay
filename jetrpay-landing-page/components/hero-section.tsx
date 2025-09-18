export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gray-900 bg-grid-pattern overflow-hidden">
      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <div className="flex justify-center mb-16">
          <div className="flex items-center bg-gray-800/80 border border-gray-700 rounded-full px-6 py-3 text-sm text-orange-300 backdrop-blur-sm shadow-lg">
            <span className="w-4 h-4 mr-2 text-orange-400">💰</span>
            <span className="font-medium">Earn up to $20 when you refer a friend. </span>
            <span className="text-orange-400 underline cursor-pointer">Learn More</span>
          </div>
        </div>

        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 leading-[0.9] tracking-tight">
            <span className="block">Send crypto,</span>
            <span className="block">
              Build <span className="text-orange-400">wealth</span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            Transfer stablecoins securely in minutes and build your crypto portfolio as a global citizen in the digital
            economy
          </p>
        </div>
      </div>
    </section>
  )
}

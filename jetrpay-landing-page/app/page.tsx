

import Footer from "@/components/footer"

function WaitlistNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="px-2 py-2">
        <div className="container mx-auto">
          <nav className="flex items-center justify-center">
            <div className="bg-gray-900 rounded-full px-3 md:px-6 py-2 flex items-center justify-between w-full max-w-4xl shadow-sm">
              <div className="flex items-center gap-2">
                <img src="/jetrpay_logo_yellow.png" alt="JetrPay Logo" className="h-8 w-auto md:h-10" />
                <span className="px-2 py-0.5 rounded border border-yellow-400 bg-gray-900 text-yellow-400 text-[0.65rem] font-bold align-top" style={{position:'relative', top:'-0.7em'}}>DEVNET</span>
              </div>
              <a
                href="#waitlist"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-1.5 rounded-full text-sm font-bold shadow-md ml-3"
              >
                Join Waitlist
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <WaitlistNavbar />
      <section className="relative min-h-[60vh] bg-gray-900 bg-grid-pattern overflow-hidden flex items-center justify-center">
        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <div className="max-w-md mx-auto w-full">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-6 leading-tight tracking-tight font-serif text-center">
                          Get Early Access to JetrPay
                        </h1>
                        <p className="text-base md:text-lg text-gray-300 mb-8 font-light leading-relaxed text-center font-mono">
                          Join the waitlist to be the first to experience seamless stablecoin payments, swaps, and fiat on/off-ramp for Africa and beyond. Simple. Secure. Powerful.
                        </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 border-b-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono text-base placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full text-lg transition-colors shadow-md"
              >
                Join Waitlist
              </button>
            </form>
            <div className="flex items-center mt-6">
              <img
                src="https://www.iexploreonline.com/_next/static/media/ExplorersWaitingSvg.c8e9b2e3.svg"
                alt="People on waitlist"
                className="h-10 w-auto mr-3"
                style={{ borderRadius: '9999px', background: '#222' }}
              />
              <span className="text-gray-200 text-sm font-mono">1k+ users already waiting</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

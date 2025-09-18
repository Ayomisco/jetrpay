

import Footer from "@/components/footer"

function WaitlistNavbar() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 shadow-md bg-gray-900">
			<div className="px-4 py-4">
				<div className="container mx-auto">
					<nav className="flex items-center justify-between">
						<div className="relative flex items-center">
							<img src="/jetrpay_logo_yellow.png" alt="JetrPay Logo" className="h-16 w-auto" />
							<span className="absolute -top-1 left-14 px-1 py-0.5 rounded border border-yellow-400 bg-gray-900 text-yellow-400 text-[0.5rem] font-bold">BETA</span>
						</div>
						<a
							href="#waitlist"
							className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-md"
						>
							Join Waitlist
						</a>
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
						<h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight font-serif text-center">
							Be First to Experience JetrPay
						</h1>
						<p className="text-base md:text-lg text-gray-400 mb-8 font-light leading-relaxed text-center font-mono">
							<span className="text-yellow-400 font-semibold">JetrPay</span> is a stablecoin-first, blockchain-agnostic crypto payment and fiat on/off-ramp platform.<br />
							<br />Empowering Africa and the world to buy, sell, accept, and swap digital assets like USDC using local payment methods (cards, bank transfer, mobile money).<br /><br />
							<span className="text-yellow-400 font-semibold">Unlock stablecoin access for the next billion users.</span> Earn, save, and spend in digital currencies through a secure, low-fee, and compliant platform.<br /><br />
							<span className="text-xs text-gray-500">MVP launches Q4 2025: Flow testnet, core user & merchant features. Multi-chain, mobile, and APIs coming soon.</span>
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
							<span className="text-gray-200 text-sm font-mono">12.7k Explorers already waiting</span>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	)
}

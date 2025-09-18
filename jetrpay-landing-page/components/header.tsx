"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="px-4 py-4">
        <div className="container mx-auto">
          <nav className="flex items-center justify-center">
            {/* Desktop navigation */}
            <div className="hidden md:flex bg-gray-900 rounded-full px-4 md:px-8 py-3 items-center justify-between w-full max-w-4xl shadow-sm">
              {/* Left logo */}
              <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                    <img src="/jetrpay_logo_yellow.png" alt="JetrPay Logo" className="h-20 w-auto" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded border border-yellow-400 bg-gray-900 text-yellow-400 text-[0.5rem] font-bold" style={{top: '-0.7rem'}}>DEVNET</span>
                </div>
              </div>

              {/* Right button */}
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 md:px-6 py-2 rounded-full text-sm font-bold">
                Download JetrPay
              </Button>
            </div>

            {/* Mobile navigation */}
            <div className="flex md:hidden bg-gray-900 rounded-full px-4 py-3 items-center justify-between w-full shadow-sm">
              <div className="flex items-center gap-2">
                <img src="/jetrpay_logo_yellow.png" alt="JetrPay Logo" className="h-12 w-auto" />
                {/* <span className="font-bold text-xl tracking-tight text-yellow-400">JetrPay</span> */}
                <span className="ml-2 px-2 py-0.5 rounded border border-yellow-400 text-yellow-400 text-xs font-bold">DEVNET</span>
              </div>
              <button
                className="text-yellow-400 text-2xl focus:outline-none"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-end md:hidden">
          <div className="w-64 bg-gray-900 h-full p-6 flex flex-col gap-6 shadow-xl">
            <button
              className="self-end text-yellow-400 text-2xl mb-4 focus:outline-none"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              ×
            </button>
            <nav className="flex flex-col gap-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-bold mt-6">
                Download JetrPay
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

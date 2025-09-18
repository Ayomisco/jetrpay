

import { FaDiscord, FaXTwitter, FaMedium } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 px-4 text-center">
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center mb-2" style={{height:'4rem'}}>
          <img src="/jetrpay_logo_yellow.png" alt="JetrPay Logo" className="h-20 w-auto my-0" />
          <span className="absolute top-0.5 left-17 px-1 py-0.5 rounded border my-0 border-yellow-400 bg-gray-900 text-yellow-400 text-[0.3rem] font-bold">DEVNET</span>
        </div>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-gray-900 shadow-lg bg-yellow-400 hover:bg-yellow-500"
        >
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 8.5C6.5 6.01472 8.51472 4 11 4C13.4853 4 15.5 6.01472 15.5 8.5C15.5 10.9853 13.4853 13 11 13C8.51472 13 6.5 10.9853 6.5 8.5Z" stroke="#111" strokeWidth="2"/><path d="M11 13V20" stroke="#111" strokeWidth="2"/><path d="M8 20H14" stroke="#111" strokeWidth="2"/></svg>
          Contact Support
        </a>

        <div className="text-gray-300 text-base font-semibold mb-2">© 2025 JetrPay</div>

        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-gray-300 text-sm">Join our community Today</span>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-[#5865F2] text-2xl">
            <FaDiscord />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            <FaXTwitter />
          </a>
          <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-[#fff] text-2xl">
            <FaMedium />
          </a>
        </div>

        <a href="/contact" className="text-gray-300 underline text-base font-mono">contact support</a>
      </div>
    </footer>
  )
}

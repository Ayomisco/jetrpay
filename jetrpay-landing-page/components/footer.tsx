export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and tagline */}
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-bold mb-2">jetrpay</div>
            <p className="text-gray-400 text-sm">Powering your crypto finances</p>
          </div>

          {/* Social media and community */}
          <div className="flex items-center space-x-6">
            <span className="text-gray-400 text-sm">Join our community:</span>

            {/* Social media icons */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-blue-400">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-blue-400">𝕏</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-pink-400">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-blue-600">💼</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-red-500">▶</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">&copy; 2024 JetrPay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

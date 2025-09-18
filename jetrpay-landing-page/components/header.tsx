import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-amber-50 px-4 py-4">
        <div className="container mx-auto">
          <nav className="flex items-center justify-center">
            <div className="bg-gray-900 rounded-full px-8 py-3 flex items-center justify-between w-full max-w-4xl">
              {/* Left navigation */}
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-white hover:text-gray-200 transition-colors text-sm font-medium">
                  Personal <span className="ml-1 text-xs">▼</span>
                </button>
                <button className="text-white hover:text-gray-200 transition-colors text-sm font-medium">
                  Business
                </button>
                <button className="flex items-center text-white hover:text-gray-200 transition-colors text-sm font-medium">
                  Community <span className="ml-1 text-xs">▼</span>
                </button>
                <button className="text-white hover:text-gray-200 transition-colors text-sm font-medium">About</button>
              </div>

              {/* Center logo */}
              <div className="text-white font-bold text-xl tracking-tight">jetrpay</div>

              {/* Right button */}
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium">
                Download JetrPay
              </Button>
            </div>

            <div className="md:hidden bg-gray-900 rounded-full px-6 py-3 flex items-center justify-between w-full">
              <div className="text-white font-bold text-xl tracking-tight">jetrpay</div>
              <button className="text-white text-xl">☰</button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

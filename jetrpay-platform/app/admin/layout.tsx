import type React from "react"
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <span className="font-bold text-slate-900">JetrPay Admin</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">admin@jetrpay.com</span>
              <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

export function TickerSection() {
  const features = [
    { text: "Top-notch Security", color: "bg-blue-600" },
    { text: "No hidden Fees", color: "bg-orange-500" },
    { text: "Referral Rewards", color: "bg-gray-600" },
    { text: "Currency Conversion", color: "bg-gray-700" },
    { text: "Tracking", color: "bg-purple-600" },
    { text: "eJetrPay Tag", color: "bg-red-600" },
    { text: "Efficient and Easy", color: "bg-gray-600" },
    { text: "24/7 Support", color: "bg-gray-700" },
    { text: "eJetrPay Tag", color: "bg-orange-600" },
    { text: "Credit Score", color: "bg-gray-800" },
    { text: "Best Rates", color: "bg-green-600" },
    { text: "Top-notch Security", color: "bg-blue-600" },
    { text: "Credit Building", color: "bg-purple-600" },
    { text: "Efficient and Easy", color: "bg-gray-600" },
    { text: "No hidden Fees", color: "bg-orange-500" },
    { text: "Efficient and Easy", color: "bg-gray-600" },
    { text: "Currency Conversion", color: "bg-gray-700" },
    { text: "24/7 Support", color: "bg-gray-700" },
    { text: "Top-notch Security", color: "bg-blue-600" },
    { text: "Instant Transfers", color: "bg-purple-600" },
    { text: "No hidden Fees", color: "bg-orange-500" },
    { text: "Credit Building", color: "bg-purple-600" },
    { text: "Credit Score", color: "bg-gray-800" },
    { text: "Top-notch Security", color: "bg-blue-600" },
  ]

  return (
    <section className="bg-gray-900 py-6 overflow-hidden">
      <div className="flex animate-scroll space-x-4">
        {/* First set */}
        {features.map((feature, index) => (
          <div key={`first-${index}`} className="flex items-center whitespace-nowrap">
            <span
              className={`${feature.color} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2`}
            >
              <span>⭐</span>
              <span>{feature.text}</span>
            </span>
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {features.map((feature, index) => (
          <div key={`second-${index}`} className="flex items-center whitespace-nowrap">
            <span
              className={`${feature.color} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2`}
            >
              <span>⭐</span>
              <span>{feature.text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background bg-grid-subtle">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-accent transition-colors">
            JetrPay
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {!isSubmitted ? (
            <>
              {/* Floating crypto icon */}
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-float animate-pulse-glow">
                  <span className="text-3xl text-primary-foreground">₿</span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
                The Future of{" "}
                <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Crypto</span> is
                Coming
              </h1>

              {/* Subheading */}
              <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-lg mx-auto leading-relaxed">
                Be among the first to experience seamless crypto transfers, instant conversions, and the next generation
                of digital finance.
              </p>

              {/* Waitlist Form */}
              <form onSubmit={handleSubmit} className="mb-12">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-14 text-lg bg-input border-border focus:border-primary transition-colors"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        Joining...
                      </div>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                </div>
              </form>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">Instant Transfers</h3>
                  <p className="text-sm text-muted-foreground">Send crypto anywhere in seconds, not minutes</p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">Bank-Grade Security</h3>
                  <p className="text-sm text-muted-foreground">Your assets protected with military-grade encryption</p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">Global Access</h3>
                  <p className="text-sm text-muted-foreground">Connect with 200+ countries and currencies</p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Join 10,000+ early adopters already on the waitlist
                </p>
                <div className="flex justify-center items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full border-2 border-background flex items-center justify-center text-xs text-white font-semibold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">and many more...</span>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="animate-in fade-in duration-500">
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-3xl text-white">✓</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Welcome to the{" "}
                <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Future</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-lg mx-auto leading-relaxed">
                You're now on the JetrPay waitlist! We'll notify you as soon as we launch.
              </p>

              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 max-w-md mx-auto mb-8">
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Early access to beta features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    Exclusive launch bonuses
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Priority customer support
                  </li>
                </ul>
              </div>

              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mr-4">
                Join Another Email
              </Button>

              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90">Explore JetrPay</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float"></div>
      </div>
    </div>
  )
}

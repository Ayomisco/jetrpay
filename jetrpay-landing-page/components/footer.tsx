import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">J</span>
              </div>
              <span className="font-heading font-bold text-xl">JetrPay</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Powering the next generation of borderless payments with stablecoin technology on Flow blockchain.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Product</h3>
            <nav className="space-y-2">
              <Link
                href="/features"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/security"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Security
              </Link>
              <Link
                href="/roadmap"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Roadmap
              </Link>
            </nav>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Developers</h3>
            <nav className="space-y-2">
              <Link href="/docs" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </Link>
              <Link href="/api" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                API Reference
              </Link>
              <Link href="/sdks" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                SDKs
              </Link>
              <Link
                href="/sandbox"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sandbox
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Company</h3>
            <nav className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link
                href="/careers"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
              <Link href="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 JetrPay. All rights reserved.</p>
          <nav className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

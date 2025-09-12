"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full glass-effect backdrop-blur-xl border-b border-primary/10 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 curved-border bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <span className="text-primary-foreground font-heading font-bold text-xl">J</span>
          </div>
          <span className="font-heading font-bold text-2xl gradient-text tracking-tight group-hover:tracking-wider transition-all">JetrPay</span>
        </Link>

        {/* Desktop Navigation with Dropdowns */}
        <nav className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10 data-[state=open]:bg-accent/10 font-medium px-6 py-3 rounded-xl transition-colors relative group focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none min-w-[120px] text-base">
                  <span className="relative z-10">Products</span>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] max-w-full p-0">
                    <div className="grid grid-cols-2 gap-0">
                      {/* Left: Platform Card */}
                      <div className="flex flex-col justify-between bg-gradient-to-br from-primary/10 to-background/80 rounded-l-2xl p-8 min-h-[260px] border-r border-primary/10">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex flex-col h-full select-none justify-end bg-gradient-to-b from-primary/20 to-primary/10 p-0 no-underline outline-none focus:shadow-lg rounded-xl shadow-md hover:scale-[1.02] transition-transform"
                            href="/features"
                          >
                            <div className="flex items-center gap-3 mb-2 mt-2">
                              <span className="inline-block h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor" className="text-primary/40" /></svg>
                              </span>
                              <span className="text-xl font-bold text-primary">JetrPay Platform</span>
                            </div>
                            <p className="text-base text-muted-foreground mb-4">
                              Complete stablecoin payment infrastructure for businesses and developers.
                            </p>
                            <Button size="sm" variant="secondary" className="w-max mt-auto">Explore Platform</Button>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {/* Right: Menu List */}
                      <div className="flex flex-col gap-0 p-8 bg-background/80 rounded-r-2xl">
                        <div className="mb-4">
                          <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">Quick Links</span>
                        </div>
                        <ul className="space-y-2">
                          <ListItem href="/features" title="Features" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" className="text-primary/30" /></svg>
                              Explore our comprehensive payment features
                            </span>
                          </ListItem>
                          <ListItem href="/pricing" title="Pricing" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                              Transparent pricing for all business sizes
                            </span>
                          </ListItem>
                          <ListItem href="/use-cases" title="Use Cases" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" /></svg>
                              Real-world applications and success stories
                            </span>
                          </ListItem>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10 data-[state=open]:bg-accent/10 font-medium px-6 py-3 rounded-xl transition-colors relative group focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none min-w-[120px] text-base">
                  <span className="relative z-10">Developers</span>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] max-w-full p-0">
                    <div className="grid grid-cols-2 gap-0">
                      {/* Left: Developer Card */}
                      <div className="flex flex-col justify-between bg-gradient-to-br from-secondary/10 to-background/80 rounded-l-2xl p-8 min-h-[260px] border-r border-secondary/10">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex flex-col h-full select-none justify-end bg-gradient-to-b from-secondary/20 to-secondary/10 p-0 no-underline outline-none focus:shadow-lg rounded-xl shadow-md hover:scale-[1.02] transition-transform"
                            href="/developers"
                          >
                            <div className="flex items-center gap-3 mb-2 mt-2">
                              <span className="inline-block h-8 w-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" className="text-secondary/40" /></svg>
                              </span>
                              <span className="text-xl font-bold text-secondary">Developer Hub</span>
                            </div>
                            <p className="text-base text-muted-foreground mb-4">
                              API docs, SDKs, guides, and everything for building on JetrPay.
                            </p>
                            <Button size="sm" variant="secondary" className="w-max mt-auto">Explore Docs</Button>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {/* Right: Menu List */}
                      <div className="flex flex-col gap-0 p-8 bg-background/80 rounded-r-2xl">
                        <div className="mb-4">
                          <span className="text-xs font-semibold uppercase tracking-widest text-secondary/80">Quick Links</span>
                        </div>
                        <ul className="space-y-2">
                          <ListItem href="/developers" title="API Documentation" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" className="text-secondary/30" /></svg>
                              Complete API reference and integration guides
                            </span>
                          </ListItem>
                          <ListItem href="/docs" title="Developer Hub" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                              SDKs, tutorials, and code examples
                            </span>
                          </ListItem>
                          <ListItem href="/sandbox" title="Sandbox" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" /></svg>
                              Test environment for development
                            </span>
                          </ListItem>
                          <ListItem href="/webhooks" title="Webhooks" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                              Real-time payment notifications
                            </span>
                          </ListItem>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10 data-[state=open]:bg-accent/10 font-medium px-6 py-3 rounded-xl transition-colors relative group focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none min-w-[120px] text-base">
                  <span className="relative z-10">Company</span>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] max-w-full p-0">
                    <div className="grid grid-cols-2 gap-0">
                      {/* Left: Company Card */}
                      <div className="flex flex-col justify-between bg-gradient-to-br from-primary/10 to-background/80 rounded-l-2xl p-8 min-h-[220px] border-r border-primary/10">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex flex-col h-full select-none justify-end bg-gradient-to-b from-primary/20 to-primary/10 p-0 no-underline outline-none focus:shadow-lg rounded-xl shadow-md hover:scale-[1.02] transition-transform"
                            href="/about"
                          >
                            <div className="flex items-center gap-3 mb-2 mt-2">
                              <span className="inline-block h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor" className="text-primary/40" /></svg>
                              </span>
                              <span className="text-xl font-bold text-primary">About JetrPay</span>
                            </div>
                            <p className="text-base text-muted-foreground mb-4">
                              Learn about our mission, team, and vision for the future of payments.
                            </p>
                            <Button size="sm" variant="secondary" className="w-max mt-auto">Meet the Team</Button>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {/* Right: Menu List */}
                      <div className="flex flex-col gap-0 p-8 bg-background/80 rounded-r-2xl">
                        <div className="mb-4">
                          <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">Quick Links</span>
                        </div>
                        <ul className="space-y-2">
                          <ListItem href="/about" title="About Us" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" /></svg>
                              Our mission and team
                            </span>
                          </ListItem>
                          <ListItem href="/roadmap" title="Roadmap" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                              Future features and development plans
                            </span>
                          </ListItem>
                          <ListItem href="/contact" title="Contact" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" className="text-primary/30" /></svg>
                              Get in touch with our team
                            </span>
                          </ListItem>
                          <ListItem href="/support" title="Support" className="modern-menu-item">
                            <span className="flex items-center gap-2">
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" /></svg>
                              Help center and documentation
                            </span>
                          </ListItem>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/merchants"
                    className="group inline-flex h-12 w-max items-center justify-center curved-border bg-transparent px-6 py-3 text-base font-medium hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-50 transition-all relative rounded-xl min-w-[120px]"
                  >
                    <span className="relative z-10">Merchants</span>
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="curved-border hover:bg-accent/10 text-base px-5 py-2" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            className="curved-border bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-base px-6 py-2 shadow-md"
            asChild
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden curved-border"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 glass-effect">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Products</div>
              <Link
                href="/features"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/use-cases"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Use Cases
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Developers</div>
              <Link
                href="/developers"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                API Documentation
              </Link>
              <Link
                href="/docs"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Developer Hub
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Company</div>
              <Link
                href="/about"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/roadmap"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                href="/contact"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/support"
                className="block pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
            </div>

            <Link
              href="/merchants"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Merchants
            </Link>

            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full curved-border" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="w-full curved-border bg-gradient-to-r from-primary to-secondary" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string
  title: string
  children: React.ReactNode
  href: string
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all bg-transparent hover:bg-primary/10 hover:text-primary focus:bg-primary/20 focus:text-primary shadow-sm border border-transparent hover:border-primary/20 focus:border-primary/30 modern-menu-item",
            className,
          )}
          {...props}
        >
          <div className="text-base font-semibold leading-none mb-1">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

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
    <header className="sticky top-0 z-50 w-full glass-effect">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 curved-border bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-lg">J</span>
          </div>
          <span className="font-heading font-bold text-xl gradient-text">JetrPay</span>
        </Link>

        {/* Desktop Navigation with Dropdowns */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10 data-[state=open]:bg-accent/10">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end curved-border bg-gradient-to-b from-primary/20 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                          href="/features"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">JetrPay Platform</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Complete stablecoin payment infrastructure for businesses and developers.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <ListItem href="/features" title="Features">
                      Explore our comprehensive payment features
                    </ListItem>
                    <ListItem href="/pricing" title="Pricing">
                      Transparent pricing for all business sizes
                    </ListItem>
                    <ListItem href="/use-cases" title="Use Cases">
                      Real-world applications and success stories
                    </ListItem>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10 data-[state=open]:bg-accent/10">
                  Developers
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/developers" title="API Documentation">
                      Complete API reference and integration guides
                    </ListItem>
                    <ListItem href="/docs" title="Developer Hub">
                      SDKs, tutorials, and code examples
                    </ListItem>
                    <ListItem href="/sandbox" title="Sandbox">
                      Test environment for development
                    </ListItem>
                    <ListItem href="/webhooks" title="Webhooks">
                      Real-time payment notifications
                    </ListItem>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10 data-[state=open]:bg-accent/10">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[300px]">
                    <ListItem href="/about" title="About Us">
                      Our mission and team
                    </ListItem>
                    <ListItem href="/roadmap" title="Roadmap">
                      Future features and development plans
                    </ListItem>
                    <ListItem href="/contact" title="Contact">
                      Get in touch with our team
                    </ListItem>
                    <ListItem href="/support" title="Support">
                      Help center and documentation
                    </ListItem>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/merchants"
                    className="group inline-flex h-9 w-max items-center justify-center curved-border bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Merchants
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="curved-border hover:bg-accent/10" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            className="curved-border bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
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
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            "block select-none space-y-1 curved-border p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

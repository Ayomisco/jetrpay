import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-foreground">JetrPay</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="text-muted-foreground">Join thousands using JetrPay for borderless payments</p>
          </div>

          <Card className="border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Get Started</CardTitle>
              <CardDescription>Choose your account type to begin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Personal</span>
                  <span className="text-xs text-muted-foreground text-center">For individuals and freelancers</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Business</span>
                  <span className="text-xs text-muted-foreground text-center">For merchants and companies</span>
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a strong password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                </div>
              </div>

              <Button className="w-full" size="lg">
                Create Account
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 bg-muted/30 items-center justify-center p-8">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary" className="mb-4">
              Trusted by 10,000+ users
            </Badge>
            <h2 className="text-2xl font-bold text-foreground">Why choose JetrPay?</h2>
            <p className="text-muted-foreground">
              The most trusted platform for stablecoin payments in emerging markets
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Instant Settlements</h3>
                <p className="text-sm text-muted-foreground">
                  Receive payments in seconds with Flow blockchain technology
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Bank-Grade Security</h3>
                <p className="text-sm text-muted-foreground">
                  KYC/AML compliant with enterprise-level security measures
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Global Reach</h3>
                <p className="text-sm text-muted-foreground">
                  Support for local payment methods across Africa and beyond
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

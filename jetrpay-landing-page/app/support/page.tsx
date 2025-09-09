import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  MessageCircle,
  Book,
  Video,
  Users,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Clock,
  Zap,
  Shield,
} from "lucide-react"
import Link from "next/link"

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7 Available",
    responseTime: "< 2 minutes",
    action: "Start Chat",
    href: "/chat",
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Comprehensive guides and API references",
    availability: "Always Available",
    responseTime: "Instant",
    action: "Browse Docs",
    href: "/docs",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides and walkthroughs",
    availability: "On Demand",
    responseTime: "Instant",
    action: "Watch Videos",
    href: "/tutorials",
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with other developers and users",
    availability: "Community Driven",
    responseTime: "Varies",
    action: "Join Forum",
    href: "/community",
  },
]

const popularArticles = [
  {
    title: "Getting Started with JetrPay",
    description: "Complete guide to setting up your first payment",
    category: "Getting Started",
    readTime: "5 min read",
    href: "/docs/getting-started",
  },
  {
    title: "API Authentication Guide",
    description: "How to securely authenticate your API requests",
    category: "Security",
    readTime: "8 min read",
    href: "/docs/authentication",
  },
  {
    title: "Webhook Implementation",
    description: "Setting up webhooks for real-time notifications",
    category: "Integration",
    readTime: "12 min read",
    href: "/docs/webhooks",
  },
  {
    title: "Testing in Sandbox Mode",
    description: "How to test your integration safely",
    category: "Testing",
    readTime: "6 min read",
    href: "/docs/sandbox",
  },
  {
    title: "Troubleshooting Common Issues",
    description: "Solutions to frequently encountered problems",
    category: "Troubleshooting",
    readTime: "10 min read",
    href: "/docs/troubleshooting",
  },
  {
    title: "Payment Link Best Practices",
    description: "Optimize your payment links for better conversion",
    category: "Best Practices",
    readTime: "7 min read",
    href: "/docs/payment-links",
  },
]

const categories = [
  { name: "Getting Started", count: 12 },
  { name: "API Reference", count: 28 },
  { name: "Integration", count: 15 },
  { name: "Security", count: 8 },
  { name: "Troubleshooting", count: 22 },
  { name: "Best Practices", count: 10 },
]

const supportFeatures = [
  {
    icon: Zap,
    title: "Fast Response Times",
    description: "Average response time under 2 hours for all support tickets",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock support for critical issues and emergencies",
  },
  {
    icon: Shield,
    title: "Expert Team",
    description: "Dedicated support engineers with deep JetrPay expertise",
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Support Center
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                We're Here to <span className="text-primary">Help You Succeed</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Find answers, get support, and learn how to make the most of JetrPay's stablecoin payment platform.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search for help..." className="pl-10 bg-background border-border" />
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Choose Your Support Channel</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Multiple ways to get the help you need, when you need it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportOptions.map((option, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="h-3 w-3 text-secondary" />
                        <span className="text-xs text-muted-foreground">{option.availability}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-3 w-3 text-secondary" />
                        <span className="text-xs text-muted-foreground">{option.responseTime}</span>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={option.href}>
                        {option.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Popular Help Articles</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Most viewed articles by our community. Find quick answers to common questions.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {popularArticles.map((article, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <Link href={article.href} className="block space-y-3 group">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">{article.description}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-4 flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg">Browse by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/docs/category/${category.name.toLowerCase().replace(" ", "-")}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <span className="font-medium group-hover:text-primary transition-colors">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-heading font-semibold text-lg">Need More Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      Can't find what you're looking for? Our support team is ready to help.
                    </p>
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        Contact Support
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Support Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Why Our Support Stands Out</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                We're committed to providing exceptional support to help you succeed with JetrPay.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {supportFeatures.map((feature, index) => (
                <Card key={index} className="text-center border-0 shadow-sm">
                  <CardContent className="p-8 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                      <feature.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground">
              <CardContent className="p-8 md:p-12 text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Still Need Help?</h2>
                  <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto">
                    Our support team is standing by to help you with any questions or issues you might have.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-base" asChild>
                    <Link href="/contact">
                      Contact Support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    asChild
                  >
                    <Link href="/chat">Start Live Chat</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

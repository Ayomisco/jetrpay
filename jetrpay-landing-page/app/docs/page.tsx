import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  ArrowRight,
  Code,
  Zap,
  Shield,
  Globe,
  ExternalLink,
  FileText,
  Video,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

const docSections = [
  {
    title: "Getting Started",
    description: "Everything you need to begin integrating with JetrPay",
    icon: Zap,
    articles: [
      { title: "Quick Start Guide", description: "Get up and running in 5 minutes", href: "/docs/quickstart" },
      { title: "Authentication", description: "Secure your API requests", href: "/docs/auth" },
      { title: "Testing with Sandbox", description: "Test safely before going live", href: "/docs/sandbox" },
      { title: "Going Live Checklist", description: "Production deployment guide", href: "/docs/go-live" },
    ],
  },
  {
    title: "API Reference",
    description: "Complete documentation for all API endpoints",
    icon: Code,
    articles: [
      { title: "Payment Links", description: "Create and manage payment links", href: "/docs/api/payment-links" },
      { title: "Transactions", description: "Track and query transactions", href: "/docs/api/transactions" },
      { title: "Customers", description: "Manage customer data", href: "/docs/api/customers" },
      { title: "Webhooks", description: "Real-time event notifications", href: "/docs/api/webhooks" },
    ],
  },
  {
    title: "SDKs & Libraries",
    description: "Official libraries for popular programming languages",
    icon: Globe,
    articles: [
      { title: "JavaScript SDK", description: "Node.js and browser support", href: "/docs/sdks/javascript" },
      { title: "Python SDK", description: "Python 3.7+ compatible", href: "/docs/sdks/python" },
      { title: "PHP SDK", description: "PHP 7.4+ support", href: "/docs/sdks/php" },
      { title: "Go SDK", description: "Go modules support", href: "/docs/sdks/go" },
    ],
  },
  {
    title: "Security & Compliance",
    description: "Best practices for secure integration",
    icon: Shield,
    articles: [
      { title: "API Security", description: "Secure your API integration", href: "/docs/security/api" },
      { title: "Webhook Security", description: "Verify webhook signatures", href: "/docs/security/webhooks" },
      { title: "PCI Compliance", description: "Payment card industry standards", href: "/docs/security/pci" },
      { title: "Data Protection", description: "GDPR and privacy compliance", href: "/docs/security/privacy" },
    ],
  },
]

const popularArticles = [
  { title: "Creating Your First Payment Link", views: "12.5k", href: "/docs/quickstart" },
  { title: "Handling Webhook Events", views: "8.2k", href: "/docs/webhooks" },
  { title: "Testing in Sandbox Mode", views: "6.8k", href: "/docs/sandbox" },
  { title: "Error Codes Reference", views: "5.4k", href: "/docs/errors" },
  { title: "Rate Limiting Guide", views: "4.1k", href: "/docs/rate-limits" },
]

const resources = [
  {
    icon: FileText,
    title: "Guides & Tutorials",
    description: "Step-by-step integration guides",
    href: "/docs/guides",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Watch and learn with video content",
    href: "/docs/videos",
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "Get help from other developers",
    href: "/community",
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Documentation
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                <span className="text-primary">Developer</span> Documentation
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Everything you need to integrate JetrPay into your application. From quick start guides to comprehensive
                API references.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search documentation..." className="pl-10 bg-background border-border" />
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {docSections.map((section, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-heading text-xl">{section.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {section.articles.map((article, idx) => (
                      <Link
                        key={idx}
                        href={article.href}
                        className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium group-hover:text-primary transition-colors">{article.title}</h4>
                            <p className="text-sm text-muted-foreground">{article.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
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
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Popular Articles</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Most viewed documentation articles by our developer community.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {popularArticles.map((article, index) => (
                      <Link
                        key={index}
                        href={article.href}
                        className="block p-6 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                              {index + 1}
                            </div>
                            <h3 className="font-medium group-hover:text-primary transition-colors">{article.title}</h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">
                              {article.views} views
                            </Badge>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Additional Resources</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                More ways to learn and get help with your JetrPay integration.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <resource.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl">{resource.title}</h3>
                    <p className="text-muted-foreground">{resource.description}</p>
                    <Button variant="outline" asChild>
                      <Link href={resource.href}>
                        Explore
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
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
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">
                    Need Help Getting Started?
                  </h2>
                  <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto">
                    Our developer support team is here to help you integrate successfully.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-base" asChild>
                    <Link href="/support">
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
                    <Link href="/community">Join Community</Link>
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

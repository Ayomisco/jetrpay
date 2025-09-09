import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Eye, Heart, Users, Globe, TrendingUp, ArrowRight, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description:
      "We push the boundaries of what's possible in fintech, leveraging cutting-edge blockchain technology to solve real-world problems.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description:
      "Every decision we make is centered around creating exceptional experiences for our users, merchants, and developers.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "We believe financial inclusion should be universal, starting with emerging markets and expanding worldwide.",
  },
  {
    icon: Users,
    title: "Transparency",
    description: "We build trust through open communication, clear pricing, and honest business practices.",
  },
]

const stats = [
  { number: "$2M+", label: "Transaction Volume" },
  { number: "15+", label: "Countries Served" },
  { number: "1000+", label: "Active Users" },
  { number: "99.9%", label: "Platform Uptime" },
]

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former Goldman Sachs VP with 10+ years in fintech and blockchain.",
    image: "/placeholder.svg?key=team1",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    bio: "Ex-Coinbase engineer, Flow blockchain core contributor.",
    image: "/placeholder.svg?key=team2",
  },
  {
    name: "Amara Okafor",
    role: "Head of Africa Operations",
    bio: "Former Flutterwave executive, expert in African payment systems.",
    image: "/placeholder.svg?key=team3",
  },
  {
    name: "David Kim",
    role: "Head of Product",
    bio: "Product leader from Stripe, specialized in developer tools.",
    image: "/placeholder.svg?key=team4",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                About JetrPay
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                Building the Future of <span className="text-primary">Borderless Finance</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                We're on a mission to make stablecoin payments as easy as sending an email, starting with emerging
                markets and scaling globally.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-primary" />
                    <h2 className="font-heading font-bold text-2xl">Our Vision</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To become the default stablecoin payment layer for emerging markets — starting in Africa and scaling
                    globally. We envision a world where anyone can access stable digital dollars instantly and
                    affordably.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-primary" />
                    <h2 className="font-heading font-bold text-2xl">Our Mission</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    JetrPay bridges Web2 and Web3 finance with compliant, developer-friendly tools that unlock access to
                    stable digital dollars for everyone. We make blockchain payments invisible but powerful.
                  </p>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/global-network.jpg"
                  alt="Global payment network visualization"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Our Impact So Far</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Since launching, we've been growing rapidly and making a real difference in how people access and use
                stablecoins.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-0 shadow-sm">
                  <CardContent className="p-6 space-y-2">
                    <div className="font-heading font-bold text-3xl md:text-4xl text-primary">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Our Values</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                These principles guide everything we do, from product development to customer support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-xl">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                We're a diverse team of fintech veterans, blockchain experts, and payment specialists from around the
                world.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative w-24 h-24 mx-auto">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Join Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're always looking for talented individuals who share our passion for financial inclusion and
                  blockchain technology. Help us build the future of borderless payments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/careers">
                      View Open Positions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-0">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <TrendingUp className="h-12 w-12 text-primary" />
                    <h3 className="font-heading font-bold text-2xl">Growing Fast</h3>
                    <p className="text-muted-foreground">
                      We're scaling rapidly across Africa and beyond. Join us in this exciting journey to revolutionize
                      payments.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="font-heading font-bold text-xl text-primary">Remote-First</div>
                      <div className="text-sm text-muted-foreground">Global team</div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xl text-primary">Equity</div>
                      <div className="text-sm text-muted-foreground">For all employees</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

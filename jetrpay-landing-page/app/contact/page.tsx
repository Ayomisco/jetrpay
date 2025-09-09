import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, MessageCircle, Users, Code, Building, ArrowRight, Send } from "lucide-react"
import Link from "next/link"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    contact: "support@jetrpay.com",
    action: "Send Email",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    contact: "Available 24/7",
    action: "Start Chat",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our team",
    contact: "+1 (555) 123-4567",
    action: "Call Now",
  },
]

const departments = [
  {
    icon: Users,
    title: "General Support",
    description: "Account issues, payment questions, and general help",
    email: "support@jetrpay.com",
  },
  {
    icon: Code,
    title: "Developer Support",
    description: "API integration, technical documentation, and SDK help",
    email: "developers@jetrpay.com",
  },
  {
    icon: Building,
    title: "Sales & Partnerships",
    description: "Enterprise solutions, partnerships, and custom integrations",
    email: "sales@jetrpay.com",
  },
]

const offices = [
  {
    city: "San Francisco",
    address: "123 Market Street, Suite 400",
    country: "United States",
    timezone: "PST (UTC-8)",
  },
  {
    city: "Lagos",
    address: "45 Victoria Island Road",
    country: "Nigeria",
    timezone: "WAT (UTC+1)",
  },
  {
    city: "London",
    address: "78 Canary Wharf",
    country: "United Kingdom",
    timezone: "GMT (UTC+0)",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Contact Us
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                Get in Touch with <span className="text-primary">Our Team</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Have questions about JetrPay? Need help with integration? Our support team is here to help you succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">How Can We Help?</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Choose the best way to reach us based on your needs and urgency.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8 space-y-6">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <method.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading font-semibold text-xl">{method.title}</h3>
                      <p className="text-muted-foreground">{method.description}</p>
                      <p className="font-medium text-primary">{method.contact}</p>
                    </div>
                    <Button className="w-full">
                      {method.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Send Us a Message</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Fill out the form and we'll get back to you within 24 hours. For urgent matters, please use our live
                    chat or phone support.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-sm">Response time: Within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-sm">Available in 15+ countries</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm">Dedicated support team</span>
                  </div>
                </div>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Contact Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Your Company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={4} />
                  </div>
                  <Button className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Contact the Right Team</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Reach out to the specific department that can best help with your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <dept.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl">{dept.title}</h3>
                    <p className="text-muted-foreground">{dept.description}</p>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={`mailto:${dept.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        {dept.email}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">Our Global Offices</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                We have teams around the world to better serve our global community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-heading font-semibold text-xl">{office.city}</h3>
                      <p className="text-muted-foreground">{office.country}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">{office.timezone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground">
              <CardContent className="p-8 md:p-12 text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-balance">
                    Looking for Quick Answers?
                  </h2>
                  <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto">
                    Check out our comprehensive FAQ section and documentation for instant answers to common questions.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-base" asChild>
                    <Link href="/faq">
                      View FAQ
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    asChild
                  >
                    <Link href="/docs">Browse Documentation</Link>
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

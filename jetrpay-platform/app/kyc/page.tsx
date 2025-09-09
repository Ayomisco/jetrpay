"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, User, MapPin, FileText, Shield, AlertCircle, Camera } from "lucide-react"
import Link from "next/link"

type KYCStep = "personal" | "address" | "documents" | "review"

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState<KYCStep>("personal")
  const [completedSteps, setCompletedSteps] = useState<KYCStep[]>([])

  const steps = [
    { id: "personal", title: "Personal Information", icon: User },
    { id: "address", title: "Address Verification", icon: MapPin },
    { id: "documents", title: "Document Upload", icon: FileText },
    { id: "review", title: "Review & Submit", icon: Shield },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleStepComplete = (step: KYCStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step])
    }

    const nextStepIndex = currentStepIndex + 1
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex].id as KYCStep)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-foreground">JetrPay</span>
            </Link>
            <Badge variant="outline">KYC Verification</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-foreground">Identity Verification</h1>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-6" />

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isCompleted = completedSteps.includes(step.id as KYCStep)
                const isCurrent = currentStep === step.id

                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isCompleted
                          ? "bg-primary border-primary text-primary-foreground"
                          : isCurrent
                            ? "border-primary text-primary bg-primary/10"
                            : "border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${isCompleted ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step Content */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {(() => {
                  const StepIcon = steps.find((s) => s.id === currentStep)?.icon || User
                  return <StepIcon className="h-5 w-5 text-primary" />
                })()}
                <span>{steps.find((s) => s.id === currentStep)?.title}</span>
              </CardTitle>
              <CardDescription>
                {currentStep === "personal" && "Please provide your personal information for identity verification"}
                {currentStep === "address" && "Verify your residential address for compliance requirements"}
                {currentStep === "documents" && "Upload required documents to complete your verification"}
                {currentStep === "review" && "Review your information before submitting for verification"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === "personal" && <PersonalInfoStep onComplete={() => handleStepComplete("personal")} />}
              {currentStep === "address" && <AddressStep onComplete={() => handleStepComplete("address")} />}
              {currentStep === "documents" && <DocumentsStep onComplete={() => handleStepComplete("documents")} />}
              {currentStep === "review" && <ReviewStep onComplete={() => handleStepComplete("review")} />}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-1">Your data is secure</h3>
                <p className="text-sm text-muted-foreground">
                  All information is encrypted and stored securely. We comply with international data protection
                  standards and only use your information for verification purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PersonalInfoStep({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" placeholder="Doe" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input id="dateOfBirth" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ng">Nigeria</SelectItem>
              <SelectItem value="gh">Ghana</SelectItem>
              <SelectItem value="ke">Kenya</SelectItem>
              <SelectItem value="za">South Africa</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number *</Label>
        <Input id="phoneNumber" placeholder="+234 800 000 0000" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input id="occupation" placeholder="Software Developer" />
      </div>

      <Button onClick={onComplete} className="w-full">
        Continue to Address Verification
      </Button>
    </div>
  )
}

function AddressStep({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="street">Street Address *</Label>
        <Input id="street" placeholder="123 Main Street" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" placeholder="Lagos" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State/Province *</Label>
          <Input id="state" placeholder="Lagos State" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" placeholder="100001" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ng">Nigeria</SelectItem>
              <SelectItem value="gh">Ghana</SelectItem>
              <SelectItem value="ke">Kenya</SelectItem>
              <SelectItem value="za">South Africa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={onComplete} className="w-full">
        Continue to Document Upload
      </Button>
    </div>
  )
}

function DocumentsStep({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Required Documents</h3>

        {/* ID Document */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>Government-issued ID</span>
              <Badge variant="destructive" className="text-xs">
                Required
              </Badge>
            </CardTitle>
            <CardDescription className="text-sm">
              Upload a clear photo of your passport, national ID, or driver's license
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
            </div>
          </CardContent>
        </Card>

        {/* Proof of Address */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Proof of Address</span>
              <Badge variant="destructive" className="text-xs">
                Required
              </Badge>
            </CardTitle>
            <CardDescription className="text-sm">
              Upload a utility bill, bank statement, or lease agreement (not older than 3 months)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
            </div>
          </CardContent>
        </Card>

        {/* Selfie Verification */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <Camera className="h-4 w-4 text-primary" />
              <span>Selfie Verification</span>
              <Badge variant="destructive" className="text-xs">
                Required
              </Badge>
            </CardTitle>
            <CardDescription className="text-sm">
              Take a clear selfie holding your ID document next to your face
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Take a selfie or upload photo</p>
              <p className="text-xs text-muted-foreground">Clear photo with good lighting</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1">Document Guidelines</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Ensure all text is clearly visible and readable</li>
              <li>• Photos should be well-lit with no glare or shadows</li>
              <li>• Documents must be valid and not expired</li>
              <li>• File size should not exceed 10MB per document</li>
            </ul>
          </div>
        </div>
      </div>

      <Button onClick={onComplete} className="w-full">
        Continue to Review
      </Button>
    </div>
  )
}

function ReviewStep({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Review Your Information</h3>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="text-foreground">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date of Birth:</span>
              <span className="text-foreground">January 15, 1990</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nationality:</span>
              <span className="text-foreground">Nigerian</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="text-foreground">+234 800 000 0000</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address:</span>
              <span className="text-foreground">123 Main Street</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">City:</span>
              <span className="text-foreground">Lagos</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country:</span>
              <span className="text-foreground">Nigeria</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Government ID</span>
              </div>
              <Badge variant="secondary">Uploaded</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Proof of Address</span>
              </div>
              <Badge variant="secondary">Uploaded</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Selfie Verification</span>
              </div>
              <Badge variant="secondary">Uploaded</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">What happens next?</h4>
            <p className="text-sm text-blue-700">
              Our compliance team will review your documents within 24-48 hours. You'll receive an email notification
              once your verification is complete.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={onComplete} className="w-full" size="lg">
        Submit for Verification
      </Button>
    </div>
  )
}

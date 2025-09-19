"use client"

import { useState } from "react"
import { X, Upload, Camera, FileText, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface KYCVerificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function KYCVerificationModal({ isOpen, onClose }: KYCVerificationModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [documentType, setDocumentType] = useState("")
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  })

  const documentTypes = [
    { value: "passport", label: "International Passport" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "national_id", label: "National ID Card" },
    { value: "voters_card", label: "Voter's Card" },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle KYC submission
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Identity Verification</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className={`h-1 w-16 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Document Type Selection */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <FileText className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-medium mb-2">Select Document Type</h3>
              <p className="text-sm text-muted-foreground">
                Choose a valid government-issued ID to verify your identity
              </p>
            </div>

            <div className="space-y-3">
              {documentTypes.map((doc) => (
                <Card
                  key={doc.value}
                  className={`p-4 cursor-pointer transition-colors ${
                    documentType === doc.value ? "border-blue-600 bg-blue-50" : "hover:bg-muted"
                  }`}
                  onClick={() => setDocumentType(doc.value)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{doc.label}</span>
                    <div
                      className={`h-4 w-4 rounded-full border-2 ${
                        documentType === doc.value ? "bg-blue-600 border-blue-600" : "border-gray-300"
                      }`}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <Button className="w-full" onClick={handleNext} disabled={!documentType}>
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-medium mb-2">Personal Information</h3>
              <p className="text-sm text-muted-foreground">Enter your personal details as they appear on your ID</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    dateOfBirth: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street address"
                value={personalInfo.address}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    address: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={personalInfo.city}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      city: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={personalInfo.state}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      state: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleNext}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Upload className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-medium mb-2">Upload Document</h3>
              <p className="text-sm text-muted-foreground">
                Upload clear photos of your {documentTypes.find((d) => d.value === documentType)?.label}
              </p>
            </div>

            <Tabs defaultValue="front" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="front">Front Side</TabsTrigger>
                <TabsTrigger value="back">Back Side</TabsTrigger>
              </TabsList>

              <TabsContent value="front" className="space-y-4">
                <Card className="p-8 border-dashed border-2 text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">Take a photo or upload from gallery</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="back" className="space-y-4">
                <Card className="p-8 border-dashed border-2 text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">Take a photo or upload from gallery</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                Submit for Review
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

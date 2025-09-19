"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Mail, Lock, User, Phone, Briefcase } from "lucide-react"

interface SignupFlowProps {
  onComplete: (userData: any) => void
  onBack: () => void
}

type SignupStep = "email" | "otp" | "profile" | "kyc"

export function SignupFlow({ onComplete, onBack }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState<SignupStep>("email")
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    otp: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    accountType: "personal" as "personal" | "business",
  })

  const handleNext = () => {
    const steps: SignupStep[] = ["email", "otp", "profile", "kyc"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    } else {
      onComplete(userData)
    }
  }

  const handleBack = () => {
    const steps: SignupStep[] = ["email", "otp", "profile", "kyc"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    } else {
      onBack()
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "email":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Create Account</h2>
              <p className="text-gray-400">Enter your email and create a password</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case "otp":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Verify Email</h2>
              <p className="text-gray-400">Enter the 6-digit code sent to {userData.email}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-white">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={userData.otp}
                  onChange={(e) => setUserData({ ...userData, otp: e.target.value })}
                  className="text-center text-2xl tracking-widest bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <Button variant="ghost" className="w-full text-yellow-400 hover:text-yellow-300">
                Resend Code
              </Button>
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Complete Profile</h2>
              <p className="text-gray-400">Tell us a bit about yourself</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="@johndoe"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+234 800 000 0000"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case "kyc":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Account Type</h2>
              <p className="text-gray-400">Choose your account type (you can change this later in settings)</p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4">
                <Card
                  className={`cursor-pointer transition-all ${
                    userData.accountType === "personal"
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-gray-700 bg-gray-800"
                  }`}
                  onClick={() => setUserData({ ...userData, accountType: "personal" })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-6 w-6 text-yellow-400" />
                      <div>
                        <h3 className="font-semibold text-white">Personal Account</h3>
                        <p className="text-sm text-gray-400">For individual wallet management</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${
                    userData.accountType === "business"
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-gray-700 bg-gray-800"
                  }`}
                  onClick={() => setUserData({ ...userData, accountType: "business" })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-6 w-6 text-yellow-400" />
                      <div>
                        <h3 className="font-semibold text-white">Business Account</h3>
                        <p className="text-sm text-gray-400">For accepting payments and business management</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <p className="text-sm text-gray-400">
                  <strong className="text-yellow-400">Note:</strong> Identity verification can be completed later from
                  Settings. You can also switch between Personal and Business modes anytime.
                </p>
              </div>
            </div>
          </div>
        )
    }
  }

  const getStepProgress = () => {
    const steps = ["email", "otp", "profile", "kyc"]
    return ((steps.indexOf(currentStep) + 1) / steps.length) * 100
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleBack} className="text-gray-400">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-gray-400">
              Step {["email", "otp", "profile", "kyc"].indexOf(currentStep) + 1} of 4
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getStepProgress()}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStep()}

          <Button
            onClick={handleNext}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
            disabled={
              (currentStep === "email" && (!userData.email || !userData.password)) ||
              (currentStep === "otp" && userData.otp.length !== 6) ||
              (currentStep === "profile" && (!userData.firstName || !userData.lastName || !userData.username))
            }
          >
            {currentStep === "kyc" ? "Complete Setup" : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

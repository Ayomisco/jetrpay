"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, Camera, FileText, Building } from "lucide-react"

interface KYCModalProps {
  userMode: "personal" | "merchant"
  onComplete: () => void
  onSkip: () => void
}

export function KYCModal({ userMode, onComplete, onSkip }: KYCModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const personalSteps = [
    {
      id: 1,
      title: "Identity Verification",
      description: "Upload a government-issued ID",
      icon: FileText,
      required: true,
    },
    {
      id: 2,
      title: "Selfie Verification",
      description: "Take a selfie for identity confirmation",
      icon: Camera,
      required: true,
    },
  ]

  const merchantSteps = [
    {
      id: 1,
      title: "Business Information",
      description: "Provide business registration details",
      icon: Building,
      required: true,
    },
    {
      id: 2,
      title: "Business Documents",
      description: "Upload business registration certificate",
      icon: Upload,
      required: true,
    },
    {
      id: 3,
      title: "Identity Verification",
      description: "Upload owner/director ID",
      icon: FileText,
      required: true,
    },
  ]

  const steps = userMode === "personal" ? personalSteps : merchantSteps
  const progress = (completedSteps.length / steps.length) * 100

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }

    if (stepId < steps.length) {
      setCurrentStep(stepId + 1)
    } else {
      // All steps completed
      setTimeout(onComplete, 1000)
    }
  }

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId)
  const isStepCurrent = (stepId: number) => stepId === currentStep
  const isStepAccessible = (stepId: number) => stepId <= currentStep

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-xl jetrpay-gold">
            {userMode === "personal" ? "Tier 1 KYC" : "Tier 2 KYC"}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {userMode === "personal"
              ? "Complete identity verification to unlock full features"
              : "Business verification required for merchant features"}
          </p>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedSteps.length} of {steps.length} steps completed
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon
            const completed = isStepCompleted(step.id)
            const current = isStepCurrent(step.id)
            const accessible = isStepAccessible(step.id)

            return (
              <div
                key={step.id}
                className={`p-4 rounded-lg border transition-colors ${
                  completed
                    ? "bg-green-500/10 border-green-500/20"
                    : current
                      ? "bg-primary/10 border-primary/20"
                      : "bg-muted/50 border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        completed
                          ? "bg-green-500 text-white"
                          : current
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {completed ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className={`font-medium ${current ? "text-primary" : ""}`}>{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {current && !completed && (
                    <Button size="sm" className="jetrpay-button-primary" onClick={() => handleStepComplete(step.id)}>
                      {step.icon === Camera ? "Take Photo" : "Upload"}
                    </Button>
                  )}
                </div>
              </div>
            )
          })}

          {completedSteps.length === steps.length && (
            <div className="text-center space-y-4 pt-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-green-500">Verification Complete!</h3>
                <p className="text-sm text-muted-foreground">Your account has been successfully verified</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onSkip}
              className="flex-1 border-border bg-transparent"
              disabled={completedSteps.length === steps.length}
            >
              Skip for Now
            </Button>
            {completedSteps.length === steps.length && (
              <Button onClick={onComplete} className="flex-1 jetrpay-button-primary">
                Continue
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, XCircle, FileText, Shield, Mail, Phone } from "lucide-react"
import Link from "next/link"

type VerificationStatus = "pending" | "under_review" | "approved" | "rejected" | "requires_action"

export default function KYCStatusPage() {
  // This would come from your backend/database
  const verificationStatus: VerificationStatus = "under_review"
  const submissionDate = "2024-01-15"
  const estimatedCompletion = "2024-01-17"

  const getStatusConfig = (status: VerificationStatus) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          badge: "secondary",
          title: "Verification Pending",
          description: "Your documents are queued for review",
        }
      case "under_review":
        return {
          icon: FileText,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          badge: "secondary",
          title: "Under Review",
          description: "Our team is currently reviewing your documents",
        }
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          badge: "secondary",
          title: "Verification Complete",
          description: "Your identity has been successfully verified",
        }
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          badge: "destructive",
          title: "Verification Failed",
          description: "There were issues with your submitted documents",
        }
      case "requires_action":
        return {
          icon: AlertCircle,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          badge: "destructive",
          title: "Action Required",
          description: "Additional information or documents are needed",
        }
    }
  }

  const statusConfig = getStatusConfig(verificationStatus)
  const StatusIcon = statusConfig.icon

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
            <Badge variant={statusConfig.badge as any}>{statusConfig.title}</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Status Header */}
          <Card className={`border ${statusConfig.borderColor} ${statusConfig.bgColor}`}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div
                  className={`h-12 w-12 rounded-full ${statusConfig.bgColor} border ${statusConfig.borderColor} flex items-center justify-center`}
                >
                  <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
                </div>
                <div>
                  <CardTitle className="text-xl">{statusConfig.title}</CardTitle>
                  <CardDescription className={statusConfig.color}>{statusConfig.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Progress Timeline */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Verification Progress</CardTitle>
              <CardDescription>Track the status of your identity verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Documents Submitted</p>
                    <p className="text-sm text-muted-foreground">January 15, 2024 at 2:30 PM</p>
                  </div>
                </div>

                <div className="ml-4 w-0.5 h-6 bg-border"></div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`h-8 w-8 rounded-full ${
                      verificationStatus === "pending"
                        ? "bg-amber-100 border-amber-200"
                        : "bg-green-100 border-green-200"
                    } border flex items-center justify-center`}
                  >
                    {verificationStatus === "pending" ? (
                      <Clock className="h-4 w-4 text-amber-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Initial Review</p>
                    <p className="text-sm text-muted-foreground">
                      {verificationStatus === "pending" ? "Waiting to start..." : "January 15, 2024 at 3:45 PM"}
                    </p>
                  </div>
                </div>

                <div className="ml-4 w-0.5 h-6 bg-border"></div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`h-8 w-8 rounded-full ${
                      ["under_review", "approved"].includes(verificationStatus)
                        ? "bg-blue-100 border-blue-200"
                        : "bg-muted border-border"
                    } border flex items-center justify-center`}
                  >
                    {["under_review", "approved"].includes(verificationStatus) ? (
                      <FileText className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Document Verification</p>
                    <p className="text-sm text-muted-foreground">
                      {["under_review", "approved"].includes(verificationStatus)
                        ? "In progress..."
                        : "Pending initial review"}
                    </p>
                  </div>
                </div>

                <div className="ml-4 w-0.5 h-6 bg-border"></div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`h-8 w-8 rounded-full ${
                      verificationStatus === "approved" ? "bg-green-100 border-green-200" : "bg-muted border-border"
                    } border flex items-center justify-center`}
                  >
                    {verificationStatus === "approved" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Verification Complete</p>
                    <p className="text-sm text-muted-foreground">
                      {verificationStatus === "approved"
                        ? "Completed successfully"
                        : `Expected by ${estimatedCompletion}`}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Cards */}
          {verificationStatus === "requires_action" && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <span>Action Required</span>
                </CardTitle>
                <CardDescription className="text-amber-700">
                  We need additional information to complete your verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-amber-800">Required Actions:</p>
                  <ul className="text-sm text-amber-700 space-y-1 ml-4">
                    <li>• Provide a clearer photo of your government ID</li>
                    <li>• Upload a more recent proof of address document</li>
                  </ul>
                </div>
                <Button className="w-full">Update Documents</Button>
              </CardContent>
            </Card>
          )}

          {verificationStatus === "approved" && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Verification Complete</span>
                </CardTitle>
                <CardDescription className="text-green-700">
                  Your identity has been successfully verified. You can now access all JetrPay features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Support Information */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Need Help?</span>
              </CardTitle>
              <CardDescription>Our support team is here to assist you with any questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="mailto:support@jetrpay.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="tel:+1234567890">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Link>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Average response time: 2-4 hours</p>
                <p>Support hours: Monday - Friday, 9 AM - 6 PM WAT</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

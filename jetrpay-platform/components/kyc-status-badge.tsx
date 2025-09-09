import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, XCircle, FileText } from "lucide-react"

type KYCStatus = "not_started" | "pending" | "under_review" | "approved" | "rejected" | "requires_action"

interface KYCStatusBadgeProps {
  status: KYCStatus
  showIcon?: boolean
}

export function KYCStatusBadge({ status, showIcon = true }: KYCStatusBadgeProps) {
  const getStatusConfig = (status: KYCStatus) => {
    switch (status) {
      case "not_started":
        return {
          icon: Clock,
          variant: "outline" as const,
          label: "Not Started",
          className: "text-muted-foreground",
        }
      case "pending":
        return {
          icon: Clock,
          variant: "secondary" as const,
          label: "Pending",
          className: "text-amber-600",
        }
      case "under_review":
        return {
          icon: FileText,
          variant: "secondary" as const,
          label: "Under Review",
          className: "text-blue-600",
        }
      case "approved":
        return {
          icon: CheckCircle,
          variant: "secondary" as const,
          label: "Verified",
          className: "text-green-600",
        }
      case "rejected":
        return {
          icon: XCircle,
          variant: "destructive" as const,
          label: "Rejected",
          className: "",
        }
      case "requires_action":
        return {
          icon: AlertCircle,
          variant: "destructive" as const,
          label: "Action Required",
          className: "",
        }
    }
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={config.className}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.label}
    </Badge>
  )
}

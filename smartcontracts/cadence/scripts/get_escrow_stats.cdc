import PaymentEscrow from "../contracts/PaymentEscrow.cdc"

/// Script to get platform statistics including total escrows, active disputes, and fees collected
access(all) fun main(): PaymentEscrow.PlatformStats {
    return PaymentEscrow.getPlatformStats()
}
import PaymentEscrow from "../contracts/PaymentEscrow.cdc"

/// Script to get detailed information about a specific escrow agreement
access(all) fun main(escrowId: UInt64): PaymentEscrow.EscrowAgreementInfo? {
    return PaymentEscrow.getEscrowDetails(escrowId: escrowId)
}
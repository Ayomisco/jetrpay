import PaymentEscrow from "../../contracts/PaymentEscrow.cdc"

/// Transaction to raise a dispute for an escrow
transaction(
    escrowId: UInt64,
    reason: String
) {
    prepare(signer: &Account) {
        PaymentEscrow.raiseDispute(
            escrowId: escrowId,
            disputer: signer.address,
            reason: reason
        )
        
        log("Raised dispute for escrow ID: ".concat(escrowId.toString()))
        log("Reason: ".concat(reason))
        log("Dispute is now under review")
    }
}
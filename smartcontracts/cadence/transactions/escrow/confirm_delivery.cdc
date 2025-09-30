import PaymentEscrow from "../../contracts/PaymentEscrow.cdc"

/// Transaction to confirm delivery of goods/services
transaction(escrowId: UInt64) {
    prepare(signer: &Account) {
        PaymentEscrow.confirmDelivery(
            escrowId: escrowId,
            confirmer: signer.address
        )
        
        log("Confirmed delivery for escrow ID: ".concat(escrowId.toString()))
        log("Auto-release timer has started (if enabled)")
    }
}
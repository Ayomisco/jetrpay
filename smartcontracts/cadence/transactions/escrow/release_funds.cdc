import PaymentEscrow from "../../contracts/PaymentEscrow.cdc"

/// Transaction to release escrowed funds to payee
transaction(
    escrowId: UInt64,
    amount: UFix64?
) {
    prepare(signer: &Account) {
        PaymentEscrow.releaseFunds(
            escrowId: escrowId,
            releaser: signer.address,
            amount: amount
        )
        
        let releaseText = amount?.toString() ?? "all remaining"
        log("Released ".concat(releaseText).concat(" funds from escrow ID: ").concat(escrowId.toString()))
    }
}
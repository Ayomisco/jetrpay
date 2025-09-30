import PaymentEscrow from "../../contracts/PaymentEscrow.cdc"

/// Transaction to deposit funds into an escrow
transaction(
    escrowId: UInt64,
    amount: UFix64
) {
    prepare(signer: &Account) {
        PaymentEscrow.depositToEscrow(
            escrowId: escrowId,
            depositor: signer.address,
            amount: amount
        )
        
        log("Deposited ".concat(amount.toString()).concat(" to escrow ID: ").concat(escrowId.toString()))
    }
}
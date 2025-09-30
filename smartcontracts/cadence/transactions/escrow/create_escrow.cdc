import PaymentEscrow from "../../contracts/PaymentEscrow.cdc"

/// Transaction to create a new escrow agreement
transaction(
    payee: Address,
    amount: UFix64,
    description: String,
    autoReleaseHours: UFix64?
) {
    prepare(signer: &Account) {
        // Create custom terms if specified, otherwise use defaults
        var customTerms: PaymentEscrow.EscrowTerms? = nil
        
        if let releaseHours = autoReleaseHours {
            customTerms = PaymentEscrow.EscrowTerms(
                autoReleaseHours: releaseHours,
                requiresDeliveryConfirmation: true,
                allowPartialRelease: true,
                disputeWindow: 24.0,
                escrowFeeRate: 0.005
            )
        }
        
        let escrowId = PaymentEscrow.createEscrow(
            payer: signer.address,
            payee: payee,
            amount: amount,
            description: description,
            customTerms: customTerms
        )
        
        log("Created escrow agreement with ID: ".concat(escrowId.toString()))
        log("Payer: ".concat(signer.address.toString()))
        log("Payee: ".concat(payee.toString()))
        log("Amount: ".concat(amount.toString()))
        log("Description: ".concat(description))
    }
}
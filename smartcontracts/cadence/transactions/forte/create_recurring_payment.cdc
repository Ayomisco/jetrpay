import ForteActions from "../../contracts/ForteActions.cdc"

/// Transaction to create a recurring payment action
/// This allows users to set up automatic recurring payments
transaction(
    fromAddress: Address,
    toAddress: Address,
    amount: UFix64,
    frequency: UInt64,
    maxExecutions: UInt64?
) {
    prepare(signer: &Account) {
        let actionId = ForteActions.createRecurringPaymentAction(
            creator: signer.address,
            fromAddress: fromAddress,
            toAddress: toAddress,
            amount: amount,
            frequency: frequency,
            maxExecutions: maxExecutions
        )
        
        log("Created recurring payment action with ID: ".concat(actionId.toString()))
    }
}
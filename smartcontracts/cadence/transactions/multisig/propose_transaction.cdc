import MultiSigWallet from "../../contracts/MultiSigWallet.cdc"

/// Transaction to propose a new transaction from multi-sig wallet
transaction(
    walletId: UInt64,
    recipient: Address,
    amount: UFix64,
    description: String,
    expirationHours: UFix64
) {
    prepare(signer: &Account) {
        let txId = MultiSigWallet.proposeTransaction(
            walletId: walletId,
            proposer: signer.address,
            recipient: recipient,
            amount: amount,
            description: description,
            expirationHours: expirationHours
        )
        
        log("Proposed transaction with ID: ".concat(txId.toString()))
        log("Wallet ID: ".concat(walletId.toString()))
        log("Recipient: ".concat(recipient.toString()))
        log("Amount: ".concat(amount.toString()))
        log("Description: ".concat(description))
    }
}
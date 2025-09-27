import MultiSigWallet from "../../contracts/MultiSigWallet.cdc"

/// Transaction to approve a pending multi-sig transaction
transaction(txId: UInt64) {
    prepare(signer: &Account) {
        let success = MultiSigWallet.approveTransaction(
            txId: txId,
            approver: signer.address
        )
        
        if success {
            log("Successfully approved transaction ID: ".concat(txId.toString()))
            log("Transaction may have been executed if threshold was reached")
        } else {
            log("Failed to approve transaction ID: ".concat(txId.toString()))
        }
    }
}
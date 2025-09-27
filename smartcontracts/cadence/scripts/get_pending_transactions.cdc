import MultiSigWallet from "../contracts/MultiSigWallet.cdc"

/// Script to get pending transactions for a wallet
access(all) fun main(walletId: UInt64): [{String: AnyStruct}] {
    let pendingTxIds = MultiSigWallet.getPendingTransactions(walletId: walletId)
    let pendingTxs: [{String: AnyStruct}] = []
    
    for txId in pendingTxIds {
        if let tx = MultiSigWallet.getTransaction(txId: txId) {
            pendingTxs.append({
                "id": tx.id,
                "walletId": tx.walletId,
                "proposer": tx.proposer,
                "recipient": tx.recipient,
                "amount": tx.amount,
                "description": tx.description,
                "proposedAt": tx.proposedAt,
                "expiresAt": tx.expiresAt,
                "status": tx.status.rawValue,
                "approvalCount": tx.getApprovalCount(),
                "rejectionCount": tx.getRejectionCount(),
                "isExpired": tx.isExpired()
            })
        }
    }
    
    return pendingTxs
}
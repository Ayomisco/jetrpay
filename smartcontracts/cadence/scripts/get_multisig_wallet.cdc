import MultiSigWallet from "../contracts/MultiSigWallet.cdc"

/// Script to get multi-sig wallet information
access(all) fun main(walletId: UInt64): {String: AnyStruct}? {
    if let wallet = MultiSigWallet.getWallet(walletId: walletId) {
        return {
            "id": wallet.id,
            "name": wallet.name,
            "owners": wallet.owners,
            "threshold": wallet.threshold,
            "balance": wallet.balance,
            "totalTransactions": wallet.totalTransactions,
            "createdAt": wallet.createdAt,
            "isActive": wallet.isActive
        }
    }
    return nil
}